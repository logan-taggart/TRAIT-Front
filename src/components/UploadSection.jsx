import React, { useState, useRef, useEffect } from 'react';

const UploadSection = ({ label, file, setFile, type = 'image' }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    // Define allowed MIME types based on section type
    const allowedTypesMap = {
        image: ['image/png', 'image/jpeg', 'image/jpg'],
        video: ['video/mp4'],
    };
    const allowedTypes = allowedTypesMap[type] || [];

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!allowedTypes.includes(selectedFile.type)) {
            setError(`Only ${type.toUpperCase()} files are allowed.`);
            setFile(null);
            setImagePreview(null);
            return;
        }

        // Clear error and set the file
        setError('');
        setFile(selectedFile);

        if (type === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImagePreview(null); // No preview for video
        }
    };

    // Update preview on prop change
    useEffect(() => {
        if (file && type === 'image') {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setImagePreview(null);
        }
    }, [file, type]);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-96 bg-base-100 border border-base-200 p-6 rounded-box">
            <div
                className={`border-4 border-dashed p-4 h-full rounded-md cursor-pointer ${
                    imagePreview ? 'border-transparent' : 'border-primary'
                }`}
                onClick={handleClick}
            >
                <div className="flex justify-center items-center h-full">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <span className="text-primary text-center w-full">
                            {file ? file.name : label}
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="mt-2 text-red-500 text-sm text-center">{error}</div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={type === 'image' ? 'image/*' : 'video/mp4'}
                hidden
            />
        </div>
    );
};

export default UploadSection;
