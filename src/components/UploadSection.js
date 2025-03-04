import React, { useState, useRef, useEffect } from "react";

// This is the UploadSection component that will be used to upload images
// It will display a dashed border that can be clicked to open the file dialog
// label is that the text says, and the file/setFile are the useState variables
const UploadSection = ({ label, file, setFile }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle the file change event
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

  // Update the image preview whenever the file changes
  // Makes the reference image preview appear when you change from "Search all" back to "Search specific"
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [file]); // whenever file changes

  const handleClick = () => {
    // Trigger the file input click using the ref
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="card card-dash bg-base-100 w-96 p-4 justify-center">
      <div
        className={`border-4 border-dashed p-4 h-full rounded-md cursor-pointer ${
          imagePreview ? "border-transparent" : "border-primary"
        }`}
        onClick={handleClick} // Trigger the file input click when the dashed border is clicked
      >
        <div className="flex justify-center items-center h-full">
          {/* If an image is selected, replace label with the image preview */}
          {imagePreview ? (
            <div className="w-full h-full relative cursor-pointer">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            </div> ) : 
          (
            <span className="text-primary text-center w-full"> {file ? file.name : label} </span>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default UploadSection;
