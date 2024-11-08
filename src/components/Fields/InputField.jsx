import React from 'react';

const InputField = ({
  value,
  onChange,
  headerText,
  placeholder,
  error,
  customStyleHeader,
  customStyleInput,
  customStyleComponent,
  register,
  isRequired,
  type
}) => {
  return (
    <div className={`w-full flex flex-col justify-center items-end my-4 ${customStyleComponent}`}>
      {headerText && (
        <p className={`text-[#3E8AA9] text-sm md:text-lg ${customStyleHeader}`}>
          {isRequired && <span className="text-red-500"> * </span>} {headerText} 
        </p>
      )}
      <input type={type && type} required={isRequired} placeholder={placeholder} className={`text-sm md:text-lg text-right p-1 w-full mt-2 outline-none border-2 rounded-lg border-[#3E8AA9] text-[#3E8AA9] pr-3 ${customStyleInput}`} {...register} />
      {error && <p className='text-sm text-red-500'>{error} error</p>}
    </div>
  );
};

export default InputField;
