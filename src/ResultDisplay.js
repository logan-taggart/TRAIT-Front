import React from "react";

const ResultDisplay = ({ resultMessage, imageUrl }) => {
  return (
    <div className="results-box">
      {resultMessage && <p>{resultMessage}</p>}
      {imageUrl && <img src={imageUrl} alt="Processed Result" className="result-image" />}
    </div>
  );
};

export default ResultDisplay;
