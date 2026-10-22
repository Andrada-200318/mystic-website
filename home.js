// ---------- Tonight's moon, using the same reckoning as the Moon Altar ----------

const synodicMonth = 29.530588853;
const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
const phases = [
  { name: "New Moon", theme: "New beginnings", text: "The sky is dark and full of possibility. This is the moment to plant a seed: name what you want to begin." },
  { name: "Waxing Crescent", theme: "Intention", text: "The first silver sliver appears. Your intention is taking its first breath, so nurture it with small, steady steps." },
  { name: "First Quarter", theme: "Courage", text: "Half lit and half dark. Challenges may appear to test your resolve, so act with courage and keep going." },
  { name: "Waxing Gibbous", theme: "Refinement", text: "The moon is nearly full. Refine, adjust and trust that what you planted is ripening." },
  { name: "Full Moon", theme: "Illumination", text: "The moon is at her brightest and what was hidden is revealed. Celebrate how far you have come and charge your intentions in her light." },
  { name: "Waning Gibbous", theme: "Gratitude", text: "The light begins to soften. Give thanks, share what you have learned and let wisdom settle." },
  { name: "Last Quarter", theme: "Release", text: "Half light again, but turning inward. Clear away what no longer serves you: forgive, declutter and let go." },
  { name: "Waning Crescent", theme: "Rest", text: "The last thin crescent before darkness. Rest, reflect and make space for the cycle that is coming." }
];

const fixed = (n) => Math.round(n * 10) / 10;

// The lit part is a half circle plus the curved shadow line (an ellipse that narrows toward the quarters)
function moonLitPath(cx, cy, r, fraction) {
  const rx = fixed(Math.abs(Math.cos(fraction * 2 * Math.PI)) * r);
  const top = `${cx} ${cy - r}`;
  const bottom = `${cx} ${cy + r}`;
  if (fraction < 0.5) {
    const sweep = fraction < 0.25 ? 0 : 1;
    return `M${top}A${r} ${r} 0 0 1 ${bottom}A${rx} ${r} 0 0 ${sweep} ${top}Z`;
  }
  const sweep = fraction < 0.75 ? 0 : 1;
  return `M${top}A${r} ${r} 0 0 0 ${bottom}A${rx} ${r} 0 0 ${sweep} ${top}Z`;
}

function showTonightsSky() {
  const now = new Date();
  const age = (((now.getTime() - knownNewMoon) / 86400000) % synodicMonth + synodicMonth) % synodicMonth;
  const fraction = age / synodicMonth;
  const phase = phases[Math.floor(fraction * 8 + 0.5) % 8];
  const illumination = Math.round((1 - Math.cos(fraction * 2 * Math.PI)) / 2 * 100);
  const daysToFull = Math.round((synodicMonth / 2 - age + synodicMonth) % synodicMonth);
  const lit = moonLitPath(60, 60, 44, fraction);

  let nextFull = `Full moon in ${daysToFull} days`;
  if (phase.name === "Full Moon") nextFull = "Full moon tonight";
  else if (daysToFull === 1) nextFull = "Full moon tomorrow";

  const moon = document.getElementById("skyMoon");
  moon.style.setProperty("--glow", (0.25 + illumination / 100 * 0.75).toFixed(2));
  moon.setAttribute("aria-label", `The moon tonight: ${phase.name}, ${illumination}% illuminated`);
  moon.innerHTML = `
    <defs>
      <clipPath id="skyMoonLit"><path d="${lit}"/></clipPath>
      <radialGradient id="skyMoonGlow"><stop offset="0.45" stop-color="#f3ecd6" stop-opacity="0.4"/><stop offset="1" stop-color="#f3ecd6" stop-opacity="0"/></radialGradient>
    </defs>
    <circle class="sky-moon-glow" cx="60" cy="60" r="60" fill="url(#skyMoonGlow)"/>
    <circle class="sky-moon-dark" cx="60" cy="60" r="44"/>
    <path class="sky-moon-lit" d="${lit}"/>
    <g clip-path="url(#skyMoonLit)">
      <circle class="sky-moon-crater" cx="47" cy="50" r="9"/>
      <circle class="sky-moon-crater" cx="74" cy="72" r="6"/>
      <circle class="sky-moon-crater" cx="70" cy="42" r="4"/>
    </g>`;

  document.getElementById("skyHeading").textContent = phase.name;
  document.getElementById("skyMeta").textContent = `A time of ${phase.theme.toLowerCase()} · ${illumination}% lit · ${nextFull}`;
  document.getElementById("skyMessage").textContent = phase.text;
}

// ---------- Team cards: a symbol on each face, and a tap turns the card ----------

const sigils = {
  rune: `<path d="M28 24L12 40l16 16M52 24l16 16-16 16M45 16L35 64"/><path d="M40 6l1.4 3.2 3.2 1.4-3.2 1.4L40 15.2 38.6 12l-3.2-1.4 3.2-1.4z"/>`,
  quill: `<path d="M64 10C40 14 26 32 22 58c18-6 34-20 42-48z"/><path d="M64 10L16 70M30 44h12M36 34h12"/><path d="M12 72h22"/>`,
  moon: `<path d="M46 14A27 27 0 1 0 46 66A30 30 0 0 1 46 14z"/><path d="M58 22l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z"/>`,
  herb: `<path d="M40 70V18"/><path d="M40 30c-8-2-13-8-13-14 7 0 12 6 13 14zM40 30c8-2 13-8 13-14-7 0-12 6-13 14zM40 46c-10-2-16-9-16-16 8 0 15 7 16 16zM40 46c10-2 16-9 16-16-8 0-15 7-16 16zM40 62c-10-2-16-9-16-16 8 0 15 7 16 16zM40 62c10-2 16-9 16-16-8 0-15 7-16 16z"/>`,
  star: `<path d="M40 10l7.6 21.4 22.4.6-17.8 13.6 6.4 21.4L40 54.2 21.4 67l6.4-21.4L10 32l22.4-.6z"/><circle cx="40" cy="40" r="5"/>`,
  crystal: `<path d="M40 8l14 18-14 46-14-46z"/><path d="M26 26h28M40 8v64M33 26l7 46 7-46"/>`,
  sun: `<circle cx="40" cy="40" r="13"/><path d="M40 10v10M40 60v10M10 40h10M60 40h10M19 19l7 7M54 54l7 7M61 19l-7 7M26 54l-7 7"/>`,
  eye: `<path d="M8 40c9-14 20-20 32-20s23 6 32 20c-9 14-20 20-32 20S17 54 8 40z"/><circle cx="40" cy="40" r="10"/><circle class="filled" cx="40" cy="40" r="4"/>`,
  cup: `<path d="M18 34h38v6a19 19 0 0 1-38 0z"/><path d="M56 37a7 7 0 0 1 0 14h-3"/><path d="M12 70h50"/><path d="M30 26c-3-5 3-7 0-13M42 26c-3-5 3-7 0-13"/>`
};

function setUpTeam() {
  document.querySelectorAll(".member-portrait").forEach((portrait) => {
    if (portrait.children.length) return;
    const sigil = sigils[portrait.dataset.sigil] || sigils.star;
    portrait.innerHTML = `<svg viewBox="0 0 80 80" aria-hidden="true">${sigil}</svg>`;
  });

  document.querySelectorAll(".member").forEach((member) => {
    const button = member.querySelector(".member-turn");
    const name = member.querySelector(".member-name").textContent;
    button.querySelector(".visually-hidden").textContent = `Turn ${name}'s card over`;
    button.addEventListener("click", () => {
      const turned = member.classList.toggle("is-turned");
      button.setAttribute("aria-pressed", String(turned));
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
showTonightsSky();
setUpTeam();
