import React
, { useEffect } 
from 'react';
import useStore from '../zustand/useStore';
import OpenionsTable from '../components/Tables/OpenionsTable';
import { useParams } from 'react-router-dom';
const Openions = () => {
  const { openions, isLoading, fetchOpenions } = useStore();
  const {projid} = useParams();
  useEffect(() => {
    fetchOpenions(projid)
  }, [fetchOpenions, projid]);
  useEffect(() => {
    sessionStorage.setItem("openions",JSON.stringify(openions))
  },[openions])
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-between items-center p-4">
        <p className="text-right ml-10 text-white text-sm md:text-lg">{openions?.length}</p>
        <p className="w-full text-left ml-5 text-white text-sm md:text-lg">عدد الاستطلاعات</p>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل الاستطلاعات</p>
      </div>
      <div className="w-full p-2">
      {!openions?.length > 0  && !isLoading ? <p className="w-full text-center text-white text-sm md:text-lg">لا يوجد إستطلاعات</p>
        :<OpenionsTable data={openions} />}
      </div>
    </div>
  );
};

export default Openions;
