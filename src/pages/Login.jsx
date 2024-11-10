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
    // setError,
    // getValues,
  } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = getValues();
    navigate('/rasheed/Organizations');
  };
  return (
    <div className="w-full h-[100vh] bg-opacity-90 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-0 md:pt-0">
        <img className="w-40 md:w-60 rounded-3xl" src={images.loginLogo} alt="لوغو" />
        <p className="w-[95%] md:w-[80%] text-center text-lg md:text-xl my-5 rounded-t-xl text-white font-bold py-2 bg-[#181818] bg-opacity-50">تسجيل الدخول</p>
        <form onSubmit={handleSubmit} className="p-8 w-[95%] md:w-[80%] bg-[#181818] bg-opacity-50 rounded-b-lg">
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
