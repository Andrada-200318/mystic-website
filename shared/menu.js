// The drop-down menus in the header (Mystic Games, Zodiac): each opens on a tap or click, and closes when you
// choose a link, click anywhere else or press Escape.

const menus = document.querySelectorAll(".nav-menu");

document.addEventListener("click", (event) => {
  menus.forEach((menu) => {
    if (!menu.contains(event.target) || event.target.closest(".nav-menu-list a")) menu.open = false;
  });
});

// Nudge the list sideways if it would hang off the edge of the screen
menus.forEach((menu) => {
  menu.addEventListener("toggle", () => {
    if (!menu.open) return;
    const list = menu.querySelector(".nav-menu-list");
    list.style.setProperty("--shift", "0px");
    const box = list.getBoundingClientRect();
    const margin = 12;
    let shift = 0;
    if (box.right > window.innerWidth - margin) shift = window.innerWidth - margin - box.right;
    if (box.left + shift < margin) shift = margin - box.left;
    list.style.setProperty("--shift", `${Math.round(shift)}px`);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  menus.forEach((menu) => {
    if (!menu.open) return;
    menu.open = false;
    menu.querySelector("summary").focus();
  });
});
