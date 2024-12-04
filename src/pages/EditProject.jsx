import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
// import { images } from '../constants';
import { useNavigate, useParams } from 'react-router-dom';
import CustomTable from '../components/Tables/CustomTable';
import { IoIosCloseCircle } from 'react-icons/io';
import toast from 'react-hot-toast';
import useStore from '../zustand/useStore';
import ImageUploaderActivity from '../components/Fields/ImageUploaderActivity';
import imageCompression from 'browser-image-compression';

const EditProject = () => {
  const navigate = useNavigate();
  const { orgid, projid } = useParams();
  const {
    isLoading,
    user,
    addActivityMaster,
    addActivityOrg,
    editedProject,
    fetcheditedProjectMaster,
    setLoading,
    EditActivityMaster,
    EditActivityOrg,
    DeleteActivityMaster,
    DeleteActivityOrg,
    EditProjectMaster,
    EditProjectOrg,
    fetcheditedProjectOrg,
  } = useStore();
  const [detailsModal, setDetailsModal] = useState(false);
  const [numbersModal, setNumbersModal] = useState(false);
  useEffect(() => {
    if (user.role === 'Master') {
      fetcheditedProjectMaster(orgid, projid);
    } else {
      fetcheditedProjectOrg(projid);
    }
  }, [fetcheditedProjectMaster, fetcheditedProjectOrg, orgid, projid, user]);
  const {
    register,
    formState: { errors },
    // setError,
    getValues,
    setValue,
    control,
    watch,
  } = useForm();
  const {
    fields: summary,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: 'summary',
  });
  const {
    fields: activities,
    append: appendActivity,
    remove: removeActivity,
    update: updateActivity,
  } = useFieldArray({
    control,
    name: 'activities',
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfUrlActivity, setPdfUrlActivity] = useState(null);
  useEffect(() => {
    if (!editedProject) return;
    const data = getValues();
    setValue('name', editedProject?.name || '');
    setValue('address', editedProject?.address || '');
    setValue('start_At', editedProject?.start_At || '');
    setValue('end_At', editedProject?.end_At || '');
    setValue('benefitDir', editedProject?.benefitDir || '');
    setValue('benefitUnd', editedProject?.benefitUnd || '');
    setValue('videoURL', editedProject?.videoURL || '');
    setPdfUrl(editedProject.pdfURL);
    if (data?.summary?.length === 0) {
      editedProject?.summary?.forEach((item, index) => {
        append({ text: item.text, type: item.type });
      });
    }

    if (data?.activities?.length === 0 || data.newItemTrigger) {
      setValue('activities', []);
      editedProject?.activities?.forEach((item) => {
        appendActivity({
          text: item.text,
          type: item.type,
          videoUrl: item.videoUrl,
          pdf: item.pdf,
          videoImg: item.videoImg,
          images: item.images,
          pdfTest: item.pdf,
          backId: item.id,
          rate:item?.rate
        });
      });
      setValue('newItemTrigger', false);
      setValue('LogoImage', editedProject?.logo);
      setValue('videoLogo', editedProject?.videoLogo);
      let imar = editedProject?.images?.map((item) => item.image);
      setValue('Images', imar);
    }
    // eslint-disable-next-line
  }, [editedProject]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfUrl(URL.createObjectURL(file));
    }
  };
  const handleFileChangeActivity = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfUrlActivity(URL.createObjectURL(file));
      setValue('pdfTest', file);
    }
  };
  const handleSubmit = async (e) => {
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    setLoading(true);
    e.preventDefault();

    const data = getValues();
    const formData = new FormData();

    const appendFile = async (key, file, index = null) => {
      if (typeof file === 'string') {
        return;
      }
      if (file?.type?.match(/image\/(jpeg|jpg|png|gif)/)) {
        if (file.size > 800 * 1024) {
          toast.success('يتم الآن ضغط الصور');
          const compressedFile = await imageCompression(file, compressionOptions);
          formData.append(index !== null ? `${key}[${index}]` : key, compressedFile);
        } else {
          formData.append(index !== null ? `${key}[${index}]` : key, file);
        }
      } else if (file?.type?.match(/application\/pdf/)) {
        formData.append(index !== null ? `${key}[${index}]` : key, file);
      } else {
        toast.error('صيغة الملف غير مدعومة');
      }
    };

    if (data?.LogoImage?.length > 0) {
      await appendFile('logo', data.LogoImage[0]);
    }

    if (data?.videoLogo?.length > 0) {
      await appendFile('videoLogo', data.videoLogo[0]);
    }

    if (data?.Images?.length > 0) {
      toast.success('يتم الآن ضغط الصور');
      const imageArray = Array.isArray(data.Images) ? data.Images : Array.from(data.Images);
      for (const [index, file] of imageArray.entries()) {
        await appendFile('images', file, index);
      }
    }

    if (data?.Pdffile?.length > 0) {
      await appendFile('pdfURL', data.Pdffile[0]);
    }

    data.summary.forEach((details, index) => {
      formData.append(`summaries[${index}][text]`, details.text);
      formData.append(`summaries[${index}][type]`, details.type);
    });
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('start_At', data.start_At);
    formData.append('end_At', data.end_At);
    formData.append('benefitDir', data.benefitDir);
    formData.append('benefitUnd', data.benefitUnd);
    formData.append('videoURL', data.videoURL);

    try {
      if (user?.role === 'Master') {
        await EditProjectMaster(formData, orgid, projid);
      } else {
        await EditProjectOrg(formData, projid);
      }
      toast.success('تم تعديل مشروع جديد بنجاح');
      navigate(`/rasheed/organizations/${orgid}`);
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  const addDetails = () => {
    const data = getValues();
    if (!data.DetailsCustom || !data.DetailsDescription) {
      return toast.error('املأ كافة الحقول');
    }
    data.editedId === ''
      ? append({
          type: data.DetailsCustom,
          text: data.DetailsDescription,
        })
      : update(data.editedId, {
          type: data.DetailsCustom,
          text: data.DetailsDescription,
        });
    setValue('DetailsCustom', '');
    setValue('DetailsDescription', '');
    setValue('editedId', '');
    setDetailsModal(false);
  };
  const addNumbers = async () => {
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const data = getValues();
    if (!data.number || !data.type) {
      return toast.error('املأ عنوان النشاط ووصفه');
    }
    setLoading(true);
    if (data.numberId === '') {
      appendActivity({
        text: data.number,
        type: data.type,
        videoUrl: data.activity_video,
        pdf: data.activity_pdf,
        videoImg: data.activity_video_image,
        images: data.ImagesActivity,
        pdfTest: data.pdfTest,
      });

      const formData2 = new FormData();
      formData2.append(`text`, data?.number);
      formData2.append(`type`, data?.type);
      formData2.append(`videoUrl`, data?.activity_video);
      if (data?.activity_video_image) {
        const logoFile = data.activity_video_image;
        if (logoFile instanceof HTMLImageElement) {
          formData2.append('videoImg', []);
        } else if (typeof logoFile === 'string') {
          formData2.append('videoImg', []);
        }
        if (logoFile.type.match(/image\/(jpeg|jpg|png|gif)/)) {
          if (logoFile.size > 400 * 1024) {
            toast.success('يتم الآن ضغط صورة الغلاف للنشاط');
            const compressedLogo = await imageCompression(logoFile, compressionOptions);
            formData2.append('videoImg', compressedLogo);
          } else {
            formData2.append('videoImg', logoFile);
          }
        } else {
          toast.error('يجب ان يكون نوع الصورة من هذه الأنواع فقط  jpeg, jpg, png, gif');
        }
      }

      if (data?.ImagesActivity && data?.ImagesActivity?.length > 0) {
        toast.success('يتم الآن ضغط صور النشاط');
        for (const [sec, file] of data?.ImagesActivity?.entries()) {
          if (typeof file === 'string') {
            return 0;
          } else if (file instanceof HTMLImageElement) {
            return 0;
          } else {
            if (file.size > 800 * 1024) {
              const compressedImage = await imageCompression(file, compressionOptions);
              formData2.append(`images[${sec}]`, compressedImage);
            } else {
              formData2.append(`images[${sec}]`, file);
            }
          }
        }
      }
      if (data?.pdfTest && typeof data.pdfTest !== 'string' && !(data.pdfTest instanceof HTMLImageElement)) {
        formData2.append(`pdf`, data.pdfTest);
      }
      setValue('newItemTrigger', true);
      if (user?.role === 'Master') {
        await addActivityMaster(formData2, projid);
        await fetcheditedProjectMaster(orgid, projid);
      } else {
        await addActivityOrg(formData2, projid);
        await fetcheditedProjectOrg(projid);
      }
    } else {
      updateActivity(data.numberId, {
        text: data.number,
        type: data.type,
        videoUrl: data.activity_video,
        pdf: data.activity_pdf,
        videoImg: data.activity_video_image,
        images: data.ImagesActivity,
        pdfTest: data.pdfTest,
        backId: data.backendActIdCary,
      });

      const formData2 = new FormData();
      formData2.append(`text`, data?.number);
      formData2.append(`type`, data?.type);
      formData2.append(`videoUrl`, data?.activity_video);
      if (data?.activity_video_image) {
        const logoFile = data.activity_video_image;
        if (logoFile instanceof HTMLImageElement) {
          formData2.append('videoImg', []);
        } else if (typeof logoFile === 'string') {
          formData2.append('videoImg', []);
        } else if (logoFile?.type?.match(/image\/(jpeg|jpg|png|gif)/)) {
          if (logoFile?.size > 400 * 1024) {
            toast.success('يتم الآن ضغط صورة الغلاف للنشاط');
            const compressedLogo = await imageCompression(logoFile, compressionOptions);
            formData2.append('videoImg', compressedLogo);
          } else {
            formData2.append('videoImg', logoFile);
          }
        } else {
          toast.error('يجب ان يكون نوع الصورة من هذه الأنواع فقط  jpeg, jpg, png, gif');
        }
      }

      if (data?.ImagesActivity && data?.ImagesActivity?.length > 0) {
        toast.success('يتم الآن ضغط صور النشاط');
        for (const [sec, file] of data?.ImagesActivity?.entries()) {
          if (typeof file === 'string') {
            return 0;
          } else if (file instanceof HTMLImageElement) {
            return 0;
          } else {
            if (file?.size > 400 * 1024) {
              const compressedImage = await imageCompression(file, compressionOptions);
              formData2.append(`images[${sec}]`, compressedImage);
            } else {
              formData2.append(`images[${sec}]`, file);
            }
          }
        }
      }
      if (data?.pdfTest && typeof data.pdfTest !== 'string' && !(data.pdfTest instanceof HTMLImageElement)) {
        formData2.append(`pdf`, data.pdfTest);
      }
      if (user?.role === 'Master') {
        await EditActivityMaster(formData2, data.backendActIdCary);
        await fetcheditedProjectMaster(orgid, projid);
      } else {
        await EditActivityOrg(formData2, data.backendActIdCary);
        await fetcheditedProjectOrg(projid);
      }
    }
    setValue('type', '');
    setValue('number', '');
    setValue('activity_video', '');
    setValue('numberId', '');
    setValue('activity_pdf', '');
    setValue('activity_video_image', '');
    setValue('ImagesActivity', '');
    setValue('pdfTest', '');
    setValue('backendActIdCary', '');
    setPdfUrlActivity(null);
    setNumbersModal(false);
  };
  const editDetail = (id, detail, desc) => {
    setValue('DetailsCustom', desc);
    setValue('DetailsDescription', detail);
    setValue('editedId', id);
    setDetailsModal(true);
  };
  const editActivity = (id, detail, desc, videoUrl, pdf, videoImg, images, pdfTest, backId) => {
    setValue('type', desc);
    setValue('number', detail);
    setValue('numberId', id);
    setValue('activity_video', videoUrl);
    setValue('activity_pdf', pdf);
    setValue('activity_video_image', videoImg);
    setValue('ImagesActivity', images);
    setValue('pdfTest', pdfTest);
    setValue('backendActIdCary', backId);
    if (pdfTest) {
      if (typeof pdfTest === 'string') {
        setPdfUrlActivity(pdfTest);
      } else if (pdfTest instanceof HTMLImageElement) {
        setPdfUrlActivity(pdfTest);
      } else {
        setPdfUrlActivity(URL.createObjectURL(pdfTest));
      }
    } else {
      setPdfUrlActivity(null);
    }
    setNumbersModal(true);
  };
  const addDetailModal = () => {
    setValue('editedId', '');
    setDetailsModal(true);
  };
  const addActivityModal = () => {
    setValue('numberId', '');
    setValue('type', '');
    setValue('number', '');
    setValue('activity_video', '');
    setValue('activity_pdf', '');
    setValue('activity_video_image', '');
    setValue('ImagesActivity', '');
    setValue('pdfTest', '');
    setPdfUrlActivity(null);
    setNumbersModal(true);
  };

  const handleRemoveActivity = async (id, backid) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm('هل أنت متأكد من حذف النشاط ؟');
    if (!result) return;
    removeActivity(id);
    if (user.role === 'Master') {
      await DeleteActivityMaster(backid);
      toast.success('تم حذف النشاط بنجاح');
    } else {
      await DeleteActivityOrg(backid);
      toast.success('تم حذف النشاط بنجاح');
    }
  };
  return (
    <div className="w-full h-full relative flex justify-center items-center pt-8 md:pt-32">
      <div className="w-full flex flex-col justify-center items-center">
        {/* <img className="w-64" src={images.loginLogo} alt="لوغو" /> */}
        <p className="w-[80%] rounded-lg text-center text-sm md:text-xl text-white font-bold py-2 bg-[#0D0F2D] bg-opacity-25 my-10">
          تعديل المشروع
        </p>
        <form onSubmit={handleSubmit} className="p-8 w-full md:w-[80%] bg-[#0D0F2D] bg-opacity-5 rounded-lg">
          <div className="flex flex-col-reverse md:flex-row  items-center justify-between ">
            <InputField
              register={register('address')}
              headerText="العنوان"
              placeholder="العنوان"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              register={register('name')}
              headerText="اسم المشروع"
              placeholder="ادخل هنا اسم المشروع"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between ">
            <InputField
              type="Date"
              register={register('end_At')}
              headerText="تاريخ نهاية المشروع"
              placeholder=""
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              type="Date"
              register={register('start_At')}
              headerText="تاريخ بدايةالمشروع"
              placeholder=""
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
            <InputField
              type="number"
              register={register('benefitUnd')}
              headerText="المستفيدين الغير مباشرين"
              placeholder="المستفيدين الغير مباشرين"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              type="number"
              register={register('benefitDir')}
              headerText="المستفيدين المباشرين"
              placeholder="المستفيدين المباشرين"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <InputField
            register={register('videoURL')}
            headerText="اضافة رابط فيديو"
            placeholder="اضف رابط الفيديو"
            error={errors?.form}
            customStyleComponent="ml-0 md:mr-2"
            customStyleHeader="mr-2"
          />
          <div className="w-full flex flex-col justify-center items-center my-4">
            <label
              htmlFor="logo-video"
              className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
            >
              {'إضافة غلاف الفيديو'}
            </label>
            <input {...register('videoLogo')} id="logo-video" type="file" className="hidden" />
            {errors.videoLogo && <p>{errors.videoLogo.message}</p>}
            {watch('videoLogo') && watch('videoLogo').length > 0 && (
              <img
                className="w-64 h-32 object-cover rounded-lg my-5"
                src={
                  typeof watch('videoLogo') === 'string'
                    ? watch('videoLogo')
                    : watch('videoLogo') instanceof HTMLImageElement
                    ? watch('videoLogo')
                    : watch('videoLogo').length && URL.createObjectURL(watch('videoLogo')[0])
                }
                alt="logo"
              />
            )}
          </div>
          <div className="w-full flex justify-between items-center my-4">
            <button
              type="button"
              onClick={addDetailModal}
              className="p-2 bg-[#532DF8] rounded-lg text-sm md:text-md w-40 text-white border-2 border-[#532DF8] hover:bg-white hover:text-[#532DF8]"
            >
              إضافة وصف +
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">مواصفات المشروع</p>
          </div>
          {summary.length > 0 && <CustomTable data={summary} remove={remove} edit={editDetail} />}
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={addActivityModal}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة نشاط+
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">نشاطات المشروع</p>
          </div>
          {numbersModal && (
            <div className="top-0 left-0 bg-[#363333] rounded-lg w-full mb-5 h-full bg-opacity-90 p-5">
              <div className="top-[10%] left-4 md:left-[5%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[100%] md:w-[100%] rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setNumbersModal(false)} className="text-white hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة نشاط</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('type')}
                    headerText="عنوان النشاط"
                    placeholder="... تمارين بناء الثقة"
                    error={errors?.form}
                    isRequired={true}
                  />
                  <textarea
                    className="w-full outline-none min-h-60 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                    {...register('number')}
                    placeholder="... قام فريق عمل المشروع خلال شهر نوفمبر على تنفيذ ورشة عمل النهج"
                  />
                  <InputField
                    register={register('activity_video')}
                    headerText="رابط فيديو النشاط"
                    placeholder=""
                    error={errors?.form}
                  />
                  <ImageUploaderActivity
                    setValue={setValue}
                    errors={errors}
                    backendLogo=""
                    backendImages=""
                    getValues={getValues}
                  />
                  <div className="w-full flex flex-col justify-center items-center my-4">
                    <label
                      htmlFor="pdf-file-activity"
                      className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
                    >
                      {'إضافة ملف للنشاط'}
                    </label>
                    <input
                      {...register('activity_pdf', {
                        onChange: handleFileChangeActivity,
                      })}
                      id="pdf-file-activity"
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                    />
                    {errors.Pdffile && <p className="text-red-500">{errors.Pdffile.message}</p>}
                    {pdfUrlActivity && pdfUrlActivity !== 'no pdf' && (
                      <iframe src={pdfUrlActivity} className="my-6 w-full h-96 border rounded-lg" title="PDF Viewer" />
                    )}
                  </div>
                  <CustomButton buttonText="إضافة نشاط" type="button" loading={isLoading} onClick={addNumbers}/>
                </div>
              </div>
            </div>
          )}
          {activities.length > 0 && <CustomTable data={activities} remove={handleRemoveActivity} edit={editActivity} comment={true}/>}
          <div className="w-full flex flex-col justify-center items-center my-4">
            <label
              htmlFor="logo-image"
              className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
            >
              {watch('LogoImage') ? 'تعديل اللوغو ' : 'إضافة لوغو المنظمة'}
            </label>
            <input {...register('LogoImage')} id="logo-image" type="file" className="hidden" />
            {errors.LogoImage && <p>{errors.logo.message}</p>}
            {watch('LogoImage') && watch('LogoImage').length > 0 && (
              <img
                className="w-64 h-32 object-cover rounded-lg my-5"
                src={
                  typeof watch('LogoImage') === 'string'
                    ? watch('LogoImage')
                    : watch('LogoImage') instanceof HTMLImageElement
                    ? watch('LogoImage')
                    : watch('LogoImage').length && URL.createObjectURL(watch('LogoImage')[0])
                }
                alt="logo"
              />
            )}
          </div>

          <div className="w-full flex flex-col justify-center items-center my-4">
            <label
              htmlFor="pdf-file"
              className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
            >
              {watch('Pdffile') ? 'تعديل الملف ' : 'إضافة ملف'}
            </label>
            <input
              {...register('Pdffile', {
                onChange: handleFileChange,
              })}
              id="pdf-file"
              type="file"
              accept="application/pdf"
              className="hidden"
            />
            {errors.Pdffile && <p className="text-red-500">{errors.Pdffile.message}</p>}
            {pdfUrl && pdfUrl !== 'no pdf' && (
              <iframe src={pdfUrl} className="my-6 w-full h-96 border rounded-lg" title="PDF Viewer" />
            )}
          </div>

          <div className="w-full flex flex-col justify-center items-center mb-4">
            <label
              htmlFor="images"
              className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
            >
              إضافة صور
            </label>
            <input {...register('Images')} id="images" multiple type="file" className="hidden" />
            {watch('Images') && watch('Images').length > 0 && (
              <div className="flex flex-wrap gap-4 my-4">
                {Array.from(watch('Images')).map((file, index) => {
                  const src = typeof file === 'string' ? file : URL.createObjectURL(file);
                  return (
                    <img
                      key={index}
                      src={src}
                      alt={`image-${index}`}
                      className="w-64 h-32 object-cover rounded-lg"
                      onLoad={() => file instanceof File && URL.revokeObjectURL(src)}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <CustomButton type="submit" buttonText="تعديل" loading={isLoading} />

          {detailsModal && (
            <div className="fixed top-0 left-0 bg-[#181818] w-full h-full bg-opacity-90">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[90%] md:w-[50%] rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setDetailsModal(false)} className="text-white hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة وصف</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('DetailsCustom')}
                    headerText="عنوان الوصف"
                    placeholder="... الهدف والغايات"
                    error={errors?.form}
                    isRequired={true}
                  />
                  <textarea
                    className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                    {...register('DetailsDescription')}
                    placeholder="... زيادة التماسك الاجتماعي في ناحية"
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addDetails} />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProject;
