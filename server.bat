@echo off
SET PORT=5500

echo Starte Python Webserver auf Port %PORT%...
:: Startet den Server in einem neuen minimierten Fenster, damit dieses Skript weiterlaufen kann
start /min python -m http.server %PORT%

echo Warte kurz auf den Serverstart...
timeout /t 2 /nobreak >nul

echo Oeffne Chrome unter http://localhost:%PORT%
start chrome "http://localhost:%PORT%/index.html"

echo Server laeuft. Schliesse das schwarze Konsolenfenster, um den Server zu beenden.
pause