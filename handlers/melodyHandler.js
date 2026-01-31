import { StateManager } from "../stateManager.js";

export const MelodyHandler = {
  // Definierte Zeichenreihenfolge gemäß Anleitung: A–Z, 1–9, dann Sonderzeichen "-" und "_"
  CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789-_",
  MAX_LENGTH: 10,

  handle(state, k, KEYS) {
    if (state.melodyEditStep === "SELECT") {
      this.handleSelectionMode(state, k, KEYS);
    } else {
      this.handleEditMode(state, k, KEYS);
    }
  },

  // Schritt 2: Auswahl der Melodie (1 bis 8)
  handleSelectionMode(state, k, KEYS) {
    if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      // Mit „+“ und „–“ auswählen
      const delta = KEYS.UP.includes(k) ? 1 : -1;
      state.melodyIdx = (state.melodyIdx + delta + 8) % 8;
    } else if (k === KEYS.ENTER) {
      // Mit ENTER bestätigen -> Wechsel zu Schritt 3
      state.melodyEditStep = "EDIT";
      state.melodyCursor = 0; // Cursor positioniert sich automatisch auf das erste Zeichen
    } else if (k === KEYS.ESC) {
      state.melodyEditMode = false;
    }
  },

  // Schritt 3 & 4: Eingabe des Melodiennamens
  handleEditMode(state, k, KEYS) {
    // Die ID ist der Index + 1 (String "1" bis "8")
    const id = (state.melodyIdx + 1).toString();
    const currentMelody = state.melodies[id];

    // Sicherstellen, dass der Name existiert und 10 Zeichen hat
    let name = currentMelody.name || "";
    name = name.padEnd(this.MAX_LENGTH, "_");
    let nameArr = name.split("");

    // --- ZEICHENAUSWAHL (+ / -) ---
    if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      let char = nameArr[state.melodyCursor];
      let charIdx = this.CHARS.indexOf(char);

      // Ist das Feld "leer" (Standard _), wird 'A' (Index 0) vorgeschlagen
      if (charIdx === -1) charIdx = 0;

      const delta = KEYS.UP.includes(k) ? 1 : -1;
      const nextIdx = (charIdx + delta + this.CHARS.length) % this.CHARS.length;

      nameArr[state.melodyCursor] = this.CHARS[nextIdx];
      currentMelody.name = nameArr.join("");
    }

    // --- DIREKTE ZIFFERN-EINGABE (1-9) ---
    else if (/^[1-9]$/.test(k)) {
      nameArr[state.melodyCursor] = k;
      currentMelody.name = nameArr.join("");
    }

    // --- CURSORSTEUERUNG ---

    // ENTER: Cursor ein Zeichen nach rechts
    else if (k === KEYS.ENTER) {
      if (state.melodyCursor < this.MAX_LENGTH - 1) {
        state.melodyCursor++;
      } else {
        // Schritt 4: An der letzten Stelle mit ENTER bestätigen -> Speichern
        // Wir übergeben das gesamte melodies-Objekt an den StateManager
        StateManager.saveMelodies(state.melodies);
        state.melodyEditStep = "SELECT"; // Zurück zur Auswahl (Schritt 5)
      }
    }

    // RÜCKTASTE (BS): Cursor ein Zeichen nach links
    else if (k === KEYS.BACKSPACE) {
      if (state.melodyCursor > 0) {
        state.melodyCursor--;
      } else {
        // Wenn man am ersten Zeichen BS drückt: Zurück zur Auswahl (Schritt 5)
        state.melodyEditStep = "SELECT";
      }
    }

    // ESC: Programm jederzeit verlassen
    else if (k === KEYS.ESC) {
      // Änderungen verwerfen: Wir laden den Stand aus dem LocalStorage neu in den State
      const savedData = JSON.parse(
        localStorage.getItem("punto4_melodies_data"),
      );
      if (savedData) {
        state.melodies = savedData;
      }
      state.melodyEditStep = "SELECT";
      state.melodyEditMode = false;
    }
  },
  /*
  handleEditMode(state, k, KEYS) {
    let name = state.melodyNames[state.melodyIdx] || "";
    // Sicherstellen, dass der Name 10 Zeichen hat (mit Leerstellen/Unterstrichen aufgefüllt)
    name = name.padEnd(this.MAX_LENGTH, "_");
    let nameArr = name.split("");

    // --- ZEICHENAUSWAHL (+ / -) ---
    if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      let char = nameArr[state.melodyCursor];
      let charIdx = this.CHARS.indexOf(char);

      // Ist das Feld "leer" (Standard _), wird 'A' (Index 0) vorgeschlagen
      if (charIdx === -1) charIdx = 0;

      const delta = KEYS.UP.includes(k) ? 1 : -1;
      const nextIdx = (charIdx + delta + this.CHARS.length) % this.CHARS.length;

      nameArr[state.melodyCursor] = this.CHARS[nextIdx];
      state.melodyNames[state.melodyIdx] = nameArr.join("");
    }

    // --- DIREKTE ZIFFERN-EINGABE (1-9) ---
    else if (/^[1-9]$/.test(k)) {
      nameArr[state.melodyCursor] = k;
      state.melodyNames[state.melodyIdx] = nameArr.join("");
      // Optional: Cursor nach Direkteingabe eins weiter?
      // Die Anleitung sagt "alternativ direkt eingeben", meist bleibt man aber am Zeichen.
    }

    // --- CURSORSTEUERUNG ---

    // ENTER: Cursor ein Zeichen nach rechts
    else if (k === KEYS.ENTER) {
      if (state.melodyCursor < this.MAX_LENGTH - 1) {
        state.melodyCursor++;
      } else {
        // Schritt 4: An der letzten Stelle mit ENTER bestätigen -> Speichern
        StateManager.saveMelodies(state.melodyNames);
        state.melodyEditStep = "SELECT"; // Zurück zur Auswahl (Schritt 5)
      }
    }

    // RÜCKTASTE (BS): Cursor ein Zeichen nach links
    else if (k === KEYS.BACKSPACE) {
      if (state.melodyCursor > 0) {
        state.melodyCursor--;
      } else {
        // Wenn man am ersten Zeichen BS drückt: Zurück zur Auswahl (Schritt 5)
        state.melodyEditStep = "SELECT";
      }
    }

    // ESC: Programm jederzeit verlassen
    else if (k === KEYS.ESC) {
      // Änderungen verwerfen und laden
      state.melodyNames =
        JSON.parse(localStorage.getItem("punto4_melodies")) ||
        state.melodyNames;
      state.melodyEditStep = "SELECT";
      state.melodyEditMode = false;
    }
  },
  */
};
