
import React from "react";

export default function DelusionSlider({ delusion, setDelusion, getDelusionColor }) {
  return (
    <div className="slider-section">
      <label htmlFor="delusionRange" className="slider-label">
        Delusion Meter: {delusion}% -{" "}
        <span className="delusion-text">
          {delusion < 33 ? "Reasonable" : delusion < 66 ? "High Hopes" : "Out of Control"}
        </span>
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
          background: `linear-gradient(to right, ${getDelusionColor(
            delusion
   )} 0%, ${getDelusionColor(delusion)} ${delusion}%,rgb(228, 234, 247) ${delusion}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
}
