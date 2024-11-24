import React, { useEffect } from 'react';
import ProjectsTable from '../components/Tables/ProjectsTable';
import { BiDetail } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../zustand/useStore';
const OrgaDetails = () => {
  const { orgid } = useParams();
  const { OrganizData, setOrganizData, fetchOrganizationsList, Organizations, isLoading } = useStore();
  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchOrganizationsList();
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [fetchOrganizationsList]);
  useEffect(() => {
    setOrganizData(Organizations.find((item) => item.id === Number(orgid)));
  }, [Organizations, orgid, setOrganizData]);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="rounded-2xl bg-[#181818] w-[95%] md:w-[80%] bg-opacity-50 p-5 flex items-center">
        <div className="p-10 text-white">
          <BiDetail size={40} />
        </div>
        <div className="w-full flex flex-col items-end">
          <p className="text-xl text-white mb-5 mr-3">تفاصيل المنظمة</p>
          <div className="w-[90%] md:w-[60%] flex items-center justify-between mr-5">
            <button className="text-white p-1 bg-blue-800 border-[1px] hover:text-blue-800 hover:bg-white border-blue-800 rounded-md text-xs mr-5">
              المقترحات
            </button>
            <button className="text-white p-1 rounded-md border-[1px] hover:text-red-500 hover:bg-white border-red-500 bg-red-500 text-xs mr-5">
              الشكاوي
            </button>
            <p className="flex flex-1 justify-end text-lg text-right text-green-500">{OrganizData?.name}</p>
          </div>
          <div className="w-[90%] md:w-[60%] flex items-center justify-between mt-5 mr-5">
            <p className="text-sm text-white">{OrganizData?.address}</p>
            <p className="text-sm text-white">العنوان</p>
          </div>
          <div className="w-[90%] md:w-[60%] flex items-center justify-between mr-5">
            <p className="text-sm text-white">{OrganizData?.email}</p>
            <p className="text-sm text-white">البريد</p>
          </div>
          <div className="w-[90%] md:w-[60%] flex items-center justify-between mr-5">
            <p className="text-sm text-white">{OrganizData?.phone}</p>
            <p className="text-sm text-white">الجوال</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center p-4">
        <button
          onClick={() => navigate(`/rasheed/organizations/${orgid}/addproject`)}
          className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
        >
          إضافة مشروع +
        </button>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل المشاريع</p>
      </div>
      <div className="w-full p-2">
      { !OrganizData?.projects?.length > 0  && !isLoading ? <p className="w-full text-center text-white text-sm md:text-lg">لايوجد مشاريع</p>
        :<ProjectsTable data={OrganizData?.projects} />}
      </div>
    </div>
  );
};

export default OrgaDetails;
