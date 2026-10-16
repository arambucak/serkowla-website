# Serkowla

[![Website checks](https://github.com/arambucak/serkowla-website/actions/workflows/ci.yml/badge.svg)](https://github.com/arambucak/serkowla-website/actions/workflows/ci.yml)

Responsive, deutschsprachige Studio-Website mit vier Produktvorstellungen. Reines HTML, CSS und JavaScript; keine Build-Abhängigkeiten, externen Schriftarten oder Tracker.

**Website:** [serkowla.com](https://serkowla.com) · Hosting über GitHub Pages, Domain und E-Mail bei IONOS.

**Inhaltlicher Status:** Öffentlich bereitgestellter Entwurf mit ausdrücklich unvollständigen rechtlichen Angaben. Die Veröffentlichung wurde mit diesem Hinweis freigegeben; sie ersetzt keine rechtliche Prüfung. Es wurde keine Wohnanschrift ergänzt.

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

## GitHub Pages

Der Workflow [Publish website (manual)](./.github/workflows/pages.yml) ist ausschließlich manuell startbar. Ein Push oder Pull Request veröffentlicht nichts. Ohne ausdrückliche Bestätigung im Workflow werden die Veröffentlichungsjobs übersprungen.

Einrichtung und weitere Veröffentlichungen:

1. Die rechtlichen Angaben vervollständigen und die Entwurfskennzeichnungen nach inhaltlicher Prüfung entfernen.
2. Unter **Settings → Pages → Build and deployment** als Quelle **GitHub Actions** auswählen.
3. Domaininhaberschaft möglichst über die GitHub-Kontoeinstellungen für Pages und den dort vorgegebenen TXT-Eintrag bestätigen.
4. `serkowla.com` als benutzerdefinierte Pages-Domain hinterlegen und die erforderlichen Website-DNS-Einträge bei IONOS nach der aktuellen GitHub-Dokumentation konfigurieren. Vorher bestehende Einträge sichern. MX-, SPF-, DKIM- und DMARC-Einträge für E-Mail beibehalten; keine Nameserver-Umstellung erforderlich.
5. Den Workflow auf `main` mit bestätigter Veröffentlichungsfreigabe starten. Er prüft die Website und veröffentlicht ausschließlich die sechs Website-Dateien plus `CNAME` und `.nojekyll`.
6. Nach erfolgreicher Domain- und Zertifikatsprüfung HTTPS erzwingen. Apex-Domain, `www`-Weiterleitung, Links und E-Mail-Empfang prüfen.

Die Checkbox ist eine ausdrückliche Freigabe des aktuellen Inhalts einschließlich sichtbarer Entwurfshinweise, keine Bestätigung der rechtlichen Vollständigkeit. Der Workflow aktiviert Pages nicht selbst und ändert keine DNS-Einstellungen. GitHub Pages wurde eingerichtet und die erste Veröffentlichung am 16. Oktober 2026 erfolgreich ausgeführt.

Die IONOS-Zone verwendet für `@` die vier GitHub-Pages-A-Adressen `185.199.108.153`, `185.199.109.153`, `185.199.110.153` und `185.199.111.153`. `www` verweist per CNAME auf `arambucak.github.io`. Die vorhandenen Mail-, SPF-, DKIM-, DMARC- und Autodiscover-Einträge wurden beibehalten. Ein vollständiger Test des E-Mail-Empfangs erfordert eine tatsächliche Testnachricht.

Ein gültiges Zertifikat für `serkowla.com` und `www.serkowla.com` wurde ausgestellt; HTTPS ist in Pages erzwungen. Die HTTPS-Hauptadresse und die Weiterleitung von `www` wurden geprüft. Alle sechs öffentlich ausgelieferten Website-Dateien wurden mit den lokalen Quelldateien verglichen.

Offizielle Anleitung: [Benutzerdefinierte Domain für GitHub Pages verwalten](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Inhalte anpassen

- [index.html](./index.html): Startseite, Leistungen, Über-Bereich und Kontakt.
- [script.js](./script.js): Projektbeschreibungen und Dialogverhalten.
- [styles.css](./styles.css): Gestaltung und responsive Ansichten.
- [rechtliches.html](./rechtliches.html): ausdrücklich unvollständige rechtliche Entwurfsseite.

Die Produktvorschauen sind mit CSS gestaltete, als solche beschriftete Konzeptansichten. Sie stellen keine Original-Screenshots, Store-Verfügbarkeit oder Live-Marktdaten dar.

## Offene inhaltliche Aufgaben

1. Namen und persönliche Angaben im Über-Bereich bestätigen.
2. Das Postfach `info@serkowla.com` und den Empfang von Anfragen prüfen. Der E-Mail-Link ist bereits eingebaut.
3. Vollständige, auf Anbieter, Sitz und Hosting abgestimmte Impressums- und Datenschutzangaben eintragen und prüfen lassen.
4. Produktbeschreibungen, Entwicklungsstand und Nutzungsrechte am Logo bestätigen. Bei Verfügbarkeit echte Screenshots und bestätigte Produktlinks ergänzen.
5. Entwurfskennzeichnung nach Abschluss dieser Schritte entfernen.
6. Hosting- und Datenschutzangaben an Änderungen der eingesetzten Dienste anpassen.

Für ein statisches Hosting werden nur `index.html`, `rechtliches.html`, `styles.css`, `script.js`, `favicon.svg` und `serkowlalogo.png` benötigt. Der lokale Vorschau-Server ist kein Produktionshosting; die öffentliche Website wird separat von GitHub Pages ausgeliefert.

## Upload-Paket

`serkowla-upload.zip` enthält ausschließlich diese sechs Website-Dateien, direkt im ZIP-Hauptverzeichnis. Nach Abschluss der oben genannten Veröffentlichungsvoraussetzungen die Dateien in das für die Website vorgesehene Webroot des Hosters hochladen beziehungsweise bei einem statischen Hoster importieren. Keine Node.js-Laufzeit und kein Build-Schritt erforderlich.

Lokal kann das Paket ohne zusätzliche Werkzeuge außer `zip` erstellt werden:

```sh
zip serkowla-upload.zip index.html rechtliches.html styles.css script.js favicon.svg serkowlalogo.png
unzip -t serkowla-upload.zip
```

Das Paket enthält weiterhin die Entwurfskennzeichnung und unvollständige rechtliche Angaben. Eine technische Veröffentlichung macht diese Angaben nicht vollständig. Bestehende DNS-Einträge für E-Mail (insbesondere MX, SPF, DKIM und DMARC) bei einem späteren Hostingwechsel nicht unbesehen ersetzen.
