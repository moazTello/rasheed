import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    getValues,
  } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getValues();
    navigate('/rasheed/Organizations');
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-10 md:pt-20">
        <img className="w-64" src={images.loginLogo} alt="لوغو" />
        <p className="w-full text-center text-xl mt-5 text-white font-bold py-2 bg-primary">تسجيل الدخول</p>
        <form onSubmit={handleSubmit} className="p-8 w-full md:w-[80%] bg-slate-200 rounded-b-lg">
          <InputField
            register={register('userName')}
            headerText="اسم المستخدم"
            placeholder="ادخل هنا اسم المستخدم"
            error={errors?.form}
            isRequired={true}
          />
          <InputField
            type="password"
            register={register('password')}
            headerText="كلمة المرور"
            placeholder="ادخل هنا كلمة المرور"
            error={errors?.form}
            isRequired={true}
          />
          <CustomButton type="submit" buttonText="تسجيل الدخول" />
        </form>
      </div>
    </div>
  );
};

export default Login;
