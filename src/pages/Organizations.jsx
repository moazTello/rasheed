import { useEffect, useState } from 'react';
import ReferralTracking from '../components/Fields/StatisticsCircle';
import OrganizationsTable from '../components/Tables/OrganizationsTable';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/useStore';
const Organizations = () => {
  const { fetchOrganizationsList, Organizations, isLoading, homeData, fetchHomeData } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrganizationsList();
    fetchHomeData();
  }, [fetchOrganizationsList, fetchHomeData]);
  const [allProjectsNumber, setAllProjectNumber] = useState(null);
  const [allSuggetsNumber, setAllSuggestsNumber] = useState(null);
  const [allProblemsNumber, setAllProblemsNumber] = useState(null);
  const [allwhoratesNumber, setAllwhoratesNumber] = useState(null);
  const [allratesNumber, setAllratesNumber] = useState(null);
  useEffect(() => {
    if (!homeData) return;
    const projectsnumber = homeData.eachOrgWithTotalPros.reduce((total, item) => total + (item?.totalPros || 0), 0);
    const suggestsnumber = homeData.eachProWithTotalsuggestsAndProblemsAndRateInfo.reduce(
      (total, item) => total + (item?.totalSug || 0),
      0,
    );
    const problemsnumber = homeData.eachProWithTotalsuggestsAndProblemsAndRateInfo.reduce(
      (total, item) => total + (item?.totalProblems || 0),
      0,
    );
    const whoratesnumber = homeData.eachProWithTotalsuggestsAndProblemsAndRateInfo.reduce(
      (total, item) => total + (item?.rateInfo?.allPeople || 0),
      0,
    );
    const ratesnumber = homeData.eachProWithTotalsuggestsAndProblemsAndRateInfo.reduce(
      (total, item) => total + (item?.rateInfo?.rate || 0),
      0,
    );
    setAllProjectNumber(projectsnumber);
    setAllSuggestsNumber(suggestsnumber);
    setAllProblemsNumber(problemsnumber);
    setAllwhoratesNumber(whoratesnumber);
    setAllratesNumber(ratesnumber);
  }, [homeData]);
  return (
    <div className="w-full min-h-[100vh] h-fit py-8 md:py-32">
      <div className="w-full flex flex-col md:flex-row justify-center items-center">
        <ReferralTracking
          title="عدد المشاريع"
          up="عدد"
          down="المشاريع"
          number={allProjectsNumber}
          firstSideTitle="الشكاوي"
          secondSideTitle="المقييمين"
          firstSideNumber={allProjectsNumber}
          secondSideNumber={80}
          projects={allwhoratesNumber}
          problems={allProblemsNumber}
        />
        <ReferralTracking
          title="عدد المنظمات"
          up="عدد"
          down="المنظمات"
          number={homeData?.organizationsNum}
          firstSideTitle="التقييمات"
          secondSideTitle="المقترحات"
          firstSideNumber={homeData?.organizationsNum}
          secondSideNumber={8}
          projects={allSuggetsNumber}
          problems={allratesNumber}
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
        {!Organizations?.length > 0 && !isLoading ? (
          <p className="w-full text-center text-white text-sm md:text-lg">لايوجد منظمات</p>
        ) : (
          <OrganizationsTable data={Organizations} />
        )}
      </div>
    </div>
  );
};

export default Organizations;
