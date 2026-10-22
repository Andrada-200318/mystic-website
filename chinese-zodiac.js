// ---------- The twelve animals and five elements ----------

const animals = [
  { name: "Rat", char: "鼠", text: "Clever, quick-witted and resourceful, the Rat always finds a way. Charming in company and sharp in business, you notice opportunities long before anyone else." },
  { name: "Ox", char: "牛", text: "Patient, dependable and strong, the Ox moves steadily toward its goals. You are honest and hardworking, and people trust you completely." },
  { name: "Tiger", char: "虎", text: "Brave, passionate and magnetic, the Tiger leaps where others hesitate. You fight for what is right and live life at full intensity." },
  { name: "Rabbit", char: "兔", text: "Gentle, elegant and kind, the Rabbit brings peace wherever it goes. You have refined taste, a soft heart and a gift for diplomacy." },
  { name: "Dragon", char: "龍", text: "Powerful, confident and lucky, the Dragon is the most celebrated sign of all. You are a natural leader, full of vision and fire." },
  { name: "Snake", char: "蛇", text: "Wise, graceful and intuitive, the Snake sees what lies beneath the surface. You think deeply, move calmly and choose your words with care." },
  { name: "Horse", char: "馬", text: "Free-spirited, energetic and warm, the Horse loves to roam. You are cheerful and adventurous, and you inspire others with your enthusiasm." },
  { name: "Goat", char: "羊", text: "Creative, gentle and compassionate, the Goat sees beauty everywhere. You are artistic and caring, and you thrive in a peaceful home." },
  { name: "Monkey", char: "猴", text: "Playful, inventive and brilliant, the Monkey can solve any puzzle. You are full of humour and curiosity, and you learn new things with ease." },
  { name: "Rooster", char: "雞", text: "Confident, honest and hardworking, the Rooster greets every day with purpose. You are observant, organised and proud of a job done well." },
  { name: "Dog", char: "狗", text: "Loyal, fair and protective, the Dog is the truest friend in the zodiac. You stand up for others and you keep your promises." },
  { name: "Pig", char: "豬", text: "Generous, warm and easygoing, the Pig enjoys life's pleasures and shares them freely. You are sincere, kind and wonderful company." }
];

const elements = [
  { name: "Wood", colour: "#7fc77f", text: "Wood brings growth, generosity and a love of learning. It softens your animal with kindness and a wish to help others flourish." },
  { name: "Fire", colour: "#ec7059", text: "Fire brings passion, courage and charisma. It makes your animal bolder, warmer and quicker to act." },
  { name: "Earth", colour: "#d8aa5a", text: "Earth brings stability, patience and common sense. It grounds your animal and makes it trustworthy and wise." },
  { name: "Metal", colour: "#dcdce8", text: "Metal brings determination, strength and clear principles. It sharpens your animal's focus and its will to succeed." },
  { name: "Water", colour: "#6aa8ec", text: "Water brings intuition, flexibility and depth. It makes your animal more perceptive, diplomatic and attuned to others." }
];

// Year 4 of the common era began a cycle with the Wood Rat, so counting from there gives the animal and element
const animalOf = (year) => ((year - 4) % 12 + 12) % 12;
const stemOf = (year) => ((year - 4) % 10 + 10) % 10;

// Allies share a triangle on the wheel; each animal also has one secret friend and one opposite
const alliesOf = (index) => [0, 4, 8].map((step) => (index + step) % 12).filter((other) => other !== index);
const secretFriendOf = (index) => (13 - index) % 12;
const clashOf = (index) => (index + 6) % 12;

// ---------- Which Chinese year a birthday belongs to ----------
// The browser's own Chinese calendar knows the exact date of every Chinese New Year.

const chineseCalendar = new Intl.DateTimeFormat("en-u-ca-chinese", { timeZone: "Asia/Shanghai", year: "numeric", month: "numeric", day: "numeric" });

function chineseDate(utcMs) {
  const parts = {};
  chineseCalendar.formatToParts(new Date(utcMs)).forEach((part) => { parts[part.type] = part.value; });
  return parts;
}

const noonOf = (year, month, day) => Date.UTC(year, month - 1, day, 12);

function newYearDay(year) {
  for (let day = noonOf(year, 1, 19); day <= noonOf(year, 2, 22); day += 86400000) {
    const parts = chineseDate(day);
    if (parts.month === "1" && parts.day === "1") return day;
  }
  return null;
}

function chineseYearOf(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const related = Number(chineseDate(noonOf(year, month, day)).relatedYear);
  if (related) return { year: related, start: newYearDay(related), end: newYearDay(related + 1) - 86400000 };
  // Older browsers without the Chinese calendar: the start of spring, 4 February, is a close stand-in
  return { year: month < 2 || (month === 2 && day < 4) ? year - 1 : year, start: null, end: null };
}

// ---------- Showing the result ----------

const form = document.getElementById("chineseForm");
const cnDate = document.getElementById("cnDate");
const cnTime = document.getElementById("cnTime");
const cnError = document.getElementById("cnError");
const cnResult = document.getElementById("cnResult");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const longDate = (utcMs) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(utcMs));

function showAnimal() {
  const [birthYear] = cnDate.value.split("-").map(Number);
  const chineseYear = chineseYearOf(cnDate.value);
  const index = animalOf(chineseYear.year);
  const animal = animals[index];
  const stem = stemOf(chineseYear.year);
  const element = elements[Math.floor(stem / 2)];
  const polarity = stem % 2 ? "Yin" : "Yang";

  cnResult.style.setProperty("--element", element.colour);
  document.getElementById("cnChar").textContent = animal.char;
  document.getElementById("cnTitle").textContent = `${element.name} ${animal.name}`;
  document.getElementById("cnMeta").textContent = `${polarity} · ${element.name} · Year of the ${animal.name} ${chineseYear.year}`;
  document.getElementById("cnYear").textContent = chineseYear.start
    ? `Your Chinese year ran from ${longDate(chineseYear.start)} to ${longDate(chineseYear.end)}.`
    : "";

  const cusp = document.getElementById("cnCusp");
  cusp.hidden = chineseYear.year === birthYear;
  if (!cusp.hidden) {
    cusp.textContent = `You were born before Chinese New Year, so your animal belongs to ${chineseYear.year}: the ${animal.name}, not the ${animals[animalOf(birthYear)].name} of ${birthYear}.`;
  }

  document.getElementById("cnAnimalText").textContent = animal.text;
  document.getElementById("cnElementText").textContent = element.text;

  // The hour of birth gives the "inner animal", in two-hour watches starting at 23:00 with the Rat
  const inner = document.getElementById("cnInner");
  inner.hidden = !cnTime.value;
  if (cnTime.value) {
    const hour = Number(cnTime.value.split(":")[0]);
    const innerAnimal = animals[Math.floor(((hour + 1) % 24) / 2)];
    inner.innerHTML = `<strong>Your inner animal is the ${innerAnimal.name}.</strong> It rules the hour you were born and shows the private self that only those closest to you know. ${innerAnimal === animal ? "It matches your year animal, which makes its qualities doubly strong in you." : ""}`;
  }

  drawWheel(index);
  showMatches(index);

  const years = [];
  for (let year = 1900 + ((index - animalOf(1900) + 12) % 12); year <= 2100; year += 12) {
    if (Math.abs(year - chineseYear.year) <= 48) years.push(year);
  }
  document.getElementById("cnOtherYears").textContent = `Years of the ${animal.name}: ${years.join(", ")}. Each year begins at Chinese New Year, in late January or February.`;

  cnResult.hidden = false;
  cnResult.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function showMatches(index) {
  const card = (title, members, text, kind) => `
    <article class="cn-match is-${kind}">
      <p class="placement-kind">${title}</p>
      <p class="cn-match-chars">${members.map((i) => `<span title="${animals[i].name}">${animals[i].char}</span>`).join("")}</p>
      <h4>${members.map((i) => animals[i].name).join(" & ")}</h4>
      <p>${text}</p>
    </article>`;

  document.getElementById("cnMatches").innerHTML =
    card("Best allies", alliesOf(index), "Your triangle of kindred spirits. You share the same rhythm and make wonderful friends, partners and teammates.", "ally")
    + card("Secret friend", [secretFriendOf(index)], "A quiet, deep bond. This animal balances you perfectly and will stand by you when it counts.", "friend")
    + card("Opposite", [clashOf(index)], "Directly across the wheel. Sparks fly and patience is needed, but you can learn the most from each other.", "clash");
}

// The twelve animals in a ring, with the Rat at the top, linked to your allies, secret friend and opposite
function drawWheel(index) {
  const wheel = document.getElementById("cnWheel");
  const at = (i, radius) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    return [200 + radius * Math.cos(angle), 200 + radius * Math.sin(angle)];
  };
  const line = (from, to, kind) => {
    const [x1, y1] = at(from, 138);
    const [x2, y2] = at(to, 138);
    return `<path class="cn-link is-${kind}" d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
  };

  const allies = alliesOf(index);
  let links = line(index, allies[0], "ally") + line(allies[0], allies[1], "ally") + line(allies[1], index, "ally");
  links += line(index, secretFriendOf(index), "friend") + line(index, clashOf(index), "clash");

  const roles = { [index]: "is-yours", [allies[0]]: "is-ally", [allies[1]]: "is-ally", [secretFriendOf(index)]: "is-friend", [clashOf(index)]: "is-clash" };
  const ring = animals.map((animal, i) => {
    const [x, y] = at(i, 160);
    return `<g class="cn-seat ${roles[i] || ""}"><title>${animal.name}</title>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26"/>
      <text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${animal.char}</text></g>`;
  }).join("");

  wheel.innerHTML = `<circle class="cn-ring" cx="200" cy="200" r="160"/>${links}${ring}`;
  wheel.setAttribute("aria-label", `The twelve animals in a ring. Your ${animals[index].name} is linked to its allies ${allies.map((i) => animals[i].name).join(" and ")}, its secret friend the ${animals[secretFriendOf(index)].name}, and its opposite the ${animals[clashOf(index)].name}.`);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  cnError.textContent = "";
  if (!cnDate.value) {
    cnError.textContent = "Please enter your date of birth.";
    return;
  }
  showAnimal();
});
