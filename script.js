const cards = [
  { name: "The Fool", meaning: "A new beginning is coming. Take a leap of faith and trust the process." },
  { name: "The Magician", meaning: "You have all the tools you need to succeed. Focus your energy and take action today." },
  { name: "The High Priestess", meaning: "Listen to your inner voice. Intuition and hidden knowledge are guiding you right now." },
  { name: "The Sun", meaning: "Success, joy, and positive energy surround you. It is a great day to share your light." },
  { name: "The Moon", meaning: "Pay attention to your dreams. Take time to rest and reflect before making big decisions." }
];

const button = document.getElementById("drawButton");
const display = document.getElementById("cardDisplay");
const nameElement = document.getElementById("cardName");
const meaningElement = document.getElementById("cardMeaning");

button.addEventListener("click", function() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const selectedCard = cards[randomIndex];
  
  nameElement.textContent = selectedCard.name;
  meaningElement.textContent = selectedCard.meaning;
  
  display.style.display = "inline-block";
});