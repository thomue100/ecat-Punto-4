// js/programStepsConfig.js

// --- WIEDERVERWENDBARE SCHRITTBLÖCKE (NEU) ---

/**
 * Erzeugt die Konfiguration für eine Zeit-/Stundeneingabe im HHMM-Format.
 * @param {string} key - Der Schlüssel (z.B. "Beginn", "Ende")
 * @param {string} line1Prefix - Der Präfix für die erste Zeile (z.B. "W1 BEGINNSTUN.")
 * @returns {object} Die Konfiguration des Programmschritts
 */
const TIME_INPUT_STEP = (key, line1Prefix) => ({
    key: key,
    line1: `${line1Prefix}:__:__`,
    line2: "00:MM-FORMAT",
    validator: (input) => /^\d{0,4}$/.test(input),
    maxLength: 4,
    formatter: (input) => {
        let raw = input.padEnd(4, '_');
        // Original-Logik zur Formatierung beibehalten
        return raw.replace(/^(\d{2})(\d{0,2})/, (match, h, m) => {
            if (m === '__') return `${h}:__`;
            if (m.length === 1) return `${h}:${m}_`;
            if (m.length === 2) return `${h}:${m}`;
            return `${h}:${m}`; s
        });
    },
});

/**
 * Die Konfiguration für die Tagesauswahl.
 */
const DAYS_INPUT_STEP = {
    key: "Tage",
    line2: "1-MON...7 - SON 0-ALLE ",
    validator: (input) => /^\d{0,1}$/.test(input) && (input === "" || (parseInt(input) >= 0 && parseInt(input) <= 7)),
    maxLength: 1,
    defaultValue: "0",
    isFinal: true
};

// --- KOMPLETTE PROGRAMME ---

export const PROGRAM_STEPS_CONFIG = {
    // Standard-Ablauf für WOECHENTLICH, PERIODISCH, BESONDERE, ZYKLISCH, UNTERDRUECKEN
    STUNDENSCHLAGEN: [
        {
            key: "Dauer",
            // {Nr} dient als Platzhalter für "W1", "W2" etc.
            line1: "{Nr} DAUER:__sek",
            line2: "0 FUER ANFANG-ENDE",
            validator: (input) => /^\d{0,2}$/.test(input),
            maxLength: 2,
            defaultValue: "00",
            // Bedingung für den nächsten Schritt
            nextStepIfZero: "Ende",
            nextStepIfNonZero: "Beginn"
        },
        { ...TIME_INPUT_STEP("Beginn", "{Nr} BEGINNSTUN."), nextStep: "Ende" },
        { ...TIME_INPUT_STEP("Ende", "{Nr} ENDESTUNDE:"), nextStep: "Tage" },
        { ...DAYS_INPUT_STEP, line1: "{Nr} ETAG:_" }
    ],

    // HIER KÖNNTEN SIE ZUKÜNFTIG ANDERE PROGRAMME MIT WIEDERVERWENDBAREN BLÖCKEN HINZUFÜGEN
    // z.B. GLOCKEN: [ { ...TIME_INPUT_STEP(...) }, { ...DAYS_INPUT_STEP } ]
};