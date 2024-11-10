const CustomButton = ({ onClick, buttonText, customStyle, type }) => {
  return (
    <button
      onClick={onClick && onClick}
      type={type && type}
      className={`text-sm md:text-lg w-full h-10 rounded-lg my-5 bg-[#532DF8] hover:bg-white border-2 border-[#532DF8] text-white hover:text-[#532DF8] ${customStyle}`}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;
