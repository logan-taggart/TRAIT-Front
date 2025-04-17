import React from 'react';
import ResultDetails from './ResultDetails';

const VideoResultDisplay = ({ resultMessage, imageUrl, boundingBoxInfo }) => {
    // if (resultMessage === "Processing..." && !imageUrl) {
    //     console.log("Haiiii")
    //     return <span class="loading loading-ring loading-md"></span>;
    // }

    if (!resultMessage) {
        return null;
    }

    return (
        <div>
            <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">
                {/* Red text if the message was not successful */}
                {resultMessage && (
                    <div className="flex justify-center items-center mb-4">
                        <p
                            className={`${resultMessage !==
                                'Processing completed successfully!'
                                ? 'text-red-500' // Red text for error
                                : 'text-green-500' // Green text for success
                                } text-center`}
                        >
                            {resultMessage}
                        </p>
                    </div>
                )}

                {/* Loading Spinner */}
                {imageUrl === 'None' && resultMessage == 'Processing...' && (
                    <div className="flex justify-center items-center h-full w-full">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                )}

                {imageUrl !== 'None' && (
                    <div className="w-full h-full relative">
                        <video
                            src={imageUrl}
                            controls
                            className="w-full h-full object-contain rounded-md"
                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
            <br />
            <ResultDetails boundingBoxInfo={boundingBoxInfo} />
        </div>
    );
};

export default VideoResultDisplay;
