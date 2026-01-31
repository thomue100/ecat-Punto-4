import { StateManager } from "./stateManager.js";
import { Renderer } from "./renderer.js";
import { FlowHandler } from "./handlers/flowHandler.js";
import { MenuHandler } from "./handlers/menuHandler.js";
import { ListHandler } from "./handlers/listHandler.js";
import { MelodyHandler } from "./handlers/melodyHandler.js";
import { MelodyRecordHandler } from "./handlers/melodyRecordHandler.js";
import { DateTimeHandler } from "./handlers/dateTimeHandler.js";
import { SecondaryHandler } from "./handlers/secondaryHandler.js";
import { SummerTimeHandler } from "./handlers/summerTimeHandler.js";
import { AudioPlayer } from "./handlers/audioHandler.js";
import { menuData } from "./menuData.js";

const App = (() => {
  const state = StateManager.initialState;

  const KEYS = {
    UP: ["+", "Plus", "ArrowUp"],
    DOWN: ["-", "Minus", "ArrowDown"],
    ENTER: "Enter",
    ESC: "Escape",
    BACKSPACE: "Backspace",
    HELP: "Help",
  };

  const processInput = (k) => {
    // --- GLOBALE HILFE-LOGIK ---
    // Reagiert immer auf die HELP-Taste, egal in welchem Modus

    if (k === KEYS.HELP) {
      state.showHelp = !state.showHelp;
      Renderer.render(state);
      return;
    }

    // Wenn die Hilfe angezeigt wird, schließt ESC die Hilfe
    if (state.showHelp) {
      if (k === KEYS.ESC) {
        state.showHelp = false;
        Renderer.render(state);
      }
      return; // Verhindert weitere Eingaben, solange Hilfe offen ist
    }

    // 1. Globale STOP-Funktion (reagiert immer)
    if (k === "Stop") {
      AudioPlayer.stop();
      // Alle Hand-LEDs ausschalten
      document
        .querySelectorAll(".hand-btn")
        .forEach((btn) => btn.classList.remove("active-led"));

      // Visuelles Feedback für Stop
      const stopBtn = document.querySelector(`button[data-key="Stop"]`);

      if (stopBtn) {
        stopBtn.classList.add("active-led");
        setTimeout(() => stopBtn.classList.remove("active-led"), 300);
      }
      return;
    }

    if (k.startsWith("H")) {
      const isActive = AudioPlayer.toggleHandBell(k);
      const btn = document.querySelector(`button[data-key="${k}"]`);
      if (btn) {
        isActive
          ? btn.classList.add("active-led")
          : btn.classList.remove("active-led");
      }
    }

    // --- SecFunc Umschalt-Logik ---
    // In inputHandler.js innerhalb von processInput(k)

    // --- SecFunc Umschalt-Logik ---
    if (k === "SecFunc") {
      // Toggle: Wenn schon aktiv, dann ausschalten, sonst einschalten
      state.secFuncActive = !state.secFuncActive;

      if (state.secFuncActive) {
        AudioPlayer.triggerVisualFeedback("SecFunc", 500);
      }
      Renderer.render(state); // Wichtig für visuelles Update
      return;
    }

    // Wenn SecFunc aktiv ist, erzwingen wir ein enges Korsett an Möglichkeiten
    if (state.secFuncActive) {
      // 1. ESC bricht ab
      if (k === KEYS.ESC) {
        state.secFuncActive = false;
        Renderer.render(state);
        return;
      }

      // 2. HELP bleibt erlaubt (wird oben im Code bereits global abgehandelt)

      // 3. Melodie-Tasten 5-8
      if (/^[5-8]$/.test(k)) {
        state.secFuncActive = false;
        const melody = state.melodies[k];
        AudioPlayer.playMelody(melody, k);
        Renderer.render(state);
        return;
      }

      // 4. Alle anderen Tasten ignorieren, solange SecFunc aktiv ist
      return;
    }

    // 1. Login Modus
    if (!state.isLoggedIn) {
      if (/^[0-9]$/.test(k)) {
        if (state.loginInput.length < 4) {
          state.loginInput += k;
        }
      } else if (k === "Backspace") {
        state.loginInput = state.loginInput.slice(0, -1);
      } else if (k === KEYS.ENTER) {
        if (state.loginInput === "123") {
          state.isLoggedIn = true;
          state.loginInput = "";
          // --- RESET DER NAVIGATION ---
          state.stack = [menuData[0]]; // Zurück zum Hauptmenü-Root
          state.index = 0; // Erster Eintrag
        } else {
          state.loginInput = ""; // Reset bei falschem Code
        }
      }
    }
    // 2. Aktive Modi Routing (nur wenn eingeloggt und Hilfe aus)
    else if (state.dateTimeEditMode) DateTimeHandler.handle(state, k, KEYS);
    else if (state.summerTimeEditMode) SummerTimeHandler.handle(state, k, KEYS);
    else if (state.secondaryEditMode) SecondaryHandler.handle(state, k, KEYS);
    else if (state.melodyEditMode) MelodyHandler.handle(state, k, KEYS);
    else if (state.activeFlow) FlowHandler.handle(state, k, KEYS);
    else if (state.melodyRecordMode) MelodyRecordHandler.handle(state, k, KEYS);
    else if (state.deleteMode) ListHandler.handleDelete(state, k, KEYS);
    else if (state.readMode) ListHandler.handleRead(state, k, KEYS);
    else if (state.stack.length === 1 && /^F[1-4]$/.test(k)) {
      const melodyId = k.slice(1); // Extrahiert "1" aus "F1"
      const melody = state.melodies[melodyId];

      if (melody && melody.parts && melody.parts[0].events.length > 0) {
        AudioPlayer.playMelody(melody);

        // Visuelles Feedback für die Taste
        const btn = document.querySelector(`button[data-key="${k}"]`);
        if (btn) {
          btn.classList.add("active-led");
          setTimeout(() => btn.classList.remove("active-led"), 500);
        }
      }
    } else MenuHandler.handle(state, k, KEYS);

    Renderer.render(state);
  };

  // Event-Binding
  // Überwacht nun das gesamte Dokument, um Keypad UND Funktionstasten zu erfassen
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-key]");
    if (btn) {
      const key = btn.dataset.key;
      processInput(key);

      // Visuelles Feedback (LED) nur während der Aufnahme triggern
      if (state.melodyRecordMode && state.recordStep === "RECORD") {
        if (["F1", "F2", "F3", "F4", "SecFunc"].includes(key)) {
          btn.classList.add("active-led");
          setTimeout(() => btn.classList.remove("active-led"), 150);
        }
      }
    }
  });

  // Herzschlag für Uhrzeit-Update im Login
  setInterval(() => {
    // Rendert automatisch jede Sekunde neu, wenn im Login ODER im Aufnahmemodus
    if (!state.isLoggedIn || state.melodyRecordMode) {
      Renderer.render(state);
    }
  }, 1000);

  // Event für das Schließkreuz
  document.getElementById("closeHelp").addEventListener("click", () => {
    state.showHelp = false;
    Renderer.render(state);
  });

  const toggleDebug = () => {
    const overlay = document.getElementById("debugOverlay");
    const isHidden = overlay.classList.toggle("hidden");

    if (!isHidden) {
      updateDebugInfo();
    }
  };

  // Funktion zur Erzeugung der ausklappbaren Baumstruktur
  const createTree = (data) => {
    const container = document.createElement("ul");
    container.className = "debug-tree";

    for (const key in data) {
      const item = document.createElement("li");
      item.className = "debug-item";

      const val = data[key];
      const isObject = val !== null && typeof val === "object";

      const keySpan = document.createElement("span");
      keySpan.className = "debug-key";
      keySpan.textContent = key;

      if (isObject) {
        keySpan.onclick = () => item.classList.toggle("open");
        const children = createTree(val);
        children.className = "debug-children";
        item.appendChild(keySpan);
        item.appendChild(children);
      } else {
        keySpan.classList.add("no-arrow"); // CSS: content: none für ::before
        const valSpan = document.createElement("span");
        valSpan.className = `debug-value type-${typeof val}`;
        valSpan.textContent = `: ${val}`;
        item.appendChild(keySpan);
        item.appendChild(valSpan);
      }
      container.appendChild(item);
    }
    return container;
  };

  // Update der updateDebugInfo Funktion
  const updateDebugInfo = () => {
    const storageContainer = document.getElementById("storageData");
    storageContainer.innerHTML = ""; // Leeren

    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        // Versuchen, JSON zu parsen, falls es ein Objekt ist
        allData[key] = JSON.parse(localStorage.getItem(key));
      } catch (e) {
        allData[key] = localStorage.getItem(key);
      }
    }

    if (Object.keys(allData).length === 0) {
      storageContainer.textContent = "Keine Daten vorhanden.";
    } else {
      storageContainer.appendChild(createTree(allData));
    }

    // Hier könnte man den Glocken-Status aktualisieren
    //renderBellStatus();
  };

  // Event-Listener hinzufügen
  document.getElementById("toggleDebug").addEventListener("click", toggleDebug);
  document.getElementById("closeDebug").addEventListener("click", toggleDebug);
})();
