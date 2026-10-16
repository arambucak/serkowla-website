const projects = {
  parentpeak: {
    title: "ParentPeak",
    category: "FAMILIE & LIFESTYLE",
    description: "Ein warmer, werbefreier Ort für den Familienalltag. ParentPeak bündelt Elternberatung, Organisation und Austausch – bedürfnisorientiert und mit Blick auf das Miteinander.",
    features: [
      "KI-Elternberatung mit pädagogischer Ausrichtung an GfK, Hüther und Juul.",
      "Familienkalender, altersgerechte Rezepte und Events in der Nähe.",
      "Verschenkmarkt und Eltern-Netzwerk für Austausch und Unterstützung.",
      "Familien-Geld als Leistungswegweiser und altersbezogene Entwicklungs-Impulse."
    ],
    note: "Weitere Informationen zum Produkt findest du auf parentpeak.com.",
    url: "https://www.parentpeak.com"
  },
  movemal: {
    title: "movemal",
    category: "WOHNEN & MATCHING",
    description: "Wohnungen tauschen statt endlos suchen. movemal überträgt das Matching-Prinzip auf die Wohnungssuche: Ein Match entsteht nur, wenn der Tausch für beide Seiten passt.",
    features: [
      "Die eigene Wohnung mit Fotos und Eckdaten vorstellen und Suchwünsche festlegen.",
      "Passende Wohnungen per Swipe entdecken.",
      "Beidseitiges Matching mit Tausch-Score.",
      "Nach dem Match im Chat Besichtigung, Zeitraum und Vermieterzustimmung klären."
    ],
    note: "Eigenes Produkt. Ein öffentlicher Produktlink und Angaben zur Verfügbarkeit werden ergänzt, sobald sie feststehen."
  },
  flip: {
    title: "Flip Counter",
    category: "SPIELE & TOOLS",
    description: "Ein inoffizieller Begleiter für das Kartenspiel Flip 7. Gebaut mit React Native, Expo und TypeScript – komplett offline und ohne Backend.",
    features: [
      "Runden durch Antippen der Karten oder direkte Eingabe der Summe erfassen.",
      "Automatische Erkennung von Flip 7 und Duplikaten sowie eine getrennte, getestete Wertungslogik.",
      "Laufende Partie und Spracheinstellung bleiben nach einem App-Neustart erhalten.",
      "Deutsch und Englisch mit automatischer Spracherkennung.",
      "Ergebnisse als Bild im Story-Format über das native Teilen-Menü weitergeben."
    ],
    note: "Unabhängige Fan-App ohne offizielle Verbindung zu The Op. Flip 7 ist ein Produkt von The Op. Ein Downloadlink wird erst nach bestätigter Veröffentlichung ergänzt."
  },
  trade: {
    title: "Trade of Kurdistan",
    category: "FINANZEN & ANALYSE",
    description: "Ein Trading-Dashboard für Binance USDⓈ-M Krypto-Futures. Im Mittelpunkt stehen strukturierte Analyse und disziplinierte Entscheidungen statt möglichst vieler Signale.",
    features: [
      "Multi-Timeframe-Konfluenz: Trend, Zone und Trigger müssen über drei Zeitebenen übereinstimmen.",
      "Live-Charts per Binance-WebSocket mit Ichimoku, Fibonacci und frei wählbaren Zeitrahmen.",
      "SMC/ICT und Chart-Formationen als Kontext – ausdrücklich nicht als zusätzliche Signalquelle.",
      "Strukturbasierter Stop, Take-Profit-Stufen, Chance-Risiko-Verhältnis und Positionsgröße.",
      "Journal und Alerts für bestätigte Setups."
    ],
    note: "Ein Analysewerkzeug, keine Anlageberatung und kein Renditeversprechen. Der Handel mit Krypto-Futures kann zum vollständigen Verlust des eingesetzten Kapitals führen. Die Website-Vorschau enthält keine Live-Marktdaten."
  }
};

document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

if (menuToggle && navigation) {
  menuToggle.hidden = false;
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    navigation.classList.toggle("is-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 601px)").addEventListener("change", () => setMenuOpen(false));
}

const dialog = document.querySelector("#project-dialog");

if (dialog instanceof HTMLDialogElement) {
  const title = dialog.querySelector("#dialog-title");
  const category = dialog.querySelector("#dialog-category");
  const description = dialog.querySelector("#dialog-description");
  const features = dialog.querySelector("#dialog-features");
  const note = dialog.querySelector("#dialog-note");
  const link = dialog.querySelector("#dialog-link");
  const closeButton = dialog.querySelector(".dialog-close");

  if (title && category && description && features && note && link instanceof HTMLAnchorElement && closeButton) {
    document.querySelectorAll("[data-project]").forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      const project = projects[button.dataset.project];
      if (!project) {
        console.error("Unbekanntes Projekt:", button.dataset.project);
        return;
      }
      button.hidden = false;
      button.addEventListener("click", () => {
        title.textContent = project.title;
        category.textContent = project.category;
        description.textContent = project.description;
        note.textContent = project.note;
        features.replaceChildren(...project.features.map((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          return item;
        }));
        link.hidden = !project.url;
        if (project.url) link.href = project.url;
        else link.removeAttribute("href");
        dialog.showModal();
        dialog.scrollTop = 0;
        document.body.classList.add("dialog-open");
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });
    dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  }
}

const copyrightYear = document.querySelector("#copyright-year");
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());
