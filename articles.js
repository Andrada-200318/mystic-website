// Turns the plain list of collections into herb bundles hanging from a vine.
// Touching a bundle grows a tendril where its article titles bloom one by one.
// Without JavaScript the page keeps the simple list, so every link stays reachable.

const garden = document.getElementById("garden");
const list = document.getElementById("collections");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Height of the vine strip above each row of bundles
const VINE_HEIGHT = 64;

// leaf: colour of the leaves (or buds) on the bundle; petal and heart: the flowers that bloom on the tendril
const herbs = {
  lavender:   { kind: "buds",    stem: "#6f8763", leaf: "#a98ad8", petal: "#b796e4", heart: "#f3dfa6" },
  sage:       { kind: "leaves",  stem: "#7c9579", leaf: "#a3bd9c", leafW: 3.4, leafL: 7,   petal: "#c7b2ec", heart: "#f3dfa6" },
  rosemary:   { kind: "leaves",  stem: "#5d7a58", leaf: "#7fa278", leafW: 1.2, leafL: 5.5, petal: "#a9c1ec", heart: "#eef3ff", step: 0.09 },
  eucalyptus: { kind: "leaves",  stem: "#7a958e", leaf: "#9dc1b9", leafW: 4.4, leafL: 5.6, petal: "#f1ead2", heart: "#d6b36a", step: 0.18 },
  mugwort:    { kind: "leaves",  stem: "#76866f", leaf: "#c4cfbf", leafW: 2.4, leafL: 7.5, petal: "#e3d9a0", heart: "#a47e36" },
  chamomile:  { kind: "flowers", stem: "#7b9566", leaf: "#93ad7d", leafW: 1.6, leafL: 5,   petal: "#f5f0e1", heart: "#e9c25a" },
  rose:       { kind: "flowers", stem: "#6b8559", leaf: "#7f9a6c", leafW: 3,   leafL: 5,   petal: "#e597ad", heart: "#a8455f" },
  calendula:  { kind: "flowers", stem: "#728d5e", leaf: "#8fa877", leafW: 2.6, leafL: 6,   petal: "#f0a64a", heart: "#b9581c" },
};
const herbNames = Object.keys(herbs);

// Small predictable random numbers, so a bundle grows the same way on every visit
function seeded(seed) {
  let s = seed * 9973 + 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const fixed = (n) => n.toFixed(1);

function curvePoint(start, control, end, t) {
  const u = 1 - t;
  return {
    x: u * u * start.x + 2 * u * t * control.x + t * t * end.x,
    y: u * u * start.y + 2 * u * t * control.y + t * t * end.y,
  };
}

function ellipse(x, y, rx, ry, angle, fill) {
  return `<ellipse cx="${fixed(x)}" cy="${fixed(y)}" rx="${rx}" ry="${ry}" transform="rotate(${fixed(angle)} ${fixed(x)} ${fixed(y)})" fill="${fill}"/>`;
}

function flowerHead(x, y, r, petal, heart, petals) {
  let out = "";
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    out += ellipse(x + Math.sin(a) * r * 0.75, y - Math.cos(a) * r * 0.75, fixed(r * 0.45), fixed(r * 0.75), (a * 180) / Math.PI, petal);
  }
  return out + `<circle cx="${fixed(x)}" cy="${fixed(y)}" r="${fixed(r * 0.4)}" fill="${heart}"/>`;
}

// ---------- Herb bundle: stems tied with twine, hanging head down ----------

function herbSvg(herb, rand) {
  const tie = { x: 50, y: 20 };
  const count = 7;
  let stems = "";
  let growth = "";

  for (let s = 0; s < count; s++) {
    const a = (s / (count - 1) - 0.5) * 0.75 + (rand() - 0.5) * 0.1;
    const len = 84 + rand() * 20;
    const end = { x: tie.x + Math.sin(a) * len, y: tie.y + Math.cos(a) * len };
    const control = { x: tie.x + Math.sin(a) * len * 0.45 + (rand() - 0.5) * 8, y: tie.y + Math.cos(a) * len * 0.5 };
    stems += `<path d="M${tie.x} ${tie.y}Q${fixed(control.x)} ${fixed(control.y)} ${fixed(end.x)} ${fixed(end.y)}"/>`;

    if (herb.kind === "buds") {
      const angle = (-a * 180) / Math.PI;
      for (let t = 0.5; t <= 1.001; t += 0.07) {
        const p = curvePoint(tie, control, end, t);
        growth += ellipse(p.x - 2, p.y, 2, 3.4, angle + 25, herb.leaf);
        growth += ellipse(p.x + 2, p.y, 2, 3.4, angle - 25, herb.leaf);
      }
      continue;
    }

    const step = herb.step || (herb.kind === "flowers" ? 0.22 : 0.15);
    for (let t = 0.3, side = s % 2 ? 1 : -1; t < 0.97; t += step, side = -side) {
      const p = curvePoint(tie, control, end, t);
      const b = a + side * 0.7;
      growth += ellipse(p.x + Math.sin(b) * herb.leafL, p.y + Math.cos(b) * herb.leafL, herb.leafW, herb.leafL, (-b * 180) / Math.PI, herb.leaf);
    }
    if (herb.kind === "flowers") {
      growth += flowerHead(end.x, end.y, 6.5, herb.petal, herb.heart, 6);
    }
  }

  const twine = [14, 18, 22].map((y) => `<rect x="42" y="${y}" width="16" height="2.6" rx="1.3"/>`).join("");
  return `<svg class="bundle-herb" viewBox="0 0 100 136" aria-hidden="true" focusable="false">
    <line class="bundle-cord" x1="50" y1="0" x2="50" y2="136"/>
    <g fill="none" stroke="${herb.stem}" stroke-width="1.6" stroke-linecap="round">${stems}</g>
    <g>${growth}</g>
    <g class="bundle-twine">${twine}</g>
  </svg>`;
}

function bloomSvg(herb) {
  return `<svg class="bloom-flower" viewBox="-12 -12 24 24" aria-hidden="true" focusable="false">${flowerHead(0, 0, 8, herb.petal, herb.heart, 5)}</svg>`;
}

function budSvg(herb) {
  return `<svg class="bloom-flower" viewBox="-12 -12 24 24" aria-hidden="true" focusable="false">
    <ellipse cx="0" cy="-1" rx="3.6" ry="6.5" fill="${herb.petal}"/>
    <path d="M-4.5 2Q0 9 4.5 2Q0 5 -4.5 2Z" fill="${herb.stem}"/>
  </svg>`;
}

function countLabel(n) {
  if (n === 0) return "still growing";
  return n === 1 ? "1 article" : `${n} articles`;
}

// ---------- Turn each collection into a bundle with a hidden tendril ----------

const cells = [...list.children].map((cell, index) => {
  const herb = herbs[cell.dataset.herb] || herbs[herbNames[index % herbNames.length]];
  const rand = seeded(index + 1);
  const name = cell.querySelector(".collection-name");
  const articles = cell.querySelector(".collection-articles");
  const count = articles.children.length;
  const id = `collection-${index + 1}`;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "bundle";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", id);
  button.innerHTML = `${herbSvg(herb, rand)}
    <span class="bundle-tag" style="--tilt: ${fixed((rand() - 0.5) * 8)}deg">
      <span class="tag-name"></span>
      <span class="tag-count">${countLabel(count)}</span>
    </span>`;
  button.querySelector(".tag-name").textContent = name.textContent.trim();
  button.addEventListener("click", () => toggle(cell));
  button.addEventListener("animationend", () => button.classList.remove("is-rustling"));
  name.replaceChildren(button);
  name.style.setProperty("--delay", `${fixed(-rand() * 6)}s`);

  if (count === 0) {
    articles.innerHTML = `<li class="is-bud">${budSvg(herb)}<span>The first bloom is still growing…</span></li>`;
  } else {
    for (const item of articles.children) item.insertAdjacentHTML("afterbegin", bloomSvg(herb));
  }
  [...articles.children].forEach((item, i) => {
    item.classList.add("bloom");
    item.style.setProperty("--i", i);
  });
  articles.classList.add("blooms");

  const tendril = document.createElement("div");
  tendril.className = "tendril";
  tendril.id = id;
  tendril.innerHTML = `<svg class="tendril-stem" aria-hidden="true" focusable="false"><path pathLength="1"/></svg>`;
  tendril.append(articles);
  cell.append(tendril);
  cell.style.setProperty("--count", articles.children.length);
  return cell;
});

const vines = document.createElement("div");
vines.className = "vines";
list.replaceWith(vines);
garden.classList.add("is-grown");
document.getElementById("gardenHint").hidden = false;

// ---------- Rows: one vine per row, as many bundles as fit across ----------

let perRow = 0;
let openCell = null;

function bundlesPerRow() {
  return Math.max(2, Math.min(5, Math.floor(vines.clientWidth / 180)));
}

function arrange() {
  const size = bundlesPerRow();
  if (size !== perRow) {
    perRow = size;
    const branches = [];
    for (let i = 0; i < cells.length; i += size) {
      const branch = document.createElement("div");
      branch.className = "branch";
      branch.innerHTML = `<svg class="vine" aria-hidden="true" focusable="false"></svg>`;
      const row = document.createElement("ul");
      row.className = "bundles";
      row.style.setProperty("--per-row", size);
      row.style.setProperty("--in-row", Math.min(size, cells.length - i));
      row.append(...cells.slice(i, i + size));
      branch.append(row);
      branches.push(branch);
    }
    vines.replaceChildren(...branches);
  }
  vines.querySelectorAll(".branch").forEach(drawVine);
  if (openCell) fitTendril(openCell);
}

function drawVine(branch, rowIndex) {
  const svg = branch.querySelector(".vine");
  const width = branch.clientWidth;
  const rand = seeded(rowIndex + 40);
  const phase = rowIndex * 2.1;
  const vineY = (x) => 30 + 8 * Math.sin((x / width) * Math.PI * 2.2 + phase) + 3 * Math.sin(x / 41 + phase);

  let stem = "";
  let twist = "";
  for (let x = -10; x <= width + 10; x += 6) {
    const cmd = x === -10 ? "M" : "L";
    stem += `${cmd}${x} ${fixed(vineY(x))}`;
    twist += `${cmd}${x} ${fixed(vineY(x) + 3 * Math.sin(x / 18 + phase))}`;
  }

  let leaves = "";
  for (let x = 14, side = 1; x < width - 6; x += 30 + rand() * 26, side = -side) {
    const y = vineY(x);
    const slope = (Math.atan2(vineY(x + 1) - vineY(x - 1), 2) * 180) / Math.PI;
    const turn = side * (35 + rand() * 25) + (rand() < 0.3 ? 180 : 0);
    leaves += `<path class="vine-leaf" d="M0 0Q8 -6 17 0Q8 6 0 0Z" transform="translate(${fixed(x)} ${fixed(y)}) rotate(${fixed(slope + turn)}) scale(${(0.7 + rand() * 0.6).toFixed(2)})"/>`;
    if (rand() < 0.2) {
      leaves += `<circle class="vine-berry" cx="${fixed(x + 6)}" cy="${fixed(y - side * 7)}" r="2.2"/>`;
    }
  }

  let cords = "";
  branch.querySelectorAll(".collection").forEach((cell) => {
    const x = cell.offsetLeft + cell.offsetWidth / 2;
    const y = fixed(vineY(x));
    cords += `<line class="vine-cord" x1="${x}" y1="${y}" x2="${x}" y2="${VINE_HEIGHT + 2}"/><circle class="vine-knot" cx="${x}" cy="${y}" r="2.6"/>`;
  });

  svg.setAttribute("viewBox", `0 0 ${width} ${VINE_HEIGHT}`);
  svg.innerHTML = `<path class="vine-stem" d="${stem}"/><path class="vine-twist" d="${twist}"/>${leaves}${cords}`;
}

// ---------- Opening and closing a bundle ----------

function stemPath(height) {
  let d = "M10 0";
  for (let y = 0, side = 1; y < height - 8; y += 36, side = -side) {
    const next = Math.min(y + 36, height - 8);
    d += `Q${10 + side * 6} ${(y + next) / 2} 10 ${next}`;
  }
  // A little curl at the growing tip
  return `${d}q4 6 -1 9q-4 -2 -1 -5`;
}

function fitTendril(cell) {
  const branch = cell.closest(".branch");
  const tendril = cell.querySelector(".tendril");
  const center = cell.offsetLeft + cell.offsetWidth / 2;
  const toLeft = center > branch.clientWidth / 2;
  const room = toLeft ? center : branch.clientWidth - center;
  tendril.classList.toggle("to-left", toLeft);
  tendril.style.width = `${Math.min(360, room - 12)}px`;

  const height = tendril.offsetHeight;
  const stem = tendril.querySelector(".tendril-stem");
  stem.setAttribute("viewBox", `0 0 20 ${height}`);
  stem.querySelector("path").setAttribute("d", stemPath(height));
  branch.style.paddingBottom = `${height + 36}px`;
}

function open(cell) {
  const button = cell.querySelector(".bundle");
  openCell = cell;
  cell.classList.add("is-open");
  button.setAttribute("aria-expanded", "true");
  button.classList.remove("is-rustling");
  void button.offsetWidth;
  button.classList.add("is-rustling");
  fitTendril(cell);

  // Once the tendril has grown, scroll just enough to show its last bloom
  setTimeout(() => {
    if (openCell !== cell) return;
    const rect = cell.querySelector(".tendril").getBoundingClientRect();
    const overflow = Math.min(rect.bottom - window.innerHeight + 24, rect.top - 120);
    if (overflow > 0) window.scrollBy({ top: overflow, behavior: reduceMotion ? "auto" : "smooth" });
  }, 650);
}

function close(cell) {
  cell.classList.remove("is-open");
  cell.querySelector(".bundle").setAttribute("aria-expanded", "false");
  cell.closest(".branch").style.paddingBottom = "";
  openCell = null;
}

function toggle(cell) {
  const wasOpen = cell === openCell;
  if (openCell) close(openCell);
  if (!wasOpen) open(cell);
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !openCell) return;
  const button = openCell.querySelector(".bundle");
  close(openCell);
  button.focus();
});

// ---------- Fireflies drifting around the garden ----------

if (!reduceMotion) {
  for (let i = 0; i < 12; i++) {
    const fly = document.createElement("span");
    fly.className = "firefly";
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${Math.random() * 100}%`;
    fly.style.setProperty("--dx", `${fixed((Math.random() - 0.5) * 120)}px`);
    fly.style.setProperty("--dy", `${fixed((Math.random() - 0.5) * 80)}px`);
    fly.style.setProperty("--duration", `${fixed(7 + Math.random() * 8)}s`);
    fly.style.setProperty("--delay", `${fixed(-Math.random() * 12)}s`);
    garden.append(fly);
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(arrange, 120);
});

arrange();
document.fonts.ready.then(arrange);
