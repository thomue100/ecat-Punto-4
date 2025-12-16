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

// Variablen für die Programm-Eingabe
export let programSteps = PROGRAM_STEPS_CONFIG.STUNDENSCHLAGEN;
export let programStepIndex = 0;
export let currentInput = "";
export let secFuncActive = false;
export let programData = {};

// Persistente Datenstrukturen
export let savedPrograms = [{
    Glocken: "1-3",
    Dauer: "00",
    Ende: "0745",
    Tage: "7"
}];
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

// =====================================================================
// 3. GETTER und SETTER
// =====================================================================

export const getData = () => ({
    currentState,
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

export const pushProgram = (data) => {
    savedPrograms.push(data);
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
    programSteps = PROGRAM_STEPS_CONFIG.STUNDENSCHLAGEN;
};