// script.js
// Design by Kofi Fosu | cosmoscoderr@gmail.com

const books = [
  { title: "Whispers of the Heart", author: "Kofi Fosu", description: "A classic romance full of passion.", filePath: "Whispers-of-the-Heart.pdf" },
  { title: "Ancestors Hammer", author: "Kofi Fosu", description: "Fantasy Adventure.", filePath: "ancestor-hammer.pdf" },
  { title: "Deeper than Ocean", author: "Kofi Fosu", description: "Romance.", filePath: "Deeper-than-Ocean.pdf" },
  { title: "Heaven Bound (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "heaven-bound.pdf" },
  { title: "Heaven Bound (Book 2)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "heaven-bound2.pdf" },
  { title: "The Last Echo (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "The-Last-echo.pdf" },
  { title: "The Void Wanderer", author: "Cosmos Coderr", description: "Science Fiction/Fantasy.", filePath: "The-Void-Wanderer.pdf" },
  { title: "The Silent Architect", author: "Cosmos Coderr", description: "Science Fiction/Mystery.", filePath: "The-silent-Achitect.pdf" },
];

const introPage = document.getElementById("intro-page");
const mainPage = document.getElementById("main-page");
const startButton = document.getElementById("start-button");
const bookGrid = document.querySelector(".book-grid");
const searchInput = document.getElementById("search");
const chatbotCore = document.getElementById("chatbot-core");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-button");
const chatbotMessages = document.getElementById("chatbot-messages");
const closeChatbot = document.getElementById("close-chatbot");
const canvas = document.getElementById("cosmic-canvas");
const ctx = canvas.getContext("2d");

// Cosmic Background
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.speedX;
    s.y += s.speedY;
    if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
    if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Portal Transition
startButton.addEventListener("click", () => {
  const portalOverlay = document.getElementById("portal-overlay");
  if (portalOverlay) {
    portalOverlay.classList.remove("hidden");
    setTimeout(() => {
      introPage.style.display = "none";
      mainPage.style.display = "block";
      portalOverlay.classList.add("hidden");
    }, 2000);
  }
});

// Display Books
function displayBooks(booksToShow) {
  if (!bookGrid) return;
  bookGrid.innerHTML = booksToShow.map(book => `
    <div class="book-item">
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.description}</p>
      <a href="${book.filePath}" target="_blank">Read Online</a>
    </div>
  `).join("");

  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = Math.min(Math.max(x / 10, -20), 20);
      const rotateX = Math.min(Math.max(-y / 10, -20), 20);
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Search Books
function searchBooks() {
  if (!searchInput || !bookGrid) return;
  const query = searchInput.value.toLowerCase().trim();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

// Chatbot Logic
function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  let response = "The Shrine hums with cosmic energy...";

  if (msg === "what is book shrine" || msg.includes("what is this")) {
    response = "I am the Book Shrine, a celestial vault of tales woven by Kofi Fosu. I guard stories of romance, adventure, and the infinite unknown. Ask me about my collection.";
  } 
  else if (msg.includes("how many books") || msg === "book count") {
    response = `The Shrine holds ${books.length} sacred volumes, each a gateway to another dimension.`;
  } 
  else if (msg.includes("who made") || msg.includes("who created") || msg.includes("who built")) {
    response = "I was crafted by Kofi Fosu, a visionary of the cosmos. Contact him at cosmoscoderr@gmail.com.";
  } 
  else if (msg.includes("recommend") || msg.includes("suggest") || msg.includes("what should i read")) {
    const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 3);
    response = "The stars align to suggest these works:\n" + 
      randomBooks.map(b => `- ${b.title} by ${b.author}: ${b.description}`).join("\n");
  } 
  else if (msg.includes("list books") || msg.includes("what books") || msg.includes("show books")) {
    response = "Behold the Shrine’s collection:\n" + 
      books.map(b => `- ${b.title} by ${b.author}`).join("\n");
  } 
  else if (msg === "hi" || msg === "hello" || msg.includes("hey")) {
    response = "Greetings, seeker of knowledge. I am the Book Shrine AI, keeper of these tales. How may I serve you?";
  } 
  else {
    const foundBook = books.find(book => msg.includes(book.title.toLowerCase()));
    if (foundBook) {
      response = `${foundBook.title} by ${foundBook.author}: ${foundBook.description}. A worthy tome from my archive.`;
    } else {
      response = "The void murmurs uncertainty. Ask about my books or the Shrine itself—perhaps a title or a question?";
    }
  }

  return response;
}

// Chatbot Interaction
sendButton.addEventListener("click", () => {
  if (!chatbotInput || !chatbotMessages) return;
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    chatbotInput.value = "";
    setTimeout(() => {
      const response = chatbotResponse(userMessage);
      addMessage(response, "bot");
    }, 1000);
  }
});

function addMessage(text, sender) {
  if (!chatbotMessages) return;
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.style = sender === "user" 
    ? "text-align: right; color: #00ffff; margin: 5px 0; white-space: pre-wrap;" 
    : "text-align: left; color: #ddd; margin: 5px 0; white-space: pre-wrap;";
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Chatbot Toggle and Close
chatbotCore.addEventListener("click", () => {
  if (chatbotWindow) {
    chatbotWindow.classList.toggle("hidden");
  }
});

closeChatbot.addEventListener("click", () => {
  if (chatbotWindow) {
    chatbotWindow.classList.add("hidden");
  }
});

// Initial Display
displayBooks(books);
