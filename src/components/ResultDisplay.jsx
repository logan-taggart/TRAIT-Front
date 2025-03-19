import React from "react";
import ResultDetails from "./ResultDetails";

const ResultDisplay = ({ resultMessage, imageUrl, boundingBoxInfo}) => {
 
    // if (resultMessage === "Processing..." && !imageUrl) {
    //     console.log("Haiiii")
    //     return <span class="loading loading-ring loading-md"></span>;
    // }

    if(!resultMessage) {
        return null;
    }

    console.log("ImageUrl: " + imageUrl)

    return (
        <div >
            <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">

                {/* Red text if the message was not successful */}
                {resultMessage && (
                    <div className="flex justify-center items-center mb-4">
                        <p
                            className={`${
                                resultMessage !== "Processing completed successfully!"
                                    ? "text-red-500" // Red text for error
                                    : "text-green-500" // Green text for success
                            } text-center`}
                        >
                            {resultMessage}
                        </p>
                    </div>
                )}


                {imageUrl === 'None' && (
                                <div className="flex justify-center items-center h-full w-full">
                                    <span className="loading loading-spinner loading-xl"></span>
                                </div>
                            )}

                {/* Image with standardized size */}
                {imageUrl !== "None" && (
                    <div className="w-full h-full relative">
                        <img
                            src={imageUrl}
                            alt="Processed Result"
                            className="w-full h-full object-contain rounded-md" // Matching the preview style
                            style={{ maxWidth: "100%", maxHeight: "300px" }} // Ensures the result image is within the same size limit
                        />
                    </div>
                )}
            </div>
            <br />
            <ResultDetails boundingBoxInfo={boundingBoxInfo} />
        </div>
    );
};

export default ResultDisplay;