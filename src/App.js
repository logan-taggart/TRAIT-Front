import React, { useState } from "react";
import "./App.css";

function App() {
  const baseURL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:3001"
    : "https://trademark-identification-back.onrender.com";

  const [mainFile, setMainFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleMainSubmit = async () => {
    if (!mainFile) {
      setResultMessage("Please upload a main image first.");
      return;
    }

    const formData = new FormData();
    formData.append("main_image", mainFile);

    try {
      const response = await fetch(`${baseURL}/image/detect-all`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setImageUrl(URL.createObjectURL(blob));
        setResultMessage("Main file processed successfully!");
      } else {
        setResultMessage("Processing failed. Try again.");
      }
    } catch (error) {
      setResultMessage("Error processing the main image.");
      console.error(error);
    }
  };

  const handleComparisonSubmit = async () => {
    if (!mainFile || !referenceFile) {
      setResultMessage("Please upload both a main and reference image.");
      return;
    }

    const formData = new FormData();
    formData.append("main_image", mainFile);
    formData.append("reference_image", referenceFile);

    try {
      const response = await fetch(`${baseURL}/image/detect-specific`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setImageUrl(URL.createObjectURL(blob));
        setResultMessage("Comparison completed successfully!");
      } else {
        setResultMessage("Comparison failed. Try again.");
      }
    } catch (error) {
      setResultMessage("Error processing the comparison.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1>TRAIT</h1>
        <p>Trademark Identification & Analysis Tool</p>
      </header>

      <div className="App-header">
        <div className="file-upload-container">
          <div className="file-box">
            <label htmlFor="fileUpload" className="file-label">
              {mainFile ? mainFile.name : "Click to Upload Main Image"}
            </label>
            <input id="fileUpload" type="file" onChange={(e) => handleFileChange(e, setMainFile)} />
          </div>
        </div>

        <div className="file-upload-container">
          <div className="file-box">
            <label htmlFor="fileUpload2" className="file-label">
              {referenceFile ? referenceFile.name : "Click to Upload Reference Image"}
            </label>
            <input id="fileUpload2" type="file" onChange={(e) => handleFileChange(e, setReferenceFile)} />
          </div>
        </div>

        <button className="submit-button" onClick={handleMainSubmit}>
          Submit for Detection (Main Image Only)
        </button>
        <button className="submit-button" onClick={handleComparisonSubmit}>
          Submit for Comparison (Both Images)
        </button>

        <div className="results-box">
          {resultMessage && <p>{resultMessage}</p>}
          {imageUrl && <img src={imageUrl} alt="Processed Result" className="result-image" />}
        </div>
      </div>
    </div>
  );
}

export default App;