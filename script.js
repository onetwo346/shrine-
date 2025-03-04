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

const bookShrineInfo = {
  about: "Book Shrine is a celestial digital library created by Kofi Fosu that houses unique works of fiction across multiple genres including romance, science fiction, fantasy, and adventure.",
  mission: "To connect readers with extraordinary stories that transport them to new worlds and dimensions, offering an immersive reading experience unlike any other.",
  creator: "Kofi Fosu, also known as Cosmos Coderr, is a visionary author and developer who crafts both stories and digital experiences.",
  features: ["3D interactive book display", "Cosmic animated background", "AI-powered assistant", "Immersive portal transitions", "Curated collection of original works"],
  genres: ["Romance", "Science Fiction", "Fantasy", "Adventure", "Mystery"],
  contact: "cosmoscoderr@gmail.com",
  founded: "The Book Shrine was established as a cosmic haven for literary exploration in 2023."
};

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
const clickSound = document.getElementById("click-sound");
const universeSound = document.getElementById("universe-sound");

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

// Portal Transition with Sound
startButton.addEventListener("click", () => {
  clickSound.play();
  universeSound.play();
  const portalOverlay = document.getElementById("portal-overlay");
  portalOverlay.classList.remove("hidden");
  setTimeout(() => {
    introPage.style.display = "none";
    mainPage.style.display = "block";
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

// Chatbot Response Logic (shortened for brevity)
function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  let response = "The Shrine hums with cosmic energy...";
  if (msg === "hi" || msg === "hello") {
    response = "Greetings, cosmic traveler. I am BookShrine, your guide. How may I assist?";
  } else if (msg.includes("what is book shrine")) {
    response = bookShrineInfo.about + " " + bookShrineInfo.mission;
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
    sendButton.click();
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

// Chatbot Toggle and Drag
chatbotCore.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.toggle("hidden");
  if (!chatbotWindow.classList.contains("hidden") && chatbotMessages.children.length === 0) {
    addMessage("Welcome to BookShrine! How may I assist your cosmic journey?", "bot");
  }
});

closeChatbot.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.add("hidden");
});

// Draggable Chatbot (Mouse and Touch)
const draggableChat = document.getElementById("chatbot-draggable");
let isDragging = false, currentX, currentY, initialX, initialY;

// Mouse Events
draggableChat.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

// Touch Events for iPhone
draggableChat.addEventListener("touchstart", startDraggingTouch, { passive: false });
document.addEventListener("touchmove", dragTouch, { passive: false });
document.addEventListener("touchend", stopDraggingTouch);

function startDragging(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function stopDragging() {
  isDragging = false;
}

function startDraggingTouch(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    const touch = e.touches[0];
    initialX = touch.clientX - currentX;
    initialY = touch.clientY - currentY;
  }
}

function dragTouch(e) {
  if (isDragging) {
    e.preventDefault();
    const touch = e.touches[0];
    currentX = touch.clientX - initialX;
    currentY = touch.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function stopDraggingTouch() {
  isDragging = false;
}

function setChatbotPosition(x, y) {
  draggableChat.style.left = `${x}px`;
  draggableChat.style.top = `${y}px`;
  draggableChat.style.bottom = "auto";
  draggableChat.style.right = "auto";
}

// Initial Position
currentX = window.innerWidth - 70; // Initial right: 20px
currentY = window.innerHeight - 70; // Initial bottom: 20px
setChatbotPosition(currentX, currentY);

// Initial Display
displayBooks(books);

// Resize Handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  currentX = window.innerWidth - 70;
  currentY = window.innerHeight - 70;
  if (!isDragging) {
    setChatbotPosition(currentX, currentY);
  }
});
