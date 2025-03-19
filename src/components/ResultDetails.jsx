import React from "react";
const ResultDetails = ({boundingBoxInfo}) => {

    if(boundingBoxInfo.length === 0){
        return null;
    }
    
    // Show all of the logos with bounding boxes cropped
    console.log("Details bounding Box")
    console.log(boundingBoxInfo)
    return (
        <div className="w-l bg-base-200 border border-base-200 p-6 rounded-box justify-center">
            {boundingBoxInfo.map((box, index) => (
                <div key={index} className="flex items-center gap-4">
                    <img
                        src={`data:image/jpeg;base64,${box.cropped_logo}`}
                        alt="Cropped Image"
                    />
                    <div className="text-base">
                        This logo takes {box.box_coverage_percentage}% of the main image
                    </div>
                </div>
            ))}
        </div>
    );
    
};

export default ResultDetails;