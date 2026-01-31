// dateTimeHandler.js
import { StateManager } from "../stateManager.js";

const pad = (n) => String(n).padStart(2, "0");

export const DateTimeHandler = {
  MAX_LENGTH: 10,

  start(state) {
    if (!state.dateTimeEdit) {
      state.dateTimeEdit = { digits: "", cursor: 0 };
    }

    const date = new Date(Date.now() + (state.timeOffset || 0));

    state.dateTimeEdit.digits =
      pad(date.getDate()) +
      pad(date.getMonth() + 1) +
      pad(date.getFullYear() % 100) +
      pad(date.getHours()) +
      pad(date.getMinutes());

    state.dateTimeEdit.cursor = 0; // Absolute Initialisierung
    state.dateTimeEditMode = true;
  },

  handle(state, k, KEYS) {
    let digitsArr = state.dateTimeEdit.digits.split("");
    const cursor = state.dateTimeEdit.cursor;

    // --- ZIFFERN-EINGABE (0-9) ---
    if (/^[0-9]$/.test(k)) {
      digitsArr[cursor] = k;
      state.dateTimeEdit.digits = digitsArr.join("");

      if (state.dateTimeEdit.cursor < this.MAX_LENGTH - 1) {
        state.dateTimeEdit.cursor++;
      }
    }

    // --- WERTE ÄNDERN (+ / -) ---
    else if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      let val = parseInt(digitsArr[cursor]);
      const delta = KEYS.UP.includes(k) ? 1 : -1;
      let nextVal = (val + delta + 10) % 10;
      digitsArr[cursor] = String(nextVal);
      state.dateTimeEdit.digits = digitsArr.join("");
    }

    // --- CURSORSTEUERUNG & BESTÄTIGUNG ---
    else if (k === KEYS.ENTER) {
      if (state.dateTimeEdit.cursor < this.MAX_LENGTH - 1) {
        state.dateTimeEdit.cursor++;
      } else {
        this.commit(state);
        this.exit(state); // Nutze eine dedizierte Exit-Funktion
      }
    } else if (k === KEYS.BACKSPACE) {
      if (state.dateTimeEdit.cursor > 0) {
        state.dateTimeEdit.cursor--;
      }
    } else if (k === KEYS.ESC) {
      this.exit(state); // Nutze eine dedizierte Exit-Funktion
    }
  },

  /**
   * Beendet den Modus und setzt den Cursor für das nächste Mal sauber zurück
   */
  exit(state) {
    state.dateTimeEdit.cursor = 0;
    state.dateTimeEditMode = false;
  },

  commit(state) {
    const d = state.dateTimeEdit.digits;
    const day = parseInt(d.slice(0, 2));
    const month = parseInt(d.slice(2, 4)) - 1;
    const year = 2000 + parseInt(d.slice(4, 6));
    const hour = parseInt(d.slice(6, 8));
    const minute = parseInt(d.slice(8, 10));

    const newDate = new Date(year, month, day, hour, minute);
    const now = Date.now();

    if (!isNaN(newDate.getTime())) {
      state.timeOffset = newDate.getTime() - now;
      localStorage.setItem("punto4_timeOffset", state.timeOffset);
    }
  },
};
