// The moonlit greenhouse around the hanging garden: an arched glass roof,
// a potting bench full of potion jars, and fairies who steal from them.
// Uses seeded(), fixed() and curvePoint() from articles.js, which loads after this file.

const jars = [
  {
    name: "Unicorn Hair",
    loot: "hair",
    svg: `<defs><linearGradient id="jarRainbow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f7a8d8"/><stop offset="0.35" stop-color="#c9a8ff"/>
        <stop offset="0.7" stop-color="#9fd8ff"/><stop offset="1" stop-color="#a8f0d0"/>
        <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="6s" repeatCount="indefinite"/>
      </linearGradient></defs>
      <g fill="none" stroke="url(#jarRainbow)" stroke-width="2.2" stroke-linecap="round">
        <path class="jar-piece" d="M24 112C18 90 36 80 26 60S30 40 36 36"/>
        <path class="jar-piece" d="M34 112C44 92 24 78 38 58S44 42 40 34"/>
        <path class="jar-piece" d="M44 112C36 94 56 80 46 62S50 44 46 36"/>
        <path class="jar-piece" d="M54 112C60 92 44 76 56 58S52 42 56 38"/>
        <path class="jar-piece" d="M30 112C40 100 50 96 52 84"/>
      </g>
      <rect class="glass" x="14" y="28" width="52" height="88" rx="10"/>
      <path class="glass-shine" d="M21 40V96"/>
      <g class="jar-lid"><rect class="metal-lid" x="11" y="19" width="58" height="11" rx="3"/></g>`,
  },
  {
    name: "Moonwort",
    loot: "herbs",
    href: "moon.html",
    game: "the Moon Altar",
    extra: true,
    svg: `<g fill="none" stroke="#7f9a6c" stroke-width="1.4" stroke-linecap="round">
        <path d="M28 114Q26 88 22 66"/><path d="M40 114Q40 86 42 62"/><path d="M52 114Q54 90 60 68"/>
      </g>
      <g fill="#a3bd9c">
        <ellipse cx="23" cy="96" rx="2.6" ry="6" transform="rotate(-30 23 96)"/>
        <ellipse cx="31" cy="84" rx="2.6" ry="6" transform="rotate(30 31 84)"/>
        <ellipse cx="36" cy="98" rx="2.6" ry="6" transform="rotate(-25 36 98)"/>
        <ellipse cx="45" cy="80" rx="2.6" ry="6" transform="rotate(28 45 80)"/>
        <ellipse cx="50" cy="100" rx="2.6" ry="6" transform="rotate(-28 50 100)"/>
        <ellipse cx="59" cy="88" rx="2.6" ry="6" transform="rotate(30 59 88)"/>
      </g>
      <g fill="#ece4ff">
        <circle class="jar-piece" cx="22" cy="65" r="3"/><circle class="jar-piece" cx="42" cy="61" r="3"/><circle class="jar-piece" cx="60" cy="67" r="3"/>
      </g>
      <rect class="glass" x="10" y="54" width="60" height="62" rx="12"/>
      <path class="glass-shine" d="M17 66V100"/>
      <g class="jar-lid"><rect class="cork" x="20" y="45" width="40" height="11" rx="2"/></g>`,
  },
  {
    name: "Bottled Stars",
    loot: "stars",
    href: "stars.html",
    game: "the Star Weaver",
    svg: `<defs><radialGradient id="jarStarGlow">
        <stop offset="0" stop-color="#ffe9a8" stop-opacity="0.5"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/>
      </radialGradient></defs>
      <circle cx="40" cy="84" r="30" fill="url(#jarStarGlow)"/>
      <g fill="#fff4c8">
        ${[[30, 80, 1.1, 0], [47, 70, 0.8, 0.6], [52, 93, 1, 1.2], [36, 101, 0.7, 0.3], [42, 86, 0.6, 1.8], [26, 95, 0.8, 0.9], [49, 107, 0.7, 1.5]]
          .map(([x, y, s, d]) => `<path class="jar-piece jar-twinkle" style="--d: ${d}s" transform="translate(${x} ${y}) scale(${s})" d="M0 -6Q1 -1 6 0Q1 1 0 6Q-1 1 -6 0Q-1 -1 0 -6Z"/>`)
          .join("")}
      </g>
      <path class="glass" d="M32 36V52A33 33 0 1 0 48 52V36Z"/>
      <path class="glass-shine" d="M17 80A24 24 0 0 1 25 64"/>
      <g class="jar-lid"><rect class="cork" x="29" y="27" width="22" height="11" rx="2"/></g>`,
  },
  {
    name: "Questionable Liquid",
    loot: "liquid",
    href: "tea.html",
    game: "a tea leaf reading",
    svg: `<defs><clipPath id="jarFlask"><path d="M33 30V58L13 108Q10 117 19 117H61Q70 117 67 108L47 58V30Z"/></clipPath></defs>
      <g clip-path="url(#jarFlask)">
        <rect x="0" y="80" width="80" height="40" fill="#6fcf62" opacity="0.7"/>
        <rect x="0" y="100" width="80" height="20" fill="#2f6b34" opacity="0.6"/>
        <circle class="jar-bubble" style="--d: 0s" cx="30" cy="110" r="2.5"/>
        <circle class="jar-bubble" style="--d: 0.9s" cx="44" cy="112" r="2"/>
        <circle class="jar-bubble" style="--d: 1.7s" cx="52" cy="108" r="3"/>
        <circle class="jar-bubble" style="--d: 2.3s" cx="37" cy="114" r="1.6"/>
      </g>
      <path class="glass" d="M33 30V58L13 108Q10 117 19 117H61Q70 117 67 108L47 58V30Z"/>
      <path class="glass-shine" d="M29 64L19 90"/>
      <path class="jar-vapor" d="M40 18q-5 -5 0 -9q5 -4 0 -9"/>
      <g class="jar-lid"><rect class="cork" x="30" y="21" width="20" height="11" rx="2"/></g>`,
  },
  {
    name: "Pixie Dust",
    loot: "dust",
    href: "wish.html",
    game: "the Wish Globe",
    svg: `<defs>
        <clipPath id="jarPixie"><path d="M33 50V62H31Q22 62 22 71V107Q22 116 31 116H49Q58 116 58 107V71Q58 62 49 62H47V50Z"/></clipPath>
        <linearGradient id="jarPixieDust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7a8d8"/><stop offset="1" stop-color="#9b6fe0"/></linearGradient>
      </defs>
      <g clip-path="url(#jarPixie)">
        <path d="M0 92Q20 86 40 90T80 88V120H0Z" fill="url(#jarPixieDust)"/>
        <g fill="#fff">
          <circle class="jar-piece jar-twinkle" style="--d: 0s" cx="30" cy="97" r="1.3"/>
          <circle class="jar-piece jar-twinkle" style="--d: 0.7s" cx="44" cy="102" r="1.1"/>
          <circle class="jar-piece jar-twinkle" style="--d: 1.3s" cx="38" cy="109" r="1.4"/>
          <circle class="jar-piece jar-twinkle" style="--d: 0.4s" cx="51" cy="95" r="1"/>
          <circle class="jar-piece jar-twinkle" style="--d: 1.8s" cx="27" cy="108" r="1"/>
        </g>
      </g>
      <path class="glass" d="M33 50V62H31Q22 62 22 71V107Q22 116 31 116H49Q58 116 58 107V71Q58 62 49 62H47V50Z"/>
      <path class="glass-shine" d="M27 74V100"/>
      <g class="jar-lid"><rect class="cork" x="31" y="42" width="18" height="10" rx="2"/></g>`,
  },
  {
    name: "Mermaid Tears",
    loot: "tears",
    href: "tide.html",
    game: "the Tide Pool",
    extra: true,
    svg: `<defs>
        <clipPath id="jarTear"><path d="M35 30H45V48C52 60 64 78 64 94A24 24 0 0 1 16 94C16 78 28 60 35 48Z"/></clipPath>
        <linearGradient id="jarTearWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe3f5"/><stop offset="1" stop-color="#3a72cf"/></linearGradient>
      </defs>
      <g clip-path="url(#jarTear)">
        <rect x="0" y="76" width="80" height="44" fill="url(#jarTearWater)" opacity="0.8"/>
        <g fill="#dff8ff">
          <path class="jar-piece" d="M30 92q3 4 0 6q-3 -2 0 -6Z"/>
          <path class="jar-piece" d="M46 86q3 4 0 6q-3 -2 0 -6Z"/>
          <path class="jar-piece" d="M40 104q3 4 0 6q-3 -2 0 -6Z"/>
        </g>
      </g>
      <path class="glass" d="M35 30H45V48C52 60 64 78 64 94A24 24 0 0 1 16 94C16 78 28 60 35 48Z"/>
      <path class="glass-shine" d="M24 80Q22 88 22 96"/>
      <g class="jar-lid"><rect class="cork" x="33" y="22" width="14" height="10" rx="2"/></g>`,
  },
  {
    name: "Eye of Newt",
    loot: "eyes",
    href: "tarot.html",
    game: "a tarot reading",
    extra: true,
    svg: `<rect x="12" y="56" width="56" height="60" rx="14" fill="#b8c46a" opacity="0.4"/>
      ${[[30, 92, 0], [49, 76, 1.4], [46, 103, 2.6]]
        .map(([x, y, d]) => `<g class="jar-piece" transform="translate(${x} ${y})">
          <circle r="7" fill="#f4efe0" stroke="#c9b98f"/>
          <g class="jar-iris" style="--d: ${d}s"><circle r="3.2" fill="#5b2f7a"/><circle r="1.3" fill="#12051c"/></g>
        </g>`)
        .join("")}
      <rect class="glass" x="12" y="40" width="56" height="76" rx="14"/>
      <path class="glass-shine" d="M19 54V100"/>
      <g class="jar-lid"><rect class="metal-lid" x="9" y="31" width="62" height="11" rx="3"/></g>`,
  },
];

// What a fairy carries away from each kind of jar
const lootGlyphs = { hair: "∿", herbs: "❦", stars: "✦", dust: "✧" };

function potSvg() {
  const fronds = [-62, -38, -14, 10, 34, 58]
    .map((angle) => `<ellipse cx="35" cy="54" rx="6" ry="22" transform="rotate(${angle} 35 76)"/>`)
    .join("");
  return `<svg class="pot" viewBox="0 0 70 110" aria-hidden="true" focusable="false">
    <g fill="#5f8a55" stroke="#3f5f3a" stroke-width="0.8">${fronds}</g>
    <path d="M15 82H55L50 110H20Z" fill="#8a4a32"/>
    <rect x="12" y="76" width="46" height="9" rx="2" fill="#a05b3e"/>
  </svg>`;
}

// Jars with an href are secret doorways to the games; the rest are just for looking at
function jarHtml(jar) {
  const classes = `jar${jar.extra ? " jar-extra" : ""}`;
  const inside = `<svg class="jar-glass" viewBox="0 0 80 120" aria-hidden="true" focusable="false">${jar.svg}</svg>
    <span class="jar-label">${jar.name}</span>`;
  if (!jar.href) {
    return `<div class="${classes}" data-loot="${jar.loot}" aria-hidden="true">${inside}</div>`;
  }
  return `<a class="${classes}" data-loot="${jar.loot}" href="${jar.href}" aria-label="${jar.name}: play ${jar.game}">
    ${inside}<span class="jar-whisper" aria-hidden="true">${jar.game}</span>
  </a>`;
}

function buildGreenhouse(vines) {
  const greenhouse = document.createElement("div");
  greenhouse.className = "greenhouse";
  greenhouse.innerHTML = `
    <svg class="greenhouse-roof" aria-hidden="true" focusable="false"></svg>
    <div class="greenhouse-body">
      <div class="bench">
        ${potSvg()}
        ${jars.map(jarHtml).join("")}
        ${potSvg()}
      </div>
    </div>
    <div class="greenhouse-base"></div>`;
  greenhouse.querySelector(".greenhouse-body").prepend(vines);
  return greenhouse;
}

// ---------- Tonight's moon, using the same reckoning as the Moon Altar ----------

const synodicMonth = 29.530588853;
const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
const phaseNames = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];

// How far through its cycle the moon is tonight: 0 is new, 0.5 is full
function moonFraction(date) {
  const days = (date.getTime() - knownNewMoon) / 86400000;
  return (((days % synodicMonth) + synodicMonth) % synodicMonth) / synodicMonth;
}

// The lit part is a half circle plus the curved shadow line (an ellipse that narrows toward the quarters)
function moonLitPath(cx, cy, r, fraction) {
  const rx = fixed(Math.abs(Math.cos(fraction * 2 * Math.PI)) * r);
  const top = `${fixed(cx)} ${fixed(cy - r)}`;
  const bottom = `${fixed(cx)} ${fixed(cy + r)}`;
  const radius = fixed(r);
  if (fraction < 0.5) {
    const sweep = fraction < 0.25 ? 0 : 1;
    return `M${top}A${radius} ${radius} 0 0 1 ${bottom}A${rx} ${radius} 0 0 ${sweep} ${top}Z`;
  }
  const sweep = fraction < 0.75 ? 0 : 1;
  return `M${top}A${radius} ${radius} 0 0 0 ${bottom}A${rx} ${radius} 0 0 ${sweep} ${top}Z`;
}

// ---------- Glass roof, redrawn to fit the width ----------

function drawGreenhouse(greenhouse) {
  const svg = greenhouse.querySelector(".greenhouse-roof");
  const width = greenhouse.clientWidth;
  const height = Math.round(Math.min(200, Math.max(110, width * 0.2)));
  const rx = width / 2;
  const ry = height - 16;
  const archY = (x) => height - ry * Math.sqrt(Math.max(0, 1 - ((x - rx) / rx) ** 2));
  const arch = `M0 ${height}A${fixed(rx)} ${ry} 0 0 1 ${width} ${height}Z`;
  const panes = Math.max(4, Math.round(width / 120));
  const rand = seeded(7);

  let ribs = "";
  for (let i = 1; i < panes; i++) {
    const x = (width * i) / panes;
    ribs += `M${fixed(x)} ${fixed(archY(x))}V${height}`;
  }

  let stars = "";
  for (let i = 0; i < 30; i++) {
    const x = rand() * width;
    const room = height - archY(x) - 16;
    const y = archY(x) + 8 + rand() * room;
    const r = 0.6 + rand() * 1.1;
    if (room > 8) stars += `<circle cx="${fixed(x)}" cy="${fixed(y)}" r="${fixed(r)}" style="--d: ${fixed(rand() * 4)}s"/>`;
  }

  const moon = { x: width * 0.72, y: height - ry * 0.5, r: Math.min(height * 0.22, 42) };
  const fraction = moonFraction(new Date());
  const illumination = (1 - Math.cos(fraction * 2 * Math.PI)) / 2;
  const lit = moonLitPath(moon.x, moon.y, moon.r, fraction);
  const glare = [0.16, 0.5].map((at) => `M${fixed(width * at)} ${height}l${fixed(height * 0.9)} ${-height}`).join("");
  const top = height - ry;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `
    <defs>
      <clipPath id="roofGlass"><path d="${arch}"/></clipPath>
      <linearGradient id="roofSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0520"/><stop offset="1" stop-color="#2a1150"/></linearGradient>
      <clipPath id="roofMoonLit"><path d="${lit}"/></clipPath>
      <radialGradient id="roofMoonGlow"><stop offset="0.3" stop-color="#f3ecd6" stop-opacity="0.35"/><stop offset="1" stop-color="#f3ecd6" stop-opacity="0"/></radialGradient>
    </defs>
    <g clip-path="url(#roofGlass)">
      <rect width="${width}" height="${height}" fill="url(#roofSky)"/>
      <g class="roof-stars">${stars}</g>
      <g class="roof-moon-phase">
        <title>Tonight's moon: ${phaseNames[Math.floor(fraction * 8 + 0.5) % 8]}</title>
        <circle cx="${fixed(moon.x)}" cy="${fixed(moon.y)}" r="${fixed(moon.r * 3)}" fill="url(#roofMoonGlow)" opacity="${fixed(0.2 + illumination * 0.8)}"/>
        <circle class="roof-moon-dark" cx="${fixed(moon.x)}" cy="${fixed(moon.y)}" r="${fixed(moon.r)}"/>
        <path class="roof-moon" d="${lit}"/>
        <g clip-path="url(#roofMoonLit)">
          <circle class="roof-crater" cx="${fixed(moon.x - moon.r * 0.3)}" cy="${fixed(moon.y - moon.r * 0.2)}" r="${fixed(moon.r * 0.22)}"/>
          <circle class="roof-crater" cx="${fixed(moon.x + moon.r * 0.35)}" cy="${fixed(moon.y + moon.r * 0.3)}" r="${fixed(moon.r * 0.15)}"/>
        </g>
      </g>
      <rect width="${width}" height="${height}" fill="rgba(150, 180, 240, 0.06)"/>
      <path class="roof-glare" d="${glare}"/>
      <path class="roof-iron" d="M0 ${height}A${fixed(rx)} ${fixed(ry * 0.5)} 0 0 1 ${width} ${height}"/>
      <path class="roof-iron" d="${ribs}"/>
    </g>
    <path class="roof-frame" d="${arch}"/>
    <path class="roof-frame-shine" d="M0 ${height}A${fixed(rx)} ${ry} 0 0 1 ${width} ${height}"/>
    <path class="roof-finial" d="M${fixed(rx - 4)} ${top + 3}L${fixed(rx)} ${top - 14}L${fixed(rx + 4)} ${top + 3}Z"/>
    <circle class="roof-finial" cx="${fixed(rx)}" cy="${top - 2}" r="4"/>`;

  greenhouse.style.setProperty("--pane", `${fixed(width / panes)}px`);
}

// ---------- Fairies stealing from the jars ----------

function releaseFairies(greenhouse) {
  const later = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function makeFairy() {
    const fairy = document.createElement("div");
    fairy.className = "fairy";
    fairy.setAttribute("aria-hidden", "true");
    fairy.innerHTML = `<div class="fairy-face"><div class="fairy-bob">
      <span class="fairy-catch"></span>
      <span class="fairy-wing fairy-wing-back"></span><span class="fairy-wing"></span>
      <span class="fairy-head"></span><span class="fairy-body"></span><span class="fairy-loot"></span>
    </div></div>`;
    greenhouse.append(fairy);
    return fairy;
  }

  function sparkle(fairy) {
    const home = greenhouse.getBoundingClientRect();
    const at = fairy.getBoundingClientRect();
    const spark = document.createElement("span");
    spark.className = "fairy-spark";
    spark.style.left = `${fixed(at.left - home.left + (Math.random() - 0.5) * 8)}px`;
    spark.style.top = `${fixed(at.top - home.top + (Math.random() - 0.5) * 8)}px`;
    spark.style.setProperty("--sx", `${fixed((Math.random() - 0.5) * 16)}px`);
    spark.addEventListener("animationend", () => spark.remove());
    greenhouse.append(spark);
  }

  // A curved, eased flight path sampled into keyframes
  async function fly(fairy, from, to, duration) {
    const control = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 40 - Math.random() * 80 };
    const frames = [];
    for (let k = 0; k <= 20; k++) {
      const s = k / 20;
      const t = s < 0.5 ? 2 * s * s : 1 - (-2 * s + 2) ** 2 / 2;
      const p = curvePoint(from, control, to, t);
      frames.push({ transform: `translate(${fixed(p.x)}px, ${fixed(p.y)}px)` });
    }
    duration = duration || Math.min(4200, Math.max(1800, Math.hypot(to.x - from.x, to.y - from.y) * 4.5));
    fairy.querySelector(".fairy-face").classList.toggle("faces-left", to.x < from.x);
    fairy.flight = fairy.animate(frames, { duration, fill: "forwards" });
    const trail = setInterval(() => sparkle(fairy), 80);
    try {
      await fairy.flight.finished;
    } finally {
      clearInterval(trail);
    }
  }

  function positionOf(element) {
    const home = greenhouse.getBoundingClientRect();
    const at = element.getBoundingClientRect();
    return { x: at.left - home.left, y: at.top - home.top };
  }

  function steal(heist) {
    const { jar, fairy } = heist;
    const loot = fairy.querySelector(".fairy-loot");
    loot.dataset.loot = jar.dataset.loot;
    loot.textContent = lootGlyphs[jar.dataset.loot] || "";
    fairy.classList.add("has-loot");

    // The jar is one piece lighter for a while, but never empty
    const pieces = [...jar.querySelectorAll(".jar-piece:not(.is-stolen)")];
    if (pieces.length > 1) {
      const piece = pieces[Math.floor(Math.random() * pieces.length)];
      piece.classList.add("is-stolen");
      heist.piece = piece;
      heist.refill = setTimeout(() => piece.classList.remove("is-stolen"), 20000);
    }
  }

  function say(text, at) {
    const note = document.createElement("span");
    note.className = "fairy-note";
    note.textContent = text;
    note.style.left = `${fixed(at.x)}px`;
    note.style.top = `${fixed(at.y - 30)}px`;
    note.addEventListener("animationend", () => note.remove());
    greenhouse.append(note);
  }

  // The stolen bit tumbles down onto the bench and fades
  function dropLoot(loot, from) {
    const bench = greenhouse.querySelector(".bench");
    const floor = positionOf(bench).y + bench.offsetHeight - 22;
    const fallen = loot.cloneNode(true);
    fallen.className = "fairy-loot fallen-loot";
    greenhouse.append(fallen);
    const x = from.x;
    const drop = Math.max(0, floor - from.y);
    fallen.animate([
      { transform: `translate(${fixed(x)}px, ${fixed(from.y)}px) rotate(0deg)`, opacity: 1, easing: "ease-in" },
      { transform: `translate(${fixed(x + 10)}px, ${fixed(floor)}px) rotate(200deg)`, opacity: 1, offset: 0.7, easing: "ease-out" },
      { transform: `translate(${fixed(x + 14)}px, ${fixed(floor - 10)}px) rotate(250deg)`, opacity: 1, offset: 0.82, easing: "ease-in" },
      { transform: `translate(${fixed(x + 17)}px, ${fixed(floor)}px) rotate(290deg)`, opacity: 0 },
    ], { duration: 600 + Math.sqrt(drop) * 40 }).finished.then(() => fallen.remove());
  }

  // Tapping a fairy makes it drop whatever it stole and dart away
  function catchFairy(heist) {
    const { fairy, jar } = heist;
    if (heist.caught) return;
    heist.caught = true;
    const here = positionOf(fairy);
    fairy.flight?.cancel();
    jar.classList.remove("is-raided");
    fairy.classList.remove("is-dipping");
    fairy.classList.add("is-startled");

    if (fairy.classList.contains("has-loot")) {
      fairy.classList.remove("has-loot");
      dropLoot(fairy.querySelector(".fairy-loot"), here);
      if (heist.piece) {
        clearTimeout(heist.refill);
        heist.piece.classList.remove("is-stolen");
      }
      say(["Caught one!", "Put that back!", "Got you!"][Math.floor(Math.random() * 3)], here);
    } else {
      say("Shoo!", here);
    }

    const width = greenhouse.clientWidth;
    const away = { x: here.x < width / 2 ? -60 : width + 60, y: Math.max(20, here.y - 160) };
    fly(fairy, here, away, 700).catch(() => {}).then(() => fairy.remove());
  }

  async function raid() {
    const shelf = [...greenhouse.querySelectorAll(".jar")].filter((jar) => jar.offsetParent !== null);
    if (!shelf.length) return;
    const jar = shelf[Math.floor(Math.random() * shelf.length)];
    const home = greenhouse.getBoundingClientRect();
    const glass = jar.querySelector(".jar-glass").getBoundingClientRect();
    const mouth = { x: glass.left - home.left + glass.width / 2, y: glass.top - home.top - 6 };
    const edge = () => (Math.random() < 0.5 ? -40 : home.width + 40);
    const height = () => 40 + Math.random() * Math.max(0, mouth.y - 160);

    const fairy = makeFairy();
    const heist = { fairy, jar, caught: false };
    fairy.addEventListener("pointerdown", () => catchFairy(heist));

    try {
      await fly(fairy, { x: edge(), y: height() }, mouth);
      jar.classList.add("is-raided");
      fairy.classList.add("is-dipping");
      await later(700);
      if (heist.caught) return;
      steal(heist);
      await later(600);
      if (heist.caught) return;
      jar.classList.remove("is-raided");
      fairy.classList.remove("is-dipping");
      await fly(fairy, mouth, { x: edge(), y: height() });
      fairy.remove();
    } catch {
      // The flight was cut short because a visitor caught the fairy; catchFairy() sends it off
    }
  }

  async function haunt() {
    if (!document.hidden) await raid();
    setTimeout(haunt, 4000 + Math.random() * 7000);
  }

  setTimeout(haunt, 2500);
}
