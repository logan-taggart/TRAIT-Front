import React from "react";

const UploadSection = ({ label, file, setFile }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="file-upload-container">
      <div className="file-box">
        <label className="file-label">
          {file ? file.name : label}
          <input type="file" onChange={handleFileChange} hidden />
        </label>
      </div>
    </div>
  );
};

export default UploadSection;
