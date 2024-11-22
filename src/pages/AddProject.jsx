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
const AddProject = () => {
  const navigate = useNavigate();
  const { orgid } = useParams();
  const { addProjectMaster, Organizations, isLoading } = useStore();
  const [detailsModal, setDetailsModal] = useState(false);
  const [numbersModal, setNumbersModal] = useState(false);
  useEffect(() => {
    if (Organizations.length > 6) {
      toast.error('لقد وصلت الى الحد الأقصى من المنظمات لا يمكنك إضافة منظمة جديدة');
    }
  }, [Organizations]);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = getValues();
    const formData = new FormData();
    if (data?.LogoImage && data.LogoImage.length > 0) {
      const logoFile = data.LogoImage[0];
      if (logoFile.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        const formData = new FormData();
        formData.append('logo', logoFile);
      } else {
        return toast.error('يجب ان يكون نوع الصورة من هذه الأنواع فقط  jpeg, jpg, png, gif');
      }
    } else {
      return toast.error('الصورة مطلوبة');
    }
    const activitiesAll = data.activities;
    activitiesAll.forEach((details, index) => {
      formData.append(`activities[${index}][text]`, details.text);
      formData.append(`activities[${index}][type]`, details.type);
    });
    console.log(data.summary);
    const summaryAll = data.summary;
    summaryAll.forEach((details, index) => {
      formData.append(`summary[${index}][text]`, details.text);
      formData.append(`summary[${index}][type]`, details.type);
    });
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('start_At', data.start_At);
    formData.append('end_At', data.end_At);
    formData.append('benefitDir', data.benefitDir);
    formData.append('benefitUnd', data.benefitUnd);
    formData.append('videoURL', data.videoURL);
    formData.append('pdfURL', data.Pdffile[0]);
    try {
      await addProjectMaster(formData, orgid);
      navigate(`/rasheed/organizations/${orgid}`);
    } catch (error) {
      console.log(error);
      toast.error('حدث خطأ ما');
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
  const addNumbers = () => {
    const data = getValues();
    if (!data.number || !data.type) {
      return toast.error('املأ كافة الحقول');
    }
    data.numberId === ''
      ? appendActivity({
          text: data.number,
          type: data.type,
        })
      : updateActivity(data.numberId, {
          text: data.number,
          type: data.type,
        });
    setValue('type', '');
    setValue('number', '');
    setValue('numberId', '');
    setNumbersModal(false);
  };
  const editDetail = (id, detail, desc) => {
    setValue('DetailsCustom', desc);
    setValue('DetailsDescription', detail);
    setValue('editedId', id);
    setDetailsModal(true);
  };
  const editActivity = (id, detail, desc) => {
    setValue('type', desc);
    setValue('number', detail);
    setValue('numberId', id);
    setNumbersModal(true);
  };
  const addDetailModal = () => {
    setValue('editedId', '');
    setDetailsModal(true);
  };
  const addActivityModal = () => {
    setValue('numberId', '');
    setNumbersModal(true);
  };
  return (
    <div className="w-full h-full relative flex justify-center items-center pt-8 md:pt-32">
      <div className="w-full flex flex-col justify-center items-center">
        {/* <img className="w-64" src={images.loginLogo} alt="لوغو" /> */}
        <p className="w-[80%] rounded-lg text-center text-sm md:text-xl text-white font-bold py-2 bg-[#0D0F2D] bg-opacity-25 my-10">
          إضافة مشروع
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
          {activities.length > 0 && <CustomTable data={activities} remove={removeActivity} edit={editActivity} />}
          <div className="w-full flex flex-col justify-center items-center my-4">
            <label
              htmlFor="logo-image"
              className="w-full py-4 rounded-lg text-xs md:text-sm hover:bg-white hover:text-primary text-center text-white bg-primary cursor-pointer"
            >
              {watch('LogoImage') ? 'تعديل اللوغو ' : 'إضافة لوغو المنظمة'}
            </label>
            <input
              {...register('LogoImage', {
                required: 'Logo is required',
              })}
              id="logo-image"
              type="file"
              className="hidden"
            />
            {errors.LogoImage && <p>{errors.logo.message}</p>}
            {watch('LogoImage') && watch('LogoImage').length > 0 && (
              <img
                className="my-6 w-32 h-32"
                src={watch('LogoImage').length && URL.createObjectURL(watch('LogoImage')[0])}
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
                required: 'PDF file is required',
                onChange: handleFileChange,
              })}
              id="pdf-file"
              type="file"
              accept="application/pdf"
              className="hidden"
            />
            {errors.Pdffile && <p className="text-red-500">{errors.Pdffile.message}</p>}

            {pdfUrl && <iframe src={pdfUrl} className="my-6 w-full h-96 border rounded-lg" title="PDF Viewer" />}
          </div>
          <CustomButton type="submit" buttonText="إضافة" loading={isLoading} />
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
          {numbersModal && (
            <div className="fixed top-0 left-0 bg-[#181818] w-full h-full bg-opacity-90">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[90%] md:w-[50%] rounded-lg">
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
                    className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                    {...register('number')}
                    placeholder="... قام فريق عمل المشروع خلال شهر نوفمبر على تنفيذ ورشة عمل النهج"
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addNumbers} />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProject;
