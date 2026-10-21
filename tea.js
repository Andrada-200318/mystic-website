// ---------- Shapes the leaves can settle into (drawn as lines on a 100 × 100 grid) ----------

function arc(cx, cy, r, from, to, steps) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (from + (to - from) * i / steps) * Math.PI / 180;
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  return points;
}

function ellipse(cx, cy, rx, ry, steps) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const angle = i / steps * Math.PI * 2;
    points.push([cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry]);
  }
  return points;
}

function heart() {
  const points = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32 * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    points.push([50 + x * 2.4, 46 - y * 2.4]);
  }
  return points;
}

function starPoints() {
  const points = [];
  for (let i = 0; i <= 10; i++) {
    const angle = (-90 + i * 36) * Math.PI / 180;
    const r = i % 2 ? 17 : 42;
    points.push([50 + Math.cos(angle) * r, 52 + Math.sin(angle) * r]);
  }
  return points;
}

function sunRays() {
  const rays = [];
  for (let i = 0; i < 8; i++) {
    const angle = i * 45 * Math.PI / 180;
    rays.push([[50 + Math.cos(angle) * 27, 50 + Math.sin(angle) * 27], [50 + Math.cos(angle) * 42, 50 + Math.sin(angle) * 42]]);
  }
  return rays;
}

function petals() {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const angle = (-90 + i * 72) * Math.PI / 180;
    result.push(arc(50 + Math.cos(angle) * 17, 38 + Math.sin(angle) * 17, 10, 0, 360, 12));
  }
  return result;
}

const symbols = [
  { name: "Bird", keyword: "good news",
    meaning: "News is on its way, and it is likely to lift your spirits. A message or an opportunity is flying toward you.",
    lines: [[[8, 46], [18, 38], [30, 36], [42, 42], [50, 52]], [[50, 52], [58, 42], [70, 36], [82, 38], [92, 46]]] },
  { name: "Key", keyword: "an open door",
    meaning: "A door that seemed locked is about to open. The answer you have been looking for is closer than you think.",
    lines: [arc(24, 50, 14, 0, 360, 16), [[38, 50], [92, 50]], [[78, 50], [78, 63]], [[88, 50], [88, 65]]] },
  { name: "Ring", keyword: "commitment",
    meaning: "A circle of completion. A promise, a partnership or a long project is coming full circle.",
    lines: [arc(50, 50, 32, 0, 360, 28)] },
  { name: "Path", keyword: "a new direction",
    meaning: "A winding road appears. A journey or a change of direction is calling, so follow it with curiosity.",
    lines: [[[8, 90], [20, 76], [36, 74], [48, 62], [42, 48], [52, 36], [70, 34], [80, 20], [92, 10]]] },
  { name: "Heart", keyword: "love",
    meaning: "Love surrounds you, whether it is romance, friendship or a kinder way of treating yourself.",
    lines: [heart()] },
  { name: "Star", keyword: "hope",
    meaning: "A lucky star. Hopes you had almost given up on are being renewed.",
    lines: [starPoints()] },
  { name: "Crescent Moon", keyword: "intuition",
    meaning: "The moon asks you to trust your intuition. Your feelings will guide you better than facts right now.",
    lines: [arc(50, 50, 38, 60, 300, 22).concat(arc(80, 50, 34.7, 251.5, 108.5, 16))] },
  { name: "Tree", keyword: "growth",
    meaning: "Steady, lasting growth. Something you have been tending is putting down deep roots.",
    lines: [[[50, 94], [50, 56]], [[50, 72], [38, 62]], [[50, 66], [62, 56]], arc(50, 34, 22, 0, 360, 20)] },
  { name: "Anchor", keyword: "stability",
    meaning: "Stability and a safe harbour. You are about to find solid ground, in love or in work.",
    lines: [[[50, 20], [50, 88]], arc(50, 13, 7, 0, 360, 10), [[34, 32], [66, 32]], arc(50, 62, 26, 15, 165, 14)] },
  { name: "Fish", keyword: "abundance",
    meaning: "A sign of abundance and good fortune. Money, gifts or blessings may arrive from an unexpected place.",
    lines: [ellipse(44, 50, 30, 16, 26), [[72, 50], [92, 36], [90, 64], [72, 50]]] },
  { name: "Mountain", keyword: "ambition",
    meaning: "A challenge stands before you, but so does the view from the top. Your ambition will carry you over.",
    lines: [[[6, 82], [28, 44], [40, 60], [60, 22], [94, 82], [6, 82]]] },
  { name: "Flower", keyword: "joy",
    meaning: "Happiness is blooming. A wish is about to be granted, or a season of joy is beginning.",
    lines: petals().concat([[[50, 56], [50, 96]]]) },
  { name: "Ladder", keyword: "progress",
    meaning: "Rising step by step. Recognition or advancement will come through patient effort.",
    lines: [[[36, 8], [36, 92]], [[64, 8], [64, 92]], [[36, 24], [64, 24]], [[36, 44], [64, 44]], [[36, 64], [64, 64]], [[36, 84], [64, 84]]] },
  { name: "Sun", keyword: "success",
    meaning: "The brightest of signs. Success, warmth and energy are shining on you.",
    lines: [arc(50, 50, 18, 0, 360, 16)].concat(sunRays()) },
  { name: "Eye", keyword: "insight",
    meaning: "Pay close attention. Something important will be revealed to those who look carefully.",
    lines: [[[8, 50], [28, 32], [50, 26], [72, 32], [92, 50]], [[8, 50], [28, 68], [50, 74], [72, 68], [92, 50]], arc(50, 50, 11, 0, 360, 12)] }
];

// Where each symbol lands in the cup, and what that part of the cup means
const zones = [
  { place: "Near the rim", time: "The days ahead", distance: 78, size: 60 },
  { place: "On the side", time: "The weeks to come", distance: 66, size: 60 },
  { place: "At the bottom", time: "Further down the path", distance: 0, size: 66 }
];

const closings = [
  "Trust the shapes you saw, and notice where they appear in your week.",
  "Keep your question close. The leaves have only begun to answer it.",
  "Rinse your cup with gratitude. What is meant for you is already on its way."
];

const hints = {
  sip: "Press and hold the cup to sip your tea",
  sipping: "Keep sipping, but leave a little at the bottom",
  swirl: "Now swirl the cup: drag around it in circles three times, or press Enter",
  turn: "Turn the cup over onto the saucer to let the leaves settle",
  turning: "Three gentle taps on the bottom of the cup…",
  read: "The leaves have settled. Look closely at the shapes"
};

const cupCenter = 150;
const leafColors = ["#3b2a14", "#4a3a1a", "#2f2610", "#55401c"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sipDuration = 2600;
const fullSwirl = Math.PI * 6;
const flipTime = reduceMotion ? 50 : 950;
const tapTime = reduceMotion ? 300 : 1500;

const saucer = document.getElementById("saucer");
const cup = document.getElementById("cup");
const cupInner = document.getElementById("cupInner");
const leaves = document.getElementById("leaves");
const shapes = document.getElementById("shapes");
const tea = document.getElementById("tea");
const teaShine = document.getElementById("teaShine");
const steam = document.getElementById("steam");
const teaHint = document.getElementById("teaHint");
const teaProgress = document.getElementById("teaProgress");
const teaProgressBar = document.getElementById("teaProgressBar");
const turnButton = document.getElementById("turnButton");
const stepItems = document.querySelectorAll("#teaSteps li");
const reading = document.getElementById("reading");
const readingCards = document.getElementById("readingCards");
const readingSummary = document.getElementById("readingSummary");
const brewButton = document.getElementById("brewButton");

let step = "sip";
let sipProgress = 0;
let isSipping = false;
let lastFrame = null;
let swirlTotal = 0;
let lastAngle = null;
let isDragging = false;
let pressStep = null;
let chosen = [];

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function leafHTML(x, y, size) {
  const color = leafColors[Math.floor(Math.random() * leafColors.length)];
  const rx = (size * (1.4 + Math.random() * 1.4)).toFixed(1);
  const ry = (size * (0.7 + Math.random() * 0.6)).toFixed(1);
  const angle = Math.floor(Math.random() * 180);
  return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx}" ry="${ry}" fill="${color}" transform="rotate(${angle} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
}

// Loose leaves scattered at random across the bottom of the cup
function scatterLeaves(count, maxDistance) {
  let html = "";
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * maxDistance;
    html += leafHTML(cupCenter + Math.cos(angle) * distance, cupCenter + Math.sin(angle) * distance, 1 + Math.random() * 0.9);
  }
  return html;
}

// Evenly spaced points along a line made of several segments
function samplePoints(points, spacing) {
  const result = [points[0]];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const length = Math.hypot(x2 - x1, y2 - y1);
    let distance = spacing - carry;
    while (distance <= length) {
      result.push([x1 + (x2 - x1) * distance / length, y1 + (y2 - y1) * distance / length]);
      distance += spacing;
    }
    carry = length - (distance - spacing);
  }
  return result;
}

function placeSymbols() {
  const rimAngle = Math.random() * Math.PI * 2;
  // At least a third of a turn apart, so the rim and side symbols never overlap
  const sideAngle = rimAngle + (2 / 3 + Math.random() * 2 / 3) * Math.PI;
  const angles = [rimAngle, sideAngle, 0];
  let leafMarkup = scatterLeaves(22, 112);
  let outlineMarkup = "";

  chosen = shuffle(symbols).slice(0, 3);
  chosen.forEach(function(symbol, index) {
    const zone = zones[index];
    const scale = zone.size / 100;
    const centerX = cupCenter + Math.cos(angles[index]) * zone.distance;
    const centerY = cupCenter + Math.sin(angles[index]) * zone.distance;
    const toCup = function(point) {
      return [centerX + (point[0] - 50) * scale, centerY + (point[1] - 50) * scale];
    };

    let outline = "";
    symbol.lines.forEach(function(line) {
      samplePoints(line, 3.4 / scale).forEach(function(point) {
        const [x, y] = toCup(point);
        leafMarkup += leafHTML(x + Math.random() * 2.4 - 1.2, y + Math.random() * 2.4 - 1.2, 1.3 + Math.random() * 0.6);
      });
      outline += "M" + line.map(function(point) {
        return toCup(point).map(function(value) { return value.toFixed(1); }).join(" ");
      }).join("L");
    });
    outlineMarkup += `<path class="shape-outline" pathLength="1" d="${outline}"/>`;
  });

  leaves.innerHTML = leafMarkup;
  shapes.innerHTML = outlineMarkup;
}

// ---------- Steps ----------

function setStep(name) {
  step = name;
  const visible = name === "turning" ? "turn" : name;
  const order = ["sip", "swirl", "turn", "read"];
  stepItems.forEach(function(item) {
    const position = order.indexOf(item.dataset.step);
    item.classList.toggle("is-current", item.dataset.step === visible);
    item.classList.toggle("is-done", position < order.indexOf(visible));
  });
  setHint(hints[name]);
  teaProgress.classList.toggle("is-hidden", name !== "sip" && name !== "swirl");
  cup.classList.toggle("is-swirlable", name === "swirl");
}

function setHint(text) {
  teaHint.textContent = text;
  cup.setAttribute("aria-label", "Teacup. " + text);
}

function setProgress(value) {
  teaProgressBar.style.width = (value * 100).toFixed(1) + "%";
}

// ---------- Sip: hold to drink ----------

function drawTea() {
  tea.style.opacity = (1 - sipProgress * 0.9).toFixed(3);
  tea.style.transform = `scale(${(1 - sipProgress * 0.2).toFixed(3)})`;
  teaShine.style.opacity = (0.5 - sipProgress * 0.5).toFixed(3);
  steam.style.opacity = (1 - sipProgress).toFixed(3);
  setProgress(sipProgress);
}

function sipFrame(time) {
  if (!isSipping) return;
  if (lastFrame !== null) {
    sipProgress = Math.min(1, sipProgress + (time - lastFrame) / sipDuration);
  }
  lastFrame = time;
  drawTea();

  if (sipProgress >= 1) {
    stopSipping();
    setProgress(0);
    setStep("swirl");
    return;
  }
  requestAnimationFrame(sipFrame);
}

function startSipping() {
  if (step !== "sip" || isSipping) return;
  isSipping = true;
  lastFrame = null;
  cup.classList.add("is-sipping");
  requestAnimationFrame(sipFrame);
}

function stopSipping() {
  if (!isSipping) return;
  isSipping = false;
  cup.classList.remove("is-sipping");
  if (step === "sip" && sipProgress > 0) setHint(hints.sipping);
}

// ---------- Swirl: drag in circles around the cup ----------

function angleAround(event) {
  const rect = cup.getBoundingClientRect();
  return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
}

function turnCupBy(delta) {
  swirlTotal += delta;
  const degrees = swirlTotal * 180 / Math.PI;
  cup.style.setProperty("--turn", degrees.toFixed(1) + "deg");
  // The leaves lag behind the cup a little, like they are floating in what is left of the tea
  leaves.setAttribute("transform", `rotate(${(degrees * 0.6).toFixed(1)} ${cupCenter} ${cupCenter})`);
  setProgress(Math.min(1, Math.abs(swirlTotal) / fullSwirl));

  if (Math.abs(swirlTotal) >= fullSwirl) finishSwirl();
}

// Keyboard swirl: the cup turns three times clockwise by itself
function autoSwirl() {
  const start = performance.now();
  const duration = reduceMotion ? 300 : 2400;
  let previous = 0;

  function frame(time) {
    if (step !== "swirl") return;
    const progress = Math.min(1, (time - start) / duration);
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
    const target = eased * (fullSwirl + 0.01);
    turnCupBy(target - previous);
    previous = target;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function finishSwirl() {
  isDragging = false;
  setStep("turn");
  setProgress(1);
  turnButton.hidden = false;
}

// ---------- Turn the cup over, tap three times, lift it ----------

function turnCup() {
  if (step !== "turn") return;
  setStep("turning");
  turnButton.hidden = true;
  cupInner.classList.add("is-turned");

  setTimeout(function() {
    if (!reduceMotion) saucer.classList.add("is-tapping");
  }, flipTime);

  setTimeout(function() {
    saucer.classList.remove("is-tapping");
    // While the cup is upside down the leaves settle into their shapes, kept upright however far it was swirled
    placeSymbols();
    leaves.setAttribute("transform", "");
    const upright = `rotate(${(-swirlTotal * 180 / Math.PI).toFixed(1)} ${cupCenter} ${cupCenter})`;
    leaves.parentNode.setAttribute("transform", upright);
    tea.style.opacity = "0";
    teaShine.style.opacity = "0";
    cupInner.classList.remove("is-turned");
  }, flipTime + tapTime);

  setTimeout(revealShapes, flipTime * 2 + tapTime + 300);
}

function revealShapes() {
  setStep("read");
  const outlines = shapes.querySelectorAll(".shape-outline");
  const gap = reduceMotion ? 0 : 900;

  outlines.forEach(function(outline, index) {
    setTimeout(function() {
      outline.classList.add("is-revealed");
    }, index * gap);
  });

  setTimeout(showReading, outlines.length * gap + (reduceMotion ? 100 : 600));
}

function swirlDirectionText() {
  return swirlTotal > 0
    ? "You swirled the leaves sunwise, the old way of drawing good things toward you."
    : "You swirled the leaves against the sun, the old way of sending troubles away.";
}

function showReading() {
  readingCards.innerHTML = chosen.map(function(symbol, index) {
    return `
      <div class="reading-entry">
        <p class="reading-entry-position">${zones[index].place} · ${zones[index].time}</p>
        <p class="reading-entry-name">The ${symbol.name}</p>
        <p class="reading-entry-meaning">${symbol.meaning}</p>
      </div>`;
  }).join("");

  const [near, middle, far] = chosen;
  readingSummary.textContent = `Your cup speaks of ${near.keyword} in the days ahead, ${middle.keyword} in the weeks to come, and ${far.keyword} further down the path. ${swirlDirectionText()} ${closings[Math.floor(Math.random() * closings.length)]}`;

  reading.hidden = false;
  requestAnimationFrame(function() {
    reading.classList.add("is-visible");
    reading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
}

function brewNewCup() {
  sipProgress = 0;
  swirlTotal = 0;
  chosen = [];
  cup.style.setProperty("--turn", "0deg");
  leaves.setAttribute("transform", "");
  leaves.parentNode.setAttribute("transform", "");
  leaves.innerHTML = scatterLeaves(70, 100);
  shapes.innerHTML = "";
  drawTea();
  setStep("sip");
  turnButton.hidden = true;

  reading.classList.remove("is-visible");
  reading.hidden = true;
}

// ---------- Events ----------

cup.addEventListener("pointerdown", function(event) {
  pressStep = step;
  if (step === "sip") {
    cup.setPointerCapture(event.pointerId);
    startSipping();
  } else if (step === "swirl") {
    cup.setPointerCapture(event.pointerId);
    isDragging = true;
    lastAngle = angleAround(event);
  }
});

cup.addEventListener("pointermove", function(event) {
  if (step !== "swirl" || !isDragging) return;
  const angle = angleAround(event);
  let delta = angle - lastAngle;
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  lastAngle = angle;
  turnCupBy(delta);
});

["pointerup", "pointercancel", "lostpointercapture"].forEach(function(type) {
  cup.addEventListener(type, function() {
    stopSipping();
    isDragging = false;
  });
});

// Only a fresh tap turns the cup, not the release that ends a swirl
cup.addEventListener("click", function() {
  if (step === "turn" && pressStep === "turn") turnCup();
});

cup.addEventListener("keydown", function(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  if (event.repeat) return;
  if (step === "sip") startSipping();
  else if (step === "swirl") autoSwirl();
  else if (step === "turn") turnCup();
});

cup.addEventListener("keyup", function(event) {
  if (event.key === "Enter" || event.key === " ") stopSipping();
});

cup.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

turnButton.addEventListener("click", turnCup);

brewButton.addEventListener("click", function() {
  brewNewCup();
  cup.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
});

brewNewCup();
