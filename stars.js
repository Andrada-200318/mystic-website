// Phones get a taller sky with fewer, wider-spaced stars so each one is easy to tap
const isNarrow = window.matchMedia("(max-width: 640px)").matches;
const skyWidth = isNarrow ? 600 : 1000;
const skyHeight = isNarrow ? 780 : 620;
const starCount = isNarrow ? 42 : 70;
const starSpacing = isNarrow ? 74 : 58;
const snapDistance = isNarrow ? 56 : 48;
const storageKey = "starWeaverSky";
const keepDays = 7;
const dayMs = 86400000;

const starNames = ["Velmira", "Astrael", "Sorrin", "Ilyth", "Caelan", "Noctara", "Eluna", "Vesper", "Oriel", "Seraphe", "Lumen", "Thessa", "Mirael", "Zephyra", "Calyx", "Nyra"];

const adjectives = {
  small: ["Little", "Quiet", "Hidden"],
  medium: ["Silver", "Wandering", "Dreaming"],
  large: ["Great", "Ancient", "Eternal"]
};

// Each kind of shape has its own figures and its own origin story
const figures = {
  loop: {
    names: ["Lantern", "Mirror", "Chalice", "Wreath", "Gate"],
    story: "Long ago, the stars joined hands in a circle so that nothing precious would be lost in the dark. That circle became {name}, and it still keeps watch over everything we love."
  },
  hub: {
    names: ["Crown", "Lotus", "Compass", "Sun-Wheel", "Spider"],
    story: "In the first age, a single star called its sisters close, and together they became {name}. Every thread of it still leads back to that one bright heart."
  },
  tall: {
    names: ["Tower", "Serpent", "Ladder", "Spire", "Willow"],
    story: "They say {name} was raised by a dreamer who wanted to climb to the moon one star at a time. The dreamer never stopped climbing, and the sky kept the path."
  },
  wide: {
    names: ["River", "Bridge", "Swan", "Arrow", "Wing"],
    story: "Sailors once followed {name} across the dark sea, for it always stretched toward home."
  },
  wander: {
    names: ["Wanderer", "Lantern-Bearer", "Dancer", "Weaver", "Fox"],
    story: "{name} is said to roam the sky in search of something it lost before time began. Wherever it passes, lost things are found again."
  }
};

const traits = [
  "gentle but impossible to break",
  "always the first to find the way",
  "keepers of secrets and old songs",
  "brave in the dark and soft in the light",
  "lucky in love and slow to anger",
  "dreamers who make their dreams real",
  "healers without ever knowing it",
  "restless, curious and kind"
];

const blessings = [
  "When it rises, make a wish and let it go.",
  "Look for it on nights when you need courage.",
  "It is said to shine brightest for those who are starting over.",
  "If you find it again, it means someone is thinking of you.",
  "Whisper a question to it and listen for the answer in your dreams."
];

const sky = document.getElementById("sky");
const milkyWay = document.getElementById("milkyWay");
const skyDust = document.getElementById("skyDust");
const skyThreads = document.getElementById("skyThreads");
const skyStars = document.getElementById("skyStars");
const guideThread = document.getElementById("guideThread");
const skyHint = document.getElementById("skyHint");
const undoButton = document.getElementById("undoButton");
const clearButton = document.getElementById("clearButton");
const nameButton = document.getElementById("nameButton");
const reading = document.getElementById("reading");
const constellationName = document.getElementById("constellationName");
const mythFigure = document.getElementById("mythFigure");
const mythText = document.getElementById("mythText");
const saveButton = document.getElementById("saveButton");
const againButton = document.getElementById("againButton");
const mySkyNote = document.getElementById("mySkyNote");
const mySkyList = document.getElementById("mySkyList");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const today = new Date();

let stars = [];
let threads = [];
let activeStar = null;
let isNamed = false;
let currentFigure = null;

// Small seeded random generator, so the sky stays the same all day
function createRandom(seed) {
  return function() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

function pick(list, seed) {
  return list[seed % list.length];
}

// ---------- Tonight's sky ----------

function createSky() {
  const random = createRandom(hashString(today.toDateString()));
  const margin = 34;
  sky.setAttribute("viewBox", `0 0 ${skyWidth} ${skyHeight}`);
  milkyWay.setAttribute("transform", `translate(${skyWidth / 2} ${skyHeight / 2}) rotate(${isNarrow ? -58 : -22})`);

  for (let attempt = 0; stars.length < starCount && attempt < 4000; attempt++) {
    const x = margin + random() * (skyWidth - margin * 2);
    const y = margin + random() * (skyHeight - margin * 2);
    const tooClose = stars.some(function(star) {
      return Math.hypot(star.x - x, star.y - y) < starSpacing;
    });
    if (!tooClose) {
      const brightness = random() ** 2;
      stars.push({ x: x, y: y, r: 2 + brightness * 3.6, brightness: brightness });
    }
  }

  let dust = "";
  for (let i = 0; i < 220; i++) {
    const r = (0.4 + random() * 0.8).toFixed(2);
    const opacity = (0.15 + random() * 0.45).toFixed(2);
    dust += `<circle cx="${(random() * skyWidth).toFixed(1)}" cy="${(random() * skyHeight).toFixed(1)}" r="${r}" opacity="${opacity}"/>`;
  }
  skyDust.innerHTML = dust;

  skyStars.innerHTML = stars.map(function(star, index) {
    const twinkle = `animation-duration: ${(2.5 + random() * 4).toFixed(1)}s; animation-delay: -${(random() * 6).toFixed(1)}s`;
    return `
      <g class="star" data-index="${index}" tabindex="0" role="button" aria-label="Star ${index + 1}" transform="translate(${star.x.toFixed(1)} ${star.y.toFixed(1)})">
        <circle class="star-ring" r="${(star.r + 9).toFixed(1)}"/>
        <circle class="star-glow" r="${(star.r * 4).toFixed(1)}" style="${twinkle}"/>
        <circle class="star-core" r="${star.r.toFixed(1)}"/>
      </g>`;
  }).join("");
}

function toSkyPoint(event) {
  const point = sky.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(sky.getScreenCTM().inverse());
}

function nearestStar(point) {
  let best = null;
  let bestDistance = snapDistance;
  stars.forEach(function(star, index) {
    const distance = Math.hypot(star.x - point.x, star.y - point.y);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}

function hasThread(a, b) {
  return threads.some(function(thread) {
    return (thread[0] === a && thread[1] === b) || (thread[0] === b && thread[1] === a);
  });
}

// Tapping a star starts a thread, tapping another joins them, tapping the glowing star again lifts the thread
function selectStar(index) {
  if (isNamed) return;

  if (activeStar === null) {
    activeStar = index;
  } else if (activeStar === index) {
    activeStar = null;
  } else {
    if (!hasThread(activeStar, index)) {
      threads.push([activeStar, index]);
    }
    activeStar = index;
  }
  render(true);
}

function render(animateNewest) {
  skyThreads.innerHTML = threads.map(function(thread, index) {
    const a = stars[thread[0]];
    const b = stars[thread[1]];
    const isNew = animateNewest && index === threads.length - 1 && !reduceMotion;
    return `<line class="thread${isNew ? " is-new" : ""}" pathLength="1" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`;
  }).join("");

  const used = usedStars();
  skyStars.querySelectorAll(".star").forEach(function(element) {
    const index = Number(element.dataset.index);
    element.classList.toggle("is-active", index === activeStar);
    element.classList.toggle("is-used", used.includes(index));
  });

  if (activeStar === null) guideThread.classList.remove("is-visible");

  undoButton.disabled = isNamed || threads.length === 0;
  clearButton.disabled = isNamed || (threads.length === 0 && activeStar === null);
  nameButton.disabled = isNamed || threads.length < 2;
  updateHint();
}

function updateHint() {
  if (isNamed) {
    skyHint.textContent = "Your constellation has been named";
  } else if (threads.length === 0 && activeStar === null) {
    skyHint.textContent = "Tap any star to begin";
  } else if (threads.length === 0) {
    skyHint.textContent = "Now tap another star to join them";
  } else if (threads.length < 2) {
    skyHint.textContent = "Keep weaving. Tap the glowing star again to lift your thread";
  } else {
    skyHint.textContent = "When your shape feels finished, ask the sky for its name";
  }
}

function undo() {
  const last = threads.pop();
  if (last) activeStar = last[0];
  render(false);
}

function clearSky() {
  threads = [];
  activeStar = null;
  render(false);
}

function usedStars() {
  const used = [];
  threads.forEach(function(thread) {
    thread.forEach(function(index) {
      if (!used.includes(index)) used.push(index);
    });
  });
  return used;
}

// ---------- Naming the constellation ----------

function shapeOf(used) {
  const degree = {};
  const parent = {};
  let hasLoop = false;

  function root(index) {
    while (parent[index] !== index) index = parent[index];
    return index;
  }

  used.forEach(function(index) {
    degree[index] = 0;
    parent[index] = index;
  });
  threads.forEach(function(thread) {
    degree[thread[0]]++;
    degree[thread[1]]++;
    const a = root(thread[0]);
    const b = root(thread[1]);
    if (a === b) hasLoop = true;
    else parent[a] = b;
  });

  const xs = used.map(function(index) { return stars[index].x; });
  const ys = used.map(function(index) { return stars[index].y; });
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  const maxDegree = Math.max(...Object.values(degree));

  if (hasLoop) return "loop";
  if (maxDegree >= 3) return "hub";
  if (height > width * 1.3) return "tall";
  if (width > height * 1.8) return "wide";
  return "wander";
}

function nameConstellation() {
  const used = usedStars();
  const shape = shapeOf(used);
  const seed = hashString(today.toDateString() + threads.map(function(thread) { return thread.join("-"); }).join("|"));
  const size = used.length <= 3 ? "small" : used.length <= 6 ? "medium" : "large";
  const name = `The ${pick(adjectives[size], seed)} ${pick(figures[shape].names, seed >>> 3)}`;

  const brightest = used.reduce(function(best, index) {
    return stars[index].brightness > stars[best].brightness ? index : best;
  }, used[0]);
  const starName = pick(starNames, (seed >>> 5) + brightest);

  const myth = [
    figures[shape].story.replace("{name}", name),
    `It is woven from ${used.length} stars, and the brightest of them is called ${starName}.`,
    `Those born beneath it are said to be ${pick(traits, seed >>> 7)}.`,
    pick(blessings, seed >>> 9)
  ].join(" ");

  currentFigure = {
    name: name,
    stars: used.map(function(index) {
      return [Math.round(stars[index].x), Math.round(stars[index].y), Number(stars[index].r.toFixed(1))];
    }),
    threads: threads.map(function(thread) {
      return [used.indexOf(thread[0]), used.indexOf(thread[1])];
    })
  };

  isNamed = true;
  activeStar = null;
  render(false);

  constellationName.textContent = name;
  mythFigure.innerHTML = figureSVG(currentFigure, 200, 140);
  mythText.textContent = myth;
  saveButton.disabled = false;
  saveButton.textContent = "Add to My Sky";

  reading.hidden = false;
  requestAnimationFrame(function() {
    reading.classList.add("is-visible");
    reading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
}

// Fits a constellation's stars into a small picture, keeping its proportions
function figureSVG(figure, width, height) {
  const padding = 18;
  const xs = figure.stars.map(function(star) { return star[0]; });
  const ys = figure.stars.map(function(star) { return star[1]; });
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const spanX = Math.max(...xs) - minX || 1;
  const spanY = Math.max(...ys) - minY || 1;
  const scale = Math.min((width - padding * 2) / spanX, (height - padding * 2) / spanY);
  const offsetX = (width - spanX * scale) / 2;
  const offsetY = (height - spanY * scale) / 2;

  const points = figure.stars.map(function(star) {
    return [offsetX + (star[0] - minX) * scale, offsetY + (star[1] - minY) * scale, star[2]];
  });

  const lines = figure.threads.map(function(thread) {
    const a = points[thread[0]];
    const b = points[thread[1]];
    return `<line class="figure-thread" x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}"/>`;
  }).join("");

  const dots = points.map(function(point) {
    return `<circle class="figure-glow" cx="${point[0].toFixed(1)}" cy="${point[1].toFixed(1)}" r="${(point[2] * 2.4).toFixed(1)}"/><circle class="figure-star" cx="${point[0].toFixed(1)}" cy="${point[1].toFixed(1)}" r="${(point[2] * 0.9).toFixed(1)}"/>`;
  }).join("");

  return lines + dots;
}

// ---------- My Sky (saved in this browser for a week) ----------

function loadMySky() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    return saved.filter(function(figure) {
      return Date.now() - figure.savedAt < keepDays * dayMs;
    });
  } catch (error) {
    return [];
  }
}

function saveToMySky() {
  if (!currentFigure) return;
  const mySky = loadMySky();
  mySky.push(Object.assign({ savedAt: Date.now() }, currentFigure));
  try {
    localStorage.setItem(storageKey, JSON.stringify(mySky));
    saveButton.textContent = "Added to My Sky ✦";
  } catch (error) {
    saveButton.textContent = "Your browser could not save it";
  }
  saveButton.disabled = true;
  renderMySky();
}

function renderMySky() {
  const mySky = loadMySky();

  if (mySky.length === 0) {
    mySkyNote.textContent = "The constellations you save will gather here for seven nights.";
  } else if (mySky.length === 1) {
    mySkyNote.textContent = "1 constellation shines in your sky this week.";
  } else {
    mySkyNote.textContent = `${mySky.length} constellations shine in your sky this week.`;
  }

  mySkyList.innerHTML = mySky.slice().reverse().map(function(figure) {
    const day = new Date(figure.savedAt).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });
    return `
      <li class="my-sky-item">
        <svg viewBox="0 0 200 140" aria-hidden="true">${figureSVG(figure, 200, 140)}</svg>
        <p class="my-sky-name">${figure.name}</p>
        <p class="my-sky-date">${day}</p>
      </li>`;
  }).join("");
}

function weaveAgain() {
  isNamed = false;
  currentFigure = null;
  reading.classList.remove("is-visible");
  reading.hidden = true;
  clearSky();
  sky.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
}

// ---------- Events ----------

sky.addEventListener("click", function(event) {
  const index = nearestStar(toSkyPoint(event));
  if (index !== null) selectStar(index);
});

sky.addEventListener("keydown", function(event) {
  const element = event.target.closest(".star");
  if (element && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    selectStar(Number(element.dataset.index));
  } else if (event.key === "Escape" && activeStar !== null) {
    activeStar = null;
    render(false);
  }
});

// A faint thread follows the mouse from the glowing star
sky.addEventListener("pointermove", function(event) {
  if (activeStar === null || event.pointerType !== "mouse") return;
  const point = toSkyPoint(event);
  const star = stars[activeStar];
  guideThread.setAttribute("x1", star.x);
  guideThread.setAttribute("y1", star.y);
  guideThread.setAttribute("x2", point.x);
  guideThread.setAttribute("y2", point.y);
  guideThread.classList.add("is-visible");
});

sky.addEventListener("pointerleave", function() {
  guideThread.classList.remove("is-visible");
});

undoButton.addEventListener("click", undo);
clearButton.addEventListener("click", clearSky);
nameButton.addEventListener("click", nameConstellation);
saveButton.addEventListener("click", saveToMySky);
againButton.addEventListener("click", weaveAgain);

createSky();
render(false);
renderMySky();
