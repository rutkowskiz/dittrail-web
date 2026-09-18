const translations = {
    en: {
        languageAria: "Language",
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
        tagline: "TWOJA DROGA DO CW",
        journey: "Od pierwszego dit do pierwszego QSO",
        description: "Nowoczesna aplikacja desktopowa, która krok po kroku poprowadzi Cię od pierwszych znaków Morse’a do swobodnej pracy CW.",
        status: "W rozwoju",
        learnTitle: "Ucz się",
        learnText: "Rozwijaj umiejętności CW stopniowo, jasną drogą od samych podstaw.",
        listenTitle: "Słuchaj",
        listenText: "Ćwicz słuch, aby rozpoznawać Morse’a naturalnie i pewnie.",
        keyTitle: "Nadaj",
        keyText: "Ćwicz nadawanie i rozwijaj precyzyjny timing oraz rytm.",
        createdBy: "Autor",
        footerText: "© 2026 DitTrail · oprogramowanie do nauki CW"
    }
};

const LANGUAGE_KEY = "dittrail-language";
const LEGACY_DEMO_LANGUAGE_KEY = "dittrail-demo-language";

function applyLanguage(language) {
    const selected = translations[language] ? language : "en";
    const dictionary = translations[selected];

    document.documentElement.lang = selected;
    document.title = selected === "pl"
        ? "DitTrail — Twoja droga do CW"
        : "DitTrail — Your path to CW";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute(
            "content",
            selected === "pl"
                ? "DitTrail to nowoczesna aplikacja do nauki CW. Od pierwszego dit do pierwszego QSO."
                : "DitTrail is a modern CW learning application. From your first dit to your first QSO."
        );
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

function initialiseLanguageSwitcher() {
    const savedLanguage =
        localStorage.getItem(LANGUAGE_KEY) ||
        localStorage.getItem(LEGACY_DEMO_LANGUAGE_KEY);

    const browserLanguage =
        navigator.language && navigator.language.toLowerCase().startsWith("pl")
            ? "pl"
            : "en";

    const initialLanguage = savedLanguage || browserLanguage;

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });

    applyLanguage(initialLanguage);
}

document.addEventListener("DOMContentLoaded", initialiseLanguageSwitcher);
