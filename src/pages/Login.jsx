import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/useStore';
import { axiosPrivate } from '../api/DataTransfer';
const Login = () => {
  const { isLoading, setToken } = useStore();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = getValues();
    try {
      const response = await axiosPrivate.post(
        '/api/masterAdmin/login'
        ,{email:data.userName,password:data.password}
      );
      setToken(response.data.token)
      sessionStorage.setItem("accessT",response.data.token)
      console.log(response);
      navigate('/rasheed/Organizations');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-opacity-90 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-0 md:pt-0">
        <img className="w-40 md:w-60 rounded-3xl" src={images.loginLogo} alt="لوغو" />
        <p className="w-[95%] md:w-[80%] text-center text-lg md:text-xl my-5 rounded-t-xl text-white font-bold py-2 bg-[#181818] bg-opacity-50">
          تسجيل الدخول
        </p>
        <form onSubmit={handleSubmit} className="p-8 w-[95%] md:w-[80%] bg-[#181818] bg-opacity-50 rounded-b-lg">
          <InputField
            type="email"
            register={register('userName')}
            headerText="البريد الالكتروني"
            placeholder="ادخل هنا البريد الالكتروني"
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
