import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import imageCompression from 'browser-image-compression';
// import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/Tables/CustomTable';
import SkillsTable from '../components/Tables/SkillsTable';
import { IoIosCloseCircle } from 'react-icons/io';
import NumbersTable from '../components/Tables/NumbersTable';
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookSquare } from 'react-icons/fa';
import { LiaTelegram } from 'react-icons/lia';
import { FaXTwitter } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import useStore from '../zustand/useStore';
import ImageUploader from '../components/Fields/ImageUploader';
const AddOrganization = () => {
  const navigate = useNavigate();
  const { addOrganization, Organizations, isLoading, setLoading } = useStore();
  const [detailsModal, setDetailsModal] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [numbersModal, setNumbersModal] = useState(false);
  const [socialsModal, setSocialsModal] = useState(false);
  useEffect(() => {
    if (Organizations.length > 8) {
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
    fields: details,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: 'details',
  });
  const {
    fields: numbers,
    append: appendNumbers,
    remove: removeNumbers,
  } = useFieldArray({
    control,
    name: 'numbers',
  });
  const {
    fields: skills,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: 'skills',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Organizations.length > 8) {
      return toast.error('لقد وصلت الى الحد الأقصى من المنظمات لا يمكنك إضافة منظمة جديدة');
    }
    const compressionOptions = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const data = getValues();
    if (data.password !== data.password_confirmation) {
      return toast.error('يرجى التأكد من كلمات المرور');
    }
    setLoading(true);
    const formData = new FormData();

    if (data?.LogoImage) {
      const logoFile = data.LogoImage;
      if (logoFile.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        if (logoFile.size > 400 * 1024) {
          toast.success('يتم الآن ضغط الصور');
          const compressedLogo = await imageCompression(logoFile, compressionOptions);
          formData.append('logo', compressedLogo);
        } else {
          formData.append('logo', logoFile);
        }
      } else {
        setLoading(false);
        return toast.error('يجب ان يكون نوع الصورة من هذه الأنواع فقط  jpeg, jpg, png, gif');
      }
    } else {
      setLoading(false);
      return toast.error('اللوغو مطلوب');
    }
    if (data?.Images && Array.isArray(data.Images)) {
      for (let i = 0; i < data.Images.length; i++) {
        const file = data.Images[i];
        if (file.size > 800 * 1024) {
          const compressedImage = await imageCompression(file, compressionOptions);
          formData.append(`images[${i}]`, compressedImage);
        } else {
          formData.append(`images[${i}]`, file);
        }
      }
    } else {
      setLoading(false);
      return toast.error('الصور مطلوبة');
    }

    const detailsAll = [{ text: data.Details_1 }, ...data.details];
    detailsAll.forEach((details, index) => {
      formData.append(`details[${index}][text]`, details.text);
    });
    const sendSkills = data.skills;
    sendSkills.forEach((skill, index) => {
      formData.append(`skils[${index}][text]`, skill.text);
    });
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('experience', data.experience);
    formData.append('password_confirmation', data.password_confirmation);
    formData.append('password', data.password);
    formData.append('view', data.view);
    formData.append('message', data.message);
    const sendNumbers = data.numbers;
    sendNumbers.forEach((number, index) => {
      formData.append(`number[${index}][type]`, number.type);
      formData.append(`number[${index}][number]`, number.number);
    });
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    const socialsAll = [
      {
        type: 'X',
        url: data.X ? data.X : null,
      },
      {
        type: 'facebook',
        url: data.facebook ? data.facebook : null,
      },
      {
        type: 'youtube',
        url: data.youtube ? data.youtube : null,
      },
      {
        type: 'whatsapp',
        url: data.whatsapp ? data.whatsapp : null,
      },
      {
        type: 'telegram',
        url: data.telegram ? data.telegram : null,
      },
      {
        type: 'instagram',
        url: data.instagram ? data.instagram : null,
      },
      {
        type: 'website',
        url: data.website ? data.website : null,
      },
    ];
    socialsAll.forEach((social, index) => {
      formData.append(`socials[${index}][type]`, social.type);
      formData.append(`socials[${index}][url]`, social.url);
    });
    try {
      await addOrganization(formData);
      toast.success('تم إضافة المنظمة الجديدة بنجاح');
      navigate('/rasheed/organizations');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('حدث خطأ ما');
    }
  };
  const addDetails = () => {
    const data = getValues();
    data.editedId === ''
      ? append({
          text: data.DetailsCustom,
        })
      : update(data.editedId, {
          text: data.DetailsCustom,
        });
    setValue('DetailsCustom', '');
    setValue('editedId', '');
    setDetailsModal(false);
  };
  const addSkills = () => {
    const data = getValues();
    appendSkills({
      text: data.SkillsCustom,
    });
    setValue('SkillsCustom', '');
    setSkillsModal(false);
  };
  const addNumbers = () => {
    const data = getValues();
    appendNumbers({
      type: data.type,
      number: data.number,
    });
    setValue('type', '');
    setValue('number', '');
    setNumbersModal(false);
  };
  const editDetail = (id, detail) => {
    setValue('DetailsCustom', detail);
    setValue('editedId', id);
    setDetailsModal(true);
  };
  const addDetailModal = () => {
    setValue('editedId', '');
    setDetailsModal(true);
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center pt-8 md:pt-32">
      <div className="w-full flex flex-col justify-center items-center">
        {/* <img className="w-64" src={images.loginLogo} alt="لوغو" /> */}
        <p className="w-[80%] rounded-lg text-center text-sm md:text-xl text-white font-bold py-2 bg-[#0D0F2D] bg-opacity-25 my-10">
          إضافة منظمة
        </p>
        <form onSubmit={handleSubmit} className="p-8 w-full md:w-[80%] bg-[#0D0F2D] bg-opacity-5 rounded-lg">
          <div className="flex flex-col-reverse md:flex-row  items-center justify-between ">
            <InputField
              type="number"
              register={register('experience')}
              headerText="سنوات الخبرة"
              placeholder="سنوات الخبرة"
              error={errors?.form}
              //   isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              register={register('name')}
              headerText="اسم المنظمة"
              placeholder="ادخل هنا اسم المنظمة"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
            <InputField
              register={register('password_confirmation')}
              headerText="تأكيد كلمة المرور"
              placeholder="تأكيد كلمة المرور"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              register={register('password')}
              headerText="كلمة المرور"
              placeholder="كلمة المرور"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
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
              type="number"
              register={register('phone')}
              headerText="الجوال"
              placeholder="الجوال"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between ">
            {/* <InputField
              type="Date"
              register={register('CreatedAt')}
              headerText="تاريخ التأسيس"
              placeholder=""
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            /> */}
            <InputField
              register={register('email')}
              headerText="البريد الإلكتروني (لايمكنك تغيير البريد لاحقاً)"
              placeholder="البريد الإلكتروني"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0"
              customStyleHeader="mr-2"
              type="email"
            />
          </div>
          <p className="text-right pr-1 text-white text-sm md:text-lg my-4">عن المنظمة</p>
          <textarea
            required
            className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
            {...register('Details_1')}
            placeholder="... منظمة ****** منظمة مجتمع مدني غير حكومية غير ربحية"
          />
          <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between ">
            <div className="flex flex-col items-end w-full mr-0 md:mr-2">
              <p className="text-right pr-1 text-white text-sm md:text-lg my-2">الرسالة</p>
              <textarea
                required
                className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                {...register('message')}
                placeholder="الارتقاء بالمجتمع المدني زراعياً واقتصادياً وعلمياً وثقافياً وإعادة الاعمار والمساهمة في تطوير الحياة الاجتماعية والارتقاء بواقع المرأة ومشاركتها في جميع المجالات وحماية ودعم الطفولة ومنع استغلالها "
              />
            </div>
            <div className="flex flex-col items-end w-full ml-0 md:ml-2">
              <p className="text-right pr-1 text-white text-sm md:text-lg my-2">الرؤية</p>
              <textarea
                required
                className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                {...register('view')}
                placeholder="الوصول إلى مجتمع مدني ينعم بالسلام والاستقرار والارتقاء به للتعايش مع المجتمعات الاخرى ومواكبة التطورات بشكل إيجابي وفعّال ورفع قدرات المرأة وتعزيز دورها بالمجتمع"
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center my-4">
            <button
              type="button"
              onClick={addDetailModal}
              className="p-2 bg-[#532DF8] rounded-lg text-sm md:text-md w-40 text-white border-2 border-[#532DF8] hover:bg-white hover:text-[#532DF8]"
            >
              إضافة وصف +
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">عن المنظمة</p>
          </div>
          {details.length > 0 && <CustomTable data={details} remove={remove} edit={editDetail} />}
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => setSkillsModal(true)}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة قيم +
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">قيم المنظمة</p>
          </div>
          {skills.length > 0 && <SkillsTable data={skills} remove={removeSkills} />}
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => setNumbersModal(true)}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة رقم +
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">المنظمة بالأرقام</p>
          </div>
          {numbers.length > 0 && <NumbersTable data={numbers} remove={removeNumbers} />}
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => setSocialsModal(true)}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة تواصل +
            </button>
            <p className="text-right pr-1 text-white text-sm md:text-lg my-4">التواصل الاجتمااعي</p>
          </div>
          <ImageUploader register={register} watch={watch} errors={errors} setValue={setValue} />
          <CustomButton type="submit" buttonText="إضافة" loading={isLoading} />
          {detailsModal && (
            <div className="fixed top-0 left-0 bg-[#181818] w-full h-full bg-opacity-90">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[90%] md:w-[50%] h-80 rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setDetailsModal(false)} className="text-white hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة وصف</p>
                </div>
                <div className="w-full px-5">
                  <textarea
                    className="w-full outline-none min-h-40 resize-none rounded-2xl bg-[#181818] bg-opacity-80 text-right p-5 text-white text-sm md:text-lg"
                    {...register('DetailsCustom')}
                    placeholder="تمارس نشاطها تعمل بقطاعات الزراعة والخدمات والتعليم وسبل العيش والتماسك المجتمعي والقضايا التي تهم المرأة وتعمل كذلك على تمكين الشباب كما تعمل منظمة إنماء الفرات على ترسيخ قيم مبادئ الديمقراطية وتعمل جاهدة لبناء مجتمع مدني قادر على تحمل المسؤوليات في المستقبل "
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addDetails} />
                </div>
              </div>
            </div>
          )}
          {skillsModal && (
            <div className="fixed top-0 left-0 bg-[#181818] w-full h-full bg-opacity-90">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[90%] md:w-[50%] h-80 rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setSkillsModal(false)} className="text-white hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة قيم</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('SkillsCustom')}
                    headerText="القيمة"
                    placeholder="المهنية والموضوعية"
                    error={errors?.form}
                    isRequired={true}
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addSkills} />
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
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة رقم</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('type')}
                    headerText="وصف الرقم"
                    placeholder="... المشاريع المكتملة، الأطفال المستفيدين"
                    error={errors?.form}
                    isRequired={true}
                  />
                  <InputField
                    register={register('number')}
                    headerText="الرقم"
                    placeholder="9333"
                    error={errors?.form}
                    isRequired={true}
                    type="number"
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addNumbers} />
                </div>
              </div>
            </div>
          )}
          {socialsModal && (
            <div className="fixed top-0 left-0 bg-[#181818] w-full h-full bg-opacity-90">
              <div className="fixed top-10 md:top-[16%] left-4 md:left-[25%] bg-gradient-to-r via-indigo-500 from-indigo-400 to-indigo-600 w-[90%] md:w-[50%] rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setSocialsModal(false)} className="text-white hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-white font-bold">إضافة تواصل</p>
                </div>
                <div className="w-full px-5">
                  <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
                    <InputField
                      register={register('facebook')}
                      customStyleHeader="mr-2"
                      placeholder="فيس بوك"
                      headerText={<FaFacebookSquare size={30} />}
                    />
                    <InputField
                      customStyleComponent="ml-2"
                      customStyleHeader="mr-2"
                      placeholder="X منصة "
                      register={register('X')}
                      headerText={<FaXTwitter size={30} />}
                    />
                  </div>
                  <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
                    <InputField
                      register={register('youtube')}
                      customStyleHeader="mr-2"
                      placeholder="يوتيوب"
                      headerText={<FaYoutube size={30} />}
                    />
                    <InputField
                      customStyleComponent="ml-2"
                      customStyleHeader="mr-2"
                      placeholder="انستاغرام"
                      register={register('instagram')}
                      headerText={<FaInstagram size={30} />}
                    />
                  </div>
                  <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
                    <InputField
                      register={register('whatsapp')}
                      headerText={<FaWhatsapp size={30} />}
                      placeholder="09XXXXXXXX"
                      customStyleHeader="mr-2"
                      type="number"
                    />
                    <InputField
                      register={register('telegram')}
                      customStyleComponent="ml-2"
                      headerText={<LiaTelegram size={30} />}
                      customStyleHeader="mr-2"
                      placeholder="09XXXXXXXX"
                      type="number"
                    />
                  </div>
                  <InputField
                    register={register('website')}
                    customStyleComponent="ml-2"
                    headerText="موقع المنظمة"
                    customStyleHeader="mr-2"
                    placeholder="www...."
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={() => setSocialsModal(false)} />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
