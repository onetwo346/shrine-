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

// BookShrine information for chatbot
const bookShrineInfo = {
  about: "Book Shrine is a celestial digital library created by Kofi Fosu that houses unique works of fiction across multiple genres including romance, science fiction, fantasy, and adventure.",
  mission: "To connect readers with extraordinary stories that transport them to new worlds and dimensions, offering an immersive reading experience unlike any other.",
  creator: "Kofi Fosu, also known as Cosmos Coderr, is a visionary author and developer who crafts both stories and digital experiences.",
  features: ["3D interactive book display", "Cosmic animated background", "AI-powered assistant", "Immersive portal transitions", "Curated collection of original works"],
  genres: ["Romance", "Science Fiction", "Fantasy", "Adventure", "Mystery"],
  contact: "cosmoscoderr@gmail.com",
  founded: "The Book Shrine was established as a cosmic haven for literary exploration in 2023."
};

// DOM Elements
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

// Audio Elements (Replace with your GitHub URLs)
const clickSound = new Audio("https://raw.githubusercontent.com/yourusername/yourrepo/main/click.mp3");
const universeSound = new Audio("https://raw.githubusercontent.com/yourusername/yourrepo/main/universe.mp3");

// Ensure Intro Page is Visible and Main Page is Hidden on Load
document.addEventListener("DOMContentLoaded", () => {
  introPage.style.display = "flex";
  mainPage.style.display = "none";
  initChatbotPosition();
});

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
  universeSound.play();
  const portalOverlay = document.getElementById("portal-overlay");
  portalOverlay.classList.remove("hidden");
  setTimeout(() => {
    introPage.style.display = "none";
    mainPage.style.display = "flex";
    portalOverlay.classList.add("hidden");
  }, 2000);
});

// Display Books
function displayBooks(booksToShow) {
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

  if (msg === "hi" || msg === "hello" || msg.includes("hey")) {
    response = "Greetings, cosmic traveler. I am BookShrine, your guide. How may I assist?";
  } else if (msg.includes("what is book shrine")) {
    response = bookShrineInfo.about + " " + bookShrineInfo.mission;
  } else if (msg.includes("donate")) {
    response = "Support our cosmic mission! Tap the donate button in the footer.";
  } else if (msg.includes("list books")) {
    response = "Our sacred tomes:\n" + books.map(b => `- ${b.title} by ${b.author}`).join("\n");
  } else {
    const foundBook = books.find(book => msg.includes(book.title.toLowerCase()));
    if (foundBook) {
      response = `"${foundBook.title}" by ${foundBook.author}: ${foundBook.description}`;
    }
  }

  return response;
}

// Chatbot Interaction
sendButton.addEventListener("click", () => {
  clickSound.play();
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

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    clickSound.play();
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, "user");
      chatbotInput.value = "";
      setTimeout(() => {
        const response = chatbotResponse(userMessage);
        addMessage(response, "bot");
      }, 1000);
    }
  }
});

function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.style = sender === "user" 
    ? "text-align: right; color: #00ffff; margin: 5px 0; white-space: pre-wrap;" 
    : "text-align: left; color: #ddd; margin: 5px 0; white-space: pre-wrap;";
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Chatbot Toggle
chatbotCore.addEventListener("click", (e) => {
  // Prevent click event from interfering with drag
  if (e.target === chatbotCore && !isDragging) {
    clickSound.play();
    chatbotWindow.classList.toggle("hidden");
    if (!chatbotWindow.classList.contains("hidden") && chatbotMessages.children.length === 0) {
      addMessage("Welcome to BookShrine! How may I assist your cosmic journey?", "bot");
    }
  }
});

closeChatbot.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.add("hidden");
});

// Draggable Chatbot
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

chatbotCore.addEventListener("mousedown", startDragging);
chatbotCore.addEventListener("touchstart", startDragging, { passive: false });

function startDragging(e) {
  e.preventDefault();
  isDragging = true;
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - currentX;
    initialY = e.touches[0].clientY - currentY;
  } else {
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
  }
  chatbotCore.style.cursor = "grabbing";
}

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag, { passive: false });

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    // Boundary checks to keep the chatbot within the viewport
    currentX = Math.max(0, Math.min(currentX, window.innerWidth - chatbotCore.offsetWidth));
    currentY = Math.max(0, Math.min(currentY, window.innerHeight - chatbotCore.offsetHeight));

    chatbotCore.style.left = `${currentX}px`;
    chatbotCore.style.top = `${currentY}px`;
    chatbotCore.style.right = "auto";
    chatbotCore.style.bottom = "auto";

    // Adjust chatbot window position relative to the orb
    chatbotWindow.style.right = "auto";
    chatbotWindow.style.bottom = "auto";
    chatbotWindow.style.left = `${currentX}px`;
    chatbotWindow.style.top = `${currentY + chatbotCore.offsetHeight + 10}px`;
  }
}

document.addEventListener("mouseup", stopDragging);
document.addEventListener("touchend", stopDragging);

function stopDragging() {
  isDragging = false;
  chatbotCore.style.cursor = "move";
}

// Initialize Chatbot Position
function initChatbotPosition() {
  currentX = window.innerWidth - chatbotCore.offsetWidth - 20;
  currentY = window.innerHeight - chatbotCore.offsetHeight - 20;
  chatbotCore.style.left = `${currentX}px`;
  chatbotCore.style.top = `${currentY}px`;
  chatbotCore.style.right = "auto";
  chatbotCore.style.bottom = "auto";
  chatbotWindow.style.left = `${currentX}px`;
  chatbotWindow.style.top = `${currentY + chatbotCore.offsetHeight + 10}px`;
}

// Initial Display
displayBooks(books);

// Resize Handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initChatbotPosition();
});
