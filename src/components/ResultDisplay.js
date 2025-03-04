import React from "react";

const ResultDisplay = ({ resultMessage, imageUrl }) => {

  if (!resultMessage && !imageUrl) {
    return null;
  }

  return (
    <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">

      {/* Red text if the message was not successful */}
      {resultMessage && <p 
      className={`${resultMessage !== "Processing completed successfully!" ? "text-red-500" : "text-green-500"}`}
      >{resultMessage}</p>}

      {imageUrl && <img src={imageUrl} alt="Processed Result" className="result-image" />}
    </div>
  );
};

export default ResultDisplay;
