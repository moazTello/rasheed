import React, { useRef } from 'react';

const NewDropzone = ({ setValue, content, customR, customW, customH, customE, customRev, imageState, differenter }) => {
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setValue('image', event.dataTransfer.files);
    differenter && imageState(URL.createObjectURL(event?.dataTransfer?.files[0]));
    customE(!customRev);
  };

  return (
    <div
      className="dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: customW,
        height: customH,
        border: '1px dashed gray',
        borderRadius: customR,
        cursor: 'pointer',
      }}
    >
      <input
        type="file"
        onChange={(event) => {
          setValue('image', event.target.files);
          customE(!customRev);
          differenter && imageState(URL.createObjectURL(event?.target?.files[0]));
        }}
        hidden
        accept="image/png, image/jpeg"
        ref={inputRef}
      />
      <button
        onClick={() => inputRef.current.click()}
        style={{
          background: 'none',
          border: 'none',
          width: '100%',
          height: '100%',
        }}
      >
        {content}
      </button>
    </div>
  );
};

export default NewDropzone;
