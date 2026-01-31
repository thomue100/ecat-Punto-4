// audioHandler.js

const BELL_SOURCES = {
  F1: "sounds/bell1.mp3",
  F2: "sounds/bell2.mp3",
  F3: "sounds/bell4.mp3",
  F4: "sounds/bell3.mp3",
};

// Standard-Player für kurzes Antippen (F1-F4)
const bellPlayers = {
  F1: new Audio(BELL_SOURCES.F1),
  F2: new Audio(BELL_SOURCES.F2),
  F3: new Audio(BELL_SOURCES.F3),
  F4: new Audio(BELL_SOURCES.F4),
};

let activeTimers = [];

/** * Hier speichern wir die dedizierten Instanzen für die H-Tasten.
 * Jede Taste bekommt ein EIGENES Audio-Objekt für echte Simultanität.
 */
let handLoops = {
  H1: null,
  H2: null,
  H3: null,
  H4: null,
};

export const AudioPlayer = {
  /** Spielt einen einzelnen Schlag ab */
  playSingle(key) {
    const audio = bellPlayers[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((e) => console.error("Audio Play Error:", e));
    }
  },

  /** * TOGGLE FUNKTION FÜR H-TASTEN
   * Erzeugt bei Bedarf eine neue Instanz für zeitgleiches Läuten.
   */
  toggleHandBell(key) {
    const soundKey = key.replace("H", "F");
    const sourcePath = BELL_SOURCES[soundKey];

    // Falls diese Glocke bereits läutet -> Ausschwingen lassen
    if (handLoops[key]) {
      handLoops[key].loop = false;
      handLoops[key] = null; // Referenz löschen, Audio spielt zu Ende
      return false;
    }

    // ECHTE SIMULTANITÄT: Erzeuge eine komplett neue Instanz
    const audioInstance = new Audio(sourcePath);
    audioInstance.loop = true;
    audioInstance.play().catch((e) => console.error("Handbell Error:", e));

    handLoops[key] = audioInstance;
    return true;
  },

  playMelody(melodyObj, visualKey = null) {
    if (!melodyObj || !melodyObj.parts) return;
    this.stop();
    if (visualKey) this.triggerVisualFeedback(visualKey, 500);

    melodyObj.parts.forEach((part) => {
      part.events.forEach((event) => {
        const timer = setTimeout(() => {
          this.playSingle(event.key);
        }, event.timestamp);
        activeTimers.push(timer);
      });
    });
  },

  triggerVisualFeedback(key, duration) {
    const btn = document.querySelector(`button[data-key="${key}"]`);
    if (btn) {
      btn.classList.add("active-led");
      setTimeout(() => btn.classList.remove("active-led"), duration);
    }
  },

  /** Beendet sofort ALLES Läuten */
  stop() {
    activeTimers.forEach(clearTimeout);
    activeTimers = [];

    // Alle Hand-Glocken sofort hart stoppen
    Object.keys(handLoops).forEach((k) => {
      if (handLoops[k]) {
        handLoops[k].pause();
        handLoops[k].currentTime = 0;
        handLoops[k] = null;
      }
    });

    // Alle Standard-Glocken stoppen
    Object.values(bellPlayers).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  },
};
