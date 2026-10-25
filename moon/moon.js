const phases = [
  {
    name: "New Moon",
    theme: "New beginnings",
    mode: "draw",
    text: "The sky is dark and full of possibility. This is the moment to plant a seed: name what you want to begin.",
    closing: "Write your intention down tonight and keep it somewhere you will see it every day.",
    favoured: ["white", "citrine", "bay"]
  },
  {
    name: "Waxing Crescent",
    theme: "Intention",
    mode: "draw",
    text: "The first silver sliver appears. Your intention is taking its first breath, so nurture it with small, steady steps.",
    closing: "Take one small step toward your intention before the week is out.",
    favoured: ["gold", "rose", "bay"]
  },
  {
    name: "First Quarter",
    theme: "Courage",
    mode: "draw",
    text: "Half lit and half dark. Challenges may appear to test your resolve, so act with courage and keep going.",
    closing: "When an obstacle appears, treat it as proof that your wish is already moving.",
    favoured: ["gold", "citrine", "rosemary"]
  },
  {
    name: "Waxing Gibbous",
    theme: "Refinement",
    mode: "draw",
    text: "The moon is nearly full. Refine, adjust and trust that what you planted is ripening.",
    closing: "Look at your plans with fresh eyes and polish the details. The harvest is close.",
    favoured: ["violet", "amethyst", "chamomile"]
  },
  {
    name: "Full Moon",
    theme: "Illumination",
    mode: "draw",
    text: "The moon is at her brightest and what was hidden is revealed. Celebrate how far you have come and charge your intentions in her light.",
    closing: "Leave a glass of water or your favourite crystal on the windowsill tonight to soak up her light.",
    favoured: ["white", "amethyst", "lavender"]
  },
  {
    name: "Waning Gibbous",
    theme: "Gratitude",
    mode: "release",
    text: "The light begins to soften. Give thanks, share what you have learned and let wisdom settle.",
    closing: "Before you sleep, name three things you are grateful for this month.",
    favoured: ["gold", "rose", "chamomile"]
  },
  {
    name: "Last Quarter",
    theme: "Release",
    mode: "release",
    text: "Half light again, but turning inward. Clear away what no longer serves you: forgive, declutter and let go.",
    closing: "Write down one thing you are ready to release, then tear the paper up and throw it away.",
    favoured: ["black", "obsidian", "rosemary"]
  },
  {
    name: "Waning Crescent",
    theme: "Rest",
    mode: "release",
    text: "The last thin crescent before darkness. Rest, reflect and make space for the cycle that is coming.",
    closing: "Go to bed a little earlier tonight. Your dreams have something to tell you.",
    favoured: ["violet", "amethyst", "lavender"]
  }
];

const offerings = {
  candle: [
    { id: "white", name: "White Candle", short: "White", color: "#f4efe4", keyword: "clarity",
      draw: "White light clears the air and lets you begin with a clean slate.",
      release: "White light washes away confusion and leaves only what is true." },
    { id: "violet", name: "Violet Candle", short: "Violet", color: "#8a4fc4", keyword: "intuition",
      draw: "The violet flame opens your inner sight. Trust the quiet nudges you feel.",
      release: "The violet flame dissolves old doubts so your inner voice can be heard again." },
    { id: "gold", name: "Gold Candle", short: "Gold", color: "#e0b04f", keyword: "abundance",
      draw: "Golden light calls in success, warmth and plenty.",
      release: "Golden light melts away the fear that there will never be enough." },
    { id: "black", name: "Black Candle", short: "Black", color: "#2a2033", keyword: "protection",
      draw: "The black candle draws a circle of protection around your intentions.",
      release: "The black candle soaks up heavy energy and carries it away from you." }
  ],
  crystal: [
    { id: "amethyst", name: "Amethyst", short: "Amethyst", color: "#9b5fd6", keyword: "calm",
      draw: "Amethyst steadies the mind and invites peaceful, prophetic dreams.",
      release: "Amethyst soothes worry and helps you let go of restless thoughts." },
    { id: "rose", name: "Rose Quartz", short: "Rose Quartz", color: "#f2a9c4", keyword: "love",
      draw: "Rose quartz opens the heart to love, starting with love for yourself.",
      release: "Rose quartz gently heals old hurts so your heart can soften." },
    { id: "citrine", name: "Citrine", short: "Citrine", color: "#f0b93a", keyword: "confidence",
      draw: "Citrine brings sunshine, courage and the confidence to be seen.",
      release: "Citrine burns through self-doubt and lights up your own worth." },
    { id: "obsidian", name: "Obsidian", short: "Obsidian", color: "#2b2233", keyword: "grounding",
      draw: "Obsidian roots you firmly so your plans can grow on solid ground.",
      release: "Obsidian acts as a mirror, showing you what you are ready to leave behind." }
  ],
  herb: [
    { id: "lavender", name: "Lavender", short: "Lavender", keyword: "peace",
      look: { leaf: "#7f9a6a", width: 1.4, length: 5, count: 3, bud: "spike", budColor: "#9b6fd0" },
      draw: "Lavender wraps your ritual in peace and invites restful sleep.",
      release: "Lavender eases tension and lets anxious feelings float away." },
    { id: "rosemary", name: "Rosemary", short: "Rosemary", keyword: "renewal",
      look: { leaf: "#4f7a55", width: 1.3, length: 5.5, count: 9 },
      draw: "Rosemary sharpens your memory and strengthens your resolve.",
      release: "Rosemary sweeps away stale energy and purifies your space." },
    { id: "bay", name: "Bay Leaf", short: "Bay Leaf", keyword: "wishes",
      look: { leaf: "#5d8a4a", width: 4.5, length: 9, count: 4 },
      draw: "Bay leaf carries wishes upward. It is said that whatever is written on it comes true.",
      release: "Bay leaf turns what you let go of into room for victory." },
    { id: "chamomile", name: "Chamomile", short: "Chamomile", keyword: "gentle luck",
      look: { leaf: "#86a86a", width: 1, length: 4, count: 4, bud: "daisy" },
      draw: "Chamomile invites gentle luck and sweet rest.",
      release: "Chamomile calms frayed nerves and lets tension drift away." }
  ]
};

const kindLabels = { candle: "Candle", crystal: "Crystal", herb: "Herb" };

const synodicMonth = 29.530588853;
const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
const dayMs = 86400000;
const storageKey = "moonAltar";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const moon = document.getElementById("moon");
const moonLit = document.getElementById("moonLit");
const litClipPath = document.getElementById("litClipPath");
const altar = document.getElementById("altar");
const altarHint = document.getElementById("altarHint");
const candleSpot = document.getElementById("candleSpot");
const spots = { candle: candleSpot, crystal: document.getElementById("crystalSpot"), herb: document.getElementById("herbSpot") };
const rows = { candle: document.getElementById("candleRow"), crystal: document.getElementById("crystalRow"), herb: document.getElementById("herbRow") };
const ritualLog = document.getElementById("ritualLog");
const reading = document.getElementById("reading");
const readingCards = document.getElementById("readingCards");
const readingSummary = document.getElementById("readingSummary");
const clearButton = document.getElementById("clearButton");

const now = new Date();
const age = moonAge(now);
const fraction = age / synodicMonth;
const phase = phases[Math.floor(fraction * 8 + 0.5) % 8];

let choices = { candle: null, crystal: null, herb: null };
let isLit = false;

// Days since the last new moon, counted from a known new moon in January 2000
function moonAge(date) {
  const days = (date.getTime() - knownNewMoon) / dayMs;
  return ((days % synodicMonth) + synodicMonth) % synodicMonth;
}

// The lit part is a half circle plus the curved shadow line (an ellipse that narrows toward the quarters)
function litPath(fraction) {
  const r = 80;
  const rx = (Math.abs(Math.cos(fraction * 2 * Math.PI)) * r).toFixed(2);
  const top = "100 20";
  const bottom = "100 180";

  if (fraction < 0.5) {
    const sweep = fraction < 0.25 ? 0 : 1;
    return `M${top} A${r} ${r} 0 0 1 ${bottom} A${rx} ${r} 0 0 ${sweep} ${top}Z`;
  }
  const sweep = fraction < 0.75 ? 0 : 1;
  return `M${top} A${r} ${r} 0 0 0 ${bottom} A${rx} ${r} 0 0 ${sweep} ${top}Z`;
}

function showMoon() {
  const illumination = Math.round((1 - Math.cos(fraction * 2 * Math.PI)) / 2 * 100);
  const path = litPath(fraction);
  moonLit.setAttribute("d", path);
  litClipPath.setAttribute("d", path);
  moon.style.setProperty("--glow", (0.25 + illumination / 100 * 0.75).toFixed(2));
  moon.setAttribute("aria-label", `The moon tonight: ${phase.name}, ${illumination}% illuminated`);

  const daysToFull = (synodicMonth / 2 - age + synodicMonth) % synodicMonth;
  const fullDate = new Date(now.getTime() + daysToFull * dayMs);
  const wholeDays = Math.round(daysToFull);
  let nextFull;
  if (phase.name === "Full Moon" && (daysToFull < 2 || daysToFull > synodicMonth - 2)) {
    nextFull = "Tonight";
  } else {
    const when = fullDate.toLocaleDateString(undefined, { day: "numeric", month: "short" });
    nextFull = `${when} · in ${wholeDays} ${wholeDays === 1 ? "day" : "days"}`;
  }

  document.getElementById("moonDate").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  document.getElementById("phaseName").textContent = phase.name;
  document.getElementById("phaseTheme").textContent = `A time of ${phase.theme.toLowerCase()}`;
  document.getElementById("phaseText").textContent = phase.text;
  document.getElementById("moonIllumination").textContent = illumination + "%";
  document.getElementById("moonAge").textContent = `Day ${Math.floor(age) + 1} of 29.5`;
  document.getElementById("nextFull").textContent = nextFull;
}

// ---------- Drawings of the offerings ----------

function candleSVG(item) {
  return `
    <svg viewBox="0 0 60 130" aria-hidden="true">
      <g class="flame">
        <ellipse class="flame-halo" cx="30" cy="22" rx="18" ry="24"/>
        <path class="flame-body" d="M30 4 C39 16 41 25 36 33 C33 37 27 37 24 33 C19 25 21 16 30 4Z" fill="url(#flameFill)"/>
        <path class="flame-core" d="M30 17 C33 23 33 28 31.5 31 C30.5 33 29.5 33 28.5 31 C27 28 27 23 30 17Z"/>
      </g>
      <line x1="30" y1="31" x2="30" y2="42" stroke="#2a1a10" stroke-width="1.6" stroke-linecap="round"/>
      <rect x="18" y="40" width="24" height="74" rx="3" fill="${item.color}"/>
      <path d="M18 44 Q18 54 21 54 Q24 54 24 46 Q26 60 29 60 Q32 60 32 46 L42 44 V40 H18Z" fill="${item.color}"/>
      <rect x="18" y="40" width="24" height="74" rx="3" fill="url(#waxShade)"/>
      <ellipse cx="30" cy="41" rx="12" ry="2.6" fill="#fff" opacity="0.22"/>
      <path d="M8 112 H52 L46 120 H14Z" fill="url(#brass)"/>
      <ellipse cx="30" cy="122" rx="23" ry="4.5" fill="url(#brass)"/>
    </svg>`;
}

function crystalSVG(item) {
  return `
    <svg viewBox="0 0 60 72" aria-hidden="true">
      <ellipse cx="30" cy="68" rx="24" ry="3.5" fill="#000" opacity="0.35"/>
      <polygon points="30,2 46,20 42,68 18,68 14,20" fill="${item.color}"/>
      <polygon points="30,2 46,20 30,27" fill="#fff" opacity="0.35"/>
      <polygon points="30,2 30,27 14,20" fill="#fff" opacity="0.15"/>
      <polygon points="30,27 46,20 42,68 30,68" fill="#000" opacity="0.22"/>
      <polygon points="14,20 30,27 30,68 18,68" fill="#fff" opacity="0.06"/>
      <polygon points="47,38 54,45 52,68 42,68 41,45" fill="${item.color}"/>
      <polygon points="47,38 54,45 47,48 41,45" fill="#fff" opacity="0.3"/>
      <polygon points="47,48 54,45 52,68 47,68" fill="#000" opacity="0.25"/>
      <polygon points="9,44 16,52 15,68 5,68 3,52" fill="${item.color}"/>
      <polygon points="9,44 16,52 9,55 3,52" fill="#fff" opacity="0.3"/>
      <polygon points="9,55 16,52 15,68 9,68" fill="#000" opacity="0.25"/>
    </svg>`;
}

// A point and direction along a curved stem from (x0, y0) through control (cx, cy) to (x1, y1)
function curvePoint(stem, t) {
  const [x0, y0, cx, cy, x1, y1] = stem;
  const u = 1 - t;
  return {
    x: u * u * x0 + 2 * u * t * cx + t * t * x1,
    y: u * u * y0 + 2 * u * t * cy + t * t * y1,
    angle: Math.atan2(2 * u * (cy - y0) + 2 * t * (y1 - cy), 2 * u * (cx - x0) + 2 * t * (x1 - cx)) * 180 / Math.PI
  };
}

function herbSVG(item) {
  const look = item.look;
  const stems = [[30, 90, 26, 50, 15, 12], [30, 90, 30, 48, 30, 5], [30, 90, 34, 50, 45, 14]];
  let parts = "";

  stems.forEach(function(stem) {
    parts += `<path d="M${stem[0]} ${stem[1]} Q${stem[2]} ${stem[3]} ${stem[4]} ${stem[5]}" fill="none" stroke="#5b6b3c" stroke-width="1.4"/>`;

    const last = look.bud ? 0.72 : 0.95;
    for (let i = 0; i < look.count; i++) {
      const t = 0.3 + (last - 0.3) * (i / Math.max(1, look.count - 1));
      const point = curvePoint(stem, t);
      const side = i % 2 === 0 ? -1 : 1;
      const tilt = point.angle + 90 + side * 40;
      const radians = (point.angle + side * 90) * Math.PI / 180;
      const x = point.x + Math.cos(radians) * look.length * 0.7;
      const y = point.y + Math.sin(radians) * look.length * 0.7;
      parts += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${look.width}" ry="${look.length}" transform="rotate(${tilt.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${look.leaf}"/>`;
    }

    if (look.bud === "spike") {
      for (let i = 0; i < 7; i++) {
        const point = curvePoint(stem, 0.74 + i * 0.04);
        parts += `<circle cx="${(point.x + (i % 2 ? 1.6 : -1.6)).toFixed(1)}" cy="${point.y.toFixed(1)}" r="${(2.6 - i * 0.2).toFixed(1)}" fill="${look.budColor}"/>`;
      }
    } else if (look.bud === "daisy") {
      const tip = curvePoint(stem, 1);
      for (let i = 0; i < 10; i++) {
        parts += `<ellipse cx="${tip.x}" cy="${tip.y - 4.5}" rx="1.6" ry="4" transform="rotate(${i * 36} ${tip.x} ${tip.y})" fill="#fbf7ee"/>`;
      }
      parts += `<circle cx="${tip.x}" cy="${tip.y}" r="2.8" fill="#f0c43a"/>`;
    }
  });

  return `
    <svg viewBox="0 0 60 100" aria-hidden="true">
      <ellipse cx="30" cy="96" rx="20" ry="3" fill="#000" opacity="0.35"/>
      ${parts}
      <rect x="25.5" y="76" width="9" height="5" rx="1.5" fill="#d6b36a"/>
      <path d="M30 78 L22 72 L22 84Z M30 78 L38 72 L38 84Z" fill="#d6b36a" opacity="0.85"/>
    </svg>`;
}

const drawings = { candle: candleSVG, crystal: crystalSVG, herb: herbSVG };

// ---------- Altar ----------

function buildOfferings() {
  Object.keys(offerings).forEach(function(kind) {
    rows[kind].innerHTML = offerings[kind].map(function(item) {
      const favoured = phase.favoured.includes(item.id);
      return `
        <button class="offering${favoured ? " is-favoured" : ""}" type="button" data-kind="${kind}" data-id="${item.id}" aria-pressed="false">
          <span class="offering-art offering-art-${kind}">${drawings[kind](item)}</span>
          <span class="offering-name">${item.short}</span>
          ${favoured ? '<span class="offering-star" title="Favoured tonight">✦</span><span class="visually-hidden">, favoured tonight</span>' : ""}
        </button>`;
    }).join("");
  });
}

function renderSpot(kind) {
  const item = choices[kind];
  const spot = spots[kind];
  if (item) {
    spot.innerHTML = `<span class="altar-item altar-item-${kind}">${drawings[kind](item)}</span>`;
  } else {
    spot.innerHTML = `<span class="altar-empty">${kindLabels[kind]}</span>`;
  }
}

function missingKinds() {
  return Object.keys(choices).filter(function(kind) {
    return !choices[kind];
  });
}

function updateHint() {
  const missing = missingKinds();
  candleSpot.disabled = isLit || missing.length > 0;
  candleSpot.classList.toggle("is-ready", !candleSpot.disabled);

  if (isLit) {
    altarHint.textContent = "The flame is burning. Your ritual has begun";
    candleSpot.setAttribute("aria-label", "The candle is lit");
  } else if (missing.length === 3) {
    altarHint.textContent = "Choose a candle, a crystal and a herb from the offerings below";
    candleSpot.setAttribute("aria-label", "Candle spot, empty");
  } else if (missing.length > 0) {
    const names = missing.map(function(kind) {
      return "a " + kind;
    });
    altarHint.textContent = "Your altar still needs " + names.join(" and ");
    candleSpot.setAttribute("aria-label", choices.candle ? `${choices.candle.name}, not ready to light` : "Candle spot, empty");
  } else {
    altarHint.textContent = "Your altar is ready. Tap the candle to light it";
    candleSpot.setAttribute("aria-label", `Light the ${choices.candle.name}`);
  }
}

function choose(kind, id) {
  if (isLit) return;
  choices[kind] = offerings[kind].find(function(item) {
    return item.id === id;
  });

  rows[kind].querySelectorAll(".offering").forEach(function(button) {
    button.setAttribute("aria-pressed", String(button.dataset.id === id));
  });
  renderSpot(kind);
  updateHint();
}

function lightCandle() {
  if (isLit || missingKinds().length > 0) return;
  isLit = true;
  altar.classList.add("is-lit");
  document.querySelectorAll(".offering").forEach(function(button) {
    button.disabled = true;
  });
  updateHint();
  saveRitual();
  setTimeout(finishRitual, reduceMotion ? 200 : 1600);
}

// ---------- Reading ----------

function isFavoured(item) {
  return phase.favoured.includes(item.id);
}

function buildSummary() {
  const items = [choices.candle, choices.crystal, choices.herb];
  const list = `${items[0].keyword}, ${items[1].keyword} and ${items[2].keyword}`;
  const action = phase.mode === "draw" ? `your altar calls in ${list}` : `your altar clears the way for ${list}`;
  const favouredCount = items.filter(isFavoured).length;

  let harmony;
  if (favouredCount === 3) {
    harmony = "Every offering is in harmony with tonight's moon, so your ritual carries extra power.";
  } else if (favouredCount > 0) {
    harmony = "The moon smiles on part of your altar, and your own instinct chose the rest.";
  } else {
    harmony = "You followed your own instinct tonight rather than the moon's suggestions, and that is a kind of magic too.";
  }

  return `Under the ${phase.name}, a time of ${phase.theme.toLowerCase()}, ${action}. ${harmony} ${phase.closing}`;
}

function finishRitual() {
  readingCards.innerHTML = Object.keys(choices).map(function(kind) {
    const item = choices[kind];
    const favoured = isFavoured(item) ? " Tonight the moon favours this choice." : "";
    return `
      <div class="reading-entry">
        <p class="reading-entry-position">${kindLabels[kind]}</p>
        <p class="reading-entry-name">${item.name}</p>
        <p class="reading-entry-meaning">${item[phase.mode]}${favoured}</p>
      </div>`;
  }).join("");
  readingSummary.textContent = buildSummary();

  reading.hidden = false;
  requestAnimationFrame(function() {
    reading.classList.add("is-visible");
    reading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
}

function clearAltar() {
  choices = { candle: null, crystal: null, herb: null };
  isLit = false;
  altar.classList.remove("is-lit");
  document.querySelectorAll(".offering").forEach(function(button) {
    button.disabled = false;
    button.setAttribute("aria-pressed", "false");
  });
  Object.keys(spots).forEach(renderSpot);
  updateHint();

  reading.classList.remove("is-visible");
  reading.hidden = true;
  altar.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
}

// The last ritual is remembered in this browser so returning visitors see where they left off
function showRitualLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return;
    if (saved.date === now.toDateString()) {
      ritualLog.textContent = `You already held a ritual under tonight's ${saved.phase}. You are always welcome to hold another.`;
    } else {
      const when = new Date(saved.date).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
      ritualLog.textContent = `Your last ritual was under the ${saved.phase} on ${when}.`;
    }
  } catch (error) {
    // Storage can be unavailable (e.g. private browsing); the altar still works for this visit
  }
}

function saveRitual() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ date: now.toDateString(), phase: phase.name }));
  } catch (error) {
    // Nothing to remember if storage is unavailable
  }
}

document.querySelector(".offerings").addEventListener("click", function(event) {
  const button = event.target.closest(".offering");
  if (button) choose(button.dataset.kind, button.dataset.id);
});

candleSpot.addEventListener("click", lightCandle);
clearButton.addEventListener("click", clearAltar);

showMoon();
buildOfferings();
Object.keys(spots).forEach(renderSpot);
updateHint();
showRitualLog();
