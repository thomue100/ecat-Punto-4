// js/renderer.js

import { getData, STATES } from './stateManager.js';
import { getCurrentMenu, getCurrentMenuName, getProgramStepConfig } from './inputHandler.js'; // Braucht Menü-Funktionen für Darstellung

const displayScreen = document.getElementById('display-screen');
const statusContent = document.getElementById('status-content');
const maxChars = 30; // Maximale Zeichenbreite des Displays

/**
 * Gibt den deutschen Wochentag zurück.
 */
const getGermanWeekdayShort = (date) => {
    const weekday = new Intl.DateTimeFormat('de-DE', {
        weekday: 'short'
    }).format(date);
    return weekday.substring(0, 2).toUpperCase();
};

/**
 * Rendert den Haupt-Display-Bildschirm basierend auf dem aktuellen Zustand.
 */
export function renderDisplay() {
    const data = getData();
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().substring(2, 4);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const germanWeekday = getGermanWeekdayShort(now);

    switch (data.currentState) {
        case STATES.LOCKED_CODE_INPUT: {
            // ANZEIGE FÜR PASSWORT-EINGABE
            let displayLine2 = hours + ':' + minutes + '.' + seconds + ' ';
            // Zeichen vor Cursor
            displayLine2 += data.currentCodeInput;
            // Blinkender Cursor
            if (data.currentCodeInput.length < data.correctCode.length) {
                displayLine2 += '<span class="cursor">█</span>';
                displayLine2 += '...'; // Drei Punkte
            }
            displayScreen.innerHTML = `
                <div class="display-line">${germanWeekday} ${day}-${month}-${year} CODE</div>
                <div class="display-line">${displayLine2}</div>
            `;
            break;
        }
        case STATES.IDLE_UNLOCKED: {
            // Leerlaufanzeige (wird schnell zu MENU_BROWSE gewechselt)
            const spacing = ' '.repeat(5);
            displayScreen.innerHTML = `
                <div class="display-line">${germanWeekday} ${day}-${month}-${year} PROGRAMM</div>
                <div class="display-line">${hours}:${minutes}.${seconds}${spacing}---</div>
            `;
            break;
        }
        case STATES.MENU_BROWSE: {
            const menu = getCurrentMenu(data);
            const menuName = getCurrentMenuName(data);
            const selectedItem = menu[data.currentIndex];
            const selectedItemName = selectedItem ? selectedItem.name : '---';

            let line1 = menuName.padEnd(maxChars).substring(0, maxChars);
            let line2Content = `${selectedItemName}`;
            let line2 = line2Content.padEnd(maxChars).substring(0, maxChars);

            displayScreen.innerHTML = `
                <div class="display-line">${line1}</div>
                <div class="display-line selected">${line2}</div>
            `;
            break;
        }
        case STATES.PROGRAM_INPUT: {
            let line1 = ""; // Aktive Eingabezeile (wird hervorgehoben)
            let line2 = ""; // Promptzeile

            const step = getProgramStepConfig(data);

            if (!step) {
                // Programmierung abgeschlossen (oder Fehler) - GEÄNDERTE LOGIK FÜR W2-ANZEIGE
                // line1 = "W1 PROGRAMMIERUNG ABGESCHL.  "; // <-- Original
                // line2 = "    ESC DRÜCKEN"; // <-- Original
                line1 = "W2"; // <-- Geändert: Platzhalter für nächstes freies Programm
                line2 = "    ESC DRÜCKEN"; // <-- Beibehalten
            } else {
                // Prompt des aktuellen Schritts (z.B. "Glocken: 1-3") kommt in Zeile 2
                line2 = step.line2 || "    "; // Wenn step.line2 existiert, verwende es als Prompt

                // Zeile 1: Der Prompt des aktuellen Schritts (mit Underscores, z.B. "START: ____")
                let rawLine1 = step.line1;
                let currentInput = data.currentInput;

                let displayLine1 = rawLine1;
                let charIndex = 0; // Index des Zeichens in rawLine1

                // Durchlaufe die rawLine1 (Prompt mit Underscores)
                for (let i = 0; i < rawLine1.length; i++) {
                    if (rawLine1[i] === '_') {
                        // Wenn wir an einem Underscore sind, überprüfen wir, ob bereits ein Zeichen eingegeben wurde
                        if (charIndex < currentInput.length) {
                            // Ersetze Underscore durch bereits eingegebenes Zeichen
                            displayLine1 = displayLine1.substring(0, i) + currentInput[charIndex] + displayLine1.substring(i + 1);
                            charIndex++;
                        } else if (charIndex === currentInput.length) {
                            // Dies ist die Position des nächsten einzugebenden Zeichens
                            // Ersetze Underscore durch blinkenden Cursor
                            displayLine1 = displayLine1.substring(0, i) + '<span class="cursor">█</span>' + displayLine1.substring(i + 1);
                            charIndex++;
                        }
                        // Wenn charIndex > currentInput.length, bleibt es ein Underscore
                    }
                }

                line1 = displayLine1;
            }

            // Zeile 1 ist die Eingabezeile und wird hervorgehoben
            // Wir müssen die Padding-Berechnung anpassen, da line1 HTML-Code (<span class="cursor">█</span>) enthält.

            // Textlänge ohne HTML-Tags zur korrekten Berechnung der Padding-Zeichen
            const line1TextLength = (line1.replace(/<[^>]*>/g, '').length);
            const paddingNeeded = Math.max(0, maxChars - line1TextLength);

            displayScreen.innerHTML = `
                <div class="display-line selected">${line1}${' '.repeat(paddingNeeded)}</div>
                <div class="display-line">${line2.padEnd(maxChars).substring(0, maxChars)}</div>
            `;
            break;
        }
        case STATES.ACTION_PENDING:
            // Keine Änderung am Display, es wird von der aufrufenden Funktion gesetzt.
            break;
    }
}

/**
 * Rendert das Status-Overlay rechts.
 */
export function renderStatusOverlay() {
    const data = getData();
    const systemState = data.systemState;

    const bellStatusHtml = Object.keys(systemState.bellState).map((key, index) => {
        const status = systemState.bellState[key] ? 'EIN' : 'AUS';
        const className = systemState.bellState[key] ? 'on' : 'off';
        return `
            <div class="status-line">
                <span>Glocke ${index + 1}:</span>
                <span class="status-value ${className}">${status}</span>
            </div>
        `;
    }).join('');

    let programHtml = '';
    if (data.savedPrograms.length > 0) {
        const p = data.savedPrograms[data.savedPrograms.length - 1];
        let dauerStr;
        let isEndeZeit = (parseInt(p.Dauer) === 0);
        if (isEndeZeit && p.Ende) {
            dauerStr = `Ende: ${p.Ende.substring(0, 2)}:${p.Ende.substring(2, 4)}`;
        } else {
            dauerStr = `Dauer: ${parseInt(p.Dauer)}s`;
        }

        const tagMap = { "0": "Täglich", "1": "Mo", "2": "Di", "3": "Mi", "4": "Do", "5": "Fr", "6": "Sa", "7": "So" };
        const tagStr = tagMap[p.Tage] || `Tag: ${p.Tage}`;

        const programType = (data.savedPrograms.length === 1 && p.Glocken === "1-3" && p.Ende === "0745" && p.Tage === "7") ? "(Beispiel)" : "(Letztes)";

        programHtml = `
            <div class="status-line" style="margin-top: 5px;"><span>Programm ${programType}:</span><span class="status-value"></span></div>
            <div class="status-line"><span>Glocken:</span><span class="status-value">${p.Glocken}</span></div>
            <div class="status-line"><span>${dauerStr}</span><span class="status-value">${tagStr}</span></div>
        `;
    } else {
        programHtml = `<div class="status-line"><span>(Keine Programme gespeichert)</span></div>`;
    }

    const melodyHtml = data.availableMelodies.map(m =>
        `<div class="status-line"><span>- ${m}</span></div>`
    ).join('');

    statusContent.innerHTML = `
        <h3>SIMULIERTER GLOCKENSTUHL-STATUS</h3>
        ${bellStatusHtml}
        <div class="status-line" style="border-top: 1px dashed #405a6b; padding-top: 5px; margin-top: 5px;">
            <span>Uhr-Korrektur:</span>
            <span class="status-value ${systemState.mainClock === 'AKTIV' ? 'on' : 'off'}">${systemState.mainClock}</span>
        </div>
        <div class="status-line">
            <span>Automatik:</span>
            <span class="status-value ${systemState.automation === 'AKTIV' ? 'on' : 'off'}">${systemState.automation}</span>
        </div>

        <h3>AKTIVE PROGRAMME (${data.savedPrograms.length} gesp.)</h3>
        ${programHtml}

        <h3 style="margin-top: 10px;">VERFÜGBARE MELODIEN</h3>
        ${melodyHtml}
    `;
}