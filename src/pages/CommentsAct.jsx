import React, { useEffect } from 'react';
import useStore from '../zustand/useStore';
import { useParams } from 'react-router-dom';
import CommentsTable from '../components/Tables/ComentsTable';
const CommentsAct = () => {
  const { isLoading, fetchCommentsAct, commentAct } = useStore();
  const {actid} = useParams();
  useEffect(() => {
    fetchCommentsAct(actid);
  }, [fetchCommentsAct, actid]);
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-between items-center p-4">
        <p className="text-right ml-10 text-white text-sm md:text-lg">{commentAct?.length}</p>
        <p className="w-full text-left ml-5 text-white text-sm md:text-lg">عدد التعليقات</p>
        <p className="w-full text-right text-white text-sm md:text-lg">جدول التعليقات</p>
      </div>
      <div className="w-full p-2">
        {!commentAct?.length > 0 && !isLoading ? (
          <p className="w-full text-center text-white text-sm md:text-lg">لا يوجد تعليقات</p>
        ) : (
          <CommentsTable data={commentAct} />
        )}
      </div>
    </div>
  );
};

export default CommentsAct;
