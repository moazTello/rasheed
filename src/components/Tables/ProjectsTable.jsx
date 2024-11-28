import {
  // FaCircleCheck,
  FaTrashCan,
} from 'react-icons/fa6';
// import { IoIosCloseCircle } from 'react-icons/io';
// import { IoCloseSharp } from 'react-icons/io5';
import { FaPaintBrush } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';
// import { BiDetail } from 'react-icons/bi';
import { useState } from 'react';
import { images } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/useStore';
import toast from 'react-hot-toast';
const ProjectsTable = ({ data }) => {
  const { deleteProjectMaster, fetchOrganizationsList, isLoading, deleteProjectOrg, user } = useStore();
  const { orgid } = useParams();
  const [tableColor, setTableColor] = useState(true);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm('هل أنت متأكد من حذف المشروع ؟');
    if (!result) return;
    try {
      if (user?.role === 'Master') {
        await deleteProjectMaster(id, orgid);
        await fetchOrganizationsList();
      } else {
        await deleteProjectOrg(id);
      }
      toast.success('تم حذف المشروع بنجاح');
    } catch (error) {
      toast.error('حذث خطأ ما');
    }
  };
  return (
    <div className="overflow-auto rounded-lg h-fit max-h-[70vh] no-scrollbar">
      <table className="table w-full">
        <thead>
          <tr
            className={`${
              tableColor
                ? 'bg-stone-900 bg-opacity-75 text-sm text-white w-full'
                : 'bg-slate-50 w-full text-sm text-primary'
            } `}
          >
            <th className="px-2 min-w-20">الحذف</th>
            <th className="px-2 min-w-20">التعديل</th>
            {/* <th className="px-2 min-w-20">التفاصيل</th> */}
            <th className="p-4">التقييم</th>
            <th className="p-4">العنوان</th>
            <th className="p-4">المشروع</th>
            <th className="p-4">الشعار</th>
            <th className="p-4">
              <button onClick={() => setTableColor((old) => !old)}>
                <FaPaintBrush size={16} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading ? (
            <tr
              className={`${
                tableColor
                  ? 'bg-stone-900 bg-opacity-25 text-white w-full hover:bg-stone-800 text-sm border-y-2 border-[#21172e]'
                  : 'bg-slate-50 w-full text-sm text-primary hover:bg-slate-100 border-t-2 border-[#e8e9e9]'
              } `}
            >
              <td colSpan="10">
                <div className="flex justify-center my-3 w-full" role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-stone-200 animate-spin dark:text-slate-300 fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  tableColor
                    ? 'bg-stone-900 bg-opacity-25 text-white w-full hover:bg-stone-800 text-sm border-t-2 border-[#21172e]'
                    : 'bg-slate-50 w-full text-sm text-primary hover:bg-slate-100 border-t-2 border-[#e8e9e9]'
                } `}
              >
                <td className="px-6 min-w-20">
                  <div className="w-full flex justify-center py-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-white bg-red-500 hover:border-2 hover:border-red-500 hover:text-red-500"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
                <td className="px-6 min-w-20">
                  <div className="w-full flex justify-center py-2">
                    <button
                      onClick={() => navigate(`/rasheed/organizations/${orgid}/projectdetails/${item.id}/editProject`)}
                      className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-green-500 hover:border-2 hover:border-green-500 hover:text-green-500"
                    >
                      <LuClipboardEdit />
                    </button>
                  </div>
                </td>
                {/* <td className="px-6 min-w-20">
                  <div className="w-full flex justify-center py-2">
                    <button
                      onClick={() => navigate(`/rasheed/organizations/${orgid}/projectdetails/${item.id}`)}
                      className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-primary hover:border-2 hover:border-primary hover:text-primary"
                    >
                      <BiDetail />
                    </button>
                  </div>
                </td> */}
                <td className="min-w-40 px-2 text-center">{item?.rate}</td>
                <td className="min-w-40 px-2 text-center">{item?.address}</td>
                <td className="min-w-40 px-2 text-center">{item?.name}</td>
                <td className="min-w-40 px-2 text-center">
                  <div className="w-full flex justify-center py-5">
                    <img
                      className="w-16 rounded-xl"
                      src={item?.logo !== 'no logo' ? item?.logo : images.loginLogo}
                      alt="لوغو"
                    />
                  </div>
                </td>
                <th className="p-4 text-center"></th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
