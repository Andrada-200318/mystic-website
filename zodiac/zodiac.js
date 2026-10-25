// ---------- The twelve signs ----------

const signs = [
  {
    name: "Aries", glyph: "♈", element: "Fire", modality: "Cardinal", ruler: "Mars", dates: "21 March – 19 April",
    sun: "You were born to begin things. Brave, direct and full of spark, you light the way for others and feel most alive with a new challenge ahead.",
    moon: "Your feelings arrive fast and burn bright. You need freedom and action to feel safe, and you recover from hurt as quickly as you flare up.",
    rising: "People first meet your energy: bold, warm and straight to the point. You walk into a room as if you were already halfway through an adventure."
  },
  {
    name: "Taurus", glyph: "♉", element: "Earth", modality: "Fixed", ruler: "Venus", dates: "20 April – 20 May",
    sun: "You are steady, sensual and loyal to the bone. You build slowly and beautifully, and what you build tends to last.",
    moon: "Comfort is your medicine: good food, soft fabrics, familiar faces. You need calm and routine, and you love with quiet, unshakable devotion.",
    rising: "You come across as calm, grounded and gently charming. Others feel safe around you before you have said a word."
  },
  {
    name: "Gemini", glyph: "♊", element: "Air", modality: "Mutable", ruler: "Mercury", dates: "21 May – 20 June",
    sun: "Curious, quick and endlessly interested, you collect ideas the way others collect shells. Conversation is where you come alive.",
    moon: "You make sense of your feelings by talking them through. Your moods shift like the breeze, and you need variety and play to feel at ease.",
    rising: "You meet the world with bright eyes and a ready question. People see you as lively, witty and wonderfully hard to pin down."
  },
  {
    name: "Cancer", glyph: "♋", element: "Water", modality: "Cardinal", ruler: "the Moon", dates: "21 June – 22 July",
    sun: "You are the keeper of the hearth: protective, intuitive and deeply caring. Home and the people you love are your true north.",
    moon: "The Moon is at home here, so your feelings run deep and true. You sense moods instantly and need a safe nest to return to.",
    rising: "You first appear gentle and a little reserved, but your warmth shines through quickly. People often feel looked after in your company."
  },
  {
    name: "Leo", glyph: "♌", element: "Fire", modality: "Fixed", ruler: "the Sun", dates: "23 July – 22 August",
    sun: "Generous, radiant and big-hearted, you were made to shine and to help others shine too. Creativity and loyalty run in your veins.",
    moon: "You feel safest when you are seen and appreciated. Your heart is warm and dramatic, and your affection is as generous as sunlight.",
    rising: "You make an entrance without trying. People notice your confidence, your warmth and the way you light up a room."
  },
  {
    name: "Virgo", glyph: "♍", element: "Earth", modality: "Mutable", ruler: "Mercury", dates: "23 August – 22 September",
    sun: "Thoughtful, capable and quietly devoted, you notice the details others miss. You show love by being useful and making things better.",
    moon: "Order calms your heart. When feelings get tangled, you tidy, plan and help, and you feel best when life runs smoothly.",
    rising: "You come across as composed, modest and observant. People trust you to have a plan, and usually you do."
  },
  {
    name: "Libra", glyph: "♎", element: "Air", modality: "Cardinal", ruler: "Venus", dates: "23 September – 22 October",
    sun: "You seek harmony, beauty and fairness in everything. A natural diplomat, you bring people together and see every side of the story.",
    moon: "You feel most at peace in good company and lovely surroundings. Conflict unsettles you, and kindness is what soothes you.",
    rising: "Graceful and easy to talk to, you charm people from the first meeting. You have a gift for making others feel welcome."
  },
  {
    name: "Scorpio", glyph: "♏", element: "Water", modality: "Fixed", ruler: "Pluto and Mars", dates: "23 October – 21 November",
    sun: "Intense, magnetic and fiercely loyal, you dive beneath the surface of everything. You transform through life's storms and come out stronger.",
    moon: "Your emotions run deep and private. You trust slowly, but once you do, your loyalty is complete and your intuition almost uncanny.",
    rising: "You give off a quiet, mysterious power. People sense there is far more to you than you show, and they are right."
  },
  {
    name: "Sagittarius", glyph: "♐", element: "Fire", modality: "Mutable", ruler: "Jupiter", dates: "22 November – 21 December",
    sun: "An explorer at heart, you chase meaning, freedom and wide horizons. Your optimism and honesty make life feel like a grand journey.",
    moon: "You need room to roam, in body and mind. Laughter and adventure are how you heal, and you rarely stay down for long.",
    rising: "You meet the world with open arms and a big smile. People see you as cheerful, frank and always ready to go somewhere new."
  },
  {
    name: "Capricorn", glyph: "♑", element: "Earth", modality: "Cardinal", ruler: "Saturn", dates: "22 December – 19 January",
    sun: "Patient, wise and ambitious, you climb your mountain one sure step at a time. Your dry humour hides a deeply faithful heart.",
    moon: "You keep your feelings in careful order and feel secure when you are in control. Beneath the calm lies real tenderness.",
    rising: "You come across as serious, capable and older than your years. People quickly rely on you, and you rarely let them down."
  },
  {
    name: "Aquarius", glyph: "♒", element: "Air", modality: "Fixed", ruler: "Uranus and Saturn", dates: "20 January – 18 February",
    sun: "Original, inventive and a little ahead of your time, you dream of a better world and of the friends who will build it with you.",
    moon: "You need space and understanding more than fuss. You look at feelings with a clear eye and care deeply for people as a whole.",
    rising: "You seem friendly but intriguing, a little different from everyone else. People remember you for your unusual ideas."
  },
  {
    name: "Pisces", glyph: "♓", element: "Water", modality: "Mutable", ruler: "Neptune and Jupiter", dates: "19 February – 20 March",
    sun: "Dreamy, compassionate and deeply intuitive, you swim between worlds. Your imagination and kindness are your quiet magic.",
    moon: "You absorb the feelings around you the way the sea absorbs rain. You need quiet time, music and dreams to wash yourself clear.",
    rising: "You come across as gentle, soft-spoken and a little otherworldly. People feel they can tell you anything."
  }
];

// The text-style variation selector keeps phones from turning the glyphs into emoji
const glyph = (sign) => sign.glyph + "︎";

// ---------- Where the Sun, Moon and horizon were ----------
// Simplified formulas from Jean Meeus, "Astronomical Algorithms": accurate to a small
// fraction of a degree, which is plenty to place each one in the right sign.

const rad = Math.PI / 180;
const norm = (degrees) => ((degrees % 360) + 360) % 360;
const signOf = (longitude) => Math.floor(norm(longitude) / 30);

function centuriesSince2000(utcMs) {
  return (utcMs / 86400000 + 2440587.5 - 2451545) / 36525;
}

function sunLongitude(utcMs) {
  const t = centuriesSince2000(utcMs);
  const meanLongitude = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const anomaly = (357.52911 + 35999.05029 * t - 0.0001537 * t * t) * rad;
  const centre = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(anomaly)
    + (0.019993 - 0.000101 * t) * Math.sin(2 * anomaly)
    + 0.000289 * Math.sin(3 * anomaly);
  const node = (125.04 - 1934.136 * t) * rad;
  return norm(meanLongitude + centre - 0.00569 - 0.00478 * Math.sin(node));
}

// The largest periodic terms of the Moon's longitude: multiples of D, M, M' and F, and the size in millionths of a degree
const moonTerms = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689],
  [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390], [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236],
  [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
  [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110], [3, 0, -1, 0, -892]
];

function moonLongitude(utcMs) {
  const t = centuriesSince2000(utcMs);
  const meanLongitude = 218.3164477 + 481267.88123421 * t - 0.0015786 * t * t;
  const d = (297.8501921 + 445267.1114034 * t - 0.0018819 * t * t) * rad;
  const m = (357.5291092 + 35999.0502909 * t - 0.0001536 * t * t) * rad;
  const mPrime = (134.9633964 + 477198.8675055 * t + 0.0087414 * t * t) * rad;
  const f = (93.272095 + 483202.0175233 * t - 0.0036539 * t * t) * rad;
  const e = 1 - 0.002516 * t - 0.0000074 * t * t;

  let sum = 0;
  moonTerms.forEach(([dd, mm, mp, ff, size]) => {
    const eccentricity = mm === 0 ? 1 : Math.abs(mm) === 1 ? e : e * e;
    sum += size * eccentricity * Math.sin(dd * d + mm * m + mp * mPrime + ff * f);
  });
  sum += 3958 * Math.sin((119.75 + 131.849 * t) * rad)
    + 1962 * Math.sin(meanLongitude * rad - f)
    + 318 * Math.sin((53.09 + 479264.29 * t) * rad);

  const node = (125.04 - 1934.136 * t) * rad;
  return norm(meanLongitude + sum / 1e6 - 0.00478 * Math.sin(node));
}

// The sign rising on the eastern horizon, from the sidereal time at the birthplace
function ascendant(utcMs, latitude, longitude) {
  const t = centuriesSince2000(utcMs);
  const days = utcMs / 86400000 + 2440587.5 - 2451545;
  const siderealTime = norm(280.46061837 + 360.98564736629 * days + 0.000387933 * t * t + longitude);
  const obliquity = (23.439291 - 0.0130042 * t) * rad;
  const ramc = siderealTime * rad;
  const lat = latitude * rad;
  return norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(obliquity) + Math.tan(lat) * Math.sin(obliquity))) / rad);
}

// ---------- Birth time in the birthplace's own time zone (summer time included) ----------

function zoneOffset(utcMs, timeZone) {
  const parts = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"
  }).formatToParts(new Date(utcMs)).forEach((part) => { parts[part.type] = Number(part.value); });
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - Math.floor(utcMs / 1000) * 1000;
}

function localToUtc(dateValue, timeValue, timeZone) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute] = timeValue.split(":").map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  let utc = wallClock - zoneOffset(wallClock, timeZone);
  utc = wallClock - zoneOffset(utc, timeZone);
  return utc;
}

function localTime(utcMs, timeZone) {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date(utcMs));
}

// When the time is unknown, check whether a body changed sign during the birth day
function signChangeDuring(longitudeAt, start, end) {
  const before = signOf(longitudeAt(start));
  const after = signOf(longitudeAt(end));
  if (before === after) return null;
  let low = start;
  let high = end;
  for (let i = 0; i < 30; i++) {
    const middle = (low + high) / 2;
    if (signOf(longitudeAt(middle)) === before) low = middle;
    else high = middle;
  }
  return { before, after, at: high };
}

// ---------- Finding the birthplace ----------

const placeInput = document.getElementById("birthPlace");
const placeList = document.getElementById("placeList");
const placeChosen = document.getElementById("placeChosen");

let placeResults = [];
let chosenPlace = null;
let activePlace = -1;
let searchTimer;

function placeLabel(place) {
  const parts = [place.name];
  if (place.admin1 && place.admin1 !== place.name) parts.push(place.admin1);
  if (place.country) parts.push(place.country);
  return parts.join(", ");
}

function coordinates(place) {
  const lat = `${Math.abs(place.latitude).toFixed(2)}°${place.latitude >= 0 ? "N" : "S"}`;
  const lon = `${Math.abs(place.longitude).toFixed(2)}°${place.longitude >= 0 ? "E" : "W"}`;
  return `${lat} ${lon}`;
}

function closePlaceList() {
  placeList.hidden = true;
  placeInput.setAttribute("aria-expanded", "false");
  placeInput.removeAttribute("aria-activedescendant");
  activePlace = -1;
}

function showPlaceMessage(message) {
  placeList.innerHTML = `<li class="place-message" role="option" aria-disabled="true">${message}</li>`;
  placeList.hidden = false;
  placeInput.setAttribute("aria-expanded", "true");
}

function renderPlaces() {
  if (!placeResults.length) {
    showPlaceMessage("No places found. Try another spelling, or a nearby larger town.");
    return;
  }
  placeList.innerHTML = placeResults.map((place, index) => `
    <li id="place-${index}" role="option" aria-selected="false" data-index="${index}">
      ${place.name}<small>${placeLabel(place).slice(place.name.length)}</small>
    </li>`).join("");
  placeList.hidden = false;
  placeInput.setAttribute("aria-expanded", "true");
}

async function searchPlaces(query) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const data = await (await fetch(url)).json();
    if (placeInput.value.trim() !== query) return;
    placeResults = (data.results || []).filter((place) => place.timezone);
    renderPlaces();
  } catch {
    showPlaceMessage("We could not reach the map of places. Check your connection and try again.");
  }
}

function choosePlace(place) {
  chosenPlace = place;
  placeInput.value = placeLabel(place);
  placeChosen.textContent = `${coordinates(place)} · ${place.timezone.replace(/_/g, " ")}`;
  closePlaceList();
}

function highlightPlace(index) {
  const items = placeList.querySelectorAll("[data-index]");
  if (!items.length) return;
  activePlace = (index + items.length) % items.length;
  items.forEach((item, i) => item.setAttribute("aria-selected", String(i === activePlace)));
  placeInput.setAttribute("aria-activedescendant", items[activePlace].id);
  items[activePlace].scrollIntoView({ block: "nearest" });
}

placeInput.addEventListener("input", () => {
  chosenPlace = null;
  placeChosen.textContent = "";
  clearTimeout(searchTimer);
  const query = placeInput.value.trim();
  if (query.length < 2) {
    placeResults = [];
    closePlaceList();
    return;
  }
  searchTimer = setTimeout(() => searchPlaces(query), 300);
});

placeInput.addEventListener("keydown", (event) => {
  if (placeList.hidden) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    highlightPlace(activePlace + (event.key === "ArrowDown" ? 1 : -1));
  } else if (event.key === "Enter" && activePlace >= 0) {
    event.preventDefault();
    choosePlace(placeResults[activePlace]);
  } else if (event.key === "Escape") {
    closePlaceList();
  }
});

// mousedown, not click, so the choice lands before the input loses focus
placeList.addEventListener("mousedown", (event) => {
  const item = event.target.closest("[data-index]");
  if (!item) return;
  event.preventDefault();
  choosePlace(placeResults[Number(item.dataset.index)]);
});

placeInput.addEventListener("blur", () => setTimeout(closePlaceList, 150));

// ---------- Reading the chart ----------

const chartForm = document.getElementById("chartForm");
const birthDate = document.getElementById("birthDate");
const birthTime = document.getElementById("birthTime");
const unknownTime = document.getElementById("unknownTime");
const chartError = document.getElementById("chartError");
const chart = document.getElementById("chart");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

unknownTime.addEventListener("change", () => {
  birthTime.disabled = unknownTime.checked;
});

function degreesIn(longitude) {
  const within = norm(longitude) % 30;
  const whole = Math.floor(within);
  return `${whole}°${String(Math.floor((within - whole) * 60)).padStart(2, "0")}′`;
}

function changeNote(body, change, timeZone) {
  if (!change) return "";
  const from = signs[change.before].name;
  const to = signs[change.after].name;
  return `The ${body} moved from ${from} into ${to} at about ${localTime(change.at, timeZone)} on the day you were born. Born before then? Your ${body} is in ${from}. Born after? ${to}.`;
}

function placementCard(kind, title, longitude, text, note) {
  const sign = signs[signOf(longitude)];
  return `
    <article class="placement">
      <span class="placement-glyph" aria-hidden="true">${glyph(sign)}</span>
      <p class="placement-kind">${kind}</p>
      <h3>${title} ${sign.name}</h3>
      <p class="placement-degree">${degreesIn(longitude)} ${sign.name} · ${sign.element} · ${sign.modality} · ruled by ${sign.ruler}</p>
      <p>${sign[text]}</p>
      ${note ? `<p class="placement-note">${note}</p>` : ""}
    </article>`;
}

function readChart() {
  const timeKnown = !unknownTime.checked;
  const zone = chosenPlace.timezone;
  const moment = localToUtc(birthDate.value, timeKnown ? birthTime.value : "12:00", zone);
  const sun = sunLongitude(moment);
  const moon = moonLongitude(moment);
  const rising = timeKnown ? ascendant(moment, chosenPlace.latitude, chosenPlace.longitude) : null;

  let sunNote = "";
  let moonNote = "";
  if (!timeKnown) {
    const dayStart = localToUtc(birthDate.value, "00:00", zone);
    const dayEnd = localToUtc(birthDate.value, "23:59", zone);
    sunNote = changeNote("Sun", signChangeDuring(sunLongitude, dayStart, dayEnd), zone);
    moonNote = changeNote("Moon", signChangeDuring(moonLongitude, dayStart, dayEnd), zone);
  }

  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${birthDate.value}T12:00:00Z`));
  document.getElementById("chartSummary").textContent = timeKnown
    ? `Born on ${day} at ${birthTime.value} in ${placeLabel(chosenPlace)}`
    : `Born on ${day} (time unknown) in ${placeLabel(chosenPlace)}`;

  let cards = placementCard("Sun sign · your core self", "Sun in", sun, "sun", sunNote)
    + placementCard("Moon sign · your inner world", "Moon in", moon, "moon", moonNote);
  cards += rising === null
    ? `<article class="placement is-unknown">
        <span class="placement-glyph" aria-hidden="true">?</span>
        <p class="placement-kind">Rising sign · how others see you</p>
        <h3>Rising sign unknown</h3>
        <p>The rising sign changes about every two hours, so it needs your birth time. Your birth certificate, or a parent, may remember it.</p>
      </article>`
    : placementCard("Rising sign · how others see you", "Rising in", rising, "rising", "");
  document.getElementById("placements").innerHTML = cards;

  drawWheel(sun, moon, rising, timeKnown);
  useForCompatibility(signOf(sun));

  chart.hidden = false;
  chart.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

chartForm.addEventListener("submit", (event) => {
  event.preventDefault();
  chartError.textContent = "";
  if (!birthDate.value) {
    chartError.textContent = "Please enter your date of birth.";
    return;
  }
  if (!unknownTime.checked && !birthTime.value) {
    chartError.textContent = "Please enter your birth time, or tick “I don't know my birth time”.";
    return;
  }
  if (!chosenPlace && placeResults.length) choosePlace(placeResults[0]);
  if (!chosenPlace) {
    chartError.textContent = "Please choose your birthplace from the list.";
    return;
  }
  readChart();
});

// ---------- The chart wheel ----------
// The rising sign sits on the left, like the eastern horizon, and the signs run counterclockwise.

function drawWheel(sun, moon, rising, timeKnown) {
  const wheel = document.getElementById("chartWheel");
  const start = rising === null ? 0 : rising;
  const angle = (longitude) => (180 + longitude - start) * rad;
  const point = (longitude, radius) => [200 + radius * Math.cos(angle(longitude)), 200 - radius * Math.sin(angle(longitude))];
  const xy = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

  let segments = "";
  signs.forEach((sign, index) => {
    const from = index * 30;
    const to = from + 30;
    segments += `<path class="wheel-sign is-${sign.element.toLowerCase()}" d="M${xy(point(from, 190))}A190 190 0 0 0 ${xy(point(to, 190))}L${xy(point(to, 150))}A150 150 0 0 1 ${xy(point(from, 150))}Z"/>`;
    const [gx, gy] = point(from + 15, 170);
    segments += `<text class="wheel-glyph" x="${gx.toFixed(1)}" y="${gy.toFixed(1)}">${glyph(sign)}</text>`;
  });

  let ticks = "";
  for (let degree = 0; degree < 360; degree += 5) {
    const inner = degree % 30 === 0 ? 138 : degree % 10 === 0 ? 144 : 147;
    ticks += `M${xy(point(degree, 150))}L${xy(point(degree, inner))}`;
  }

  const [sx, sy] = point(sun, 112);
  const [mx, my] = point(moon, 112);
  const sunMarker = `<g class="wheel-sun"><title>Sun ${degreesIn(sun)} ${signs[signOf(sun)].name}</title>
      <path class="wheel-spoke" d="M200 200L${xy(point(sun, 134))}"/>
      <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="12"/><circle class="dot" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="3"/></g>`;
  const moonMarker = `<g class="wheel-moon"><title>Moon ${degreesIn(moon)} ${signs[signOf(moon)].name}${timeKnown ? "" : " (around midday)"}</title>
      <path class="wheel-spoke" d="M200 200L${xy(point(moon, 134))}"/>
      <path d="M${(mx + 5.5).toFixed(1)} ${(my - 9.5).toFixed(1)}A11 11 0 1 0 ${(mx + 5.5).toFixed(1)} ${(my + 9.5).toFixed(1)}A13 13 0 0 1 ${(mx + 5.5).toFixed(1)} ${(my - 9.5).toFixed(1)}Z"/></g>`;
  const horizon = rising === null ? "" : `<g class="wheel-horizon"><title>Ascendant ${degreesIn(rising)} ${signs[signOf(rising)].name}</title>
      <path d="M8 200H392"/><text x="76" y="192">ASC</text><text x="324" y="192" text-anchor="end">DSC</text></g>`;

  wheel.innerHTML = `
    <circle class="wheel-ring" cx="200" cy="200" r="190"/>
    ${segments}
    <circle class="wheel-ring" cx="200" cy="200" r="150"/>
    <path class="wheel-tick" d="${ticks}"/>
    <circle class="wheel-centre" cx="200" cy="200" r="132"/>
    ${horizon}
    ${moonMarker}
    ${sunMarker}
    <path class="wheel-star" d="M200 188l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/>`;
  wheel.setAttribute("aria-label", `Chart wheel showing the Sun in ${signs[signOf(sun)].name} and the Moon in ${signs[signOf(moon)].name}${rising === null ? "" : `, with ${signs[signOf(rising)].name} rising`}.`);
}

// ---------- Love compatibility ----------

const aspects = [
  { title: "Mirror Souls", hearts: 4, text: "You share the same Sun sign, so you understand each other instantly. The gift is deep recognition; the lesson is that you also share the same blind spots. Take turns being the one who bends." },
  { title: "Next-Door Neighbours", hearts: 3, text: "Your signs sit side by side on the wheel, yet they speak different languages. What one of you lacks, the other often has. Curiosity and patience turn the difference into growth." },
  { title: "Easy Friends", hearts: 4, text: "Your elements complement each other and conversation comes easily. This is a friendly, playful match where each of you brings out the best in the other." },
  { title: "Sparks and Friction", hearts: 2, text: "Your signs stand at right angles, which brings both passion and clashes. You challenge each other to grow. It is rarely boring, but it does take work." },
  { title: "Natural Harmony", hearts: 5, text: "You share the same element, so you flow together with ease and understand each other's needs without explanation. Keep adding a little adventure so it never grows too comfortable." },
  { title: "Curious Strangers", hearts: 2, text: "Your signs have little in common, so you will often need to adjust to each other. With patience you can learn a great deal, but expect a few puzzled looks along the way." },
  { title: "Magnetic Opposites", hearts: 4, text: "You sit directly across the wheel from each other, which creates a strong pull. Each of you has what the other is missing. Meet in the middle and you make a whole." }
];

const elementPairs = {
  "Air Air": "Two air signs share a world of ideas. You will never run out of things to talk about; just remember to come down to earth together now and then.",
  "Air Earth": "Air brings the ideas and earth makes them real. You can build something remarkable, as long as the dreamer and the builder respect each other's pace.",
  "Air Fire": "Air feeds fire. Your enthusiasm lifts you both higher, and life together feels lively and full of possibility.",
  "Air Water": "Air thinks and water feels. You can teach each other a great deal about head and heart, as long as you listen with both.",
  "Earth Earth": "Two earth signs build a steady, loyal life. You share practical goals and quiet comforts; just leave room for a little spontaneity.",
  "Earth Fire": "Fire brings the spark and earth brings staying power. Earth can feel rushed and fire can feel held back, so patience is your shared spell.",
  "Earth Water": "Water nourishes earth. This is a tender, protective pairing in which both of you feel safe to grow.",
  "Fire Fire": "Two fires make a blaze: passion, laughter and grand plans, as long as you take turns holding the spotlight.",
  "Fire Water": "Fire and water make steam: intense and full of feeling. Fire must learn gentleness, and water must learn to speak up.",
  "Water Water": "Two water signs understand each other's depths without a word. Your bond can be profound, as long as you do not drown in each other's moods."
};

const signA = document.getElementById("signA");
const signB = document.getElementById("signB");
const dateA = document.getElementById("dateA");
const dateB = document.getElementById("dateB");
const compatResult = document.getElementById("compatResult");

[signA, signB].forEach((select) => {
  select.innerHTML = `<option value="">Choose a sign</option>` + signs.map((sign, index) => `<option value="${index}">${glyph(sign)} ${sign.name}</option>`).join("");
});

function showCompatibility() {
  if (signA.value === "" || signB.value === "") {
    compatResult.hidden = true;
    return;
  }
  const a = signs[Number(signA.value)];
  const b = signs[Number(signB.value)];
  const gap = Math.abs(Number(signA.value) - Number(signB.value));
  const aspect = aspects[Math.min(gap, 12 - gap)];
  const elements = [a.element, b.element].sort().join(" ");

  compatResult.innerHTML = `
    <p class="compat-signs"><span>${glyph(a)} ${a.name}</span><span class="compat-and">&amp;</span><span>${glyph(b)} ${b.name}</span></p>
    <p class="compat-hearts" aria-label="${aspect.hearts} out of 5 hearts">${"♥".repeat(aspect.hearts)}<span>${"♥".repeat(5 - aspect.hearts)}</span></p>
    <h3>${aspect.title}</h3>
    <p>${aspect.text}</p>
    <p>${elementPairs[elements]}</p>`;
  compatResult.hidden = false;
}

function signFromBirthday(value) {
  return signOf(sunLongitude(Date.parse(`${value}T12:00:00Z`)));
}

[[signA, dateA], [signB, dateB]].forEach(([select, dateInput]) => {
  select.addEventListener("change", () => {
    dateInput.value = "";
    showCompatibility();
  });
  dateInput.addEventListener("change", () => {
    if (!dateInput.value) return;
    select.value = signFromBirthday(dateInput.value);
    showCompatibility();
  });
});

function useForCompatibility(sunSign) {
  signA.value = sunSign;
  dateA.value = birthDate.value;
  showCompatibility();
}
