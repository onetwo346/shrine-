/* styles.css */
/* Design by Kofi Fosu | cosmoscoderr@gmail.com */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #0a0015;
  color: #fff;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

#cosmic-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#intro-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.intro-logo {
  width: 150px;
  height: auto;
  margin-bottom: 20px;
  animation: logoFade 2s ease-in-out infinite alternate;
}

@keyframes logoFade {
  0% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.05); }
}

.cosmic-text {
  text-align: center;
  animation: pulseGlow 3s infinite alternate;
}

.cosmic-text h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-shadow: 0 0 20px #ff00ff;
}

.highlight {
  color: #00ffff;
  text-shadow: 0 0 25px #ff00ff;
}

.cosmic-text p {
  font-size: clamp(1rem, 3vw, 1.4rem);
  max-width: 600px;
  margin: 20px 0;
}

.warp-button {
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  border: none;
  padding: 15px 35px;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.7);
  animation: warpPulse 1.5s infinite;
}

@keyframes warpPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes pulseGlow {
  0% { text-shadow: 0 0 10px #ff00ff; }
  100% { text-shadow: 0 0 30px #00ffff; }
}

#portal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
}

.warp-effect {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #00ffff, #ff00ff, transparent);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: warpExpand 2s forwards;
}

@keyframes warpExpand {
  0% { transform: translate(-50%, -50%) scale(0.1) rotate(0deg); }
  100% { transform: translate(-50%, -50%) scale(4) rotate(540deg); opacity: 0; }
}

#main-page {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px); /* Adjust based on approximate footer height */
}

header {
  padding: 30px;
  text-align: center;
}

.neon-title {
  font-size: clamp(2rem, 4vw, 3rem);
  text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
  animation: neonFlicker 4s infinite;
}

@keyframes neonFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

.cosmic-input {
  width: 70%;
  max-width: 500px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00ffff;
  border-radius: 20px;
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  padding: 40px;
  perspective: 800px;
  flex: 1;
}

.book-item {
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(0, 255, 255, 0.2));
  border: 1px solid #00ffff;
  border-radius: 10px;
  width: clamp(180px, 20vw, 200px);
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-item:hover {
  transform: translateZ(20px) rotateY(10deg);
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.8);
}

.book-item h2 {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #00ffff;
  text-shadow: 0 0 10px #ff00ff;
}

.book-item p {
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: #ddd;
}

.book-item a {
  color: #00ffff;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 0 0 10px #ff00ff;
}

footer {
  text-align: center;
  padding: 20px;
  background: rgba(255, 0, 255, 0.1);
  z-index: 10;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

footer a {
  color: #00ffff;
}

.donation-container p {
  color: #00ffff;
  margin-bottom: 10px;
}

.donate-button {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #00b4d8, #0077b6);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 0 0 15px rgba(0, 180, 216, 0.7);
  transition: all 0.3s ease;
}

.donate-button img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.donate-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 180, 216, 1);
}

.cosmic-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
}

.chat-orb {
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #00ffff, #ff00ff);
  border-radius: 50%;
  cursor: pointer;
  animation: orbGlow 2s infinite;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
  touch-action: none;
}

@keyframes orbGlow {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.cosmic-panel {
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #00ffff;
  border-radius: 10px;
  width: clamp(250px, 80vw, 300px);
  padding: 15px;
  position: absolute;
  bottom: 70px;
  right: 0;
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.6);
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ff00ff;
  color: #00ffff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.close-button:hover {
  background: #00ffff;
  color: #ff00ff;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
}

.message-field {
  height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  color: #fff;
}

.chat-input-container {
  display: flex;
  gap: 10px;
}

.cosmic-button {
  background: #ff00ff;
  color: #00ffff;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.hidden {
  display: none;
}

@media (max-width: 768px) {
  .cosmic-text h1 { font-size: 2.5rem; }
  .warp-button { padding: 12px 25px; font-size: 1.2rem; }
  .book-grid { padding: 20px; }
  .cosmic-panel { width: 90vw; }
  #main-page { min-height: auto; } /* Allow natural scrolling on smaller screens */
}

@media (max-width: 480px) {
  .cosmic-text h1 { font-size: 2rem; }
  .cosmic-text p { font-size: 1rem; }
  .warp-button { padding: 10px 20px; font-size: 1rem; }
  .book-item { width: 100%; max-width: 300px; }
}
