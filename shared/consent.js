// ---------- Cookie consent: Google Analytics only loads after a visitor says yes ----------
// GoatCounter uses no cookies, so it keeps counting visits without asking.

const analyticsId = "G-FRCX10CTS6";
const consentKey = "cookieConsent";

// Pages sit at different folder depths, so find the privacy page from this script's own address
const privacyUrl = new URL("../privacy/", document.currentScript.src).href;

function savedConsent() {
  try {
    return localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

function saveConsent(choice) {
  try {
    localStorage.setItem(consentKey, choice);
  } catch {
    // Storage is blocked, so the banner will simply ask again next visit
  }
}

function loadAnalytics() {
  window[`ga-disable-${analyticsId}`] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", analyticsId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);
}

// Stop Google Analytics and remove the cookies it left behind
function stopAnalytics() {
  window[`ga-disable-${analyticsId}`] = true;
  const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      document.cookie = name + expired;
      document.cookie = name + expired + "; domain=" + location.hostname;
      document.cookie = name + expired + "; domain=." + location.hostname;
    }
  });
}

// The banner's words, in English and in Romanian (pages under /ro/ have <html lang="ro">)
const cookieWords = {
  en: {
    label: "Cookie choice",
    title: "A small question before you wander on",
    text: "May we use Google Analytics cookies to see which rituals visitors enjoy? They are never used for ads. You can change your mind at any time.",
    privacy: "Read our privacy policy",
    accept: "Accept",
    decline: "Decline",
  },
  ro: {
    label: "Alegerea cookie-urilor",
    title: "O mică întrebare înainte să-ți continui drumul",
    text: "Putem folosi cookie-uri Google Analytics ca să vedem ce ritualuri le plac vizitatorilor? Nu le folosim niciodată pentru reclame. Te poți răzgândi oricând.",
    privacy: "Citește politica noastră de confidențialitate (în engleză)",
    accept: "Accept",
    decline: "Refuz",
  },
};

function showCookieBanner() {
  const open = document.getElementById("cookieBanner");
  if (open && !open.classList.contains("is-leaving")) return;
  if (open) open.remove();
  const words = document.documentElement.lang.startsWith("ro") ? cookieWords.ro : cookieWords.en;
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.id = "cookieBanner";
  banner.setAttribute("aria-label", words.label);
  banner.innerHTML = `
    <p class="cookie-title">✦ ${words.title} ✦</p>
    <p class="cookie-text">${words.text} <a href="${privacyUrl}">${words.privacy}</a></p>
    <div class="cookie-buttons">
      <button class="ghost-button" type="button" data-choice="granted">${words.accept}</button>
      <button class="ghost-button" type="button" data-choice="denied">${words.decline}</button>
    </div>`;
  banner.addEventListener("click", (event) => {
    const choice = event.target.dataset.choice;
    if (!choice) return;
    saveConsent(choice);
    if (choice === "granted") loadAnalytics();
    else stopAnalytics();
    banner.classList.add("is-leaving");
    setTimeout(() => banner.remove(), 400);
  });
  document.body.appendChild(banner);
}

if (savedConsent() === "granted") loadAnalytics();
else if (savedConsent() !== "denied") showCookieBanner();

// Any "Cookie settings" link on the page reopens the banner
document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
  button.addEventListener("click", showCookieBanner);
});
