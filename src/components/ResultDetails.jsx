import React from 'react'

const ResultDetails = ({ boundingBoxInfo }) => {
    if (boundingBoxInfo.length === 0) {
        return null
    }

    const confidenceScores = { 2: 'Low', 3: 'Medium', 4: 'High' }

    console.log(boundingBoxInfo)
    // Show all of the logos with bounding boxes cropped
    return (
        <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center mb-4">
            {boundingBoxInfo.map(
                (
                    box,
                    index, // Mapping through the bounding box info, displaying each cropped logo
                ) => (
                    <div key={index} className="flex items-center gap-4">
                        <img
                            src={`data:image/jpeg;base64,${box.cropped_logo}`}
                            alt="Cropped Image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                        <div className="text-base">
                            {/* Text of how much of the image is taken by the logo */}
                            This logo takes {box.box_coverage_percentage}% of
                            the main image.
                        </div>

                        {box.confidence && ( // If the confidence score is available, display it (only for specific logo detection)
                            <div className="text-base">
                                Confidence of:{' '}
                                {confidenceScores[box.confidence]}
                            </div>
                        )}
                    </div>
                ),
            )}
        </div>
    )
}

export default ResultDetails
