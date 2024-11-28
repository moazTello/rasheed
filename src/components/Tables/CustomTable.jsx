import { FaTrashCan } from 'react-icons/fa6';
import { FaPaintBrush } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';
import { useState } from 'react';
const CustomTable = ({ data, remove, edit }) => {
  const [tableColor, setTableColor] = useState(true);
  return (
    <div className="overflow-auto rounded-lg h-fit max-h-[20vh] no-scrollbar">
      <table className="table w-full">
        <thead>
          <tr
            className={`${
              tableColor ? 'bg-stone-600 text-white w-full text-sm' : 'bg-white w-full text-sm text-primary'
            } `}
          >
            <th className="px-2 min-w-20">الحذف</th>
            <th className="px-2 min-w-20">التعديل</th>
            <th className="p-4">الوصف</th>
            {data[0].type && <th className="p-4">العنوان</th>}
            <th className="p-4">
              <button type="button" onClick={() => setTableColor((old) => !old)}>
                <FaPaintBrush size={16} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data?.map((item, index) => (
            <tr
              key={index}
              className={`${
                tableColor
                  ? 'bg-stone-600 text-white w-full hover:bg-stone-700 text-sm border-y-2 border-[#3E8AA9]'
                  : 'bg-white w-full text-sm text-primary hover:bg-slate-50 border-y-2 border-[#3E8AA9]'
              } `}
            >
              <td className="px-6 min-w-20">
                <div className="w-full flex justify-center py-2">
                  <button
                    type="button"
                    onClick={() => remove(index,item?.backId)}
                    className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-red-500 hover:border-2 hover:border-[#3E8AA9] hover:text-[#3E8AA9]"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </td>
              <td className="px-6 min-w-20">
                <div className="w-full flex justify-center py-2">
                  <button
                    type="button"
                    onClick={() =>
                      edit(
                        index,
                        item.text,
                        item.type,
                        item?.videoUrl,
                        item?.pdf,
                        item?.videoImg,
                        item?.images,
                        item?.pdfTest || null,
                        item?.backId,
                      )
                    }
                    className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-green-500 hover:border-2 hover:border-[#3E8AA9] hover:text-[#3E8AA9]"
                  >
                    <LuClipboardEdit />
                  </button>
                </div>
              </td>
              <td className="min-w-40 px-2 text-center">{item.text}</td>
              {item.type && <td className="min-w-40 px-2 text-center">{item.type}</td>}
              <td className="p-4 text-center"> {item?.backId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
