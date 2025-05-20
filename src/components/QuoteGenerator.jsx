
import React from "react";

export default function ButtonGroup({ generateDelulu, downloadCard }) {
  return (
    <div className="button-group">
      <button onClick={generateDelulu} className="btn manifest">
        Manifest Again
      </button>
      <button onClick={downloadCard} className="btn download">
        Download Vibe Card
      </button>
    </div>
  );
}
