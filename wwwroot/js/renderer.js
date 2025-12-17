// js/renderer.js

import { getData, STATES } from './stateManager.js';
import { getCurrentMenu, getCurrentMenuName, getProgramStepConfig } from './inputHandler.js'; // Braucht Menü-Funktionen für Darstellung

const displayScreen = document.getElementById('display-screen');
const statusContent = document.getElementById('status-content');
const maxChars = 20; // Maximale Zeichenbreite des Displays

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
            // Die maximale Länge des Codes ist wichtig für die Platzhalter.
            const maxCodeLength = data.maxCodeLength;
            // Die bereits eingegebene Länge
            const inputLength = data.currentCodeInput.length;

            // ANZEIGE FÜR PASSWORT-EINGABE
            const spacing = ' '.repeat(4);
            let displayLine2 = hours + ':' + minutes + '.' + seconds + spacing;

            // 1. Die bereits eingegebenen Zeichen (z.B. "****") hinzufügen
            displayLine2 += data.currentCodeInput;

            // 2. Den blinkenden Cursor hinzufügen
            if (inputLength < maxCodeLength) {
                displayLine2 += '<span class="cursor">█</span>';

                // 3. Die festen Platzhalterpunkte hinzufügen.
                // Wir benötigen die Anzahl der verbleibenden Zeichen abzüglich des Cursors (der 1 Zeichen belegt).
                const remainingLength = maxCodeLength - inputLength - 1; // -1 für den Cursor

                // Wir fügen nur dann Punkte hinzu, wenn noch Platz ist (remainingLength > 0).
                if (remainingLength > 0) {
                    // Beispiel: Wenn remainingLength 3 ist, fügen wir 3 Punkte hinzu.
                    displayLine2 += '.'.repeat(remainingLength);
                }
            }

            // Falls der Code bereits vollständig eingegeben wurde (inputLength === maxCodeLength),
            // wird kein Cursor und keine Punkte mehr hinzugefügt, da die if-Bedingung fehlschlägt.

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
                <div class="display-line">${hours}:${minutes}.${seconds}${spacing}</div>
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
            const displayScreen = document.getElementById('display-screen');

            if (!step) {
                // Dieser Block wird angezeigt, wenn das Programm gespeichert wurde
                // Wir holen uns das zuletzt gespeicherte Programm aus dem State
                const lastProgram = data.savedPrograms[data.savedPrograms.length - 1];
                const assignedNr = lastProgram ? lastProgram.Nr : "??";

                displayScreen.innerHTML = `
                 <div class="display-line">NR: ${assignedNr} GESPEICHERT</div>
                 <div class="display-line">ESC -> MENÜ</div>
                `;
                return;
                //line1 = "W2"; // <-- Geändert: Platzhalter für nächstes freies Programm
                //line2 = "    ESC DRÜCKEN"; // <-- Beibehalten
            } else {
                line2 = step.line2 || "    ";

                // 1. Bestimme die aktuelle Programmnummer (W + Anzahl + 1)
                const currentProgNr = `W${data.savedPrograms.length + 1}`;

                // 2. Ersetze den Platzhalter {Nr} im Konfigurations-String
                let rawLine1 = step.line1.replace(/{Nr}/g, currentProgNr);

                let currentInput = data.currentInput;
                let displayLine1 = rawLine1;
                let charIndex = 0;

                // Durchlaufe die rawLine1 (jetzt mit korrekter W-Nummer)
                for (let i = 0; i < rawLine1.length; i++) {
                    if (rawLine1[i] === '_') {
                        if (charIndex < currentInput.length) {
                            displayLine1 = displayLine1.substring(0, i) + currentInput[charIndex] + displayLine1.substring(i + 1);
                            charIndex++;
                        } else if (charIndex === currentInput.length) {
                            displayLine1 = displayLine1.substring(0, i) + '<span class="cursor">█</span>' + displayLine1.substring(i + 1);
                            charIndex++;
                        }
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
        // Sicherstellen, dass der Index im validen Bereich liegt
        const viewIdx = Math.max(0, Math.min(data.statusProgramIndex, data.savedPrograms.length - 1));
        const p = data.savedPrograms[viewIdx];

        let dauerStr = (parseInt(p.Dauer) === 0 && p.Ende)
            ? `Ende: ${p.Ende.substring(0, 2)}:${p.Ende.substring(2, 4)}`
            : `Dauer: ${parseInt(p.Dauer)}s`;

        const tagMap = { "0": "Täglich", "1": "Mo", "2": "Di", "3": "Mi", "4": "Do", "5": "Fr", "6": "Sa", "7": "So" };
        const tagStr = tagMap[p.Tage] || `Tag: ${p.Tage}`;

        programHtml = `
            <div class="status-line" style="margin-top: 5px; justify-content: space-between; display: flex; align-items: center;">
                <span>Prog. <b>${p.Nr}</b> (${viewIdx + 1}/${data.savedPrograms.length}):</span>
                <div class="scroll-controls">
                    <button id="prev-prog" style="padding: 0 5px; cursor: pointer;">↑</button>
                    <button id="next-prog" style="padding: 0 5px; cursor: pointer;">↓</button>
                </div>
            </div>
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
        ${bellStatusHtml}

        <h3>AKTIVE PROGRAMME (${data.savedPrograms.length} gesp.)</h3>
        ${programHtml}

        <h3 style="margin-top: 10px;">VERFÜGBARE MELODIEN</h3>
        ${melodyHtml}
    `;
    // Event-Listener für die Scroll-Buttons in der Statusanzeige
    const btnPrev = document.getElementById('prev-prog');
    const btnNext = document.getElementById('next-prog');

    if (btnPrev) {
        btnPrev.onclick = (e) => {
            e.stopPropagation();
            import('./stateManager.js').then(m => {
                m.setStatusProgramIndex(Math.max(0, data.statusProgramIndex - 1));
                renderStatusOverlay();
            });
        };
    }
    if (btnNext) {
        btnNext.onclick = (e) => {
            e.stopPropagation();
            import('./stateManager.js').then(m => {
                m.setStatusProgramIndex(Math.min(data.savedPrograms.length - 1, data.statusProgramIndex + 1));
                renderStatusOverlay();
            });
        };
    }
}