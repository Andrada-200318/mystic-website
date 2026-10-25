// ---------- Tonight's moon and tide, using the same reckoning as the Moon Altar ----------

const synodicMonth = 29.530588853;
const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
const phaseNames = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];

const now = new Date();
const age = (((now.getTime() - knownNewMoon) / 86400000) % synodicMonth + synodicMonth) % synodicMonth;
const fraction = age / synodicMonth;
const phaseName = phaseNames[Math.floor(fraction * 8 + 0.5) % 8];
const isFullMoon = phaseName === "Full Moon";
const daysToFull = Math.round((synodicMonth / 2 - age + synodicMonth) % synodicMonth);

// Spring tides come with the new and full moon, gentle neap tides with the quarter moons
const tidePull = Math.abs(Math.cos(fraction * 2 * Math.PI));
const tide = tidePull > 0.7
  ? { name: "Spring tide", story: "a strong spring tide washed up more treasures than usual, so the sea has a lot to say." }
  : tidePull < 0.3
    ? { name: "Neap tide", story: "a gentle neap tide left only a few treasures, so each one matters." }
    : { name: "Steady tide", story: "a steady tide brought a fair handful of treasures to the shore." };
const treasureCount = 4 + Math.round(tidePull * 3);
const tearChance = 0.6;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fixed = (n) => Math.round(n * 10) / 10;

// ---------- What the sea can leave behind ----------

function seaGlass(color, shine, shape) {
  return `<path d="${shape}" fill="${color}" fill-opacity="0.8" stroke="${shine}" stroke-opacity="0.7" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M-7 -8Q-2 -11 3 -10" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="2.2" stroke-linecap="round"/>`;
}

const treasures = [
  {
    name: "Green Sea Glass",
    keyword: "growth",
    brings: "Something small is beginning to grow. Give it light and it will surprise you.",
    asks: "Be patient with your own growth. Sea glass takes years to soften its edges.",
    away: "An old fear of starting over is being worn smooth by the waves.",
    art: seaGlass("#6fcf9a", "#c9f5dc", "M-14 -5Q-10 -14 -1 -15Q11 -15 15 -4Q17 8 8 13Q-4 17 -12 9Q-17 3 -14 -5Z")
  },
  {
    name: "Blue Sea Glass",
    keyword: "calm",
    brings: "Calmer waters are on their way. Let yourself float for a while.",
    asks: "Slow down and breathe. Not every wave needs an answer.",
    away: "A worry you have been carrying is drifting out with the tide.",
    art: seaGlass("#6fb6e8", "#d4ecfb", "M-16 2Q-15 -9 -5 -12Q7 -14 13 -7Q18 1 12 9Q4 15 -6 13Q-15 11 -16 2Z")
  },
  {
    name: "Amber Sea Glass",
    keyword: "warmth",
    brings: "Warmth is coming from someone close: a kind word, a hand to hold, a place that feels like home.",
    asks: "Offer some warmth of your own. Someone near you needs it more than they say.",
    away: "Loneliness is loosening its grip. The cold season is ending.",
    art: seaGlass("#e0a24a", "#fbe0b0", "M-10 -12Q2 -17 11 -10Q17 -3 14 7Q9 16 -2 15Q-13 13 -15 3Q-16 -7 -10 -12Z")
  },
  {
    name: "Violet Sea Glass",
    keyword: "intuition",
    brings: "Your intuition is sharpening. Trust the quiet voice that already knows.",
    asks: "Listen to your dreams and first feelings this week, before reason talks you out of them.",
    away: "Self-doubt is washing away. You were right more often than you believed.",
    art: seaGlass("#b38be8", "#e9dcff", "M-13 -9Q-4 -16 6 -13Q15 -9 15 1Q14 12 4 14Q-9 16 -14 7Q-18 -2 -13 -9Z")
  },
  {
    name: "Spiral Shell",
    keyword: "a journey",
    brings: "A journey is calling, out in the world or deep within yourself.",
    asks: "Take the winding path. The spiral reaches its centre by going around.",
    away: "Restlessness fades as you finally choose a direction.",
    art: `<path d="M-15 4A15 15 0 1 1 13 8Q10 16 0 17Q-12 16 -15 4Z" fill="#efdcc0" stroke="#c49a6c" stroke-width="1.2"/>
      <path d="M1 1a3 3 0 0 1 -5 -2a5.5 5.5 0 0 1 9 -3a8.5 8.5 0 0 1 -6 13a11.5 11.5 0 0 1 -12 -12" fill="none" stroke="#a8754d" stroke-width="1.8" stroke-linecap="round"/>`
  },
  {
    name: "Cowrie Shell",
    keyword: "abundance",
    brings: "Abundance is flowing toward you. Keep your hands open to receive it.",
    asks: "Share what you have. What you give away returns with the tide.",
    away: "The fear of not having enough is ebbing. There is more than you think.",
    art: `<ellipse rx="12" ry="17" fill="#f3e4c8" stroke="#c9a77a" stroke-width="1.2"/>
      <g fill="#b98a5a" opacity="0.6"><circle cx="-6" cy="-8" r="1.6"/><circle cx="6" cy="-5" r="1.3"/><circle cx="-5" cy="7" r="1.2"/><circle cx="7" cy="9" r="1.5"/></g>
      <path d="M0 -13C3 -5 -3 4 0 13" fill="none" stroke="#6e4e33" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-3 -8h-2M3 -4h2M-3 0h-2M3 4h2M-3 8h-2" stroke="#6e4e33" stroke-width="1.1" stroke-linecap="round"/>`
  },
  {
    name: "Scallop Shell",
    keyword: "a fresh start",
    brings: "A fresh start is near. For centuries, the scallop has marked the pilgrim's road.",
    asks: "Take the first step, even a small one. The road appears as you walk it.",
    away: "An old chapter is closing gently, making room for the next.",
    art: `<path d="M0 13L-17 -5A18 18 0 0 1 17 -5Z" fill="#f2b9a0" stroke="#d48b6c" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M0 13L-11 -13M0 13L-4 -16M0 13L4 -16M0 13L11 -13M0 13L-16 -7M0 13L16 -7" stroke="#d48b6c" stroke-width="1"/>
      <path d="M-6 11H6L8 17H-8Z" fill="#e9a68a" stroke="#d48b6c" stroke-width="1"/>`
  },
  {
    name: "Broken Shell",
    keyword: "release",
    brings: "Something that seemed broken is about to show its beauty.",
    asks: "Let go of perfection. Even broken shells are treasured by the sea.",
    away: "An old hurt is being carried out to sea. You no longer need to hold it.",
    art: `<path d="M0 13L-17 -5A18 18 0 0 1 1 -18L-3 -9L4 -5L-1 2L5 6Z" fill="#e8d2c4" stroke="#b9978a" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M0 13L-11 -13M0 13L-4 -16M0 13L-16 -7" stroke="#b9978a" stroke-width="1"/>`
  },
  {
    name: "Starfish",
    keyword: "healing",
    brings: "Healing is on its way. Like the starfish, you can grow back what you lost.",
    asks: "Be gentle with yourself while you mend. Rest is part of the work.",
    away: "Old wounds are closing. What hurt you no longer defines you.",
    art: `<path d="${starfishPath()}" fill="#e58a5c" stroke="#b9603a" stroke-width="1.2" stroke-linejoin="round"/>
      <g fill="#ffd2a8"><circle r="2"/><circle cy="-8" r="1.3"/><circle cx="7.6" cy="-2.5" r="1.3"/><circle cx="4.7" cy="6.5" r="1.3"/><circle cx="-4.7" cy="6.5" r="1.3"/><circle cx="-7.6" cy="-2.5" r="1.3"/></g>`
  },
  {
    name: "Driftwood",
    keyword: "surrender",
    brings: "Good things will arrive in their own time, carried by currents you cannot see.",
    asks: "Stop swimming against the tide. Let the current carry you for a while.",
    away: "The need to control everything is drifting away.",
    art: `<path d="M-21 6C-10 0 4 2 20 -6L22 -1C8 6 -6 8 -20 11Z" fill="#a8977f" stroke="#7a6a56" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M2 2L8 -9L11 -8L6 1" fill="#a8977f" stroke="#7a6a56" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M-14 8C-6 5 4 4 14 -1" fill="none" stroke="#7a6a56" stroke-width="0.8" opacity="0.7"/>`
  },
  {
    name: "Old Key",
    keyword: "an opening",
    brings: "A door is about to open: a chance, an answer or a secret revealed.",
    asks: "Look for the opportunity hidden in plain sight. You already hold the key.",
    away: "A situation that felt locked is loosening. What was stuck will soon open.",
    art: `<g fill="none" stroke="#c9a35a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-30)">
        <circle cx="-11" r="6"/><path d="M-5 0H18M12 0V6M17 0V5"/>
      </g>
      <circle cx="-9.5" cy="5.5" r="2" fill="#6f9c7c" opacity="0.6"/>`
  },
  {
    name: "Tarnished Coin",
    keyword: "good fortune",
    brings: "Good fortune is washing ashore, perhaps from an unexpected direction.",
    asks: "Value what you already have, even if it looks a little worn.",
    away: "Money worries are easing. The tide is turning in your favour.",
    art: `<circle r="14" fill="#cfa654" stroke="#8a6a2e" stroke-width="1.4"/>
      <circle r="10.5" fill="none" stroke="#8a6a2e" stroke-width="0.9" stroke-dasharray="1.5 1.5"/>
      <path d="M3 -6A7 7 0 1 0 3 6A5.5 5.5 0 1 1 3 -6Z" fill="#8a6a2e"/>
      <g fill="#6f9c7c" opacity="0.55"><circle cx="-8" cy="6" r="3"/><circle cx="7" cy="-8" r="2"/></g>`
  },
  {
    name: "Sand Dollar",
    keyword: "peace",
    brings: "Peace is coming, the quiet kind that settles after a storm.",
    asks: "Make peace with someone, or with yourself.",
    away: "Conflict is fading. The waters between you and another are calming.",
    art: `<circle r="15" fill="#ebe0cc" stroke="#bfae90" stroke-width="1.2"/>
      <g fill="none" stroke="#a8977a" stroke-width="1.1">
        ${[0, 72, 144, 216, 288].map((turn) => `<ellipse cy="-6" rx="2.2" ry="5.5" transform="rotate(${turn})"/>`).join("")}
      </g>
      <circle r="1.5" fill="#a8977a"/>`
  }
];

const mermaidTear = {
  name: "Mermaid's Tear",
  keyword: "the mermaid's blessing",
  rare: true,
  brings: "The mermaid has wept a pearl for you. A deep wish is closer than it has ever been.",
  asks: "Sing your wish out loud tonight. The sea is listening.",
  away: "Sorrow turns to pearl. What once made you cry will become something precious.",
  art: `<circle r="17" fill="url(#tearGlow)" class="tear-glow"/>
    <path d="M0 -16C5 -8 11 -2 11 5A11 11 0 0 1 -11 5C-11 -2 -5 -8 0 -16Z" fill="url(#tearPearl)" stroke="#e6f8ff" stroke-width="1"/>
    <path d="M-5 0Q-5 -5 -2 -8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
};

function starfishPath() {
  let path = "";
  for (let i = 0; i < 5; i++) {
    const outer = (i * 72 - 90) * Math.PI / 180;
    const inner = outer + 36 * Math.PI / 180;
    const [ox, oy] = [Math.cos(outer) * 18, Math.sin(outer) * 18];
    const [ix, iy] = [Math.cos(inner) * 7, Math.sin(inner) * 7];
    path += `${i ? "L" : "M"}${fixed(ox)} ${fixed(oy)}Q${fixed(ix * 1.15)} ${fixed(iy * 1.15)} `;
    const next = ((i + 1) * 72 - 90) * Math.PI / 180;
    path += `${fixed(Math.cos(next) * 18)} ${fixed(Math.sin(next) * 18)}`;
  }
  return path + "Z";
}

const positions = [
  { label: "What the sea brings", key: "brings" },
  { label: "What it asks of you", key: "asks" },
  { label: "What it carries away", key: "away" }
];

const closings = [
  "Keep a small token of tonight with you this week, a shell, a stone or a scrap of blue, as a reminder.",
  "Listen to the waves before you sleep tonight. The rest of the answer may come in a dream.",
  "The sea always comes back. So will whatever is meant for you."
];

// ---------- The scene: sky, moon, sea, the mermaid's rock and the beach ----------

const scene = document.getElementById("tideScene");
const sceneArt = document.getElementById("sceneArt");
const shore = document.getElementById("shore");

// The lit part of the moon is a half circle plus the curved shadow line
function moonLitPath(cx, cy, r, f) {
  const rx = fixed(Math.abs(Math.cos(f * 2 * Math.PI)) * r);
  const top = `${cx} ${cy - r}`;
  const bottom = `${cx} ${cy + r}`;
  if (f < 0.5) return `M${top}A${r} ${r} 0 0 1 ${bottom}A${rx} ${r} 0 0 ${f < 0.25 ? 0 : 1} ${top}Z`;
  return `M${top}A${r} ${r} 0 0 0 ${bottom}A${rx} ${r} 0 0 ${f < 0.75 ? 0 : 1} ${top}Z`;
}

function drawScene() {
  const moon = { x: 560, y: 92, r: 34 };
  const lit = moonLitPath(moon.x, moon.y, moon.r, fraction);
  const illumination = (1 - Math.cos(fraction * 2 * Math.PI)) / 2;

  let stars = "";
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * 800;
    const y = 6 + Math.random() * 205;
    if (Math.hypot(x - moon.x, y - moon.y) < moon.r * 2.2) continue;
    stars += `<circle cx="${fixed(x)}" cy="${fixed(y)}" r="${fixed(0.5 + Math.random() * 1.2)}" style="--d: ${fixed(Math.random() * 4)}s"/>`;
  }

  // Moonlight glittering on the water, widest near the horizon
  let glitter = "";
  for (let i = 0; i < 26; i++) {
    const row = Math.floor(i / 3);
    const y = 236 + row * 8 + Math.random() * 3;
    const spread = 30 - row * 2.2;
    const x = moon.x + (Math.random() - 0.5) * spread * 2;
    const length = 4 + Math.random() * 12;
    glitter += `<path d="M${fixed(x - length / 2)} ${fixed(y)}h${fixed(length)}" style="--d: ${fixed(Math.random() * 3)}s"/>`;
  }

  // The scalloped edge of the sea where it meets the sand
  const edge = 318;
  const bump = (x) => edge + (x % 100 ? 5 : 9);
  let foam = `M0 ${edge}`;
  for (let x = 0; x < 800; x += 50) foam += `Q${x + 25} ${bump(x)} ${x + 50} ${edge}`;
  let seaBody = `M-20 40H820V${edge}H800`;
  for (let x = 750; x >= 0; x -= 50) seaBody += `Q${x + 25} ${bump(x)} ${x} ${edge}`;
  seaBody += `H-20Z`;

  let speckles = "";
  for (let i = 0; i < 90; i++) {
    speckles += `<circle cx="${fixed(Math.random() * 800)}" cy="${fixed(312 + Math.random() * 188)}" r="${fixed(0.6 + Math.random() * 1.1)}"/>`;
  }

  sceneArt.innerHTML = `
    <defs>
      <linearGradient id="tideSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b0420"/><stop offset="0.7" stop-color="#21104a"/><stop offset="1" stop-color="#3b2166"/>
      </linearGradient>
      <linearGradient id="tideSea" gradientUnits="userSpaceOnUse" x1="0" y1="230" x2="0" y2="320">
        <stop offset="0" stop-color="#2b3170"/><stop offset="1" stop-color="#16204f"/>
      </linearGradient>
      <linearGradient id="tideSand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7d7078"/><stop offset="0.35" stop-color="#a8957f"/><stop offset="1" stop-color="#8a7866"/>
      </linearGradient>
      <linearGradient id="tideWet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3c3f6b" stop-opacity="0.9"/><stop offset="1" stop-color="#3c3f6b" stop-opacity="0.25"/>
      </linearGradient>
      <radialGradient id="tideMoonGlow"><stop offset="0.3" stop-color="#f3ecd6" stop-opacity="0.4"/><stop offset="1" stop-color="#f3ecd6" stop-opacity="0"/></radialGradient>
      <linearGradient id="tideTail" gradientUnits="userSpaceOnUse" x1="112" y1="240" x2="206" y2="190">
        <stop offset="0" stop-color="#8a5bd6"/><stop offset="0.5" stop-color="#3fa7b8"/><stop offset="1" stop-color="#2f7f95"/>
      </linearGradient>
      <pattern id="tideScales" width="6" height="5" patternUnits="userSpaceOnUse">
        <path d="M0 5A3 3 0 0 1 6 5" fill="none" stroke="#c8fbf4" stroke-opacity="0.45" stroke-width="0.7"/>
      </pattern>
      <radialGradient id="tearGlow"><stop offset="0.2" stop-color="#bff3ff" stop-opacity="0.8"/><stop offset="1" stop-color="#bff3ff" stop-opacity="0"/></radialGradient>
      <radialGradient id="tearPearl" cx="0.35" cy="0.4" r="0.8">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#d6f4ff"/><stop offset="0.8" stop-color="#b9b0f2"/><stop offset="1" stop-color="#8fd8ea"/>
      </radialGradient>
      <clipPath id="tideMoonLit"><path d="${lit}"/></clipPath>
      <clipPath id="tideBelowHorizon"><rect x="-20" y="229" width="840" height="300"/></clipPath>
    </defs>

    <rect width="800" height="240" fill="url(#tideSky)"/>
    <g class="scene-stars">${stars}</g>
    <g>
      <title>Tonight's moon: ${phaseName}</title>
      <circle cx="${moon.x}" cy="${moon.y}" r="${moon.r * 3}" fill="url(#tideMoonGlow)" opacity="${fixed(0.25 + illumination * 0.75)}"/>
      <circle class="scene-moon-dark" cx="${moon.x}" cy="${moon.y}" r="${moon.r}"/>
      <path class="scene-moon" d="${lit}"/>
      <g clip-path="url(#tideMoonLit)">
        <circle class="scene-crater" cx="${moon.x - 10}" cy="${moon.y - 7}" r="7"/>
        <circle class="scene-crater" cx="${moon.x + 12}" cy="${moon.y + 10}" r="5"/>
      </g>
    </g>

    <path d="M0 312Q200 302 400 314T800 308V500H0Z" fill="url(#tideSand)"/>
    <g class="sand-speckles">${speckles}</g>
    <path class="wet-sand" d="M0 312Q200 302 400 314T800 308V500H0Z" fill="url(#tideWet)"/>

    <g clip-path="url(#tideBelowHorizon)">
      <g class="sea-move">
        <g class="sea-lap">
          <path d="${seaBody}" fill="url(#tideSea)"/>
          <path class="sea-line" d="M60 262q30 -4 60 0M300 276q40 -5 80 0M640 290q36 -5 72 0M480 256q24 -3 48 0"/>
          <path class="foam" d="${foam}"/>
          <path class="foam foam-faint" d="${foam}" transform="translate(0 -9)"/>
        </g>
      </g>
    </g>
    <g class="glitter">${glitter}</g>

    <g class="mermaid" id="mermaid" transform="translate(226 262) scale(1.35) translate(-192 -262)">
      <title>The mermaid on her rock</title>
      <ellipse class="ripple" cx="196" cy="262" rx="78" ry="5"/>
      <path class="rock" d="M126 263L136 238L149 223L164 212L180 207L198 202L217 205L233 215L247 232L257 263Z"/>
      <path class="rock-lit" d="M198 202L217 205L233 215L247 232L257 263L238 263L226 230L212 212Z"/>
      <path class="rock" d="M255 263L264 247L277 245L290 263Z"/>
      <g class="mermaid-hair"><path d="M194 152C190 146 200 143 206 147C210 151 209 156 207 158C200 154 196 158 194 166C192 179 186 191 175 199C183 187 186 172 188 162C189 157 191 154 194 152Z"/></g>
      <path class="mermaid-arm" d="M191 171C187 181 184 192 181 203"/>
      <path class="mermaid-tail" d="M205 193C197 204 183 208 169 212C157 216 147 224 141 236L136 234C142 220 154 210 166 205C178 200 188 194 191 186Z"/>
      <path class="mermaid-scales" d="M205 193C197 204 183 208 169 212C157 216 147 224 141 236L136 234C142 220 154 210 166 205C178 200 188 194 191 186Z"/>
      <g class="mermaid-fin"><path d="M139 235C131 226 121 226 112 230C120 233 126 238 128 247C132 242 135 238 139 235Z"/></g>
      <path class="mermaid-body" d="M192 192C190 184 189 176 191 169C195 165 205 165 209 169C210 177 207 186 204 194Z"/>
      <path class="mermaid-body" d="M198 161h6v7h-6z"/>
      <circle class="mermaid-body" cx="201" cy="156" r="7.5"/>
      <path class="mermaid-arm" d="M208 171C213 178 214 186 205 191"/>
      <path class="mermaid-rim" d="M209 169C210 177 207 186 204 194M204 149A7.5 7.5 0 0 1 208 160"/>
      <g class="notes">
        <text class="note" x="214" y="150" style="--d: 0s">♪</text>
        <text class="note" x="218" y="142" style="--d: 2.4s">♫</text>
        <text class="note" x="210" y="146" style="--d: 4.8s">♪</text>
      </g>
    </g>`;

  scene.classList.toggle("is-full-moon", isFullMoon);
}

// ---------- Playing: call, sweep, gather, read ----------

const tideSteps = document.getElementById("tideSteps");
const tideHint = document.getElementById("tideHint");
const callButton = document.getElementById("callButton");
const trayNames = document.querySelectorAll(".tray-name");
const trayFrames = document.querySelectorAll(".tray-frame");
const reading = document.getElementById("reading");
const readingCards = document.getElementById("readingCards");
const readingSummary = document.getElementById("readingSummary");
const againButton = document.getElementById("againButton");

let step = "call";
let onShore = [];
let picked = [];
let lastPoint = null;
let travelled = 0;
let sinceLastPuff = 0;

function setStep(next) {
  step = next;
  const order = ["call", "sweep", "gather", "read"];
  tideSteps.querySelectorAll("li").forEach((item) => {
    const at = order.indexOf(item.dataset.step);
    item.classList.toggle("is-current", at === order.indexOf(next));
    item.classList.toggle("is-done", at < order.indexOf(next));
  });
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Two loose rows across the beach, so the mounds never sit on top of each other
function buryTreasures() {
  const found = shuffle(treasures).slice(0, treasureCount);
  if (isFullMoon && Math.random() < tearChance) found[Math.floor(Math.random() * found.length)] = mermaidTear;

  shore.innerHTML = "";
  onShore = found.map((treasure, index) => {
    const x = 9 + (index + 0.5) * (82 / found.length) + (Math.random() - 0.5) * 4;
    const y = (index % 2 ? 66 : 30) + (Math.random() - 0.5) * 10;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "treasure";
    button.style.left = `${fixed(x)}%`;
    button.style.top = `${fixed(y)}%`;
    button.style.setProperty("--tilt", `${Math.round((Math.random() - 0.5) * 50)}deg`);
    button.style.setProperty("--sand", "1");
    button.style.setProperty("--delay", `${index * 90}ms`);
    button.setAttribute("aria-label", "A mound of wet sand. Dig here");
    button.innerHTML = `
      <svg class="treasure-art" viewBox="-30 -30 60 60" aria-hidden="true">${treasure.art}</svg>
      <span class="sand-mound" aria-hidden="true"></span>
      <span class="glint" aria-hidden="true"></span>`;
    shore.appendChild(button);

    const spot = { treasure, button, sand: 1, revealed: false };
    button.addEventListener("click", (event) => {
      // A drag across the sand ends in a click too; only a real tap should count
      if (event.detail && travelled > 12) return;
      if (!spot.revealed) {
        brush(spot, 0.34);
        const box = button.getBoundingClientRect();
        puff(box.left + box.width / 2, box.top + box.height / 2);
      } else {
        pick(spot);
      }
    });
    return spot;
  });
}

function callTide() {
  if (step !== "call") return;
  setStep("sweep");
  callButton.hidden = true;
  tideHint.textContent = "Here comes the sea…";
  buryTreasures();
  shore.classList.add("is-under-water");

  const rise = reduceMotion ? 0 : 2300;
  const fall = reduceMotion ? 50 : 2500;
  scene.classList.add("is-flooding", "is-wet");

  setTimeout(() => {
    scene.classList.remove("is-flooding");
    setTimeout(() => shore.classList.remove("is-under-water"), fall * 0.35);
    setTimeout(() => {
      scene.classList.remove("is-wet");
      tideHint.textContent = "Sweep the wet sand with your finger or mouse to uncover what the tide left behind. You can also tap a mound to dig.";
    }, fall * 0.6);
  }, rise + 400);
}

function brush(spot, amount) {
  if (spot.revealed || step === "read") return;
  spot.sand = Math.max(0, spot.sand - amount);
  spot.button.style.setProperty("--sand", fixed(spot.sand * 100) / 100);
  if (spot.sand < 0.12) reveal(spot);
}

function reveal(spot) {
  spot.revealed = true;
  spot.sand = 0;
  spot.button.style.setProperty("--sand", "0");
  spot.button.classList.add("is-revealed");
  spot.button.setAttribute("aria-label", `Pick up the ${spot.treasure.name}`);
  if (step === "sweep") setStep("gather");
  if (spot.treasure.rare) {
    tideHint.textContent = "A mermaid's tear! Out on her rock, the mermaid is singing for you.";
    singFor(4500);
  } else {
    updateGatherHint();
  }
}

function updateGatherHint() {
  const left = 3 - picked.length;
  tideHint.textContent = `Tap a treasure to pick it up. ${left === 1 ? "One more" : `${left} more`} to choose.`;
}

function singFor(duration) {
  scene.classList.add("is-singing");
  setTimeout(() => scene.classList.remove("is-singing"), duration);
}

function pick(spot) {
  if (step !== "gather" || picked.length >= 3 || spot.button.disabled) return;
  const slot = picked.length;
  picked.push(spot.treasure);
  spot.button.classList.add("is-picked");
  spot.button.disabled = true;

  trayFrames[slot].insertAdjacentHTML("beforeend", `<svg class="tray-art" viewBox="-30 -30 60 60" aria-hidden="true">${spot.treasure.art}</svg>`);
  trayFrames[slot].classList.add("is-filled");
  trayNames[slot].textContent = spot.treasure.name;

  if (picked.length < 3) {
    updateGatherHint();
    return;
  }
  setStep("read");
  tideHint.textContent = "The sea has spoken.";
  onShore.forEach((other) => {
    if (other.button.disabled) return;
    other.button.disabled = true;
    other.button.classList.add("is-left");
  });
  setTimeout(showReading, reduceMotion ? 100 : 900);
}

function moonPhrase() {
  const lower = phaseName.toLowerCase();
  return lower.includes("moon") ? lower : `${lower} moon`;
}

function showReading() {
  readingCards.innerHTML = picked.map((treasure, index) => `
    <div class="reading-entry">
      <p class="reading-entry-position">${positions[index].label}</p>
      <p class="reading-entry-name">The ${treasure.name}</p>
      <p class="reading-entry-meaning">${treasure[positions[index].key]}</p>
    </div>`).join("");

  const [brings, asks, away] = picked;
  readingSummary.textContent = `Under tonight's ${moonPhrase()}, ${tide.story} The sea brings you ${brings.keyword}, asks you to make room for ${asks.keyword}, and clears the way for ${away.keyword}. ${closings[Math.floor(Math.random() * closings.length)]}`;

  reading.hidden = false;
  requestAnimationFrame(() => {
    reading.classList.add("is-visible");
    reading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
}

function resetShore() {
  picked = [];
  onShore = [];
  shore.innerHTML = "";
  trayFrames.forEach((frame) => {
    frame.classList.remove("is-filled");
    frame.querySelector(".tray-art")?.remove();
  });
  trayNames.forEach((name) => { name.textContent = ""; });
  reading.classList.remove("is-visible");
  reading.hidden = true;
  setStep("call");
}

// ---------- Sweeping the sand ----------

function puff(x, y) {
  if (reduceMotion) return;
  const box = shore.getBoundingClientRect();
  for (let i = 0; i < 4; i++) {
    const grain = document.createElement("span");
    grain.className = "sand-puff";
    grain.style.left = `${x - box.left}px`;
    grain.style.top = `${y - box.top}px`;
    grain.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 40)}px`);
    grain.style.setProperty("--dy", `${Math.round(-8 - Math.random() * 22)}px`);
    grain.addEventListener("animationend", () => grain.remove());
    shore.appendChild(grain);
  }
}

function sweepTo(x, y) {
  if (!lastPoint) {
    lastPoint = { x, y };
    return;
  }
  const moved = Math.min(60, Math.hypot(x - lastPoint.x, y - lastPoint.y));
  lastPoint = { x, y };
  travelled += moved;
  if (!moved || (step !== "sweep" && step !== "gather")) return;

  let touched = false;
  onShore.forEach((spot) => {
    if (spot.revealed) return;
    const box = spot.button.getBoundingClientRect();
    const reach = box.width * 0.9;
    if (Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2)) > reach) return;
    brush(spot, moved / (box.width * 3));
    touched = true;
  });

  sinceLastPuff += moved;
  if (touched && sinceLastPuff > 26) {
    sinceLastPuff = 0;
    puff(x, y);
  }
}

shore.addEventListener("pointerdown", (event) => {
  travelled = 0;
  lastPoint = { x: event.clientX, y: event.clientY };
});

// A mouse sweeps just by passing over the sand; a finger sweeps by dragging
shore.addEventListener("pointermove", (event) => {
  sweepTo(event.clientX, event.clientY);
});

shore.addEventListener("pointerleave", () => {
  lastPoint = null;
});

callButton.addEventListener("click", callTide);

againButton.addEventListener("click", () => {
  resetShore();
  scene.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  setTimeout(callTide, reduceMotion ? 0 : 500);
});

// ---------- Tonight ----------

document.getElementById("tideTonight").innerHTML = `Tonight's moon: <strong>${phaseName}</strong> · <strong>${tide.name}</strong>`;
document.getElementById("tideMermaid").textContent = isFullMoon
  ? "The moon is full and the mermaid is singing. Her tears may wash ashore tonight."
  : `The mermaid only weeps her pearl tears under a full moon. Next full moon ${daysToFull <= 1 ? "tomorrow" : `in ${daysToFull} days`}.`;

drawScene();
setStep("call");
tideHint.textContent = "Hold your question in your mind, then call the tide.";
setInterval(() => { if (step === "call" && !reduceMotion) singFor(3000); }, 15000);
