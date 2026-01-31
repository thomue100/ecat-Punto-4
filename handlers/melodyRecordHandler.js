// handlers/melodyRecordHandler.js
import { StateManager } from "../stateManager.js";
import { AudioPlayer } from "./audioHandler.js";

export const MelodyRecordHandler = {
  handle: (state, k, KEYS) => {
    const rd = state.recordData;

    // ESC bricht immer komplett ab -> zurück zum Hauptmenü
    if (k === KEYS.ESC) {
      state.melodyRecordMode = false;
      state.recordStep = "NUMBER";
      return;
    }

    // SCHRITT 1: NUMMERNEINGABE
    if (state.recordStep === "NUMBER") {
      if (/^[1-8]$/.test(k)) {
        rd.id = k;
        // Wichtig: Nach Tastendruck muss Renderer.render(state) aufgerufen werden,
        // das passiert normalerweise zentral im App-Controller/InputHandler.
      } else if (k === KEYS.ENTER && rd.id) {
        rd.remainingHits = 508;
        rd.startTime = Date.now();
        rd.currentPart = 0;
        rd.parts = [{ events: [] }];
        state.recordStep = "RECORD";
      }
    }

    // SCHRITT 2: AUFNAHME
    // SCHRITT 2: AUFNAHME
    else if (state.recordStep === "RECORD") {
      // ENTER beendet die Aufnahme und führt zur Bestätigung
      if (k === KEYS.ENTER) {
        state.recordStep = "CONFIRM";
      }

      // SecFunc teilt die Melodie in maximal zwei Parts (z.B. für Vorläuten)
      else if (k === "SecFunc" && rd.currentPart === 0) {
        rd.currentPart = 1;
        rd.parts.push({ events: [] });

        // Visuelles Feedback für die S.F. Taste (LED-Simulation)
        const btn = document.querySelector(`button[data-key="SecFunc"]`);
        if (btn) {
          btn.classList.add("active-led");
          setTimeout(() => btn.classList.remove("active-led"), 150);
        }
      }

      // Funktionstasten F1-F4 lösen den Sound aus und speichern das Event
      else if (["F1", "F2", "F3", "F4"].includes(k)) {
        if (rd.remainingHits > 0) {
          // 1. Glockensound sofort abspielen
          AudioPlayer.playSingle(k);

          // 2. Event im aktuellen Part aufzeichnen
          rd.parts[rd.currentPart].events.push({
            key: k,
            timestamp: Date.now() - rd.startTime,
          });

          // 3. Kapazität verringern
          rd.remainingHits--;

          // Automatisch zum Speichern, wenn Speicher voll (508 Schläge)
          if (rd.remainingHits === 0) state.recordStep = "CONFIRM";
        }
      }
    }

    // SCHRITT 3: SPEICHERN BESTÄTIGEN
    else if (state.recordStep === "CONFIRM") {
      if (k === "1") {
        const id = rd.id; // Die ID (1-8), die am Anfang gewählt wurde

        // Wir behalten den Namen bei, aktualisieren aber die Noten (parts)
        state.melodies[id].parts = rd.parts;
        state.melodies[id].duration = Date.now() - rd.startTime;

        // Permanent im LocalStorage sichern
        StateManager.saveMelodies(state.melodies);

        state.melodyRecordMode = false;
        state.recordStep = "NUMBER";
      } else if (k !== undefined) {
        // JEDE andere Taste (außer Enter-Release) führt zurück zur Nummernwahl
        state.recordStep = "NUMBER";
        rd.id = null;
      }
    }
  },
};
