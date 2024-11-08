import OrganizationsTable from '../components/Tables/OrganizationsTable';
import { useNavigate } from 'react-router-dom';
const Organizations = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[85vh] bg-slate-100">
      <div className="w-full flex justify-between items-center p-4">
        <button
          onClick={() => navigate('/rasheed/organizations/addorganization')}
          className="p-2 bg-primary rounded-lg text-sm md:text-md w-40 text-white border-2 border-primary hover:bg-white hover:text-primary"
        >
          إضافة منظمة +
        </button>
        <p className="w-full text-right text-primary text-sm md:text-lg">جدول كل المنظمات</p>
      </div>
      <div className="w-full p-2">
        <OrganizationsTable />
      </div>
    </div>
  );
};

export default Organizations;
