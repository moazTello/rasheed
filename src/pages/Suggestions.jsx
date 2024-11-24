import React
, { useEffect } 
from 'react';
import useStore from '../zustand/useStore';
import SuggestionsTable from '../components/Tables/SuggestionsTable';
const Suggestions = () => {
  const { suggestions, isLoading, fetchSuggestionsList } = useStore();
  useEffect(() => {
    fetchSuggestionsList()
  }, [fetchSuggestionsList]);

  // const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-between items-center p-4">
        <p className="text-right ml-10 text-white text-sm md:text-lg">{suggestions?.length}</p>
        <p className="w-full text-left ml-5 text-white text-sm md:text-lg">عدد الاقتراحات</p>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول كل الاقتراحات</p>
      </div>
      <div className="w-full p-2">
      {!suggestions.length > 0  && !isLoading ? <p className="w-full text-center text-white text-sm md:text-lg">لا يوجد إقتراحات</p>
        :<SuggestionsTable data={suggestions} />}
      </div>
    </div>
  );
};

export default Suggestions;
