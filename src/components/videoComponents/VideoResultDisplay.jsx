import React from 'react';
import VideoResultDetails from './VideoResultDetails';

const VideoResultDisplay = ({ resultMessage, videoData }) => {
    // if (resultMessage === "Processing..." && !videoURL) {
    //     console.log("Haiiii")
    //     return <span class="loading loading-ring loading-md"></span>;
    // }

    if (!resultMessage) {
        return null;
    }

    const videoURL = videoData['video']
        ? `data:video/mp4;base64,${videoData['video']}`
        : 'None'; // Assuming videoData is the URL of the processed video

    return (
        <div>
            <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">
                {/* Red text if the message was not successful */}
                {resultMessage && (
                    <div className="flex justify-center items-center mb-4">
                        <p
                            className={`${
                                resultMessage !==
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
                {videoURL === 'None' && resultMessage === 'Processing...' && (
                    <div className="flex justify-center items-center h-full w-full">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                )}

                {resultMessage !== 'Processing...' && (
                    <div className="w-full h-full relative">
                        <video
                            src="http://127.0.0.1:5174/video/fetch-processed-video"
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
            <VideoResultDetails
                croppedFramesSaved={videoData.saved_frames}
                appearanceCounts={videoData.logo_appearance_count}
            />
        </div>
    );
};

export default VideoResultDisplay;
