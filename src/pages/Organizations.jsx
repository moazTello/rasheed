import { useEffect } from 'react';
import ReferralTracking from '../components/Fields/StatisticsCircle';
import OrganizationsTable from '../components/Tables/OrganizationsTable';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/useStore';
const Organizations = () => {
  const { fetchOrganizationsList, Organizations, isLoading } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrganizationsList();
  }, [fetchOrganizationsList]);
  return (
    <div className="w-full h-fit py-8 md:py-32">
      <div className="w-full flex flex-col md:flex-row justify-center items-center">
        <ReferralTracking
          title="المشاريع"
          up="العدد الكلي"
          down="للمشاريع"
          number="4"
          firstSideTitle="العدد الحالي"
          secondSideTitle="العدد المسموح به"
          firstSideNumber="3"
          secondSideNumber="80"
        />
        <ReferralTracking
          title="المنظمات"
          up="العدد الكلي"
          down="منظمات"
          number={Organizations.length}
          firstSideTitle="العدد الحالي"
          secondSideTitle="العدد المسموح به"
          firstSideNumber={Organizations.length}
          secondSideNumber={8}
        />
      </div>
      <div className="w-full flex justify-between items-center p-4">
        <button
          onClick={() => navigate('/rasheed/organizations/addorganization')}
          className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
        >
          إضافة منظمة +
        </button>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل المنظمات</p>
      </div>
      <div className="w-full p-2">
      { !Organizations?.length > 0  && !isLoading ? <p className="w-full text-center text-white text-sm md:text-lg">لايوجد منظمات</p>
        :<OrganizationsTable data={Organizations} />}
      </div>
    </div>
  );
};

export default Organizations;
