
import React from "react";

export default function BoosterDisplay({ booster }) {
  return (
    <div className="booster-section">
      <div className="booster-emoji">{booster.emoji}</div>
      <p className="booster-vibe">{booster.vibe}</p>
      <p className="booster-song">Song: {booster.song}</p>
    </div>
  );
}
