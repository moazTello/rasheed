import React, { useRef } from 'react';
import Cropper from './Cropper';

const Profile = ({ image, setValue, setModalOpen, modalOpen, radius, ASPECT_RATIO, circularCrop }) => {
  const avatarUrl = useRef('https://avatarfiles.alphacoders.com/161/161002.jpg');

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    const fileList = [imgSrc];
    setValue('image', fileList);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {image ? (
          <img
            src={!image?.src && image[0] ? URL.createObjectURL(image[0]) : image?.src}
            alt="Avatar"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: radius,
              border: '2px solid #aaa',
            }}
          />
        ) : (
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '999px',
              border: '2px solid #aaa',
              background: '#ddd',
            }}
          ></div>
        )}
        <button
          style={{
            position: 'absolute',
            bottom: '-1.15rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
          }}
          onClick={() => setModalOpen(!modalOpen)}
        >
          ✎
        </button>
      </div>
      {modalOpen && (
        <div className="modal">
          <Cropper
            updateAvatar={updateAvatar}
            closeModal={setModalOpen}
            image={image}
            setValue={setValue}
            ASPECT_RATIO={ASPECT_RATIO}
            circularCrop={circularCrop}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
