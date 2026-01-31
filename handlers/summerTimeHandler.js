// summerTimeHandler.js
export const SummerTimeHandler = {
  handle(state, k, KEYS) {
    // 1) AUSWAHL-MODUS (1/4 bis 4/4)
    if (state.summerTimeEditStep === "SELECT") {
      if (KEYS.UP.includes(k)) {
        state.summerTime.modeIdx = (state.summerTime.modeIdx + 1) % 4;
        return;
      }
      if (KEYS.DOWN.includes(k)) {
        state.summerTime.modeIdx = (state.summerTime.modeIdx + 3) % 4;
        return;
      }

      if (k === KEYS.ENTER) {
        if (state.summerTime.modeIdx < 3) {
          // Speichern für 1-3
          localStorage.setItem(
            "punto4_summerTimeMode",
            state.summerTime.modeIdx,
          );
          this.exit(state);
        } else {
          // Modus 4: Wechsel in Datums-Eingabe
          state.summerTimeEditStep = "DATE_WS";
          state.summerTime.cursor = 0;
        }
        return;
      }

      if (k === KEYS.ESC) {
        this.exit(state);
        return;
      }
    }

    // 2) DATUMS-EINGABE (W/S und S/W)
    if (
      state.summerTimeEditStep === "DATE_WS" ||
      state.summerTimeEditStep === "DATE_SW"
    ) {
      const isWS = state.summerTimeEditStep === "DATE_WS";
      let digits = (isWS ? state.summerTime.ws : state.summerTime.sw).split("");
      const c = state.summerTime.cursor;

      if (/^[0-9]$/.test(k)) {
        digits[c] = k;
        if (isWS) state.summerTime.ws = digits.join("");
        else state.summerTime.sw = digits.join("");

        if (c < 3) state.summerTime.cursor++;
        return;
      }

      if (k === KEYS.ENTER) {
        if (c < 3) {
          state.summerTime.cursor++;
        } else if (isWS) {
          // Von W/S zu S/W springen
          state.summerTimeEditStep = "DATE_SW";
          state.summerTime.cursor = 0;
        } else {
          // Am Ende von S/W: Alles speichern und raus
          localStorage.setItem("punto4_summerTimeMode", 3);
          localStorage.setItem(
            "punto4_summerTimeDates",
            state.summerTime.ws + state.summerTime.sw,
          );
          this.exit(state);
        }
        return;
      }

      // BACKSPACE Logik
      if (k === KEYS.BACKSPACE) {
        if (state.summerTime.cursor > 0) {
          // Normales Zurücklöschen innerhalb einer Zeile
          state.summerTime.cursor--;
        } else if (state.summerTimeEditStep === "DATE_SW") {
          // Von der ersten Ziffer der zweiten Zeile zurück in die erste Zeile springen
          state.summerTimeEditStep = "DATE_WS";
          state.summerTime.cursor = 3; // Letzte Ziffer der ersten Zeile
        }
        // Wenn wir in DATE_WS bei Cursor 0 sind, passiert nichts (wie gewünscht)
        return;
      }

      if (k === KEYS.ESC) {
        state.summerTimeEditStep = "SELECT"; // Zurück zur Auswahl 1/4-4/4
        state.summerTime.cursor = 0;
        return;
      }
    }
  },

  exit(state) {
    state.summerTimeEditMode = false;
    state.summerTimeEditStep = "SELECT";
    // Hier ist der Trick: Wir müssen nichts am Stack tun,
    // da wir das Untermenü in menuData entfernt haben.
  },
};
