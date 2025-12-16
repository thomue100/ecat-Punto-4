// js/menuData.js
export const menuData = [{
    name: "HAUPTMENU",
    submenu: [
        {
            name: "1/7) PROGRAMMIERUNG",
            displayName: "MENUE PROGRAMMIERUNG",
            submenu: [
                {
                    name: "1/3) EINGEBEN",
                    displayName: "EINGABE PROGRAMM.",
                    submenu: [
                        {
                            name: "1/5) WOECHENTLICH",
                            displayName: "EINGABE WOECHENTL.",
                            submenu: [
                                { name: "1/4) GLOCKEN", action: "GENERIC_ACTION" },
                                { name: "2/4) MELODIEN", action: "GENERIC_ACTION" },
                                { name: "3/4) STUNDENSCHLAGEN", action: "START_PROGRAM_INPUT", configKey: "STUNDENSCHLAGEN" },
                                { name: "4/4) DIENSTE", action: "GENERIC_ACTION" }
                            ]
                        },
                        {
                            name: "2/5) PERIODISCH",
                            displayName: "EINGABE PERIODISCH",
                            submenu: [
                                { name: "1/4) GLOCKEN", action: "GENERIC_ACTION" },
                                { name: "2/4) MELODIEN", action: "GENERIC_ACTION" },
                                { name: "3/4) STUNDENSCHLAGEN", action: "GENERIC_ACTION" },
                                { name: "4/4) DIENSTE", action: "GENERIC_ACTION" }
                            ]
                        },
                        {
                            name: "3/5) BESONDERE",
                            displayName: "EINGABE BESONDERE",
                            submenu: [
                                { name: "1/4) GLOCKEN", action: "GENERIC_ACTION" },
                                { name: "2/4) MELODIEN", action: "GENERIC_ACTION" },
                                { name: "3/4) STUNDENSCHLAGEN", action: "GENERIC_ACTION" },
                                { name: "4/4) DIENSTE", action: "GENERIC_ACTION" }
                            ]
                        },
                        {
                            name: "4/5) ZYKLISCH",
                            displayName: "EINGABE ZYKLISCH",
                            submenu: [
                                { name: "1/4) GLOCKEN", action: "GENERIC_ACTION" },
                                { name: "2/4) MELODIEN", action: "GENERIC_ACTION" },
                                { name: "3/4) STUNDENSCHLAGEN", action: "GENERIC_ACTION" },
                                { name: "4/4) DIENSTE", action: "GENERIC_ACTION" }
                            ]
                        },
                        {
                            name: "5/5) UNTERDRUECKEN",
                            displayName: "EINGABE UNTERDRUECK.",
                            submenu: [
                                { name: "1/4) GLOCKEN", action: "GENERIC_ACTION" },
                                { name: "2/4) MELODIEN", action: "GENERIC_ACTION" },
                                { name: "3/4) STUNDENSCHLAGEN", action: "GENERIC_ACTION" },
                                { name: "4/4) DIENSTE", action: "GENERIC_ACTION" }
                            ]
                        }
                    ]
                },
                {
                    name: "2/3) LESEN",
                    displayName: "SUCHE PROGRAMM.",
                    submenu: [
                        { name: "1/5) WOECHENTLICH", action: "GENERIC_ACTION" },
                        { name: "2/5) PERIODISCH", action: "GENERIC_ACTION" },
                        { name: "3/5) BESONDERE", action: "GENERIC_ACTION" },
                        { name: "4/5) ZYKLISCH", action: "GENERIC_ACTION" },
                        { name: "5/5) UNTERDRUECKEN", action: "GENERIC_ACTION" }
                    ]
                },
                {
                    name: "3/3) LOESCHEN",
                    displayName: "LOESCHE PROGRAMM.",
                    submenu: [
                        { name: "1/5) WOECHENTLICH", action: "GENERIC_ACTION" },
                        { name: "2/5) PERIODISCH", action: "GENERIC_ACTION" },
                        { name: "3/5) BESONDERE", action: "GENERIC_ACTION" },
                        { name: "4/5) ZYKLISCH", action: "GENERIC_ACTION" },
                        { name: "5/5) UNTERDRUECKEN", action: "GENERIC_ACTION" }
                    ]
                }
            ]
        },
        {
            name: "2/7) UHR KORRIGIEREN",
            displayName: "UHR-BERICHTIGUNG",
            action: "GENERIC_ACTION"
        },
        {
            name: "3/7) SEK. KORRIGIEREN",
            displayName: "ZEIT...EINGEBEN",
            action: "GENERIC_ACTION"
        },
        {
            name: "4/7) TURMUHR KORRIG.",
            displayName: "ZEITEINGABE VOM",
            action: "GENERIC_ACTION"
        },
        {
            name: "5/7) SOMMERZEIT",
            displayName: "MENUE SOMMERZEIT",
            submenu: [
                { name: "1/4) NICHT VORHANDEN", action: "GENERIC_ACTION" },
                { name: "2/4) UEBER RADIO", action: "GENERIC_ACTION" },
                { name: "3/4) NORMAL", action: "GENERIC_ACTION" },
                { name: "4/4) FESTES DATUM", action: "GENERIC_ACTION" }
            ]
        },
        {
            name: "6/7) MELOD. SPEICHERN",
            displayName: "SPEICHERE",
            action: "GENERIC_ACTION"
        },
        {
            name: "7/7) NAME DER MELODI.",
            displayName: "NAME DER MELODI.", // Kein expliziter displayName im Blueprint, verwende name
            action: "GENERIC_ACTION"
        }
    ]
}];