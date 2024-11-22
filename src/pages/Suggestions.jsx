import React, { useEffect } from 'react';
import ProjectsTable from '../components/Tables/ProjectsTable';
import { BiDetail } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../zustand/useStore';
const Suggestions = () => {
  const { suggestions, isLoading, fetchSuggestionsList } = useStore();
  useEffect(() => {
    fetchSuggestionsList()
  }, [fetchSuggestionsList]);

  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-between items-center p-4">
        <button
        //   onClick={() => navigate(`/rasheed/organizations/${orgid}/addproject`)}
          className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
        >
          إضافة مشروع +
        </button>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل المشاريع</p>
      </div>
      <div className="w-full p-2">
        {/* <ProjectsTable data={OrganizData?.projects} /> */}
      </div>
    </div>
  );
};

export default Suggestions;
