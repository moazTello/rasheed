import React from 'react';

const ReferralTracking = ({
  title,
  up,
  down,
  number,
  firstSideTitle,
  secondSideTitle,
  firstSideNumber = 0,
  secondSideNumber = 1,
}) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(firstSideNumber / secondSideNumber, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="bg-stone-900 p-6 m-5 bg-opacity-70 rounded-2xl h-full">
      <div className="flex flex-row-reverse justify-between items-center mb-10">
        <h2 className="text-white text-lg font-bold">{title}</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:mr-6 lg:mr-12 mb-4 md:mb-0">
          <div className="p-5 bg-gradient-to-br from-[#060C29] to-[#040C30] rounded-lg mb-5 min-w-[220px]">
            <p className="text-gray-400 text-sm mb-1 w-full text-right">{firstSideTitle}</p>
            <p className="text-white text-lg font-bold w-full text-right">{firstSideNumber}</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-[#060C29] to-[#040C30] rounded-lg min-w-[170px]">
            <p className="text-gray-400 text-sm mb-1 w-full text-right">{secondSideTitle}</p>
            <p className="text-white text-lg font-bold w-full text-right">{secondSideNumber}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-[200px] h-[200px]">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="100" cy="100" r={radius} stroke="#2D3748" strokeWidth="9" fill="none" />
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#4953EC"
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-gray-400 text-sm">{up}</p>
              <p className="text-white font-bold text-3xl lg:text-4xl">{number}</p>
              <p className="text-gray-400 text-sm">{down}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTracking;
