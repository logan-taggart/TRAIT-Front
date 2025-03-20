import React from 'react';
import UploadSection from './UploadSection';

// This is where the user will upload the main image and the reference logo

const ImageUploadSection = ({
    mainFile,
    setMainFile,
    referenceFile,
    setReferenceFile,
    detectionMode,
}) => {
    return (
        <div>
            <div className="mb-2 flex gap-4">
                <UploadSection
                    label="Upload Main Image"
                    file={mainFile}
                    setFile={setMainFile}
                />

                {detectionMode === 'specific' && (
                    <UploadSection
                        label="Upload Reference Logo"
                        file={referenceFile}
                        setFile={setReferenceFile}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageUploadSection;
