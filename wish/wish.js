const blessings = [
  "The globe has heard you. Let your wish swirl in the mist.",
  "Your wish is woven into the smoke. Now let it go and trust.",
  "Released into the stars. What is meant for you will find you.",
  "The mist holds your wish gently. Watch for signs today.",
  "Your intention glows within the crystal. So mote it be."
];

const wishForm = document.getElementById("wishForm");
const wishInput = document.getElementById("wishInput");
const ticketPile = document.getElementById("ticketPile");
const ticketNumber = document.getElementById("ticketNumber");
const ticketDate = document.getElementById("ticketDate");
const globe = document.getElementById("globe");
const globeWish = document.getElementById("globeWish");
const orbs = document.getElementById("orbs");
const wishStatus = document.getElementById("wishStatus");
const wishCount = document.getElementById("wishCount");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const flightTime = reduceMotion ? 300 : 1800;
const storageKey = "wishGlobe";
const today = new Date().toDateString();

let wishesToday = loadWishCount();
let isReleasing = false;

// Today's wish count is remembered in this browser and starts over each day
function loadWishCount() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && saved.date === today ? saved.count : 0;
  } catch (error) {
    return 0;
  }
}

function saveWishCount() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ date: today, count: wishesToday }));
  } catch (error) {
    // Storage can be unavailable (e.g. private browsing); the globe still works for this visit
  }
}

function updateTicket() {
  ticketNumber.textContent = String(wishesToday + 1).padStart(4, "0");
}

function updateCount() {
  if (wishesToday === 0) {
    wishCount.textContent = "The globe is waiting for today's first wish";
  } else if (wishesToday === 1) {
    wishCount.textContent = "1 wish is glowing in the globe today";
  } else {
    wishCount.textContent = `${wishesToday} wishes are glowing in the globe today`;
  }
}

function addOrb() {
  const orb = document.createElement("span");
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.sqrt(Math.random()) * 34;

  orb.className = "orb";
  orb.style.left = 50 + Math.cos(angle) * distance + "%";
  orb.style.top = 50 + Math.sin(angle) * distance + "%";
  orb.style.setProperty("--drift-x", Math.random() * 24 - 12 + "px");
  orb.style.setProperty("--drift-y", Math.random() * 24 - 12 + "px");
  orb.style.animationDelay = -Math.random() * 7 + "s";
  orbs.appendChild(orb);
}

function spawnSparkle(x, y, dx, dy) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.setProperty("--dx", dx + "px");
  sparkle.style.setProperty("--dy", dy + "px");
  sparkle.addEventListener("animationend", function() {
    sparkle.remove();
  });
  document.body.appendChild(sparkle);
}

// Restarts a CSS animation that is triggered by adding a class
function replayClass(element, className) {
  element.classList.remove(className);
  element.offsetWidth;
  element.classList.add(className);
}

function releaseWish(text) {
  isReleasing = true;

  const ticketRect = wishForm.getBoundingClientRect();
  const globeRect = globe.getBoundingClientRect();
  const width = wishForm.offsetWidth;
  const height = wishForm.offsetHeight;
  const startX = ticketRect.left + ticketRect.width / 2;
  const startY = ticketRect.top + ticketRect.height / 2;
  const dx = globeRect.left + globeRect.width / 2 - startX;
  const dy = globeRect.top + globeRect.height / 2 - startY;
  const lift = Math.min(160, Math.abs(dx) * 0.4 + 80);

  // A copy of the written ticket flies off while the real one waits to be refilled
  const flyer = wishForm.cloneNode(true);
  flyer.removeAttribute("id");
  flyer.querySelectorAll("[id]").forEach(function(element) {
    element.removeAttribute("id");
  });
  flyer.querySelector("textarea").value = text;
  flyer.classList.add("ticket-flyer");
  flyer.setAttribute("aria-hidden", "true");
  flyer.style.left = startX - width / 2 + "px";
  flyer.style.top = startY - height / 2 + "px";
  flyer.style.width = width + "px";
  flyer.style.height = height + "px";
  document.body.appendChild(flyer);

  wishForm.classList.add("is-sent");
  wishInput.value = "";
  wishInput.blur();

  const flight = flyer.animate([
    { transform: "translate(0px, 0px) rotate(-1.5deg) scale(1)", opacity: 1 },
    { transform: `translate(${dx * 0.1}px, -30px) rotate(-6deg) scale(1.05)`, opacity: 1, offset: 0.15 },
    { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - lift}px) rotate(-180deg) scale(0.5)`, opacity: 1, offset: 0.55 },
    { transform: `translate(${dx}px, ${dy}px) rotate(-420deg) scale(0.04)`, opacity: 0.3 }
  ], { duration: flightTime, easing: "ease-in-out", fill: "forwards" });

  const trail = reduceMotion ? null : setInterval(function() {
    const rect = flyer.getBoundingClientRect();
    spawnSparkle(
      rect.left + rect.width / 2 + Math.random() * 30 - 15,
      rect.top + rect.height / 2 + Math.random() * 30 - 15,
      Math.random() * 20 - 10,
      Math.random() * 30 + 10
    );
  }, 45);

  flight.addEventListener("finish", function() {
    clearInterval(trail);
    flyer.remove();
    receiveWish(text);
    bringNewTicket();
  });
}

function receiveWish(text) {
  globeWish.textContent = text;
  replayClass(globeWish, "is-showing");
  replayClass(globe, "is-receiving");

  if (!reduceMotion) {
    const rect = globe.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      spawnSparkle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        Math.cos(angle) * rect.width * 0.4,
        Math.sin(angle) * rect.height * 0.4
      );
    }
  }

  wishesToday++;
  saveWishCount();
  addOrb();
  updateCount();
  updateTicket();
  wishStatus.textContent = blessings[Math.floor(Math.random() * blessings.length)];
}

function bringNewTicket() {
  wishForm.classList.remove("is-sent");
  replayClass(wishForm, "is-arriving");
  isReleasing = false;
}

wishInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    wishForm.requestSubmit();
  }
});

wishForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (isReleasing) return;

  const text = wishInput.value.trim();
  if (!text) {
    replayClass(ticketPile, "is-shaking");
    wishInput.focus();
    return;
  }

  releaseWish(text);
});

wishForm.addEventListener("animationend", function() {
  wishForm.classList.remove("is-arriving");
});

ticketPile.addEventListener("animationend", function(event) {
  if (event.target === ticketPile) ticketPile.classList.remove("is-shaking");
});

ticketDate.textContent = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

for (let i = 0; i < Math.min(wishesToday, 40); i++) {
  addOrb();
}

updateTicket();
updateCount();
