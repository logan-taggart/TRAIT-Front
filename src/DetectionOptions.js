import React from "react";

const DetectionOptions = ({
  detectionMode,
  setDetectionMode,
  confidenceThreshold,
  setConfidenceThreshold,
  embeddingAlgorithm,
  setEmbeddingAlgorithm,
}) => {
  return (
    <div className="detection-options">
      <label>Detection Mode:</label>
      <select value={detectionMode} onChange={(e) => setDetectionMode(e.target.value)}>
        <option value="all">Search All Logos</option>
        <option value="specific">Search Specific Logo</option>
      </select>


      <label>Embedding Algorithm:</label>
      <select value={embeddingAlgorithm} onChange={(e) => setEmbeddingAlgorithm(e.target.value)}>
        <option value="default">Default</option>
        <option value="alternative">Alternative</option>
      </select>
    </div>
  );
};

export default DetectionOptions;
