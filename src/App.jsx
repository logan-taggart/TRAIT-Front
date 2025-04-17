import React, { useState } from 'react';
import DetectionOptions from './components/DetectionOptions';
import ResultDisplay from './components/ResultDisplay';
import VideoResultDisplay from './components/VideoResultDisplay';
import ImageUploadSection from './components/ImageUploadSection';
import Header from './components/Header';
import VideoUploadSection from './components/VideoUploadSection';
import './App.css';

function App() {
    const baseURL = 'http://127.0.0.1:5174';

    const [mainFile, setMainFile] = useState(null);
    const [mainVideo, setMainVideo] = useState(null);

    const [referenceFile, setReferenceFile] = useState(null);
    const [detectionMode, setDetectionMode] = useState('all');
    const [confidenceThreshold, setConfidenceThreshold] = useState(3);
    const [boundingBoxThreshold, setBoundingBoxThreshold] = useState(50);
    const [imageUrl, setImageUrl] = useState('None');
    const [resultMessage, setResultMessage] = useState('');
    const [boundingBoxInfo, setBoundingBoxInfo] = useState([]);
    const [processingMode, setProcessingMode] = useState('Image');
    const [videoData, setVideoData] = useState('None');

    // Default white
    const [selectedBBColor, setSelectedBBColor] = useState('#FFFFFF');

    const handleSubmit = async () => {
        if (
            (!mainFile || (detectionMode === 'specific' && !referenceFile)) &&
            processingMode === 'Image'
        ) {
            setResultMessage('Please upload the required images.');
            return;
        }
        if (
            (!mainVideo || (detectionMode === 'specific' && !referenceFile)) &&
            processingMode === 'Video'
        ) {
            setResultMessage(
                'Please upload the required video and reference image.',
            );
            return;
        }

        const formData = new FormData();
        if (processingMode === 'Image') {
            formData.append('main_image', mainFile);
            if (detectionMode === 'specific') {
                formData.append('reference_image', referenceFile);
                formData.append('confidence', confidenceThreshold);
            }
        } else if (processingMode === 'Video') {
            formData.append('main_video', mainVideo);
            if (detectionMode === 'specific') {
                formData.append('reference_image', referenceFile); //reference image
                formData.append('confidence', confidenceThreshold);
            }
        }
        formData.append('bounding_box_threshold', boundingBoxThreshold);
        formData.append('bb_color', selectedBBColor);

        // Debugging: Log the FormData keys and values

        // Set to null and processing while the image is being processed
        setImageUrl('None');
        setResultMessage('Processing...');
        setBoundingBoxInfo([]);

        const endpoint =
            processingMode === 'Image'
                ? detectionMode === 'all'
                    ? '/image/detect-all'
                    : '/image/detect-specific'
                : detectionMode === 'all'
                ? '/video/detect-all'
                : '/video/detect-specific';
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
                console.log('Response data:', data);
                // Save the image url from the data object.
                if (processingMode === 'Image') {
                    setImageUrl(`data:image/jpeg;base64,${data.image}`);
                    // Save the bounding box information from the data object.
                    setBoundingBoxInfo(data.bounding_boxes);
                    setResultMessage('Processing completed successfully!');
                } else {
                    // Video processing
                    setVideoData(data);
                    setResultMessage('Processing completed successfully!');
                }
            } else {
                setResultMessage('Processing failed. Try again.');
            }
        } catch (error) {
            setResultMessage('Error processing the file.');
            console.error(error);
        }
    };

    if (processingMode === 'Video') {
        //if we are processing a video
        return (
            <div>
                <Header
                    setProcessingMode={setProcessingMode}
                    processingMode={processingMode}
                />
                <div className=" flex flex-col items-center justify-center text-white text-2xl">
                    {/* Main and reference video upload */}
                    <VideoUploadSection
                        mainVideo={mainVideo}
                        setMainVideo={setMainVideo}
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

                    <VideoResultDisplay
                        resultMessage={resultMessage}
                        videoData={videoData}
                        boundingBoxInfo={boundingBoxInfo}
                    />
                </div>
            </div>
        );
    }

    // Render what we need for the image processing
    if (processingMode === 'Image') {
        // We can probably make this its own component eventually...
        return (
            <div className="">
                <Header
                    setProcessingMode={setProcessingMode}
                    processingMode={processingMode}
                />

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
}

export default App;
