import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/DataTransfer';
import toast from 'react-hot-toast';
import useStore from '../zustand/useStore';
const Profile = () => {
  const { user, token } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
  }, [user, setValue]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = getValues();
    if (data.password !== data.password_confirmation) {
      return toast.error('كلمة المرور غير مترابطة');
    }
    setLoading(true);
    try {
      await axiosPrivate.post(
        '/api/masterAdmin/updateMyProfile',
        {
          name: data.name,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      sessionStorage.setItem('accessT', null);
      sessionStorage.setItem('user', null);
      setLoading(false);
      toast.success('تم تعديل الآدمن الرئيسي بنجاح');
      navigate('/rasheed');
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('الاسم أو كلمة المرور غير مقبولة');
    }
  };
  return (
    <div className="w-full py-8 md:py-28 h-fit bg-opacity-90 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-0 md:pt-0">
        <img className="w-40 md:w-60 rounded-3xl" src={images.loginLogo} alt="لوغو" />
        <p className="w-[95%] md:w-[80%] text-center text-lg md:text-xl my-5 rounded-t-xl text-white font-bold py-2 bg-[#181818] bg-opacity-50">
          الملف الشخصي للآدمن الرئيسي
        </p>
        <form onSubmit={handleSubmit} className="p-8 w-[95%] md:w-[80%] bg-[#181818] bg-opacity-50 rounded-b-lg">
          <InputField
            type="email"
            register={register('email')}
            headerText="البريد الالكتروني (ثابت)"
            error={errors?.form}
            disable={true}
          />
          <InputField
            register={register('name')}
            headerText="الاسم"
            placeholder="ادخل هنا الاسم"
            error={errors?.form}
            isRequired={true}
          />
          <InputField
            type="password"
            register={register('password')}
            headerText="كلمة المرور"
            placeholder="ادخل هنا كلمة المرور"
            error={errors?.form}
          />
          <InputField
            type="password"
            register={register('password_confirmation')}
            headerText="تأكيد كلمة المرور"
            placeholder="ادخل هنا كلمة المرور"
            error={errors?.form}
          />
          <CustomButton type="submit" buttonText="تعديل" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
