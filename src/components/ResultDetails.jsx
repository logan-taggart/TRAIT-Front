import React from "react";
const ResultDetails = ({boundingBoxInfo}) => {

    // Show all of the logos with bounding boxes cropped
    console.log("Details bounding Box")
    console.log(boundingBoxInfo)
    return (
        <div className="w-full">
            {boundingBoxInfo.map((box, index) => (
                <div key={index} className="w-full h-full relative">
                    <img
                        src={`data:image/jpeg;base64,${box.cropped_logo}`}
                        alt="Cropped Image"
                        className="w-full h-full object-contain rounded-md"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                    <div>This logo takes {box.box_coverage_percentage}% of the main image</div>
                </div>
            ))}
        </div>
    );
};

export default ResultDetails;