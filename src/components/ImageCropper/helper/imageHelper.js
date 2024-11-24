import { centerCrop, makeAspectCrop } from 'react-image-crop';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const convertToBlob = (dataUrl) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('Failed to convert data URL to Blob'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', dataUrl);
    xhr.send();
  });
};

export const ImageReader = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';

      imageElement.crossOrigin = 'anonymous';

      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          return reject('Image must be at least 150 x 150 pixels.');
        }
      });
      resolve(imageUrl);
    });
    reader.readAsDataURL(file);
  });
};

export const cropImage = (e) => {
  const { width, height } = e.currentTarget;
  const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

  const crop = makeAspectCrop(
    {
      unit: '%',
      width: cropWidthInPercent,
    },
    ASPECT_RATIO,
    width,
    height,
  );
  return centerCrop(crop, width, height);
};

export const setCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();
};

export const setCircleCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;
  const circularDiameter = Math.min(cropWidth, cropHeight);
  const radius = circularDiameter / 2;
  canvas.width = Math.floor(circularDiameter * pixelRatio);
  canvas.height = Math.floor(circularDiameter * pixelRatio);
  const circularCenterX = canvas.width / 4;
  const circularCenterY = canvas.height / 4;
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.beginPath();
  ctx.arc(circularCenterX, circularCenterY, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
};
