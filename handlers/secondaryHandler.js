// secondaryHandler.js
const pad = (n) => String(n).padStart(2, "0");

export const SecondaryHandler = {
  // Format: HH MM (4 Ziffern für STUNDE : MINUTEN)
  MAX_LENGTH: 4,

  start(state) {
    if (!state.secondaryEdit) {
      state.secondaryEdit = { digits: "0000", cursor: 0 };
    }

    // Die Anleitung sagt "ohne die öffentliche Zeit zu berücksichtigen"
    // Wir starten daher meist bei 00:00 oder dem zuletzt gespeicherten Wert
    state.secondaryEdit.cursor = 0;
    state.secondaryEditMode = true;
  },

  handle(state, k, KEYS) {
    let digitsArr = state.secondaryEdit.digits.split("");
    const cursor = state.secondaryEdit.cursor;

    // --- DIREKTE ZIFFERN-EINGABE (0-9) ---
    if (/^[0-9]$/.test(k)) {
      digitsArr[cursor] = k;
      state.secondaryEdit.digits = digitsArr.join("");

      if (state.secondaryEdit.cursor < this.MAX_LENGTH - 1) {
        state.secondaryEdit.cursor++;
      }
    }

    // --- WERTE ÄNDERN (+ / -) ---
    else if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      let val = parseInt(digitsArr[cursor]);
      const delta = KEYS.UP.includes(k) ? 1 : -1;
      let nextVal = (val + delta + 10) % 10;
      digitsArr[cursor] = String(nextVal);
      state.secondaryEdit.digits = digitsArr.join("");
    }

    // --- NAVIGATION & SPEICHERN ---
    else if (k === KEYS.ENTER) {
      if (state.secondaryEdit.cursor < this.MAX_LENGTH - 1) {
        state.secondaryEdit.cursor++;
      } else {
        this.commit(state);
        this.exit(state);
      }
    } else if (k === KEYS.BACKSPACE) {
      if (state.secondaryEdit.cursor > 0) {
        state.secondaryEdit.cursor--;
      }
    } else if (k === KEYS.ESC) {
      this.exit(state);
    }
  },

  exit(state) {
    state.secondaryEdit.cursor = 0;
    state.secondaryEditMode = false;
  },

  /**
   * Speichert die "Sekundaere" Zeit.
   * Da diese laut Anleitung "ohne öffentliche Zeit" existiert,
   * speichern wir sie als eigenen Wert im LocalStorage.
   */
  commit(state) {
    const d = state.secondaryEdit.digits;
    const hour = d.slice(0, 2);
    const minute = d.slice(2, 4);

    const secondaryTime = `${hour}:${minute}`;

    // Speichern unter eigenem Key, da es nicht den globalen Zeit-Offset betrifft
    state.secondaryTime = secondaryTime;
    localStorage.setItem("punto4_secondaryTime", secondaryTime);

    console.log("Sekundaere Zeit gesetzt auf:", secondaryTime);
  },
};
