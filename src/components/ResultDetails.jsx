import React from 'react';

const ResultDetails = ({ boundingBoxInfo }) => {
    if (boundingBoxInfo.length === 0) {
        return null;
    }

    const confidenceScores = { 2: 'Low', 3: 'Medium', 4: 'High' };
    const getConfidenceScore = (confidence) => {
        if (confidence >= 4) {
            return 'High';
        }
        return confidenceScores[confidence];
    };

    console.log(boundingBoxInfo);

    return (
        <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-6 rounded-box">
            <legend className="fieldset-legend">Detected Logo Metrics</legend>
            <div className="flex flex-col gap-6 mt-4">
                {boundingBoxInfo.map((box, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <img
                            src={`data:image/jpeg;base64,${box.cropped_logo}`}
                            alt="Cropped Logo"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                            className="rounded-md"
                        />
                        <div className="text-base">
                            This logo takes {box.box_coverage_percentage}% of
                            the main image.
                        </div>

                        {box.confidence && ( // If the confidence score is available, display it (only for specific logo detection)
                            <div className="text-base">
                                Confidence: {getConfidenceScore(box.confidence)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default ResultDetails;
