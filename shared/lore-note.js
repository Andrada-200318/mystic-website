// ---------- Lore notes: gentle disclaimers that rise like the cookie banner ----------
// Each note waits until the cookie banner has been answered, so the two never sit on top of each other.
// Once a visitor has read a note, that note stays away on later visits.
// To add one to a page, put this after the consent.js line, with the right number of ../ for the page,
// and set data-note to one of the notes below:
//   <script src="../../shared/lore-note.js" data-note="fairy" defer></script>

const loreNotes = {
  cauldron: {
    picture: "cauldron.svg",
    title: "A word from the cauldron",
    text: "The lore in these pages is gathered from folklore, tradition and moonlit wonder, not from the laboratory. It has not been evaluated by doctors or other professionals, and no crystal can take the place of their care. Keep your stones close for reflection and delight, and carry matters of body, mind, law and coin to a qualified professional.",
  },
  fairy: {
    picture: "fairy.svg",
    title: "A word from the fairies of the forest",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered information by wandering through folklore, moonlit wonder and enchanted forests. Keep the spells and potions for your own reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
  },
};

const loreChoice = document.currentScript.dataset.note;
const loreKey = `${loreChoice}Note`;

// Pages sit at different folder depths, so find the drawing from this script's own address
const loreBase = document.currentScript.src;

function loreNoteRead() {
  try {
    return localStorage.getItem(loreKey) === "read";
  } catch {
    return false;
  }
}

function rememberLoreNote() {
  try {
    localStorage.setItem(loreKey, "read");
  } catch {
    // Storage is blocked, so the note will simply appear again next visit
  }
}

function showLoreNote() {
  const { picture, title, text } = loreNotes[loreChoice];
  const note = document.createElement("section");
  note.className = "cookie-banner lore-banner";
  note.setAttribute("aria-label", "A note about the lore on this page");
  note.innerHTML = `
    <img src="${new URL(picture, loreBase).href}" alt="" width="200" height="200">
    <div>
      <p class="cookie-title">✦ ${title} ✦</p>
      <p class="cookie-text">${text}</p>
      <div class="cookie-buttons">
        <button class="ghost-button" type="button">So mote it be</button>
      </div>
    </div>`;
  note.querySelector("button").addEventListener("click", () => {
    rememberLoreNote();
    note.classList.add("is-leaving");
    setTimeout(() => note.remove(), 400);
  });
  document.body.appendChild(note);
}

function afterCookieBanner(next) {
  if (!document.getElementById("cookieBanner")) {
    next();
    return;
  }
  const watcher = new MutationObserver(() => {
    if (document.getElementById("cookieBanner")) return;
    watcher.disconnect();
    next();
  });
  watcher.observe(document.body, { childList: true });
}

if (!loreNoteRead()) afterCookieBanner(showLoreNote);
