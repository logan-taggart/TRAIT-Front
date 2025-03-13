import React from 'react';
import ConfidenceThresholdInput from './ConfidenceThresholdInput';

// Displays the Embedding Algorithm and Confidence Threshold options for specific detection mode
const DetectionSpecificOptions = ({ detectionMode,  confidenceThreshold, setConfidenceThreshold, }) => {

    return (
        <div>
            

            {/* The is the slider for the user to choose confidence threshold */}
            {detectionMode === "specific" && (
                <ConfidenceThresholdInput
                thresholdTitle="Confidence Threshold"
                confidenceThreshold={confidenceThreshold}
                setConfidenceThreshold={setConfidenceThreshold}
                tooltipDescription="Confidence Threshold determines how certain the model must be before detecting a logo."
            />
            )}

        </div>
    );
};

export default DetectionSpecificOptions;