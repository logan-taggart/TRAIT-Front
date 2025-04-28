import React from 'react';
import ResultDetails from './ResultDetails';

const ResultDisplay = ({ resultMessage, imageUrl, boundingBoxInfo }) => {
    if (!resultMessage) {
        return null;
    }

    return (
        <div>
            <fieldset className="fieldset w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">
                <legend className="fieldset-legend">Detected Logos</legend>

                {/* Result Message */}
                {resultMessage && (
                    <div className="flex justify-center items-center mb-4">
                        <p
                            className={`${
                                resultMessage !==
                                'Processing completed successfully!'
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            } text-center text-xl`}
                        >
                            {resultMessage}
                        </p>
                    </div>
                )}

                {/* Loading Spinner */}
                {imageUrl === 'None' && resultMessage === 'Processing...' && (
                    <div className="flex justify-center items-center h-full w-full">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                )}

                {/* Processed Image */}
                {imageUrl !== 'None' && (
                    <div className="w-full h-full relative">
                        <img
                            src={imageUrl}
                            alt="Processed Result"
                            className="w-full h-full object-contain rounded-md" // Matching the preview style
                            style={{ maxWidth: '100%', maxHeight: '300px' }} // Ensures the result image is within the same size limit
                        />
                    </div>
                )}
            </fieldset>

            {/* Bounding Box Info */}
            {imageUrl !== 'None' && (
                <ResultDetails boundingBoxInfo={boundingBoxInfo} />
            )}
        </div>
    );
};

export default ResultDisplay;
