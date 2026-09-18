const translations = {
    en: {
        languageAria: "Language",
        pageTitle: "DitTrail — Your path to CW",
        metaDescription: "DitTrail is a modern CW learning application. From your first dit to your first QSO.",
        tagline: "YOUR PATH TO CW",
        journey: "From first dit to first QSO",
        description: "A modern desktop application designed to guide you step by step from learning your first Morse characters to confident CW operation.",
        status: "In development",
        learnTitle: "Learn",
        learnText: "Build your CW skills progressively, with a clear path from the very beginning.",
        listenTitle: "Listen",
        listenText: "Train your ear to recognize Morse naturally and confidently.",
        keyTitle: "Key",
        keyText: "Practice sending and develop accurate timing and rhythm.",
        createdBy: "Created by",
        footerText: "© 2026 DitTrail · CW learning software"
    },
    pl: {
        languageAria: "Język",
        pageTitle: "DitTrail — Twoja droga do CW",
        metaDescription: "DitTrail to nowoczesna aplikacja do nauki CW. Od pierwszej kropki do pierwszej łączności.",
        tagline: "TWOJA DROGA DO CW",
        journey: "od pierwszej 'kropki' do pierwszej łączności",
        description: "Nowoczesna aplikacja desktopowa, która krok po kroku poprowadzi Cię od pierwszych znaków Morse’a do swobodnej pracy CW.",
        status: "W przygotowaniu",
        learnTitle: "Ucz się",
        learnText: "Ucz się CW krok po kroku i od początku buduj solidne podstawy.",
        listenTitle: "Słuchaj",
        listenText: "Ćwicz słuch, aby rozpoznawać Morse’a naturalnie i pewnie.",
        keyTitle: "Nadawaj",
        keyText: "Ćwicz nadawanie i rozwijaj precyzyjny timing oraz rytm.",
        createdBy: "Autor",
        footerText: "© 2026 DitTrail · oprogramowanie do nauki CW"
    },
    de: {
        languageAria: "Sprache",
        pageTitle: "DitTrail — Dein Weg zu CW",
        metaDescription: "DitTrail ist eine moderne App zum CW-Lernen. Vom ersten Dit bis zum ersten QSO.",
        tagline: "DEIN WEG ZU CW",
        journey: "Vom ersten Dit bis zum ersten QSO",
        description: "Eine moderne Desktop-App, die dich Schritt für Schritt von den ersten Morsezeichen bis zum sicheren CW-Betrieb begleitet.",
        status: "In Entwicklung",
        learnTitle: "Lernen",
        learnText: "Lerne CW Schritt für Schritt und baue von Anfang an solide Grundlagen auf.",
        listenTitle: "Hören",
        listenText: "Trainiere dein Gehör, um Morsezeichen natürlich und sicher zu erkennen.",
        keyTitle: "Geben",
        keyText: "Übe das Geben und entwickle präzises Timing und Rhythmus.",
        createdBy: "Erstellt von",
        footerText: "© 2026 DitTrail · CW-Lernsoftware"
    },
    it: {
        languageAria: "Lingua",
        pageTitle: "DitTrail — Il tuo percorso verso il CW",
        metaDescription: "DitTrail è una moderna applicazione per imparare il CW. Dal primo dit al primo QSO.",
        tagline: "IL TUO PERCORSO VERSO IL CW",
        journey: "Dal primo dit al primo QSO",
        description: "Una moderna app desktop che ti guida passo dopo passo dai primi caratteri Morse fino a operare in CW con sicurezza.",
        status: "In sviluppo",
        learnTitle: "Impara",
        learnText: "Impara il CW passo dopo passo e costruisci solide basi fin dall’inizio.",
        listenTitle: "Ascolta",
        listenText: "Allena l’orecchio a riconoscere il Morse in modo naturale e sicuro.",
        keyTitle: "Trasmetti",
        keyText: "Esercitati nella trasmissione e sviluppa timing e ritmo precisi.",
        createdBy: "Creato da",
        footerText: "© 2026 DitTrail · software per imparare il CW"
    },
    cs: {
        languageAria: "Jazyk",
        pageTitle: "DitTrail — Tvá cesta k CW",
        metaDescription: "DitTrail je moderní aplikace pro výuku CW. Od první tečky k prvnímu QSO.",
        tagline: "TVÁ CESTA K CW",
        journey: "Od první tečky k prvnímu QSO",
        description: "Moderní desktopová aplikace, která tě krok za krokem provede od prvních znaků Morseovy abecedy k jistému provozu CW.",
        status: "Ve vývoji",
        learnTitle: "Uč se",
        learnText: "Uč se CW krok za krokem a od začátku si buduj pevné základy.",
        listenTitle: "Poslouchej",
        listenText: "Trénuj sluch, abys Morseovu abecedu rozpoznával přirozeně a jistě.",
        keyTitle: "Vysílej",
        keyText: "Procvičuj vysílání a rozvíjej přesné časování a rytmus.",
        createdBy: "Vytvořil",
        footerText: "© 2026 DitTrail · software pro výuku CW"
    },
    es: {
        languageAria: "Idioma",
        pageTitle: "DitTrail — Tu camino hacia CW",
        metaDescription: "DitTrail es una moderna aplicación para aprender CW. De tu primer dit a tu primer QSO.",
        tagline: "TU CAMINO HACIA CW",
        journey: "De tu primer dit a tu primer QSO",
        description: "Una moderna aplicación de escritorio que te guía paso a paso desde tus primeros caracteres Morse hasta operar CW con confianza.",
        status: "En desarrollo",
        learnTitle: "Aprende",
        learnText: "Aprende CW paso a paso y construye una base sólida desde el principio.",
        listenTitle: "Escucha",
        listenText: "Entrena el oído para reconocer el Morse de forma natural y segura.",
        keyTitle: "Transmite",
        keyText: "Practica la transmisión y desarrolla una temporización y un ritmo precisos.",
        createdBy: "Creado por",
        footerText: "© 2026 DitTrail · software para aprender CW"
    }
};

const LANGUAGE_KEY = "dittrail-language";
const LEGACY_DEMO_LANGUAGE_KEY = "dittrail-demo-language";

function applyLanguage(language) {
    const selected = translations[language] ? language : "en";
    const dictionary = translations[selected];

    document.documentElement.lang = selected;
    document.title = dictionary.pageTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", dictionary.metaDescription);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.dataset.i18nAria;
        if (dictionary[key]) {
            element.setAttribute("aria-label", dictionary[key]);
        }
    });

    document.querySelectorAll(".language-button").forEach((button) => {
        const isActive = button.dataset.language === selected;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem(LANGUAGE_KEY, selected);
}

function getInitialLanguage() {
    const savedLanguage =
        localStorage.getItem(LANGUAGE_KEY) ||
        localStorage.getItem(LEGACY_DEMO_LANGUAGE_KEY);

    if (translations[savedLanguage]) {
        return savedLanguage;
    }

    const browserLanguage = (navigator.language || "en")
        .toLowerCase()
        .split("-")[0];

    return translations[browserLanguage] ? browserLanguage : "en";
}

function initialiseLanguageSwitcher() {
    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });

    applyLanguage(getInitialLanguage());
}

document.addEventListener("DOMContentLoaded", initialiseLanguageSwitcher);
