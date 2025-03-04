import React from "react";
import ToolTipDropDown from "./ToolTipDropDown";

const ConfidenceThresholdInput = ({
  confidenceThreshold,
  setConfidenceThreshold,
  thresholdTitle,
  tooltipDescription,
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow the value to be a valid float (with one decimal) or empty
    if (
      value === "" || // Allow empty input for deletion
      (value === "." || // Allow a single decimal point
        (!isNaN(value) && value.indexOf(".") === value.lastIndexOf("."))) // Ensure only one decimal point
    ) {
      // Parse the value as a float
      const parsedValue = parseFloat(value);

      // Ensure the value is within the range [0, 100]
      if (!isNaN(parsedValue)) {
        if (parsedValue <= 0) {
          setConfidenceThreshold(0);
        } else if (parsedValue >= 100) {
          setConfidenceThreshold(100);
        } else {
          setConfidenceThreshold(value);
        }
      } else if (value === "") {
        setConfidenceThreshold(""); // Allow the input to be empty
      }
    }
  };

  // Input field and range slider for the threshold
  return (
    <div className="confidence-threshold mt-6">
      
      <div className='text-base font-medium mb-1'>
        {thresholdTitle}{": "}<ToolTipDropDown description={tooltipDescription} />
        <input 
          className="input w-16 input-primary"
          placeholder={confidenceThreshold}
          onChange={handleInputChange}
          value={confidenceThreshold}
        />%
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={confidenceThreshold}
        onChange={(e) => setConfidenceThreshold(e.target.value)}
        className="range range-primary"
      />
    </div>
  );
};

export default ConfidenceThresholdInput;
