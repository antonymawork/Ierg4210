import { faFileUpload, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';


const DragDropFileUpload = ({ onFileSelect }) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // State to hold the preview URL

  const isValidFileType = (file) => {
    return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
  };

  const handleFileSelect = useCallback((file) => {
    console.log(file); // Add this inside handleFileSelect
    if (isValidFileType(file)) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url); // Update the preview URL
    } else {
      alert('Invalid file type. Only PNG, JPG, and JPEG are allowed.');
    }
  }, [isValidFileType, onFileSelect, setPreviewUrl]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Dropped file:", files[0]); // Debugging message
      handleFileSelect(files[0]);
    } else {
      console.log("No files dropped"); // Debugging message
    }
  },
  [handleFileSelect]
);


  const triggerFileInputClick = () => {
    document.getElementById('Image').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div
      className={`border-2 ${dragOver ? 'border-blue-500' : 'border-dashed border-gray-300'} p-4 rounded block cursor-pointer`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={triggerFileInputClick}
    >
      <input type="file" name="Image" id="Image" accept="image/png, image/jpg, image/jpeg" className="hidden" onChange={handleFileChange} />
      <div className="text-center">
        {previewUrl ? (
          <div className='item-center flex justify-center'>
            <div className="flex items-center justify-center">
              <Image src={previewUrl} alt="Preview" layout="responsive" width={50} height={50} style={{ maxWidth: '150px' }}/>
            </div>
          </div>
        ) : (
          <>
            <div><FontAwesomeIcon icon={faPhotoVideo} className='text-gray' /> Drag and drop file here</div>
            <p>or</p>
            <div className='transition hover:scale-105'><FontAwesomeIcon icon={faFileUpload} /> Browse</div>
          </>
        )}
      </div>
    </div>
  );
};

export default DragDropFileUpload;
