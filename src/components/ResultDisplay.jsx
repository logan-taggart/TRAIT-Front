import React from "react";

const ResultDisplay = ({ resultMessage, imageUrl, boundingBoxInfo}) => {

    
    
    const cropped = boundingBoxInfo.map((box, index) => {
        return (
            <div key={index} className="w-full h-full relative">
                <img
                    src={`data:image/jpeg;base64,${box.cropped_logo}`}
                    alt="Cropped Image"
                    className="w-full h-full object-contain rounded-md" // Matching the preview style
                    style={{ maxWidth: "100%", maxHeight: "300px" }} // Ensures the result image is within the same size limit
                />
            </div>
        );
    });
    
    

    console.log(boundingBoxInfo)
    if (!resultMessage && !imageUrl) {
        return null;
    }

    return (
        <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">

            {/* Red text if the message was not successful */}
            {resultMessage && (
                <p
                    className={`${resultMessage !== "Processing completed successfully!" ? "text-red-500" : "text-green-500"
                        }`}
                >
                    {resultMessage}
                </p>
            )}

            {/* Image with standardized size */}
            {imageUrl && (
                <div className="w-full h-full relative">
                    <img
                        src={imageUrl}
                        alt="Processed Result"
                        className="w-full h-full object-contain rounded-md" // Matching the preview style
                        style={{ maxWidth: "100%", maxHeight: "300px" }} // Ensures the result image is within the same size limit
                    />
                </div>
            )}

             {cropped}
        </div>
    );
};

export default ResultDisplay;