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

// BookShrine information for enhanced chatbot knowledge
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

// Enhanced Chatbot Logic with advanced knowledge of BookShrine
function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  let response = "The Shrine hums with cosmic energy...";

  // Basic greetings
  if (msg === "hi" || msg === "hello" || msg.includes("hey") || msg.includes("greetings")) {
    response = "Greetings, cosmic traveler. I am BookShrine, guardian of literary dimensions. How may I illuminate your path today?";
  }
  // About BookShrine
  else if (msg.includes("what is book shrine") || msg.includes("what is this") || msg.includes("about book shrine")) {
    response = bookShrineInfo.about + " " + bookShrineInfo.mission + " Ask me anything about our collection or features!";
  }
  // Mission and purpose
  else if (msg.includes("purpose") || msg.includes("mission") || msg.includes("goal")) {
    response = bookShrineInfo.mission + " Each book here is a doorway to another reality.";
  }
  // Creator information
  else if (msg.includes("who made") || msg.includes("who created") || msg.includes("who built") || msg.includes("creator") || msg.includes("kofi")) {
    response = `${bookShrineInfo.creator} You can reach out to him at ${bookShrineInfo.contact} for collaborations or inquiries.`;
  }
  // Book count and collection
  else if (msg.includes("how many books") || msg === "book count" || msg.includes("collection size")) {
    response = `The Shrine currently houses ${books.length} celestial volumes, each carefully crafted to transport you beyond the ordinary. Our collection spans ${bookShrineInfo.genres.join(", ")}.`;
  }
  // Book recommendations
  else if (msg.includes("recommend") || msg.includes("suggest") || msg.includes("what should i read")) {
    const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 3);
    response = "The cosmic energies align to suggest these works for your journey:\n" + 
      randomBooks.map(b => `- ${b.title} by ${b.author}: ${b.description}`).join("\n");
  }
  // List all books
  else if (msg.includes("list books") || msg.includes("what books") || msg.includes("show books") || msg.includes("all books")) {
    response = "Behold the sacred tomes in our cosmic collection:\n" + 
      books.map(b => `- ${b.title} by ${b.author}`).join("\n");
  }
  // Features of BookShrine
  else if (msg.includes("features") || msg.includes("what can you do") || msg.includes("functionality")) {
    response = `BookShrine offers: ${bookShrineInfo.features.join(", ")}. How may I enhance your experience today?`;
  }
  // Genres available
  else if (msg.includes("genres") || msg.includes("types of books") || msg.includes("categories")) {
    response = `Our celestial library spans multiple dimensions including: ${bookShrineInfo.genres.join(", ")}. Which realm would you like to explore?`;
  }
  // How to use
  else if (msg.includes("how to use") || msg.includes("how do i") || msg.includes("help")) {
    response = "To navigate the Shrine: browse books in our main gallery, use the search bar to find specific titles, click on any book to view details, and use the 'Read Online' link to open the cosmic portal to its contents. I'm always here if you need guidance.";
  }
  // History of BookShrine
  else if (msg.includes("history") || msg.includes("when") || msg.includes("started") || msg.includes("founded")) {
    response = bookShrineInfo.founded + " It has been evolving into a more immersive experience ever since.";
  }
  // Donation inquiries
  else if (msg.includes("donate") || msg.includes("support") || msg.includes("contribution")) {
    response = "Your cosmic energy (donations) helps fuel the expansion of the Shrine! Click the donation link at the bottom of the page to support our mission of sharing extraordinary stories with the universe.";
  }
  // Check for specific book inquiries
  else {
    const foundBook = books.find(book => 
      msg.includes(book.title.toLowerCase()) || 
      (book.title.toLowerCase().includes("heaven bound") && msg.includes("heaven bound")) ||
      (book.title.toLowerCase().includes("last echo") && msg.includes("last echo"))
    );
    
    if (foundBook) {
      response = `"${foundBook.title}" by ${foundBook.author} is a spectacular journey through ${foundBook.description} This cosmic tome awaits your exploration in our collection. Would you like to know more about other works by ${foundBook.author}?`;
    } else if (msg.includes("romance") || msg.includes("love")) {
      const romanceBooks = books.filter(book => 
        book.description.toLowerCase().includes("romance") || 
        book.title.toLowerCase().includes("heart") || 
        book.title.toLowerCase().includes("ocean")
      );
      response = `For those seeking cosmic romance, I recommend: \n${romanceBooks.map(b => `- ${b.title} by ${b.author}`).join("\n")}`;
    } else if (msg.includes("sci-fi") || msg.includes("science fiction") || msg.includes("scifi")) {
      const scifiBooks = books.filter(book => 
        book.description.toLowerCase().includes("sci-fi") || 
        book.description.toLowerCase().includes("science fiction")
      );
      response = `For interstellar adventures, explore: \n${scifiBooks.map(b => `- ${b.title} by ${b.author}`).join("\n")}`;
    } else if (msg.includes("fantasy") || msg.includes("adventure")) {
      const fantasyBooks = books.filter(book => 
        book.description.toLowerCase().includes("fantasy") || 
        book.description.toLowerCase().includes("adventure")
      );
      response = `For mystical journeys beyond reality, discover: \n${fantasyBooks.map(b => `- ${b.title} by ${b.author}`).join("\n")}`;
    } else {
      response = "The cosmic void whispers mysteries... Ask me about our book collection, specific titles, genres, or about BookShrine itself. I'm here to guide your literary journey.";
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

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
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
    if (!chatbotWindow.classList.contains("hidden") && chatbotMessages.children.length === 0) {
      // Add welcome message when opening chat for first time
      addMessage("Welcome to BookShrine! I'm your cosmic guide to this literary dimension. How may I assist your journey today?", "bot");
    }
  }
});

closeChatbot.addEventListener("click", () => {
  if (chatbotWindow) {
    chatbotWindow.classList.add("hidden");
  }
});

// Add donation message to footer
document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector("footer");
  if (footer) {
    // Create donation container
    const donationContainer = document.createElement("div");
    donationContainer.className = "donation-container";
    donationContainer.style = "margin-top: 15px; text-align: center;";
    
    // Add donation message and button
    donationContainer.innerHTML = `
      <p style="color: #00ffff; margin-bottom: 10px;">Support the expansion of BookShrine's cosmic library!</p>
      <a href="#donate" class="donate-button" style="
        display: inline-block;
        background: linear-gradient(135deg, #00b4d8, #0077b6);
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        text-decoration: none;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.7);
        transition: all 0.3s ease;
      ">
        <img src="donate.jpg" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;">
        Donate & Fuel Our Cosmic Journey
      </a>
    `;
    
    // Append to footer
    footer.appendChild(donationContainer);
  }
});

// Initial Display
displayBooks(books);

// Add window resize event to adjust canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
