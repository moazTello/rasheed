import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../components/Fields/InputField';
import CustomButton from '../components/Fields/CustomButton';
import { images } from '../constants';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/useStore';
import { axiosPrivate } from '../api/DataTransfer';
import toast from 'react-hot-toast';

const Login = () => {
  const { setToken, setUser, setOrganizData } = useStore();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = type
        ? await axiosPrivate.post('/api/masterAdmin/login', {
            email: data.userName,
            password: data.password,
          })
        : await axiosPrivate.post('/api/organization/login', {
            email: data.userName,
            password: data.password,
          });

      setToken(response.data.token);
      const user = {
        email: response?.data?.response?.email,
        name: response?.data?.response?.name,
        role: type ? 'Master' : 'OrgAdmin',
      };
      setUser(user);
      sessionStorage.setItem('accessT', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('organization', JSON.stringify(response?.data?.response));
      setOrganizData(response?.data?.response);
      setLoading(false);
      if (type) {
        navigate('/rasheed/Organizations');
      } else {
        navigate(`/rasheed/organizations/${response?.data?.response?.id}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error('البريد أو كلمة المرور غير صحيحة');
    }
  };
  // info@fdo-org.org
  return (
    <div className="w-full h-[100vh] bg-opacity-90 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center pt-0 md:pt-0">
        <img className="w-40 md:w-60 rounded-3xl" src={images.loginLogo} alt="لوغو" />
        <p className="w-[95%] md:w-[80%] text-center text-lg md:text-xl my-5 rounded-t-xl text-white font-bold py-2 bg-[#181818] bg-opacity-50">
          تسجيل الدخول
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-[95%] md:w-[80%] bg-[#181818] bg-opacity-50 rounded-b-lg"
        >
          <InputField
            type="email"
            register={register('userName', { required: 'البريد الالكتروني مطلوب' })}
            headerText="البريد الالكتروني"
            placeholder="ادخل هنا البريد الالكتروني"
            error={errors?.userName?.message}
            isRequired={true}
          />
          <InputField
            type="password"
            register={register('password', { required: 'كلمة المرور مطلوبة' })}
            headerText="كلمة المرور"
            placeholder="ادخل هنا كلمة المرور"
            error={errors?.password?.message}
            isRequired={true}
          />
          <div className="w-full flex justify-end px-2 py-4">
            <p className="text-white px-5">هل انت الآدمن الرئيسي ؟</p>
            <input onChange={(e) => setType(e.target.checked)} type="checkbox" className="w-6 h-6" />
          </div>
          <CustomButton type="submit" buttonText="تسجيل الدخول" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Login;
