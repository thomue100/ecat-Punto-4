import { flows } from "../flows.js";

export const MenuHandler = {
  handle(state, k, KEYS) {
    const items = state.stack[state.stack.length - 1].submenu || [];

    if (/^[0-9]$/.test(k)) {
      const target = k === "0" ? 9 : parseInt(k) - 1;
      if (target < items.length) state.index = target;
    } else if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      const delta = KEYS.UP.includes(k) ? 1 : -1;
      state.index = (state.index + delta + items.length) % items.length;
    } else if (k === KEYS.ESC) {
      state.stack.length > 1
        ? (state.stack.pop(), (state.index = 0))
        : (state.isLoggedIn = false);
    } else if (k === KEYS.ENTER) {
      this.handleSelection(state, items[state.index]);
    }
  },

  handleSelection(state, item) {
    if (item.submenu) {
      state.stack.push(item);
      state.index = 0;
    } else if (item.action === "START_PROGRAM_INPUT") {
      this.initProgramFlow(state, item);
    } else if (item.action === "READ_PROGRAM_FLOW") {
      const progs = JSON.parse(localStorage.getItem("punto4_programs") || "[]");
      state.readList = progs.filter((p) =>
        p.category.startsWith(item.configKey),
      );
      if (state.readList.length > 0) {
        state.readMode = true;
        state.readIdx = 0;
        state.readDetailStep = 0;
      }
    } else if (item.action === "DELETE_PROGRAM_FLOW") {
      const progs = JSON.parse(localStorage.getItem("punto4_programs") || "[]");
      state.deleteList = progs.filter((p) =>
        p.category.startsWith(item.configKey),
      );
      if (state.deleteList.length > 0) {
        state.deleteMode = true;
        state.deleteIdx = 0;
        state.readDetailStep = 0;
      }
    } else if (item.action === "START_MELODY_RECORD") {
      state.melodyRecordMode = true;
      state.recordStep = "NUMBER";
      state.recordData = {
        id: null,
        remainingHits: 508,
        startTime: null,
        currentPart: 0,
        parts: [{ events: [] }],
      };
      return; // Verhindert, dass die Standard-Logik greift
    }
    if (item.action === "CORRECT_CLOCK") {
      state.dateTimeEditMode = true;
    } else if (item.action === "SET_SUMMER_TIME") {
      // Sommerzeit-Editor aktivieren
      state.summerTimeEditMode = true;
      state.summerTime.modeIdx = 0;
      // 🟢 FSM-Startzustand
      state.summerTimeEditStep = "SELECT";

      // 🟢 Cursor sauber zurücksetzen
      state.summerTime.cursor = 0;
    } else if (item.action === "CORRECT_SECONDARY_TIME") {
      state.secondaryEditMode = true;
    } else if (item.action === "EDIT_MELODY_NAMES") {
      state.melodyEditMode = true;
    } else if (item.action === "DIRECT_COMMAND") {
      state.activeFlow = flows["DIRECT_COMMAND"];
      state.flowData = {
        type: item.configKey,
        label: item.displayName,
      };
      state.activeFlow.steps = state.activeFlow.getSteps(item.configKey);
      state.flowStepIdx = 0; // Sicherstellen, dass wir vorn anfangen

      // NEU: Initialwert laden (falls vorhanden)
      const firstStep = state.activeFlow.steps[0];
      if (firstStep && firstStep.getInitialValue) {
        state.currentInput = firstStep.getInitialValue(state);
      } else {
        state.currentInput = "";
      }
    }
  },

  // menuHandler.js

  initProgramFlow(state, item) {
    const existing = JSON.parse(
      localStorage.getItem("punto4_programs") || "[]",
    );
    if (existing.length >= 99) return alert("SPEICHER VOLL!");

    state.activeFlow = flows["START_PROGRAM_INPUT"];

    // Extrahiere den ersten Buchstaben (W, P, B, Z oder U)
    const categoryLetter = item.configKey.charAt(0).toUpperCase();

    // ÄNDERUNG: Filtert nun nach dem Anfangsbuchstaben der Kategorie,
    // statt nach dem vollen configKey (W_GLOCKEN etc.)
    const sameCat = existing.filter((p) =>
      p.category.startsWith(categoryLetter),
    );

    state.flowData = {
      type: item.configKey,
      label: item.displayName,
      category: categoryLetter,
      // Erzeuge ID basierend auf der Gesamtanzahl dieser Hauptkategorie
      programId:
        categoryLetter + (sameCat.length + 1).toString().padStart(2, "0"),
    };

    state.activeFlow.steps = state.activeFlow.getSteps(item.configKey);
    state.flowStepIdx = 0;
    state.currentInput = "";
  },
};
