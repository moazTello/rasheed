import React, { useState } from 'react';
import NewDropzone from './NewDropzone';
import Profile from './Profile';

const ImageCropper = ({ watch, setValue, radius, ASPECT_RATIO, circularCrop }) => {
  const image = watch('image');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {!image ? (
        <NewDropzone
          setValue={setValue}
          customW="160px"
          customR={radius}
          customH="160px"
          customE={setModalOpen}
          customRev={modalOpen}
          differenter={false}
          content={
            <div style={{ textAlign: 'center', color: '#555' }}>
              <i style={{ fontSize: '80px' }} className="fa fa-cloud-upload"></i>
            </div>
          }
        />
      ) : (
        <Profile
          radius={radius}
          image={image}
          setValue={setValue}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          ASPECT_RATIO={ASPECT_RATIO}
          circularCrop={circularCrop}
        />
      )}
    </div>
  );
};

export default ImageCropper;
