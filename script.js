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
  portalOverlay.classList.remove("hidden");
  setTimeout(() => {
    introPage.style.display = "none";
    mainPage.style.display = "block";
    portalOverlay.classList.add("hidden");
  }, 2000);
});

// Display Books
function displayBooks(books) {
  bookGrid.innerHTML = books.map(book => `
    <div class="book-item">
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.description}</p>
      <a href="${book.filePath}" target="_blank">Read Online</a>
    </div>
  `).join("");

  // Custom Tilt Effect
  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = x / 10;
      const rotateX = -y / 10;
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Search Books
function searchBooks() {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

// Chatbot Functionality
sendButton.addEventListener("click", () => {
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    chatbotInput.value = "";
    setTimeout(() => {
      addMessage("The void whispers back: I’m here to guide you.", "bot");
    }, 1000);
  }
});

function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.style = sender === "user" ? "text-align: right; color: #00ffff;" : "text-align: left; color: #ddd;";
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Chatbot Toggle
chatbotCore.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
});

// Initial Display
displayBooks(books);
