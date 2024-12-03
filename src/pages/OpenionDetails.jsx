import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OpenionDetailsTable from '../components/Tables/OpenionDetailsTable';
const OpenionDetails = () => {
  const { opid } = useParams();
  const [openion, setOpenion] = useState();
  useEffect(() => {
    const Openion = JSON.parse(sessionStorage.getItem('openions')).find((item) => item.id === Number(opid));
    setOpenion(Openion);
  }, [setOpenion, opid]);
  return (
    <div className="w-full flex flex-col items-center h-[100vh] pt-10 md:pt-32">
      <div className="w-full flex justify-end items-center p-4">
        <p className="text-right ml-10 text-white text-sm md:text-lg"> {openion?.name} : </p>
        <p className="text-right ml-5 text-white text-sm md:text-lg"> الاسم </p>
      </div>
      <div className="w-full p-2">{openion && <OpenionDetailsTable data={openion} />}</div>
    </div>
  );
};

export default OpenionDetails;
