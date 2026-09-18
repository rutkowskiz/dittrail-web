const translations = {
    en: {
        languageAria: "Language",
        backHomeAria: "Back to DitTrail home",
        eyebrow: "EARLY DEVELOPMENT PREVIEW",
        lead: "This is a very early build shared with friends and testers while DitTrail is still taking shape. Expect unfinished areas, changing behaviour and the occasional rough edge.",
        stateLabel: "WHAT WORKS RIGHT NOW",
        stateSections: "Practice · Settings",
        stateText: "At this stage only the Practice and Settings sections are functional. The rest is still under construction.",
        downloadButton: "Download DitTrail Demo",
        currentVersionLabel: "CURRENT VERSION",
        downloadSingular: "DOWNLOAD",
        downloadPlural: "DOWNLOADS",
        demoInfoAria: "Demo information",
        requirementsTitle: "Requirements",
        requirementsWindows: "<strong>Windows 10 or Windows 11</strong> is required.",
        requirementsResolution: "<strong>Full HD (1920 × 1080)</strong> is recommended. Smaller resolutions may scale incorrectly in this early build — no promises there yet. 🙂",
        installationTitle: "Installation",
        installation1: "Download <strong>DitTrailPublish.zip</strong>.",
        installation2: "Extract the entire ZIP archive to any folder on your PC.",
        installation3: "Open that folder and run the included <strong>.exe</strong> file.",
        quickStartTitle: "Quick start",
        quickKey: "<strong>No physical key is required.</strong> You can use the <kbd>[</kbd> and <kbd>]</kbd> keys as the two paddle inputs.",
        quickCheatSheet: "On the right side of the screen, use the <kbd>?</kbd> button to show or hide the built-in Morse alphabet cheat sheet.",
        quickAudioCue: "Press a character key on your keyboard to hear its <strong>CW audio cue</strong> — a quick sound hint for the selected Morse character.",
        lastThingTitle: "One last thing",
        lastThingText: "This is not an official DitTrail release yet. It is simply a convenient way to share the current build, gather feedback and let a few curious operators see where the project is heading.",
        backLink: "← Back to dittrail.com"
    },
    pl: {
        languageAria: "Język",
        backHomeAria: "Powrót na stronę główną DitTrail",
        eyebrow: "WCZESNA WERSJA ROZWOJOWA",
        lead: "To bardzo wczesna wersja DitTrail, udostępniona znajomym i testerom jeszcze w trakcie rozwoju programu. Część elementów jest niedokończona, zachowanie aplikacji może się zmieniać, a od czasu do czasu może trafić się coś niedopracowanego.",
        stateLabel: "CO DZIAŁA OBECNIE",
        stateSections: "Trening · Ustawienia",
        stateText: "Na tym etapie działają tylko zakładki Trening i Ustawienia. Pozostałe części programu są jeszcze w budowie.",
        downloadButton: "Pobierz DitTrail Demo",
        currentVersionLabel: "AKTUALNA WERSJA",
        downloadOne: "POBRANIE",
        downloadFew: "POBRANIA",
        downloadMany: "POBRAŃ",
        demoInfoAria: "Informacje o wersji demonstracyjnej",
        requirementsTitle: "Wymagania",
        requirementsWindows: "Wymagany jest <strong>Windows 10 lub Windows 11</strong>.",
        requirementsResolution: "Zalecana jest rozdzielczość <strong>Full HD (1920 × 1080)</strong>. Na mniejszych rozdzielczościach ta wczesna wersja może skalować się nieprawidłowo — nie przyjmuję reklamacji. 🙂",
        installationTitle: "Instalacja",
        installation1: "Pobierz plik <strong>DitTrailPublish.zip</strong>.",
        installation2: "Rozpakuj całe archiwum ZIP do dowolnego folderu na komputerze.",
        installation3: "Otwórz rozpakowany folder i uruchom znajdujący się w nim plik <strong>.exe</strong>.",
        quickStartTitle: "Szybki start",
        quickKey: "<strong>Fizyczny klucz nie jest potrzebny.</strong> Do nadawania możesz używać klawiszy <kbd>[</kbd> i <kbd>]</kbd>.",
        quickCheatSheet: "Po prawej stronie ekranu, pod przyciskiem <kbd>?</kbd>, możesz włączyć lub wyłączyć wbudowaną ściągę z alfabetu Morse'a.",
        quickAudioCue: "Naciśnij znak na klawiaturze aby usłyszeć jak powinien zabrzmieć.",
        lastThingTitle: "Na koniec",
        lastThingText: "To jeszcze nie jest oficjalne wydanie DitTrail. Ta strona służy do wygodnego udostępniania aktualnej wersji i pokazywania kilku ciekawskim operatorom, w jakim kierunku rozwija się projekt.",
        backLink: "← Powrót do dittrail.com"
    }
};

const LANGUAGE_KEY = "dittrail-language";
const LEGACY_LANGUAGE_KEY = "dittrail-demo-language";
const DOWNLOAD_COUNT_API = "https://api.github.com/repos/rutkowskiz/dittrail-web/releases/tags/demo";
const DOWNLOAD_ASSET_NAME = "DitTrailPublish.zip";
let currentDownloadCount = null;

function getPolishDownloadLabel(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (count === 1) {
        return translations.pl.downloadOne;
    }

    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
        return translations.pl.downloadFew;
    }

    return translations.pl.downloadMany;
}

function updateDownloadCountText() {
    if (!Number.isInteger(currentDownloadCount) || currentDownloadCount < 0) {
        return;
    }

    const badge = document.getElementById("download-count");
    const value = document.getElementById("download-count-value");
    const label = document.getElementById("download-count-label");

    if (!badge || !value || !label) {
        return;
    }

    const language = document.documentElement.lang === "pl" ? "pl" : "en";
    value.textContent = String(currentDownloadCount);
    label.textContent = language === "pl"
        ? getPolishDownloadLabel(currentDownloadCount)
        : (currentDownloadCount === 1 ? translations.en.downloadSingular : translations.en.downloadPlural);

    badge.hidden = false;
}

async function loadDownloadCount() {
    try {
        const response = await fetch(DOWNLOAD_COUNT_API, {
            headers: {
                Accept: "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            return;
        }

        const release = await response.json();
        const asset = Array.isArray(release.assets)
            ? release.assets.find((item) => item && item.name === DOWNLOAD_ASSET_NAME)
            : null;

        if (!asset || !Number.isInteger(asset.download_count) || asset.download_count < 0) {
            return;
        }

        currentDownloadCount = asset.download_count;
        updateDownloadCountText();
    } catch {
        // The counter is optional. Keep it hidden if GitHub cannot be reached.
    }
}

function applyLanguage(language) {
    const selected = translations[language] ? language : "en";
    const dictionary = translations[selected];

    document.documentElement.lang = selected;
    document.title = selected === "pl"
        ? "DitTrail Demo — wczesna wersja rozwojowa"
        : "DitTrail Demo — Early Development Preview";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.dataset.i18nHtml;
        if (dictionary[key]) {
            element.innerHTML = dictionary[key];
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
    updateDownloadCountText();
}

function initialiseLanguageSwitcher() {
    const savedLanguage =
        localStorage.getItem(LANGUAGE_KEY) ||
        localStorage.getItem(LEGACY_LANGUAGE_KEY);
    const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en";
    const initialLanguage = savedLanguage || browserLanguage;

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });

    applyLanguage(initialLanguage);
    loadDownloadCount();
}

document.addEventListener("DOMContentLoaded", initialiseLanguageSwitcher);
