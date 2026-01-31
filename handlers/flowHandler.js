import { Validators } from "../validators.js";
import { MenuHandler } from "./menuHandler.js";

export const FlowHandler = {
  handle(state, k, KEYS) {
    const step = state.activeFlow.steps[state.flowStepIdx];

    if (/^[0-9]$/.test(k)) {
      if (state.currentInput.length >= step.length) return;
      if (step.validate && !step.validate(k)) return;

      if (
        step.id === "selection" &&
        !Validators.isNumericSequenceValid(state.currentInput, k)
      )
        return;
      state.currentInput += k;
    } else if (k === KEYS.BACKSPACE) {
      if (state.currentInput.length > 0) {
        // Löscht das letzte Zeichen der aktuellen Eingabe
        state.currentInput = state.currentInput.slice(0, -1);
      } else if (state.flowStepIdx > 0) {
        // Suche den nächsten gültigen Schritt rückwärts
        let prevIdx = state.flowStepIdx - 1;
        while (prevIdx >= 0) {
          const prevStep = state.activeFlow.steps[prevIdx];
          // Prüfe, ob der Schritt angezeigt werden darf
          if (!prevStep.showIf || prevStep.showIf(state.flowData)) {
            state.flowStepIdx = prevIdx;
            // Lade den gespeicherten Wert zurück in die Eingabe
            state.currentInput = state.flowData[prevStep.id] || "";
            return; // Gültigen Schritt gefunden, Abbruch der Suche
          }
          prevIdx--;
        }
        // Falls kein gültiger Schritt davor gefunden wurde (Sicherheitsnetz)
        state.activeFlow = null;
      } else {
        // Wir sind am ersten Schritt und drücken Backspace -> Abbruch
        state.activeFlow = null;
      }
    } else if (k === KEYS.ENTER) {
      if (step.validate && !step.validate(undefined, state.currentInput)) {
        return;
      }
      this.completeStep(state, step);
    } else if (k === KEYS.ESC) {
      state.activeFlow = null;
      state.currentInput = "";
    }
  },

  completeStep(state, step) {
    if (step.validateLogic && !step.validateLogic(state.currentInput)) {
      state.currentInput = "";
      return;
    }

    const isTimeDate = [
      "startTime",
      "endTime",
      "startDate",
      "endDate",
      "targetTime",
    ].includes(step.id);
    if (isTimeDate && !Validators.isValidLogic(step.id, state.currentInput))
      return;
    if (
      step.id === "endTime" &&
      !Validators.isRangeValid(state.flowData.startTime, state.currentInput)
    )
      return;

    // 1. Wert im flowData Objekt speichern
    state.flowData[step.id] = state.currentInput;
    state.currentInput = "";

    // 2. DATEN-BEREINIGUNG:
    // Wenn die Dauer (duration) geändert wurde, prüfen wir, ob die Endzeit
    // laut showIf-Logik noch existieren darf.
    if (step.id === "duration") {
      const endTimeStep = state.activeFlow.steps.find(
        (s) => s.id === "endTime",
      );
      // Falls ein Endzeit-Schritt existiert, aber die Bedingung nun false ist
      if (
        endTimeStep &&
        endTimeStep.showIf &&
        !endTimeStep.showIf(state.flowData)
      ) {
        // Lösche eine eventuell zuvor eingegebene Endzeit aus dem Datensatz
        delete state.flowData.endTime;
      }
    }

    if (state.flowStepIdx === state.activeFlow.steps.length - 1) {
      state.activeFlow.onComplete(state.flowData, state);
      const isProg = !!state.flowData.programId;
      state.activeFlow = null;

      if (isProg) {
        const currentItem =
          state.stack[state.stack.length - 1].submenu[state.index];
        MenuHandler.handleSelection(state, currentItem);
      } else {
        state.stack = [state.stack[0]];
        state.index = 0;
      }
    } else {
      this.moveToNext(state, 1);
    }
  },

  moveToNext(state, dir) {
    state.flowStepIdx += dir;
    const next = state.activeFlow.steps[state.flowStepIdx];

    // Falls ein Schritt ein 'showIf' hat und dieses 'false' ergibt,
    // überspringe diesen Schritt in die gleiche Richtung (dir)
    if (next?.showIf && !next.showIf(state.flowData)) {
      this.moveToNext(state, dir);
    }
  },
};
