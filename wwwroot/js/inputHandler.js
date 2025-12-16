// js/inputHandler.js

import {
    getData,
    setCurrentState,
    setCurrentIndex,
    setCurrentCodeInput,
    setCurrentInput,
    setProgramStepIndex,
    setProgramSteps,
    resetProgramData,
    setProgramDataValue,
    pushProgram,
    resetPath,
    pushPath,
    popPath,
    setSystemStateBell,
    setSystemStateAutomation,
    resetAllState,
    STATES,
    setSecFuncActive
} from './stateManager.js';
import { renderDisplay, renderStatusOverlay } from './renderer.js';
import { PROGRAM_STEPS_CONFIG } from './programStepsConfig.js'; // Wird für die Step-Konfig benötigt

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// =====================================================================
// HILFSFUNKTIONEN FÜR MENÜNAVIGATION
// =====================================================================

/**
 * Gibt das Array der Menüpunkte auf der aktuellen Ebene zurück.
 */
export function getCurrentMenu(data) {
    let menu = data.menuData[0].submenu;

    for (const index of data.currentPath) {
        const item = typeof menu[index] === 'string' ? {
            name: menu[index],
            displayName: menu[index]
        } : menu[index];
        if (item && item.submenu) {
            menu = item.submenu;
        } else {
            return [];
        }
    }

    return menu.map(item => {
        if (typeof item === 'string') {
            return { name: item, displayName: item };
        }
        return { ...item, displayName: item.displayName || item.name };
    });
}

/**
 * Gibt den Anzeigenamen des aktuellen Menüs zurück (für die Kopfzeile).
 */
export function getCurrentMenuName(data) {
    if (data.currentPath.length === 0) {
        return data.menuData[0].name;
    }

    let currentMenuItems = data.menuData[0].submenu;
    let menuTitle = data.menuData[0].name;

    for (let i = 0; i < data.currentPath.length; i++) {
        const index = data.currentPath[i];
        const selectedItem = typeof currentMenuItems[index] === 'string'
            ? { name: currentMenuItems[index], displayName: currentMenuItems[index] }
            : currentMenuItems[index];

        menuTitle = selectedItem.displayName || selectedItem.name;

        if (selectedItem && selectedItem.submenu) {
            currentMenuItems = selectedItem.submenu;
        } else {
            break;
        }
    }
    return menuTitle;
}

/**
 * Gibt die Konfiguration des aktuellen Programmschritts zurück.
 */
export function getProgramStepConfig(data) {
    return data.programSteps[data.programStepIndex];
}


// =====================================================================
// COMMANDS (Aktionen für Menüpunkte)
// =====================================================================

const COMMANDS = {
    // NEU: Generische Funktion für alle Programmdialoge (ersetzt STUNDENSCHLAGEN)
    START_PROGRAM_INPUT: (selectedItem) => {
        // Der Schlüssel für die Programmschritte wird aus dem Menüpunkt gelesen (z.B. "STUNDENSCHLAGEN")
        const configKey = selectedItem.configKey;

        if (!configKey || !PROGRAM_STEPS_CONFIG[configKey]) {
            console.error(`ERROR: Program step config not found for key: ${configKey}`);
            return;
        }

        const data = getData();
        pushPath(data.currentIndex);
        setProgramStepIndex(0);
        setCurrentInput("");
        resetProgramData();
        // Dynamische Zuweisung der Programmschritte basierend auf configKey
        setProgramSteps(PROGRAM_STEPS_CONFIG[configKey]);
        setCurrentState(STATES.PROGRAM_INPUT);
    },

    GENERIC_ACTION: (selectedItem) => {
        const displayScreen = document.getElementById('display-screen');
        displayScreen.innerHTML = `<div class="display-line selected">AKTION: ${selectedItem.name}</div><div class="display-line">  WIRD AUSGEFÜHRT...</div>`;
        setCurrentState(STATES.ACTION_PENDING);

        setTimeout(() => {
            if (getData().currentPath.length > 0) {
                setCurrentState(STATES.MENU_BROWSE);
            } else {
                setCurrentState(STATES.IDLE_UNLOCKED);
            }
            renderDisplay();
        }, 1500);
    }
};

function actionDispatcher(selectedItem) {
    if (selectedItem && selectedItem.action) {
        const command = COMMANDS[selectedItem.action];
        if (command) {
            command(selectedItem);
            renderDisplay(); // Nach Zustandswechsel neu rendern
            return true;
        }
    }
    return false;
}

// =====================================================================
// HAUPTVERARBEITUNG DER EINGABE
// =====================================================================

export function handleInput(key) {
    const data = getData();

    // 1. ZUSTAND: LOCKED_CODE_INPUT
    if (data.currentState === STATES.LOCKED_CODE_INPUT) {
        const isDigit = !isNaN(parseInt(key)) && key.length === 1;

        if (isDigit && data.currentCodeInput.length < data.correctCode.length) {
            setCurrentCodeInput(data.currentCodeInput + key);
        } else if (key === 'ENTER') {
            if (data.currentCodeInput === data.correctCode) {
                // KORREKTES PASSWORT
                setCurrentCodeInput("");
                const displayScreen = document.getElementById('display-screen');
                displayScreen.innerHTML = `<div class="display-line selected">CODE AKZEPTIERT</div><div class="display-line">  HAUPTMENU START</div>`;
                setCurrentState(STATES.ACTION_PENDING);

                setTimeout(() => {
                    setCurrentState(STATES.MENU_BROWSE);
                    resetPath();
                    setCurrentIndex(0);
                    renderDisplay();
                }, 1000);

            } else {
                // FALSCHES PASSWORT
                const displayScreen = document.getElementById('display-screen');
                displayScreen.innerHTML = `<div class="display-line selected">FEHLER: CODE FALSCH</div><div class="display-line">WIEDERHOLEN</div>`;
                setCurrentCodeInput("");
                setCurrentState(STATES.ACTION_PENDING);
                setTimeout(() => {
                    setCurrentState(STATES.LOCKED_CODE_INPUT);
                    renderDisplay();
                }, 1000);
            }
        } else if (key === 'ESC' || key === 'ARROW_LEFT') {
            setCurrentCodeInput(data.currentCodeInput.slice(0, -1));
        }
        renderDisplay();
        return;
    }

    // 2. ZUSTAND: PROGRAM_INPUT
    if (data.currentState === STATES.PROGRAM_INPUT) {
        const step = getProgramStepConfig(data);

        // ESC bricht ab/beendet
        if (key === 'ESC') {
            if (!step || step.isFinal) {
                setProgramStepIndex(0);
                setCurrentInput("");
                setCurrentIndex(popPath());
                setCurrentState(STATES.MENU_BROWSE);
                renderDisplay();
                return;
            }
        }

        if (!step) return; // Nach Abschlussmeldung nur ESC erlaubt (s.o.)

        const isDigit = !isNaN(parseInt(key)) && key.length === 1;
        const isSign = key === 'PLUS' || key === 'MINUS';
        const char = isDigit ? key : (key === 'PLUS' ? '+' : (key === 'MINUS' ? '-' : null));

        if (char !== null) {
            const newPotentialInput = data.currentInput + char;
            if (newPotentialInput.length <= step.maxLength && step.validator(newPotentialInput)) {
                setCurrentInput(newPotentialInput);
            }
        } else if (key === 'ENTER') {
            let finalInput = data.currentInput.length > 0 ? data.currentInput : step.defaultValue;

            if (!step.validator(finalInput)) return;

            setProgramDataValue(step.key, finalInput);

            let nextStepKey = null;

            // KORREKTUR: Wenn Dauer = 0, gehe zu "Beginn". Wenn Dauer > 0, gehe zu "Ende".
            if (step.key === "Dauer") {
                // Wenn Dauer = 0/00: Starte mit "Beginn" (was in der Config nextStepIfNonZero ist)
                if (finalInput === "00" || finalInput === "0") {
                    nextStepKey = step.nextStepIfNonZero; // "Beginn"
                } else {
                    // Wenn Dauer > 0: Starte mit "Ende" (was in der Config nextStepIfZero ist)
                    nextStepKey = step.nextStepIfZero; // "Ende"
                }
            } else if (step.nextStep) {
                nextStepKey = step.nextStep;
            }

            if (step.isFinal) {
                // Programm speichern
                const programToSave = { ...data.programData };
                if (programToSave.Ende) {
                    programToSave.Ende = programToSave.Ende.padStart(4, '0').substring(0, 4);
                }
                pushProgram(programToSave);
                resetProgramData();

                // NEUE LOGIK: Setze programStepIndex höher, um in renderer.js den Fall !step zu triggern.
                // Bleibe in PROGRAM_INPUT, um auf ESC zu warten (welches dann zurück ins Menü navigiert).
                setProgramStepIndex(data.programStepIndex + 1);
                setCurrentState(STATES.PROGRAM_INPUT);

                renderDisplay();
                return;

            } else if (nextStepKey) {
                const nextIndex = data.programSteps.findIndex(s => s.key === nextStepKey);
                if (nextIndex !== -1) {
                    setProgramStepIndex(nextIndex);
                    setCurrentInput("");
                } else {
                    setProgramStepIndex(data.programStepIndex + 1);
                    setCurrentInput("");
                }
            } else {
                setProgramStepIndex(data.programStepIndex + 1);
                setCurrentInput("");
            }
        } else if (key === 'ARROW_LEFT') {
            setCurrentInput(data.currentInput.slice(0, -1));
        }

        renderDisplay();
        return;
    }

    // 3. ZUSTAND: IDLE_UNLOCKED
    if (data.currentState === STATES.IDLE_UNLOCKED) {
        const isNavigationKey = ['PLUS', 'MINUS', 'ENTER', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(key);
        if (isNavigationKey) {
            setCurrentState(STATES.MENU_BROWSE);
            resetPath();
            setCurrentIndex(0);

            if (key === 'PLUS') {
                setCurrentIndex(1);
            } else if (key === 'MINUS') {
                setCurrentIndex(getCurrentMenu(data).length - 1);
            } else if (!isNaN(parseInt(key))) {
                const numKey = parseInt(key);
                const menu = getCurrentMenu(data);
                if (numKey >= 1 && numKey <= menu.length) {
                    setCurrentIndex(numKey - 1);
                }
            }
        }
    }

    // 4. ZUSTAND: MENU_BROWSE
    if (data.currentState === STATES.MENU_BROWSE) {
        const menu = getCurrentMenu(data);

        if (key === 'PLUS') {
            setCurrentIndex((data.currentIndex + 1) % menu.length);
        } else if (key === 'MINUS') {
            setCurrentIndex((data.currentIndex - 1 + menu.length) % menu.length);
        } else if (key === 'ESC') {
            if (data.currentPath.length > 0) {
                setCurrentIndex(popPath());
            } else {
                setCurrentState(STATES.IDLE_UNLOCKED);
                setCurrentIndex(0);
            }
        } else if (!isNaN(parseInt(key))) { // Ziffern für Schnellwahl
            const numKey = parseInt(key);
            if (numKey >= 1 && numKey <= menu.length) {
                setCurrentIndex(numKey - 1);
            }
        } else if (key === 'ENTER') {
            const selectedItem = menu[data.currentIndex];

            if (selectedItem && selectedItem.submenu) {
                pushPath(data.currentIndex);
                setCurrentIndex(0);
            } else if (selectedItem && selectedItem.action) {
                actionDispatcher(selectedItem);
                return; // Dispatcher ruft Rendering selbst auf
            }
        }
    }

    // 5. Andere Tasten (SEC_FUNC, HELP) sind global
    if (key === 'HELP' || key === 'SEC_FUNC') {
        if (key === 'SEC_FUNC') setSecFuncActive(!data.secFuncActive);

        const displayScreen = document.getElementById('display-screen');
        displayScreen.innerHTML = `<div class="display-line selected">EINGABE: ${key}</div><div class="display-line">  NOCH NICHT IMPLEMENTIERT</div>`;
        setCurrentState(STATES.ACTION_PENDING);

        setTimeout(() => {
            if (data.currentPath.length > 0) {
                setCurrentState(STATES.MENU_BROWSE);
            } else {
                setCurrentState(STATES.IDLE_UNLOCKED);
            }
            renderDisplay();
        }, 1000);
        return;
    }

    if (data.currentState !== STATES.ACTION_PENDING) {
        renderDisplay();
    }
}


/**
 * Spiele einen Ton basierend auf der F-Taste ab.
 */
export function playNoteForKey(key, button, extended = false) {
    const freqMap = extended ? {
        F1: 392.00, F2: 440.00, F3: 493.88, F4: 523.25
    } : {
        F1: 261.63, F2: 293.66, F3: 329.63, F4: 349.23
    };

    if (!freqMap[key]) return;

    button.classList.add('led-on');

    const osc = audioCtx.createOscillator();
    osc.frequency.value = freqMap[key];
    osc.connect(audioCtx.destination);
    osc.start();

    setTimeout(() => {
        osc.stop();
        button.classList.remove('led-on');
    }, 1000);
}

/**
 * Schaltet die LED der HAND-Taste um und aktualisiert den System-Status.
 */
export function toggleLedAndState(button) {
    button.classList.toggle('led-on');

    const key = button.dataset.key;
    if (key.startsWith('HAND')) {
        const bellIndex = parseInt(key.replace('HAND', '')) - 1;
        const bellKey = `bell${bellIndex + 1}`;

        setSystemStateBell(bellKey, button.classList.contains('led-on'));
        renderStatusOverlay();
    }
}

/**
 * Behandelt die globale STOP-Taste (Logout).
 */
export function handleStopButton(button) {
    // State global zurücksetzen
    resetAllState();

    // Alle Glocken visuell ausschalten
    Object.keys(getData().systemState.bellState).forEach(bell => {
        const handKey = bell.toUpperCase().replace('BELL', 'HAND');
        const handButton = document.querySelector(`[data-key="${handKey}"]`);
        if (handButton) handButton.classList.remove('led-on');
    });

    // Anzeige
    const displayScreen = document.getElementById('display-screen');
    displayScreen.innerHTML = '<div class="display-line selected">STOP BETÄTIGT</div><div class="display-line">CODE NEU EINGEBEN</div>';
    setCurrentState(STATES.ACTION_PENDING);
    renderStatusOverlay(); // Statusanzeige aktualisieren

    setTimeout(() => {
        setCurrentState(STATES.LOCKED_CODE_INPUT);
        renderDisplay();
    }, 1000);

    // Stop-Button LED
    button.classList.toggle('led-on');
    setTimeout(() => button.classList.toggle('led-on'), 100);
}