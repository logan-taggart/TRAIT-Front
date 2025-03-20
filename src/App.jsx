import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import DetectionOptions from './components/DetectionOptions';
import ResultDisplay from './components/ResultDisplay';
import ImageUploadSection from './components/ImageUploadSection';
import Header from './components/Header';
import './App.css';

function App() {
    const baseURL =
        window.location.hostname === 'localhost'
            ? 'http://127.0.0.1:5174'
            : 'https://trademark-identification-back.onrender.com';

    const [mainFile, setMainFile] = useState(null);
    const [referenceFile, setReferenceFile] = useState(null);
    const [detectionMode, setDetectionMode] = useState('all');
    const [confidenceThreshold, setConfidenceThreshold] = useState(3);
    const [boundingBoxThreshold, setBoundingBoxThreshold] = useState(50);
    const [imageUrl, setImageUrl] = useState('None');
    const [resultMessage, setResultMessage] = useState('');
    const [boundingBoxInfo, setBoundingBoxInfo] = useState([]);

    // Default white
    const [selectedBBColor, setSelectedBBColor] = useState('#FFFFFF');

    const handleSubmit = async () => {
        if (!mainFile || (detectionMode === 'specific' && !referenceFile)) {
            setResultMessage('Please upload the required images.');
            return;
        }

        const formData = new FormData();
        formData.append('main_image', mainFile);
        if (detectionMode === 'specific') {
            formData.append('reference_image', referenceFile);
            formData.append('confidence', confidenceThreshold);
        }
        formData.append('bounding_box_threshold', boundingBoxThreshold);
        formData.append('bb_color', selectedBBColor);

        // Set to null and processing while the image is being processed
        setImageUrl('None');
        setResultMessage('Processing...');
        setBoundingBoxInfo([]);

        const endpoint =
            detectionMode === 'all'
                ? '/image/detect-all'
                : '/image/detect-specific';
        try {
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Now fetch a json object
                // Object contains the output image and bouding box information
                const data = await response.json();
                // console.log(data)
                // Save the image url from the data object.
                setImageUrl(`data:image/jpeg;base64,${data.image}`);
                // Save the bounding box information from the data object.
                setBoundingBoxInfo(data.bounding_boxes);
                setResultMessage('Processing completed successfully!');
            } else {
                setResultMessage('Processing failed. Try again.');
            }
        } catch (error) {
            setResultMessage('Error processing the image.');
            console.error(error);
        }
    };

    return (
        <div className="">
            <Header />

            <div className=" flex flex-col items-center justify-center text-white text-2xl">
                {/* Main and reference image upload */}
                <ImageUploadSection
                    mainFile={mainFile}
                    setMainFile={setMainFile}
                    referenceFile={referenceFile}
                    setReferenceFile={setReferenceFile}
                    detectionMode={detectionMode}
                />

                <div className="">
                    <DetectionOptions
                        detectionMode={detectionMode}
                        setDetectionMode={setDetectionMode}
                        setConfidenceThreshold={setConfidenceThreshold}
                        confidenceThreshold={confidenceThreshold}
                        setBoundingBoxThreshold={setBoundingBoxThreshold}
                        boundingBoxThreshold={boundingBoxThreshold}
                        setSelectedBBColor={setSelectedBBColor}
                        selectedBBColor={selectedBBColor}
                    />
                </div>

                <button
                    className="mt-4 mb-4 btn btn-success btn-xl"
                    onClick={handleSubmit}
                >
                    Submit for Detection
                </button>

                <ResultDisplay
                    resultMessage={resultMessage}
                    imageUrl={imageUrl}
                    boundingBoxInfo={boundingBoxInfo}
                />
            </div>
        </div>
    );
}

export default App;
