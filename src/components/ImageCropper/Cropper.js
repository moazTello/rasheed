import React, { useRef, useState } from 'react';
import ReactCrop, { convertToPixelCrop } from 'react-image-crop';
import { convertToBlob, cropImage, setCanvasPreview, setCircleCanvasPreview } from './helper/imageHelper';

const Cropper = ({ closeModal, updateAvatar, image, setValue, ASPECT_RATIO, circularCrop }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(!image?.src ? URL.createObjectURL(image[0]) : '');

  const [crop, setCrop] = useState();

  const onImageLoad = (e) => {
    const centeredCrop = cropImage(e);
    setCrop(centeredCrop);
  };

  const cropAndSaveImage = async () => {
    if (circularCrop) {
      setCircleCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
    } else {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
    }
    const dataUrl = !image?.src ? previewCanvasRef.current.toDataURL() : previewCanvasRef.current;
    try {
      const blob = await convertToBlob(dataUrl);
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
      updateAvatar(file);
      closeModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {imgSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            circularCrop={circularCrop}
          >
            <img ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} />
          </ReactCrop>
          <button onClick={cropAndSaveImage} style={{ marginTop: '10px', padding: '5px 10px', border: '1px solid #333' }}>
            Crop Image
          </button>
        </div>
      )}
      <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Cropper;
