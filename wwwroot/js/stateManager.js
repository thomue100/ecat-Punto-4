// js/stateManager.js

// IMPORT der ausgelagerten Daten
import { menuData } from './menuData.js';
import { PROGRAM_STEPS_CONFIG } from './programStepsConfig.js';

// =====================================================================
// 1. ZUSTANDS-DEFINITIONEN
// =====================================================================
export const STATES = {
    LOCKED_CODE_INPUT: 'LOCKED_CODE_INPUT',
    IDLE_UNLOCKED: 'IDLE_UNLOCKED',
    MENU_BROWSE: 'MENU_BROWSE',
    PROGRAM_INPUT: 'PROGRAM_INPUT',
    ACTION_PENDING: 'ACTION_PENDING'
};

// =====================================================================
// 2. GLOBALE ZUSTANDSVARIABLEN
// =====================================================================

export let currentState = STATES.LOCKED_CODE_INPUT;

// Navigations- und Eingabevariablen
export let currentPath = [];
export let currentIndex = 0;
export const correctCode = "123";
export const maxCodeLength = 4;
export let currentCodeInput = "";

export let statusProgramIndex = 0; // Index für das Blättern in der Statusanzeige

// Variablen für die Programm-Eingabe
export let programSteps = PROGRAM_STEPS_CONFIG.STUNDENSCHLAGEN;
export let programStepIndex = 0;
export let currentInput = "";
export let secFuncActive = false;
export let programData = {};

// Persistente Datenstrukturen

export const availableMelodies = ["Melodie 1", "Melodie 2", "..."];

// System-Status
export let systemState = {
    mainClock: "AKTIV",
    automation: "AKTIV",
    bellState: {
        bell1: false,
        bell2: false,
        bell3: false,
        bell4: false
    }
};

// --- HILFSFUNKTIONEN FÜR PERSISTENZ ---

// Wenn man die Liste während des Testens wieder leeren möchte, kann man einfach die 
// Browser - Konsole(F12) öffnen und folgenden Befehl eingeben: 
//localStorage.clear(); location.reload();

const STORAGE_KEY = 'bell_system_programs';

const loadInitialPrograms = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Fehler beim Laden der Programme", e);
        }
    }
    // Geändert: Jetzt mit einem leeren Array starten
    return [];
};

export let savedPrograms = loadInitialPrograms();

// =====================================================================
// 3. GETTER und SETTER
// =====================================================================

export const getData = () => ({
    currentState,
    statusProgramIndex,
    currentPath,
    currentIndex,
    currentCodeInput,
    programStepIndex,
    currentInput,
    secFuncActive,
    programData,
    systemState,
    savedPrograms,
    menuData,
    programSteps,
    correctCode,
    maxCodeLength,
    availableMelodies
});

export const setCurrentState = (newState) => {
    currentState = newState;
};

export const setCurrentIndex = (newIndex) => {
    currentIndex = newIndex;
};

export const setCurrentCodeInput = (input) => {
    currentCodeInput = input;
};

export const setCurrentInput = (input) => {
    currentInput = input;
};

export const setSecFuncActive = (isActive) => {
    secFuncActive = isActive;
};

export const setProgramStepIndex = (index) => {
    programStepIndex = index;
};

export const setProgramSteps = (steps) => {
    programSteps = steps;
};

export const resetProgramData = () => {
    programData = {};
};

export const setProgramDataValue = (key, value) => {
    programData[key] = value;
};

/**
* Speichert ein neues Programm und weist ihm automatisch die nächste 
* freie W-Nummer zu (W1 bis W99).
*/
export const pushProgram = (data) => {
    const nextNumber = savedPrograms.length + 1;

    if (nextNumber <= 99) {
        // Wir suchen den Namen des aktuellen Programm-Sets aus der Config
        const typeName = Object.keys(PROGRAM_STEPS_CONFIG).find(
            key => PROGRAM_STEPS_CONFIG[key] === programSteps
        ) || "UNBEKANNT";

        const newEntry = {
            Nr: `W${nextNumber}`,
            Typ: typeName, // Speichert den Typ (z.B. STUNDENSCHLAGEN)
            ...data
        };
        savedPrograms.push(newEntry);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrograms));
        console.log("Programm gespeichert:", newEntry);
        return newEntry.Nr;
    } else {
        console.warn("Limit von 99 Programmen erreicht.");
        return null;
    }
};


export const resetPath = () => {
    currentPath = [];
};

export const pushPath = (index) => {
    currentPath.push(index);
};

export const popPath = () => {
    return currentPath.pop();
};

export const setSystemStateBell = (key, value) => {
    systemState.bellState[key] = value;
};

export const setSystemStateAutomation = (value) => {
    systemState.automation = value;
};

export const setStatusProgramIndex = (index) => {
    statusProgramIndex = index;
};

export const resetAllState = () => {
    currentState = STATES.LOCKED_CODE_INPUT;
    currentPath = [];
    currentIndex = 0;
    currentCodeInput = "";
    programStepIndex = 0;
    currentInput = "";
    secFuncActive = false;
    programData = {};
    systemState = {
        mainClock: "AKTIV",
        automation: "AKTIV",
        bellState: {
            bell1: false,
            bell2: false,
            bell3: false,
            bell4: false
        }
    };
    // savedPrograms = []; // Falls die Liste bei STOP auch gelöscht werden soll
    programSteps = PROGRAM_STEPS_CONFIG.STUNDENSCHLAGEN;
};