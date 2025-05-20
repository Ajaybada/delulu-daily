import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./index.css"; // Keep your CSS file to style accordingly


const quotes = [
  "He’s not ignoring you. He’s just overwhelmed by your aura.",
  "You’re on the verge of something incredible — keep vibing!",
  "Your ideas aren’t crazy. They’re just ahead of their time.",
  "You walk like a main character — and it shows.",
  "You’re literally a cosmic event in human form.",
  "That job? Manifested. That crush? Manifested. That glow-up? Already happening.",
  "You don’t chase — you attract.",
  "You radiate CEO energy. Even your coffee knows it.",
  "Today’s chaos = tomorrow’s glow-up story.",
  "Every little win today is part of a BIG plot twist.",
  "You’re the plot twist they never saw coming.",
  "Stars aren’t born — they explode into greatness, just like you.",
  "You don’t just slay — you revolutionize.",
  "Reality is catching up to your dreams — buckle up.",
  "Your vibe is too high for basic problems."
];

const boosters = [
  { emoji: "🌈", vibe: "Rainbow Realness", song: "‘Shine On’ by Soul Radiance", audio: "/audio/shine-on.mp3" },
  { emoji: "🔥", vibe: "Spicy Soul Mode", song: "‘Too Hot to Handle’ by Groove Pulse", audio: "/audio/too-hot.mp3" },
  { emoji: "🧠", vibe: "Galaxy Brain Energy", song: "‘Deep Vibes’ by Mind Beats", audio: "/audio/deep-vibes.mp3" },
  { emoji: "🎭", vibe: "Main Character Mood", song: "‘Scene Stealer’ by Spotlight", audio: "/audio/scene-stealer.mp3" },
  { emoji: "💃", vibe: "Chaotic Slay", song: "‘Unapologetically Me’ by Firestep", audio: "/audio/unapologetic.mp3" },
  { emoji: "☀️", vibe: "Golden Hour Glow", song: "‘Sun in My Soul’ by Daydreamers", audio: "/audio/sun-soul.mp3" },
  { emoji: "🦄", vibe: "Delulu Dream State", song: "‘Fantasy Flux’ by DreamFreak", audio: "/audio/fantasy-flux.mp3" },
  { emoji: "🚀", vibe: "Mission: Slaypossible", song: "‘Boost Mode’ by StellarBeats", audio: "/audio/boost-mode.mp3" }
];

export default function DeluluDaily() {
  const [quote, setQuote] = useState(quotes[0]);
  const [delusion, setDelusion] = useState(70);
  const [booster, setBooster] = useState(boosters[0]);
  const [savedMessage, setSavedMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // new state

  const cardRef = useRef(null);

  const getDelusionText = (percent) => {
    if (percent < 33) return "Grounded 🌍";
    if (percent < 66) return "Hopeful 💫";
    return "Galaxy Brain 🚀";
  };

  const getDelusionColor = (percent) => {
    if (percent < 33) return "#16a34a"; // green
    if (percent < 66) return "#f59e0b"; // yellow
    return "#ec4899"; // pink
  };

  const generateDelulu = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const newDelusion = Math.floor(Math.random() * 100) + 1;
    const newBooster = boosters[Math.floor(Math.random() * boosters.length)];
    setQuote(newQuote);
    setDelusion(newDelusion);
    setBooster(newBooster);
    setSavedMessage("");
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true); // hide share section before capture
    // wait for DOM to update
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(cardRef.current);
        const link = document.createElement("a");
        link.download = "delulu-vibe-card.png";
        link.href = canvas.toDataURL();
        link.click();
        setSavedMessage("🌟 Vibe card saved! Ready to slay.");
        setTimeout(() => setSavedMessage(""), 3000);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsDownloading(false); // show share section back
      }
    }, 100); // small delay to ensure re-render before capture
  };

  return (
    <div className="app-container">
      <div ref={cardRef} className="card vibe-card">
        <h1 className="title">✨ Delulu Daily ✨</h1>
        <p className="quote">“{quote}”</p>

        <div className="slider-section">
          <label htmlFor="delusionRange" className="slider-label">
            Delusion Meter: {delusion}% — <strong>{getDelusionText(delusion)}</strong>
          </label>
          <input
            id="delusionRange"
            type="range"
            min="0"
            max="100"
            value={delusion}
            onChange={(e) => setDelusion(Number(e.target.value))}
            className="slider"
            style={{
              background: `linear-gradient(to right, ${getDelusionColor(delusion)} 0%, ${getDelusionColor(delusion)} ${delusion}%, #e5e7eb ${delusion}%, #e5e7eb 100%)`,
            }}
            title="Slide to change your vibe intensity!"
          />
        </div>

        <div className="booster-section">
          <div className="booster-emoji" style={{ fontSize: "2rem" }}>{booster.emoji}</div>
          <p className="booster-vibe">{booster.vibe}</p>
          <p className="booster-song">🎵 Song Vibe: {booster.song}</p>
        </div>

        <div className="button-group">
          <button onClick={generateDelulu} className="btn manifest">🔮 Manifest Again</button>
          <button onClick={downloadCard} className="btn download">📥 Download Vibe Card</button>
        </div>

        {!isDownloading && (
          <div className="social-share">
            <p>📢 Feeling it? Copy your vibe to share:</p>
            <code>
              “{quote}” — I’m at {delusion}% Delulu today with {booster.vibe} energy!
            </code>
          </div>
        )}

        {savedMessage && <p className="saved-message">{savedMessage}</p>}
      </div>
    </div>
  );
}