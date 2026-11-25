// The Romanian words of the wish globe, loaded only by the Romanian page (ro/wish/) before wish.js.

window.wishRo = {
  blessings: [
    "Globul te-a auzit. Lasă-ți dorința să se rotească în ceață.",
    "Dorința ta s-a țesut în fum. Acum las-o să plece și ai încredere.",
    "Eliberată printre stele. Ce ți-e scris te va găsi.",
    "Ceața îți ține dorința cu blândețe. Ia aminte la semnele de azi.",
    "Intenția ta strălucește în cristal. Așa să fie."
  ],
  countNone: "Globul așteaptă prima dorință de azi",
  countOne: "O dorință strălucește azi în glob",
  // In Romanian, 20 and up (and round hundreds) take "de": 2 dorințe, 19 dorințe, 20 de dorințe
  countMany: (count) => {
    const lastTwo = count % 100;
    const joiner = lastTwo === 0 || lastTwo >= 20 ? " de " : " ";
    return `${count}${joiner}dorințe strălucesc azi în glob`;
  },
  dateLocale: "ro-RO"
};
