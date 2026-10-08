const cards = [
  // Major Arcana
  { name: "The Fool", meaning: "A new beginning is coming. Take a leap of faith and trust the process." },
  { name: "The Magician", meaning: "You have all the tools you need to succeed. Focus your energy and take action today." },
  { name: "The High Priestess", meaning: "Listen to your inner voice. Intuition and hidden knowledge are guiding you right now." },
  { name: "The Empress", meaning: "Focus on nurturing yourself and others. Abundance and creativity are flowing." },
  { name: "The Emperor", meaning: "Structure and stability are needed. Take charge of your situation with authority." },
  { name: "The Hierophant", meaning: "Stick to tradition and established systems. Seek wisdom from a mentor or guide." },
  { name: "The Lovers", meaning: "A choice needs to be made regarding relationships or personal values. Seek harmony." },
  { name: "The Chariot", meaning: "You will overcome obstacles through sheer willpower and determination. Keep moving forward." },
  { name: "Strength", meaning: "Inner courage, patience, and gentle control are your best approaches right now." },
  { name: "The Hermit", meaning: "Step back from the noise. It is a time for introspection and soul-searching." },
  { name: "Wheel of Fortune", meaning: "Cycles are changing. Good luck and destiny are turning in your favor." },
  { name: "Justice", meaning: "Fairness and truth will prevail. Make decisions with logic and balance." },
  { name: "The Hanged Man", meaning: "Pause and look at things from a completely different perspective. Let go of control." },
  { name: "Death", meaning: "A necessary ending is making way for a profound transformation. Embrace the change." },
  { name: "Temperance", meaning: "Seek balance and moderation. Blend different aspects of your life patiently." },
  { name: "The Devil", meaning: "Notice any unhealthy attachments or limiting beliefs that are holding you back." },
  { name: "The Tower", meaning: "Sudden, inevitable change is breaking down old structures to clear the path forward." },
  { name: "The Star", meaning: "Hope, healing, and renewal are here. Have faith in the future." },
  { name: "The Moon", meaning: "Pay attention to your dreams. Things may be unclear, so trust your instincts over logic." },
  { name: "The Sun", meaning: "Success, joy, and positive energy surround you. It is a great day to share your light." },
  { name: "Judgement", meaning: "An awakening or realization is calling you to a higher purpose. Forgive past mistakes." },
  { name: "The World", meaning: "Completion and achievement. You have successfully finished a cycle and are ready for the next." },

  // Suit of Wands (Action, Passion, Energy)
  { name: "Ace of Wands", meaning: "A surge of new energy and inspiration is heading your way. Start that new project." },
  { name: "Two of Wands", meaning: "You are planning for the future. Step out of your comfort zone and explore your options." },
  { name: "Three of Wands", meaning: "Your plans are in motion. Have patience as you wait for the results to arrive." },
  { name: "Four of Wands", meaning: "A time of celebration and harmony. Enjoy a stable and joyful environment." },
  { name: "Five of Wands", meaning: "There is some conflict or competition around you. Stay focused and do not let it drain you." },
  { name: "Six of Wands", meaning: "Victory and public recognition. Your hard work is paying off and being noticed." },
  { name: "Seven of Wands", meaning: "Stand your ground. You may face opposition, but you have the high ground to defend your beliefs." },
  { name: "Eight of Wands", meaning: "Things are moving very quickly now. Expect rapid communication and fast progress." },
  { name: "Nine of Wands", meaning: "You are exhausted but almost at the finish line. Keep your boundaries up and persevere." },
  { name: "Ten of Wands", meaning: "You are carrying a heavy burden. It is time to delegate or let go of unnecessary responsibilities." },
  { name: "Page of Wands", meaning: "A new idea or message regarding a creative project is coming. Be enthusiastic and curious." },
  { name: "Knight of Wands", meaning: "Action and adventure. You are feeling passionate and ready to charge forward." },
  { name: "Queen of Wands", meaning: "Be bold, confident, and independent. You have the charisma to attract what you want." },
  { name: "King of Wands", meaning: "Lead with vision and authority. Your natural leadership skills are needed right now." },

  // Suit of Cups (Emotions, Intuition, Relationships)
  { name: "Ace of Cups", meaning: "A new beginning in love, emotion, or intuition. Open your heart to new feelings." },
  { name: "Two of Cups", meaning: "A deep, mutual connection or partnership is forming. Harmony in a relationship." },
  { name: "Three of Cups", meaning: "Celebrate with friends and community. Joyful gatherings and shared happiness." },
  { name: "Four of Cups", meaning: "You are feeling disconnected or apathetic. Do not miss the new opportunities being offered to you." },
  { name: "Five of Cups", meaning: "You are focusing on loss and disappointment. Turn around to see what still remains." },
  { name: "Six of Cups", meaning: "Nostalgia and childhood memories. Reconnect with your inner child or someone from the past." },
  { name: "Seven of Cups", meaning: "You have many options and illusions in front of you. Make a choice carefully and ground yourself." },
  { name: "Eight of Cups", meaning: "It is time to walk away from a situation that no longer serves your emotional needs." },
  { name: "Nine of Cups", meaning: "Your wishes are coming true. Enjoy emotional satisfaction and contentment." },
  { name: "Ten of Cups", meaning: "Total emotional fulfillment and domestic happiness. A sense of true peace." },
  { name: "Page of Cups", meaning: "A pleasant surprise or a sweet message is coming. Be open to intuitive nudges." },
  { name: "Knight of Cups", meaning: "Romance and charm. Follow your heart and let your emotions guide your actions." },
  { name: "Queen of Cups", meaning: "Lead with compassion and empathy. Trust your intuition and care for those around you." },
  { name: "King of Cups", meaning: "Emotional balance and control. Remain calm and diplomatic in your interactions." },

  // Suit of Swords (Mind, Intellect, Conflict)
  { name: "Ace of Swords", meaning: "A breakthrough or sudden realization. Mental clarity and truth are cutting through confusion." },
  { name: "Two of Swords", meaning: "You are facing a difficult decision and avoiding it. Weigh your options logically." },
  { name: "Three of Swords", meaning: "Heartbreak, sorrow, or grief. Allow yourself to feel the pain so you can heal." },
  { name: "Four of Swords", meaning: "Take a break to rest and recover. Mental exhaustion requires you to pause." },
  { name: "Five of Swords", meaning: "A hollow victory won through conflict. Pick your battles wisely and avoid unnecessary arguments." },
  { name: "Six of Swords", meaning: "Moving away from turmoil toward calmer waters. A necessary transition is happening." },
  { name: "Seven of Swords", meaning: "Deception or sneakiness. Someone may not be telling the whole truth, or you need to act strategically." },
  { name: "Eight of Swords", meaning: "You feel trapped by your circumstances, but the restrictions are in your own mind. You have the power to leave." },
  { name: "Nine of Swords", meaning: "Anxiety, worry, and sleepless nights. Do not let fear overwhelm you; it is worse in your mind than in reality." },
  { name: "Ten of Swords", meaning: "A painful ending or betrayal. The worst is over, and the only way to go from here is up." },
  { name: "Page of Swords", meaning: "Curiosity and a thirst for knowledge. Speak your truth, but think before you act." },
  { name: "Knight of Swords", meaning: "Fast, assertive action. You are driven by ambition, but be careful not to rush blindly." },
  { name: "Queen of Swords", meaning: "Clear thinking and direct communication. Set strong boundaries and look at the facts." },
  { name: "King of Swords", meaning: "Intellectual power and authority. Make objective, fair decisions based on truth and logic." },

  // Suit of Pentacles (Material World, Finance, Stability)
  { name: "Ace of Pentacles", meaning: "A new opportunity for financial or material growth. Plant the seeds for future stability." },
  { name: "Two of Pentacles", meaning: "You are juggling multiple priorities or finances. Adapt to changes and find a balance." },
  { name: "Three of Pentacles", meaning: "Teamwork and collaboration. Your skills are being recognized as you build something lasting." },
  { name: "Four of Pentacles", meaning: "You are holding onto your resources too tightly. Beware of scarcity mindset and learn to let energy flow." },
  { name: "Five of Pentacles", meaning: "Financial hardship or feeling left out in the cold. Do not be afraid to ask for help." },
  { name: "Six of Pentacles", meaning: "Generosity and charity. Give what you can, or receive the assistance you need with gratitude." },
  { name: "Seven of Pentacles", meaning: "Patience and assessment. You have worked hard; now wait and see how your investments grow." },
  { name: "Eight of Pentacles", meaning: "Dedication and skill development. Focus on the details and master your craft." },
  { name: "Nine of Pentacles", meaning: "Financial independence and luxury. Enjoy the rewards of your hard work and discipline." },
  { name: "Ten of Pentacles", meaning: "Long-term success, family legacy, and solid foundations. A culmination of wealth and security." },
  { name: "Page of Pentacles", meaning: "A new study or financial prospect. Stay grounded and practical as you learn." },
  { name: "Knight of Pentacles", meaning: "Slow, steady progress. Hard work, reliability, and sticking to the routine will pay off." },
  { name: "Queen of Pentacles", meaning: "Practical nurturing and resourcefulness. Create a warm, secure, and abundant environment." },
  { name: "King of Pentacles", meaning: "Material success and business leadership. You have the discipline to manifest a secure empire." }
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