import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/Tables/CustomTable';
import SkillsTable from '../components/Tables/SkillsTable';
import { IoIosCloseCircle } from 'react-icons/io';
import NumbersTable from '../components/Tables/NumbersTable';
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookSquare } from 'react-icons/fa';
import { LiaTelegram } from 'react-icons/lia';
import { FaXTwitter } from 'react-icons/fa6';
const AddOrganization = () => {
  const navigate = useNavigate();
  const [detailsModal, setDetailsModal] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [numbersModal, setNumbersModal] = useState(false);
  const [socialsModal, setSocialsModal] = useState(false);
  const {
    register,
    formState: { errors },
    // setError,
    getValues,
    setValue,
    control,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getValues();
    // navigate('/rasheed/Organizations');
    console.log(data)
  };
  const addDetails = () => {
    const data = getValues();
    data.editedId === ''
      ? append({
          detail: data.DetailsCustom,
        })
      : update(data.editedId, {
          detail: data.DetailsCustom,
        });
    setValue('DetailsCustom', '');
    setValue('editedId', '');
    setDetailsModal(false);
  };
  const addSkills = () => {
    const data = getValues();
    appendSkills({
      skill: data.SkillsCustom,
    });
    setValue('SkillsCustom', '');
    setSkillsModal(false);
  };
  const addNumbers = () => {
    const data = getValues();
    appendNumbers({
      numberDetails: data.numberDetails,
      number: data.number,
    });
    setValue('numberDetails', '');
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
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <img className="w-64" src={images.loginLogo} alt="لوغو" />
        <p className="w-full text-center text-xl mt-5 text-white font-bold py-2 bg-primary">إضافة منظمة</p>
        <form onSubmit={handleSubmit} className="p-8 w-full md:w-[80%] bg-slate-100 rounded-b-lg">
          <div className="flex flex-col-reverse md:flex-row  items-center justify-between ">
            <InputField
              type="number"
              register={register('Experiences')}
              headerText="سنوات الخبرة"
              placeholder="سنوات الخبرة"
              error={errors?.form}
              //   isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              register={register('OrgaName')}
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
              register={register('Address')}
              headerText="العنوان"
              placeholder="العنوان"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              type="number"
              register={register('Phone')}
              headerText="الجوال"
              placeholder="الجوال"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between ">
            <InputField
              type="Date"
              register={register('CreatedAt')}
              headerText="تاريخ التأسيس"
              placeholder=""
              error={errors?.form}
              isRequired={true}
              customStyleComponent="mr-0 md:mr-2"
              customStyleHeader="mr-2"
            />
            <InputField
              register={register('Email')}
              headerText="البريد الإلكتروني"
              placeholder="البريد الإلكتروني"
              error={errors?.form}
              isRequired={true}
              customStyleComponent="ml-0 md:ml-2"
              customStyleHeader="mr-2"
              type="email"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full items-center justify-between ">
            <div className="flex flex-col items-end w-full mr-0 md:mr-2">
              <p className="text-right pr-1 text-primary text-sm md:text-lg my-2">الرسالة</p>
              <textarea
                required
                className="w-full outline-none min-h-40 resize-none rounded-lg border-2 border-primary text-right p-2 text-primary text-sm md:text-lg"
                {...register('Message')}
                placeholder="الارتقاء بالمجتمع المدني زراعياً واقتصادياً وعلمياً وثقافياً وإعادة الاعمار والمساهمة في تطوير الحياة الاجتماعية والارتقاء بواقع المرأة ومشاركتها في جميع المجالات وحماية ودعم الطفولة ومنع استغلالها ضمن المجتمع المحلي ومخيمات النازحين"
              />
            </div>
            <div className="flex flex-col items-end w-full ml-0 md:ml-2">
              <p className="text-right pr-1 text-primary text-sm md:text-lg my-2">الرؤية</p>
              <textarea
                required
                className="w-full outline-none min-h-40 resize-none rounded-lg border-2 border-primary text-right p-2 text-primary text-sm md:text-lg"
                {...register('View')}
                placeholder="الوصول إلى مجتمع مدني ينعم بالسلام والاستقرار والارتقاء به للتعايش مع المجتمعات الاخرى ومواكبة التطورات بشكل إيجابي وفعّال ورفع قدرات المرأة وتعزيز دورها بالمجتمع"
              />
            </div>
          </div>
          <p className="text-right pr-1 text-primary text-sm md:text-lg my-4">سمة المنظمة</p>
          <textarea
            required
            className="w-full outline-none min-h-40 resize-none rounded-lg border-2 border-primary text-right p-2 text-primary text-sm md:text-lg"
            {...register('Details_1')}
            placeholder="... منظمة ****** منظمة مجتمع مدني غير حكومية غير ربحية"
          />
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={addDetailModal}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة وصف +
            </button>
            <p className="text-right pr-1 text-primary text-sm md:text-lg my-4">وصف المنظمة</p>
          </div>
          {details.length > 0 && <CustomTable data={details} remove={remove} edit={editDetail} />}
          <div className="w-full flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => setSkillsModal(true)}
              className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
            >
              إضافة ميزة +
            </button>
            <p className="text-right pr-1 text-primary text-sm md:text-lg my-4">مميزات المنظمة</p>
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
            <p className="text-right pr-1 text-primary text-sm md:text-lg my-4">المنظمة بالأرقام</p>
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
            <p className="text-right pr-1 text-primary text-sm md:text-lg my-4">التواصل الاجتمااعي</p>
          </div>
          <CustomButton type="submit" buttonText="إضافة" />
          {detailsModal && (
            <div className="fixed top-0 left-0 bg-primary w-full h-full bg-opacity-50">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-white w-[90%] md:w-[50%] h-80 rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button
                    type="button"
                    onClick={() => setDetailsModal(false)}
                    className="text-primary hover:text-black"
                  >
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-primary font-bold">إضافة وصف</p>
                </div>
                <div className="w-full px-5">
                  <textarea
                    className="w-full outline-none min-h-40 resize-none rounded-lg border-2 border-primary text-right p-2 text-primary text-sm md:text-lg"
                    {...register('DetailsCustom')}
                    placeholder="تمارس نشاطها تعمل بقطاعات الزراعة والخدمات والتعليم وسبل العيش والتماسك المجتمعي والقضايا التي تهم المرأة وتعمل كذلك على تمكين الشباب كما تعمل منظمة إنماء الفرات على ترسيخ قيم مبادئ الديمقراطية وتعمل جاهدة لبناء مجتمع مدني قادر على تحمل المسؤوليات في المستقبل "
                  />
                  <CustomButton buttonText="إضافة" type="button" onClick={addDetails} />
                </div>
              </div>
            </div>
          )}
          {skillsModal && (
            <div className="fixed top-0 left-0 bg-primary w-full h-full bg-opacity-50">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-white w-[90%] md:w-[50%] h-80 rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button type="button" onClick={() => setSkillsModal(false)} className="text-primary hover:text-black">
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-primary font-bold">إضافة ميزة</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('SkillsCustom')}
                    headerText="الميزة"
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
            <div className="fixed top-0 left-0 bg-primary w-full h-full bg-opacity-50">
              <div className="fixed top-[25%] left-4 md:left-[25%] bg-white w-[90%] md:w-[50%] rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button
                    type="button"
                    onClick={() => setNumbersModal(false)}
                    className="text-primary hover:text-black"
                  >
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-primary font-bold">إضافة رقم</p>
                </div>
                <div className="w-full px-5">
                  <InputField
                    register={register('numberDetails')}
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
            <div className="fixed top-0 left-0 bg-primary w-full h-full bg-opacity-50">
              <div className="fixed top-10 md:top-[16%] left-4 md:left-[25%] bg-white w-[90%] md:w-[50%] rounded-lg">
                <div className="w-full flex justify-between p-5">
                  <button
                    type="button"
                    onClick={() => setSocialsModal(false)}
                    className="text-primary hover:text-black"
                  >
                    <IoIosCloseCircle size={28} />
                  </button>
                  <p className="text-right text-sm md:text-lg text-primary font-bold">إضافة تواصل</p>
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
