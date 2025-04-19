import React from 'react';

const VideoResultDetails = ({
    croppedFramesSaved = [],
    appearanceCounts = [],
}) => {
    if (!croppedFramesSaved || croppedFramesSaved.length === 0) {
        return null;
    }

    // we will implement this for the specific logo search
    const confidenceScores = { 2: 'Low', 3: 'Medium', 4: 'High' };
    const getConfidenceScore = (confidence) => {
        if (confidence >= 4) {
            return 'High';
        }
        return confidenceScores[confidence];
    };

    // Show all of the logos with bounding boxes cropped
    return (
        <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center mb-4">
            {croppedFramesSaved.map(
                (
                    frame,
                    index, // Mapping through the bounding box info, displaying each cropped logo
                ) => (
                    <div key={index} className="flex items-center gap-4">
                        <img
                            src={`data:image/jpeg;base64,${frame.logo_base64}`}
                            alt="Cropped Image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                        <div className="text-base">
                            {/* Text of how much of the image is taken by the logo */}
                            This logo first appeared in frame {frame.frame_idx}{' '}
                            and was in approximately{' '}
                            {appearanceCounts[index] * 5 + ' '}
                            frames of the video
                        </div>

                        {/* We will implement this for the specific logo search */}
                        {/* {box.confidence && ( // If the confidence score is available, display it (only for specific logo detection)
                            <div className="text-base">
                                Confidence of:{' '}
                                {getConfidenceScore(box.confidence)}
                            </div>
                        )} */}
                    </div>
                ),
            )}
        </div>
    );
};

export default VideoResultDetails;
