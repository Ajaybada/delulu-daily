
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { quotes, boosters } from "../data/constants";
import DelusionSlider from "./DelusionSlider";
import BoosterDisplay from "./BoosterDisplay";
import ButtonGroup from "./ButtonGroup";

export default function DeluluCard() {
  const [quote, setQuote] = useState(quotes[0]);
  const [delusion, setDelusion] = useState(75);
  const [booster, setBooster] = useState(boosters[0]);
  const [savedMessage, setSavedMessage] = useState("");
  const cardRef = useRef(null);

  function generateDelulu() {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const newDelusion = Math.floor(Math.random() * 100) + 1;
    const newBooster = boosters[Math.floor(Math.random() * boosters.length)];

    setQuote(newQuote);
    setDelusion(newDelusion);
    setBooster(newBooster);
    setSavedMessage("");
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = "delulu-vibe-card.png";
      link.href = canvas.toDataURL();
      link.click();
      setSavedMessage("Vibe card saved!");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  function getDelusionColor(percent) {
    if (percent < 33) return "#10b981"; // green
    if (percent < 66) return "#f97316"; // orange
    return "#db2777"; // pink
  }

  return (
    <div ref={cardRef} className="card">
      <h1 className="title">Delulu Daily</h1>
      <p className="quote">“{quote}”</p>

      <DelusionSlider
        delusion={delusion}
        setDelusion={setDelusion}
        getDelusionColor={getDelusionColor}
      />

      <BoosterDisplay booster={booster} />

      <ButtonGroup generateDelulu={generateDelulu} downloadCard={downloadCard} />

      {savedMessage && <p className="saved-message">{savedMessage}</p>}
    </div>
  );
}
