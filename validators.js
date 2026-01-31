// validators.js
export const Validators = {
  /**
   * Validiert Zeit (HHMM) und Datum (TTMM/TTMMJJ) auf logische Korrektheit.
   */
  isValidLogic: (id, val) => {
    // Prüfung für das Intervall (Z-Programme) 2 bis 99 Tage
    if (id === "interval") {
      if (val.length === 0) return true;
      const num = parseInt(val);
      if (val.length === 1) return true; // Erlaube Tippen der ersten Ziffer
      return num >= 2 && num <= 99; // Finale Prüfung bei 2 Stellen
    }

    // Prüfung für 6-stellige befristete Daten (TTMMJJ) oder Uhr-Berichtigung
    if (id === "limitDate" || id === "fullDate") {
      if (val.length !== 6) return true;
      const v1 = parseInt(val.substring(0, 2)); // Tag
      const v2 = parseInt(val.substring(2, 4)); // Monat
      const isMonthValid = v2 >= 1 && v2 <= 12;
      const isDayValid = v1 >= 1 && v1 <= 31;
      if ([4, 6, 9, 11].includes(v2) && v1 > 30) return false;
      if (v2 === 2 && v1 > 29) return false;
      return isMonthValid && isDayValid;
    }

    // Wir prüfen erst, wenn alle 4 Stellen eingegeben wurden
    if (val.length !== 4) return true;

    const v1 = parseInt(val.substring(0, 2));
    const v2 = parseInt(val.substring(2, 4));

    // Zeit-Validierung (HH:MM)
    if (["startTime", "endTime", "fullTime", "targetTime"].includes(id)) {
      return v1 >= 0 && v1 <= 23 && v2 >= 0 && v2 <= 59;
    }

    // Datums-Validierung (TT:MM)
    if (id === "startDate" || id === "endDate") {
      const isMonthValid = v2 >= 1 && v2 <= 12;
      const isDayValid = v1 >= 1 && v1 <= 31;

      if ([4, 6, 9, 11].includes(v2) && v1 > 30) return false;
      if (v2 === 2 && v1 > 29) return false;

      return isMonthValid && isDayValid;
    }
    return true;
  },

  /**
   * Prüft, ob der Endzeitpunkt/das Enddatum nach dem Start liegt.
   */
  isRangeValid: (start, end) => {
    if (!start || !end || start.length !== 4 || end.length !== 4) return true;

    const sDay = parseInt(start.substring(0, 2));
    const sMonth = parseInt(start.substring(2, 4));
    const eDay = parseInt(end.substring(0, 2));
    const eMonth = parseInt(end.substring(2, 4));

    if (sMonth !== eMonth) return eMonth > sMonth;
    return eDay >= sDay;
  },

  /**
   * Stellt sicher, dass die Eingabe für fest formatierte Felder vollständig ist.
   * NUTZT JETZT expectedLength, um ENTER zu blockieren.
   */
  isFormatComplete: (id, value, expectedLength) => {
    // Grundsätzlich muss etwas eingegeben worden sein
    if (!value || value.length === 0) return false;

    // 1. Auswahlfelder (Glocken, Melodien, Dienste)
    if (id === "selection") {
      return value.length > 0 && value.length <= expectedLength;
    }

    // 2. Dauer/Sekunden: Erlaubt auch eine einstellige "0" oder andere Werte < 2 Stellen
    if (id === "duration") {
      return value.length > 0 && value.length <= expectedLength;
    }

    // 3. Feste Formate (Zeit/Datum): Hier muss die Länge exakt stimmen
    if (expectedLength !== undefined) {
      return value.length === expectedLength;
    }

    // Fallback für IDs ohne explizite Template-Länge
    if (id === "limitDate" || id === "fullDate") return value.length === 6;
    if (id === "interval") return value.length === 2;

    const fixedFormat4 = [
      "startTime",
      "endTime",
      "startDate",
      "endDate",
      "fullTime",
      "targetTime",
    ];
    if (fixedFormat4.includes(id)) return value.length === 4;

    return value.length > 0;
  },

  /**
   * Behält die numerische Reihenfolge bei.
   */
  isNumericSequenceValid: (current, nextChar) => {
    if (current.length === 0) return true;
    const lastChar = current[current.length - 1];
    return parseInt(nextChar) > parseInt(lastChar);
  },
};
