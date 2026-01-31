import { menuData } from "./menuData.js";

export const StateManager = {
  initialState: {
    isLoggedIn: false,
    loginInput: "",
    stack: [menuData[0]],
    index: 0,
    activeFlow: null,
    flowData: {},
    flowStepIdx: 0,
    currentInput: "",
    dateTimeEditMode: false,
    dateTimeEdit: (() => {
      const offset = parseInt(localStorage.getItem("punto4_timeOffset")) || 0;
      const date = new Date(Date.now() + offset);
      const pad = (n) => n.toString().padStart(2, "0");
      return {
        digits:
          pad(date.getDate()) +
          pad(date.getMonth() + 1) +
          pad(date.getFullYear() % 100) +
          pad(date.getHours()) +
          pad(date.getMinutes()),
        cursor: 0,
      };
    })(),
    deleteMode: false,
    deleteList: [],
    deleteIdx: 0,
    readMode: false,
    readList: [],
    readIdx: 0,
    readDetailStep: 0,
    secFuncActive: false,
    melodyEditMode: false,
    melodyEditStep: "SELECT",
    melodyIdx: 0,
    melodyCursor: 0,
    timeOffset: parseInt(localStorage.getItem("punto4_timeOffset")) || 0,
    turmuhrZeit: localStorage.getItem("punto4_turmuhr_zeit") || "0000",
    melodyNames:
      JSON.parse(localStorage.getItem("punto4_melodies")) ||
      Array.from({ length: 8 }, (_, i) => `MEL${i + 1}`.padEnd(10, "_")),
    melodyRecordMode: false,
    recordStep: "NUMBER",
    recordData: {
      id: null,
      remainingHits: 508,
      startTime: null,
      currentPart: 0,
      parts: [{ events: [] }],
    },
    // Die zentrale Datenbank für alle Melodien
    melodies: JSON.parse(localStorage.getItem("punto4_melodies_data")) || {
      1: { id: "1", name: "MEL1______", parts: [] },
      2: { id: "2", name: "MEL2______", parts: [] },
      3: { id: "3", name: "MEL3______", parts: [] },
      4: { id: "4", name: "MEL4______", parts: [] },
      5: { id: "5", name: "MEL5______", parts: [] },
      6: { id: "6", name: "MEL6______", parts: [] },
      7: { id: "7", name: "MEL7______", parts: [] },
      8: { id: "8", name: "MEL8______", parts: [] },
    },
    secondaryEditMode: false,
    secondaryTime: localStorage.getItem("punto4_secondary_time") || "0000",
    secondaryEdit: {
      digits: "0000", // Initialwert (Stunde:Minute)
      cursor: 0, // Startposition des Cursors
    },
    summerTime: {
      modeIdx: parseInt(localStorage.getItem("punto4_summerTimeMode")) || 0,

      // FESTES DATUM aufgeteilt
      ws: (localStorage.getItem("punto4_summerTimeDates") || "00000000").slice(
        0,
        4,
      ),
      sw: (localStorage.getItem("punto4_summerTimeDates") || "00000000").slice(
        4,
        8,
      ),

      cursor: 0,
    },
    summerTimeEditMode: false,
    summerTimeEditStep: "SELECT",
  },

  saveMelodies(melodies) {
    localStorage.setItem("punto4_melodies_data", JSON.stringify(melodies));
  },

  saveTimeOffset(offset) {
    localStorage.setItem("punto4_timeOffset", offset);
  },
};
