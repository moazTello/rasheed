import React, { useEffect } from 'react';
import useStore from '../zustand/useStore';
import ProblemssTable from '../components/Tables/ProblemsTable';
const Problems = () => {
  const { problems, isLoading, fetchProblemsList } = useStore();
  useEffect(() => {
    fetchProblemsList();
  }, [fetchProblemsList]);
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-between items-center p-4">
        <p className="text-right ml-10 text-white text-sm md:text-lg">{problems?.length}</p>
        <p className="w-full text-left ml-5 text-white text-sm md:text-lg">عدد الشكاوي</p>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل الشكاوي</p>
      </div>
      <div className="w-full p-2">
        {!problems.length > 0 && !isLoading ? (
          <p className="w-full text-center text-white text-sm md:text-lg">لا يوجد شكاوي</p>
        ) : (
          <ProblemssTable data={problems} />
        )}
      </div>
    </div>
  );
};

export default Problems;
