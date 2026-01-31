// flows.js
import { Validators } from "./validators.js";

const formatClockTime = (raw) =>
  raw && raw.length === 4
    ? `${raw.substring(0, 2)}:${raw.substring(2, 4)}`
    : "--:--";

/**
 * Hilfsfunktion zur Validierung.
 * k: Taste (undefined bei Enter)
 * current: Aktueller Wert
 * step: Das gesamte Step-Objekt aus dem Template
 */
const delegateValidation = (k, current, step) => {
  // Sicherstellen, dass wir mit einem String arbeiten
  const val = current || "";
  const id = step.id;
  const maxLength = step.length;

  // 1. Prüfung beim Drücken von ENTER (k ist undefined)
  if (k === undefined) {
    // Nutzt den Validator mit der im Step definierten Länge
    return Validators.isFormatComplete(id, val, maxLength);
  }

  // 2. Prüfung während des Tippens
  if (!"0123456789".includes(k)) return false;

  // Verhindert Eingaben über die definierte Länge hinaus
  if (val.length >= maxLength) return false;

  // Logische Prüfung des resultierenden Strings
  return Validators.isValidLogic(id, val + k);
};

const STEP_TEMPLATES = {
  GLOCKEN_WAHL: {
    id: "selection",
    label: "GLOCKEN: ____",
    subLabel: "WAEHLE (1..4)",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  MELODIEN_WAHL: {
    id: "selection",
    label: "MELODIEN: ____",
    subLabel: "WAEHLE (1..4)",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  DIENSTE_WAHL: {
    id: "selection",
    label: "DIENSTE: __",
    subLabel: "WAEHLE (1..2)",
    length: 2,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  DURATION: {
    id: "duration",
    label: "DAUER: __ SEK.",
    subLabel: "0 FUER ANFANG-ENDE",
    length: 2,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  START_TIME: {
    id: "startTime",
    label: "BEGINNSTUN.:__:__",
    subLabel: "00:MM-FORMAT",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  END_TIME: {
    id: "endTime",
    label: "ENDESTUNDE:__:__",
    subLabel: "00:MM-FORMAT",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
    showIf: (flowData) => {
      if (flowData.category === "U") return true;
      const d = flowData.duration;
      return d === "0" || d === "00";
    },
  },
  START_DATE: {
    id: "startDate",
    label: "BEGINNDAT.:__:__",
    subLabel: "FORMAT TT-MM",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  END_DATE: {
    id: "endDate",
    label: "ENDEDATUM :__:__",
    subLabel: "FORMAT TT-MM",
    length: 4,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  LIMIT_DATE: {
    id: "limitDate",
    label: "BDATUM:__:__:__",
    subLabel: "FORMAT TT-MM-JJ",
    length: 6,
    inputInLine2: false,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  LIMIT_DATE_Z: {
    id: "limitDate",
    label: "BEG.DAT.:__:__:__",
    subLabel: "FORMAT TT-MM-JJ",
    length: 6,
    inputInLine2: false,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  INTERVAL: {
    id: "interval",
    label: "BEZEICHENABST.:__",
    subLabel: "IN TAGEN [2..99]",
    length: 2,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
  DAYS: {
    id: "days",
    label: "ETAGE:_",
    subLabel: "1-MON...7-SON 0-ALLE",
    length: 1,
    validate: (k, c, s) => delegateValidation(k, c, s),
  },
};

export const flows = {
  START_PROGRAM_INPUT: {
    getSteps: (configKey) => {
      const [category, type] = configKey.split("_");
      const typeMapping = {
        GLOCKEN: STEP_TEMPLATES.GLOCKEN_WAHL,
        MELODIEN: STEP_TEMPLATES.MELODIEN_WAHL,
        DIENSTE: STEP_TEMPLATES.DIENSTE_WAHL,
      };

      const steps = [];

      if (type !== "STUNDENSCHLAG" && typeMapping[type]) {
        steps.push(typeMapping[type]);
      } else if (type === "DIENSTE") {
        steps.push(STEP_TEMPLATES.DIENSTE_WAHL);
      }

      if (category === "U") {
        steps.push(STEP_TEMPLATES.START_TIME);
        steps.push(STEP_TEMPLATES.END_TIME);
        steps.push(STEP_TEMPLATES.START_DATE);
        steps.push(STEP_TEMPLATES.END_DATE);
        steps.push(STEP_TEMPLATES.DAYS);
      } else {
        steps.push(STEP_TEMPLATES.DURATION);
        steps.push(STEP_TEMPLATES.START_TIME);
        steps.push(STEP_TEMPLATES.END_TIME);

        if (category === "B") steps.push(STEP_TEMPLATES.LIMIT_DATE);
        if (category === "P")
          steps.push(STEP_TEMPLATES.START_DATE, STEP_TEMPLATES.END_DATE);
        if (category === "Z") {
          steps.push(STEP_TEMPLATES.LIMIT_DATE_Z);
          steps.push(STEP_TEMPLATES.INTERVAL);
        }
        if (["W", "P"].includes(category)) steps.push(STEP_TEMPLATES.DAYS);
      }

      // Wichtig: Beim Mapping binden wir das Step-Objekt an die validate-Funktion
      return steps.map((s) => {
        const stepWithCat = { ...s, category };
        // Wir überschreiben die validate-Funktion, damit sie 'stepWithCat' als dritten Parameter erhält
        const originalValidate = s.validate;
        stepWithCat.validate = (k, c) => originalValidate(k, c, stepWithCat);
        return stepWithCat;
      });
    },
    onComplete: (combinedData) => {
      const existing = JSON.parse(
        localStorage.getItem("punto4_programs") || "[]",
      );
      const newProgram = {
        internalId: Date.now(),
        programId: combinedData.programId,
        category: combinedData.category, // Korrigiert von .type
        displayName: combinedData.label,
        data: {
          ...combinedData,
          time: formatClockTime(combinedData.startTime),
        },
        createdAt: new Date().toISOString(),
      };
      existing.push(newProgram);
      localStorage.setItem("punto4_programs", JSON.stringify(existing));
      return `PROG ${combinedData.programId} GESPEICHERT!`;
    },
  },
  DIRECT_COMMAND: {
    getSteps: (configKey) => {
      const commandConfigs = {
        TURMUHR_KORRIGIEREN: [
          {
            id: "targetTime",
            label: "ZEITEINGABE VOM", // Zeile 1
            subLabel: "TURMUHR: __:__", // Zeile 2
            length: 4,
            inputInLine2: true, // Damit der Cursor in Zeile 2 springt
            validate: (k, c, s) => delegateValidation(k, c, s),
          },
        ],
      };
      const rawSteps = commandConfigs[configKey] || [];
      return rawSteps.map((s) => {
        const boundStep = { ...s };
        boundStep.validate = (k, c) => s.validate(k, c, boundStep);
        return boundStep;
      });
    },
    onComplete: (data, state) => {
      if (data.targetTime) {
        localStorage.setItem("punto4_turmuhr_zeit", data.targetTime);
        // Sicherheitshalber auch im State hinterlegen, falls andere Komponenten
        // sofort darauf zugreifen müssen
        // Logik-Hinweis: Hier könnte die Punto nun die Differenz zur internen Zeit
        // berechnen und die Turmuhr-Linie steuern.
        state.turmuhrZeit = data.targetTime;
        return `TURMUHR AUF ${formatClockTime(data.targetTime)} GESETZT`;
      }
    },
  },
};
