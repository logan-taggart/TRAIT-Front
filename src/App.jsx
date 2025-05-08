import React, { useState } from 'react';
import DetectionOptions from './components/DetectionOptions';
import ResultDisplay from './components/ResultDisplay';
import VideoResultDisplay from './components/videoComponents/VideoResultDisplay';
import ImageUploadSection from './components/ImageUploadSection';
import Header from './components/Header';
import VideoUploadSection from './components/videoComponents/VideoUploadSection';
import './App.css';
import ProcessingButton from './components/ProcessingButton';

function App() {
    const baseURL = 'http://127.0.0.1:5174';

    const [mainFile, setMainFile] = useState(null);
    const [mainVideo, setMainVideo] = useState(null);

    const [referenceFile, setReferenceFile] = useState(null);
    const [detectionMode, setDetectionMode] = useState('all');
    const [confidenceThreshold, setConfidenceThreshold] = useState(3);
    const [boundingBoxThreshold, setBoundingBoxThreshold] = useState(25);
    const [imageUrl, setImageUrl] = useState('None');
    const [imageResultMessage, setImageResultMessage] = useState('');
    const [videoResultMessage, setVideoResultMessage] = useState('');
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
            setImageResultMessage('Please upload the required images.');
            return;
        }
        if (
            (!mainVideo || (detectionMode === 'specific' && !referenceFile)) &&
            processingMode === 'Video'
        ) {
            setVideoResultMessage(
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

        // Reset previous result state
        setImageUrl('None');
        setBoundingBoxInfo([]);
        if (processingMode === 'Image') {
            setImageResultMessage('Processing...');
        } else {
            setVideoResultMessage('Processing...');
        }

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
                console.log('Response data:', data);
                // Save the image url from the data object.
                if (processingMode === 'Image') {
                    setImageUrl(`data:image/jpeg;base64,${data.image}`);
                    setBoundingBoxInfo(data.bounding_boxes);
                    setImageResultMessage('Processing completed successfully!');
                } else {
                    setVideoData(data);
                    setBoundingBoxInfo(data.bounding_boxes);
                    setVideoResultMessage('Processing completed successfully!');
                }
            } else {
                if (processingMode === 'Image') {
                    setImageResultMessage('Processing failed. Try again.');
                } else {
                    setVideoResultMessage('Processing failed. Try again.');
                }
            }
        } catch (error) {
            console.error(error);
            if (processingMode === 'Image') {
                setImageResultMessage('Error processing the file.');
            } else {
                setVideoResultMessage('Error processing the file.');
            }
        }
    };

    const handleCancelProcessing = async () => {
        try {
            const response = await fetch(`${baseURL}/video/cancel`, {
                method: 'POST',
            });
            if (response.ok) {
                setVideoResultMessage('Processing canceled.');
            } else {
                setVideoResultMessage('Failed to cancel processing.');
            }
        } catch (error) {
            console.error(error);
            setVideoResultMessage('Error canceling processing.');
        }
    };

    if (processingMode === 'Video') {
        return (
            <div>
                <Header
                    setProcessingMode={setProcessingMode}
                    processingMode={processingMode}
                />
                <div className="flex flex-col items-center justify-center text-white text-2xl">
                    <VideoUploadSection
                        mainVideo={mainVideo}
                        setMainVideo={setMainVideo}
                        referenceFile={referenceFile}
                        setReferenceFile={setReferenceFile}
                        detectionMode={detectionMode}
                    />

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

                    <ProcessingButton
                        handleCancelProcessing={handleCancelProcessing}
                        handleSubmit={handleSubmit}
                        videoResultMessage={videoResultMessage}
                    />

                    <VideoResultDisplay
                        resultMessage={videoResultMessage}
                        videoData={videoData}
                        boundingBoxInfo={boundingBoxInfo}
                    />
                </div>
            </div>
        );
    }

    if (processingMode === 'Image') {
        return (
            <div>
                <Header
                    setProcessingMode={setProcessingMode}
                    processingMode={processingMode}
                />
                <div className="flex flex-col items-center justify-center text-white text-2xl">
                    <ImageUploadSection
                        mainFile={mainFile}
                        setMainFile={setMainFile}
                        referenceFile={referenceFile}
                        setReferenceFile={setReferenceFile}
                        detectionMode={detectionMode}
                    />

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

                    <button
                        className="mt-4 mb-4 btn btn-success btn-xl"
                        onClick={handleSubmit}
                    >
                        Submit for Detection
                    </button>

                    <ResultDisplay
                        resultMessage={imageResultMessage}
                        imageUrl={imageUrl}
                        boundingBoxInfo={boundingBoxInfo}
                    />
                </div>
            </div>
        );
    }
}

export default App;
