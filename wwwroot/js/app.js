// js/app.js

import {
    handleInput,
    playNoteForKey,
    toggleLedAndState,
    handleStopButton
} from './inputHandler.js'; // Import der Logik
import { renderDisplay, renderStatusOverlay } from './renderer.js'; // Import der Darstellung
import { getData, STATES } from './stateManager.js'; // Import der Zustandsdaten

// =====================================================================
// 1. EVENT-LISTENER
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.key-btn, .f-key-btn, #stop-btn').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.key;
            const data = getData(); // Aktuelle Daten holen

            // --- GLOBALE STOP-LOGIK ---
            if (key === 'STOP') {
                handleStopButton(button);
                return;
            }

            // --- SPERRLOGIK ---
            if (data.currentState === STATES.LOCKED_CODE_INPUT) {
                const restrictedKeys = ['F1', 'F2', 'F3', 'F4', 'HAND1', 'HAND2', 'HAND3', 'HAND4'];
                if (restrictedKeys.includes(key)) {
                    const displayScreen = document.getElementById('display-screen');
                    displayScreen.innerHTML = `<div class="display-line selected">ZUGRIFF VERWEIGERT</div><div class="display-line">CODE EINGEBEN</div>`;
                    // Temporären Zustand nutzen, um die Meldung anzuzeigen
                    const originalState = data.currentState;
                    // Zustand wird von handleInput/handleStopButton wiederhergestellt
                    setTimeout(() => {
                        if (getData().currentState === STATES.ACTION_PENDING) {
                            // Stellen Sie sicher, dass wir nur den Zustand setzen, wenn er nicht durch STOP geändert wurde
                            // Dies ist in der ursprünglichen Logik der app.js bereits abgedeckt, hier halten wir es knapp.
                            renderDisplay();
                        }
                    }, 1000);
                    return;
                }
            }


            // LED-Logik (F- und HAND-Tasten)
            if (key.startsWith('F')) {
                playNoteForKey(key, button, data.secFuncActive);
            }
            if (key.startsWith('HAND')) {
                toggleLedAndState(button);
            }

            // --- ZENTRALE EINGABEVERARBEITUNG ---
            handleInput(key);

        });
    });

    // =====================================================================
    // 2. INITIALISIERUNG UND RENDER-LOOP
    // =====================================================================

    function mainRenderLoop() {
        renderDisplay();
        renderStatusOverlay();
    }

    // Startet den Render-Loop (aktualisiert Uhrzeit, Status etc.)
    setInterval(mainRenderLoop, 1000);

    // Initiales Rendering
    mainRenderLoop();
});