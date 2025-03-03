import React from "react";

const DetectionOptions = ({
  detectionMode,
  setDetectionMode,
  confidenceThreshold,
  setConfidenceThreshold,
  embeddingAlgorithm,
  setEmbeddingAlgorithm,
}) => {
  const handleDetectionModeChange = (mode) => {
    setDetectionMode(mode);
  };

  return (
    <div>
    <fieldset className="fieldset w-l bg-base-200 border border-base-200 p-6 rounded-box">
      <legend class="fieldset-legend">Detection Mode</legend>
      <div className="detection-mode-toggle">
        
        
        <button
          className={`btn ${detectionMode === "all" ? "btn-primary" : "btn-secondary"} mr-4`}
          onClick={() => handleDetectionModeChange("all")}
        >
          Search All Logos
        </button>
        
        <button
          className={`btn ${detectionMode === "specific" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => handleDetectionModeChange("specific")}
        >
          Search Specific Logo
        </button>
        
      </div>
      
      {detectionMode === "specific" && (
        <div className="embedding-algorithm mt-6">
          <label>Embedding Algorithm:</label>
          <select
            value={embeddingAlgorithm}
            onChange={(e) => setEmbeddingAlgorithm(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="default">Default</option>
            <option value="alternative">Alternative</option>
          </select>
        </div>
      )}
    </fieldset>
    </div>
  );
};

export default DetectionOptions;
