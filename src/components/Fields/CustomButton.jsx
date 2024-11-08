const CustomButton = ({ onClick, buttonText, customStyle, type }) => {
  return (
    <button
      onClick={onClick && onClick}
      type={type && type}
      className={`text-sm md:text-lg w-full h-10 rounded-lg my-5 bg-[#3E8AA9] hover:bg-white border-2 border-[#3E8AA9] text-white hover:text-[#3E8AA9] ${customStyle}`}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
