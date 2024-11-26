import React, { useState, useEffect } from 'react';

const ImageUploaderActivity = ({ setValue, errors, backendLogo, backendImages, getValues }) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (backendLogo) {
      const logoImage = document.createElement('img');
      logoImage.src = backendLogo;
      setLogoPreview(backendLogo);
      setValue('activity_video_image', logoImage, { shouldValidate: true });
    }
    if (backendImages && backendImages.length > 0) {
      const images = backendImages.map((img) => {
        const imageElement = document.createElement('img');
        imageElement.src = img?.image;
        return imageElement;
      });
      setImagePreviews(backendImages.map((img) => img.image));
      setValue('ImagesActivity', images, { shouldValidate: true });
    }
  }, [backendLogo, backendImages, setValue]);

  useEffect(() => {
    const data = getValues();
    if (data.activity_video_image) {
      setLogoPreview(URL.createObjectURL(data.activity_video_image));
    }
    if (data?.ImagesActivity.length > 0) {
      const previews = data?.ImagesActivity?.map((file) => URL.createObjectURL(file));
      setImagePreviews([...previews]);
    }
  }, [setLogoPreview, getValues]);

  const handleLogoChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setLogoPreview(URL.createObjectURL(file));
      setValue('activity_video_image', file, { shouldValidate: true });
    }
  };

  // const handleImagesChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const previews = files.map((file) => URL.createObjectURL(file));
  //   setImagePreviews((prev) => [...prev, ...previews]);
  //   setValue('Images', files, { shouldValidate: true });
  // };

  const handleImagesChange2 = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...previews]);
    setValue('ImagesActivity', files, { shouldValidate: true });
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center mb-4">
        <label
          htmlFor="logo-image"
          className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
        >
          {logoPreview ? 'تعديل الغلاف' : 'إضافة غلاف الفيديو'}
        </label>
        <input id="logo-image" type="file" className="hidden" onChange={handleLogoChange} />
        {errors.LogoImage && <p>{errors.LogoImage.message}</p>}
        {logoPreview && <img className="my-6 h-32 rounded-lg" src={logoPreview} alt="logo" />}
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-4">
        {/* <label
          htmlFor="images"
          className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
        >
          إضافة صور
        </label>
        <input id="images" multiple type="file" className="hidden" onChange={handleImagesChange} /> */}
        <label
          htmlFor="images2"
          className="w-full py-4 rounded-lg my-5 text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
        >
          {imagePreviews ? 'إضافة صور للنشاط' : 'تعديل كافة الصور'}
        </label>
        <input id="images2" multiple type="file" className="hidden" onChange={handleImagesChange2} />
        {errors.Images && <p>{errors.Images.message}</p>}
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-4 my-4">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`image-${index}`} className="w-64 h-32 object-cover rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploaderActivity;
