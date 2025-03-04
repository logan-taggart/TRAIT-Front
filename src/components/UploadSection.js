import React, { useState } from "react";

const UploadSection = ({ label, file, setFile }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create a preview for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="file-box">
        <label className="file-label">
          {file ? file.name : label}
          <input type="file" onChange={handleFileChange} hidden />
        </label>
      </div>

      {/* Show image preview if it exists */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover border rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default UploadSection;
