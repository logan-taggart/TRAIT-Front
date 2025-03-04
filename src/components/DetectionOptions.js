import React from "react";
import DetectionSpecificOptions from './DetectionSpecificOptions.js';

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
      <legend className="fieldset-legend">Detection Mode</legend>
      <div className="detection-mode-toggle">
        
        
        <button
          className={`btn ${detectionMode === "all" ? "btn-primary btn-active" : "btn-outline btn-secondary"} mr-4`}
          onClick={() => handleDetectionModeChange("all")}
        >
          Search All Logos
        </button>
        
        <button
          className={`btn ${detectionMode === "specific" ? "btn-primary btn-active" : " btn-outline btn-secondary"}`}
          onClick={() => handleDetectionModeChange("specific")}
        >
          Search Specific Logo
        </button>
        
      </div>
      
      <DetectionSpecificOptions detectionMode={detectionMode}
            embeddingAlgorithm={embeddingAlgorithm}
            setEmbeddingAlgorithm={setEmbeddingAlgorithm}
            confidenceThreshold={confidenceThreshold}
            setConfidenceThreshold={setConfidenceThreshold}/>
    </fieldset>
    </div>
  );
};

export default DetectionOptions;
