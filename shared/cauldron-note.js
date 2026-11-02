// ---------- The cauldron's note: a gentle disclaimer that rises like the cookie banner ----------
// It waits until the cookie banner has been answered, so the two never sit on top of each other.
// Once a visitor has read it, it stays away on later visits.
// To add it to another page, put this after the consent.js line, with the right number of ../ for the page:
//   <script src="../../shared/cauldron-note.js" defer></script>

const cauldronKey = "cauldronNote";

// Pages sit at different folder depths, so find the drawing from this script's own address
const cauldronPicture = new URL("cauldron.svg", document.currentScript.src).href;

function cauldronNoteRead() {
  try {
    return localStorage.getItem(cauldronKey) === "read";
  } catch {
    return false;
  }
}

function rememberCauldronNote() {
  try {
    localStorage.setItem(cauldronKey, "read");
  } catch {
    // Storage is blocked, so the note will simply appear again next visit
  }
}

function showCauldronNote() {
  const note = document.createElement("section");
  note.className = "cookie-banner cauldron-banner";
  note.setAttribute("aria-label", "A note about the lore on this page");
  note.innerHTML = `
    <img src="${cauldronPicture}" alt="" width="200" height="200">
    <div>
      <p class="cookie-title">✦ A word from the cauldron ✦</p>
      <p class="cookie-text">The lore in these pages is gathered from folklore, tradition and moonlit wonder, not from the laboratory. It has not been evaluated by doctors or other professionals, and no crystal can take the place of their care. Keep your stones close for reflection and delight, and carry matters of body, mind, law and coin to a qualified professional.</p>
      <div class="cookie-buttons">
        <button class="ghost-button" type="button">So mote it be</button>
      </div>
    </div>`;
  note.querySelector("button").addEventListener("click", () => {
    rememberCauldronNote();
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

if (!cauldronNoteRead()) afterCookieBanner(showCauldronNote);
