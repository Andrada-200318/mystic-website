// ---------- Lore notes: gentle disclaimers that rise like the cookie banner ----------
// Each note waits until the cookie banner has been answered, so the two never sit on top of each other.
// Once a visitor has read a note, it stays away for that visit (refreshing won't bring it back),
// then returns the next time they come back in a new tab or browser window.
// To add one to a page, put this after the consent.js line, with the right number of ../ for the page,
// and set data-note to one of the notes below:
//   <script src="../../shared/lore-note.js" data-note="fairy" defer></script>

const loreNotes = {
  cauldron: {
    picture: "cauldron.svg",
    title: "A word from the cauldron",
    text: "The lore in these pages is gathered from folklore, tradition and moonlit wonder, not from the laboratory. It has not been evaluated by doctors or other professionals, and no crystal can take the place of their care. Keep your stones close for reflection and delight, and carry matters of body, mind, law and coin to a qualified professional.",
    ro: {
      title: "Un cuvânt din cazanul vrăjitoarei",
      text: "Credințele din aceste pagini sunt culese din folclor, din tradiție și din minunile nopților cu lună, nu din laborator. Ele nu au fost evaluate de medici sau de alți specialiști, iar niciun cristal nu le poate lua locul. Păstrează-ți pietrele aproape pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  fairy: {
    picture: "fairy.svg",
    title: "A word from the fairies of the forest",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered information by wandering through folklore, moonlit wonder and enchanted forests. Keep the spells and potions for your own reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la zânele pădurii",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste informații rătăcind prin folclor, prin minunile nopților cu lună și prin păduri fermecate. Păstrează vrăjile și poțiunile pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  banshee: {
    picture: "banshee.svg",
    title: "A word from the banshees",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered information by wandering through folklore, moonlit wonder and enchanted forests. Keep the spells and potions for your own reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la banshee",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste informații rătăcind prin folclor, prin minunile nopților cu lună și prin păduri fermecate. Păstrează vrăjile și poțiunile pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  elf: {
    picture: "elf.svg",
    title: "A word from the elves of the woodland",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered its crystal lore by wandering through starlit glades, ancient woodland halls and the old ways of the stone-keepers. No stone can take the place of a healer's care, so keep your crystals close for reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la elfii pădurii",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste credințe despre cristale rătăcind prin poieni luminate de stele, prin vechile săli ale codrului și pe urmele străvechilor păzitori ai pietrelor. Nicio piatră nu poate lua locul grijii unui vindecător, așa că păstrează-ți cristalele aproape pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  gnome: {
    picture: "gnome.svg",
    title: "A word from the garden gnomes",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered its star lore beneath the toadstools, reading the planets by lantern light among the roots of the old garden. No planet can sign your contracts or mend your heart for you, so keep these forecasts for reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la piticii din grădină",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste credințe despre stele sub pălăriile ciupercilor, citind planetele la lumina felinarului printre rădăcinile grădinii bătrâne. Nicio planetă nu-ți poate semna contractele sau vindeca inima în locul tău, așa că păstrează aceste previziuni pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  iele: {
    picture: "iele.svg",
    title: "A word from the Iele",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered its love lore while dancing the hora in moonlit clearings, where the grass never grows back, and by listening at the windows of old village weddings. No sprig of basil can choose your sweetheart for you, so keep these beliefs for reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la Iele",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste credințe despre dragoste dansând hora în poienile luminate de lună, unde iarba nu mai crește niciodată, și ascultând la ferestrele nunților de odinioară. Niciun fir de busuioc nu-ți poate alege ursitul în locul tău, așa că păstrează aceste credințe pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  sanziene: {
    picture: "sanziene.svg",
    title: "A word from the Sânziene",
    text: "This guide is intended for cosmic inspiration and entertainment, rather than a professional or scholarly review. We have gathered its household lore on Midsummer night, dancing through the fields in our crowns of yellow bedstraw and peeking through the windows of old village homes. No broom can sweep away true misfortune, so keep these beliefs for reflection and delight, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la Sânziene",
      text: "Acest ghid este menit să inspire și să încânte, nu să fie o lucrare profesională sau academică. Am adunat aceste credințe despre casă în noaptea de Sânziene, dansând prin câmpuri cu cununi de flori galbene și privind pe furiș prin ferestrele caselor bătrânești de la sat. Nicio mătură nu poate mătura un necaz adevărat, așa că păstrează aceste credințe pentru reflecție și încântare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
  butterfly: {
    picture: "butterfly.svg",
    title: "A word from the butterflies",
    text: "This guide is intended for cosmic inspiration and comfort, rather than a professional or scholarly review. We have gathered its lore fluttering past candlelit windows and village bell towers, listening to the stories grandmothers tell about the ones who have gone before us. No belief can take the place of real support in grief, so keep these stories for reflection and comfort, and carry matters of body, mind, law and coins to a qualified professional.",
    ro: {
      title: "Un cuvânt de la fluturi",
      text: "Acest ghid este menit să inspire și să aline, nu să fie o lucrare profesională sau academică. Am adunat aceste credințe zburând pe lângă ferestre luminate de lumânări și pe lângă clopotnițele satelor, ascultând poveștile pe care le spun bunicile despre cei care au plecat dintre noi. Nicio credință nu poate lua locul unui sprijin adevărat în vreme de doliu, așa că păstrează aceste povești pentru reflecție și alinare, iar grijile legate de sănătate, minte, lege și bani du-le la un specialist calificat.",
    },
  },
};

// Pages under /ro/ have <html lang="ro">: their notes speak Romanian where a translation exists
const loreInRomanian = document.documentElement.lang.startsWith("ro");

const loreChoice = document.currentScript.dataset.note;
const loreKey = `${loreChoice}Note`;

// Pages sit at different folder depths, so find the drawing from this script's own address
const loreBase = document.currentScript.src;

function loreNoteRead() {
  try {
    return sessionStorage.getItem(loreKey) === "read";
  } catch {
    return false;
  }
}

function rememberLoreNote() {
  try {
    sessionStorage.setItem(loreKey, "read");
  } catch {
    // Storage is blocked, so the note will simply appear again on the next page
  }
}

function showLoreNote() {
  const lore = loreNotes[loreChoice];
  const romanian = loreInRomanian && lore.ro;
  const { title, text } = romanian ? lore.ro : lore;
  const { picture } = lore;
  const note = document.createElement("section");
  note.className = "cookie-banner lore-banner";
  note.setAttribute("aria-label", romanian ? "O notă despre credințele din această pagină" : "A note about the lore on this page");
  note.innerHTML = `
    <img src="${new URL(picture, loreBase).href}" alt="" width="200" height="200">
    <div>
      <p class="cookie-title">✦ ${title} ✦</p>
      <p class="cookie-text">${text}</p>
      <div class="cookie-buttons">
        <button class="ghost-button" type="button">${romanian ? "Așa să fie" : "So mote it be"}</button>
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
