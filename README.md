# Serkowla

[![Website checks](https://github.com/arambucak/serkowla-website/actions/workflows/ci.yml/badge.svg)](https://github.com/arambucak/serkowla-website/actions/workflows/ci.yml)

Responsive, deutschsprachige Studio-Website mit vier Produktvorstellungen. Reines HTML, CSS und JavaScript; keine Build-Abhängigkeiten, externen Schriftarten oder Tracker.

**Status:** Website-Entwurf. Das Repository veröffentlicht die Website nicht automatisch. Rechtliche Anbieterangaben und die Hosting-Einrichtung fehlen noch.

## Lokale Vorschau

Mit Node.js ab Version 22:

```sh
npm run dev
```

Anschließend `http://127.0.0.1:3000` öffnen. Optional einen anderen Port mit `PORT=3001 npm run dev` wählen. Der Server bindet nur an die lokale Loopback-Adresse und ist für die Entwicklung vorgesehen.

Alternativ lässt sich die Startseite direkt im Browser öffnen. Die Navigation bleibt auch ohne JavaScript nutzbar; die zusätzlichen Projektdialoge benötigen JavaScript.

## Prüfen

```sh
npm run check
npm test
```

Die Tests prüfen lokale Ressourcen, Ankerziele, Projektzuordnungen und Serverantworten einschließlich Fehlerfällen. Browserprüfungen sollten Desktop, Mobilansicht, Tastaturbedienung und Projektdialoge abdecken.

## GitHub

Pull Requests und Änderungen auf `main` werden mit Node.js 22 und 24 geprüft. Der Workflow benötigt keine Secrets und installiert keine Projektabhängigkeiten.

Unter **Actions → Website checks → erfolgreicher Lauf → Artifacts → serkowla-upload** steht das Upload-Paket für 30 Tage bereit. Es wird nur als Download erstellt, nicht auf einen Hostingdienst übertragen. Das erzeugte ZIP wird nicht im Quellcode versioniert.

## Inhalte anpassen

- [index.html](./index.html): Startseite, Leistungen, Über-Bereich und Kontakt.
- [script.js](./script.js): Projektbeschreibungen und Dialogverhalten.
- [styles.css](./styles.css): Gestaltung und responsive Ansichten.
- [rechtliches.html](./rechtliches.html): ausdrücklich unvollständige rechtliche Entwurfsseite.

Die Produktvorschauen sind mit CSS gestaltete, als solche beschriftete Konzeptansichten. Sie stellen keine Original-Screenshots, Store-Verfügbarkeit oder Live-Marktdaten dar.

## Vor Veröffentlichung

1. Namen und persönliche Angaben im Über-Bereich bestätigen.
2. Das Postfach `info@serkowla.com` und den Empfang von Anfragen prüfen. Der E-Mail-Link ist bereits eingebaut.
3. Vollständige, auf Anbieter, Sitz und Hosting abgestimmte Impressums- und Datenschutzangaben eintragen und prüfen lassen.
4. Produktbeschreibungen, Entwicklungsstand und Nutzungsrechte am Logo bestätigen. Bei Verfügbarkeit echte Screenshots und bestätigte Produktlinks ergänzen.
5. Entwurfskennzeichnung nach Abschluss dieser Schritte entfernen.
6. Für die Domain HTTPS sowie das gewünschte Hosting einrichten.

Für ein statisches Hosting werden nur `index.html`, `rechtliches.html`, `styles.css`, `script.js`, `favicon.svg` und `serkowlalogo.png` benötigt. Der lokale Vorschau-Server ist kein Produktionshosting. Es wurden weder eine Domain noch ein Hostingdienst eingerichtet.

## Upload-Paket

`serkowla-upload.zip` enthält ausschließlich diese sechs Website-Dateien, direkt im ZIP-Hauptverzeichnis. Nach Abschluss der oben genannten Veröffentlichungsvoraussetzungen die Dateien in das für die Website vorgesehene Webroot des Hosters hochladen beziehungsweise bei einem statischen Hoster importieren. Keine Node.js-Laufzeit und kein Build-Schritt erforderlich.

Lokal kann das Paket ohne zusätzliche Werkzeuge außer `zip` erstellt werden:

```sh
zip serkowla-upload.zip index.html rechtliches.html styles.css script.js favicon.svg serkowlalogo.png
unzip -t serkowla-upload.zip
```

Das Paket enthält weiterhin die Entwurfskennzeichnung und unvollständige rechtliche Angaben. Es ist technisch uploadfähig, aber noch nicht für eine öffentliche geschäftliche Veröffentlichung vorbereitet. Hosting und Domain-Zuordnung sind noch nicht eingerichtet. Bestehende DNS-Einträge für E-Mail (insbesondere MX, SPF, DKIM und DMARC) bei einer späteren Einrichtung nicht unbesehen ersetzen.
