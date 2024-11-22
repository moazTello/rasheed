import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { images } from '../../constants/index';
import { RxHamburgerMenu } from 'react-icons/rx';
const Navbar = () => {
  const path = useLocation();
  const customPathStyle = 'border-white';
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div className="fixed z-50 w-full md:w-[80%] flex flex-col items-center 
     md:border-[0.5px] md:border-slate-600 md:left-[10%] top-0 md:top-8 rounded-b-lg md:rounded-xl
     bg-opacity-45 backdrop-blur-sm bg-[#181818]">
      <div className="w-full flex items-center justify-end md:pr-8">
        <div className="flex-1 ml-5 md:ml-12 py-2">
          {/* <img className="w-8 md:w-16 rounded-lg " src={images.loginLogo} alt="لوغو" /> */}
        </div>
        <div className="hidden md:flex">
          {/* <Link
            to="/rasheed/organizations/addmasteradmin"
            className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-[#3E8AA9] cursor-pointer ${
              path.pathname === '/rasheed/organizations/addmasteradmin' ? customPathStyle : ''
            }`}
          >
            إضافة آدمن رئيسي
          </Link> */}
          <Link
            to="/rasheed/organizations/traffics"
            className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer ${
              path.pathname.includes('/rasheed/organizations/traffics') ? customPathStyle : ''
            }`}
          >
            الزيارات
          </Link>
          <Link
            to="/rasheed/organizations/suggestions"
            className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer ${
              path.pathname.includes('/rasheed/organizations/suggestions') ? customPathStyle : ''
            }`}
          >
            المقترحات
          </Link>
          <Link
            to="/rasheed/organizations"
            className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer ${
              path.pathname.includes('/rasheed/organizations') ? customPathStyle : ''
            }`}
          >
            المنظمات
          </Link>
        </div>
        <button
          onClick={() => setToggleNav((old) => !old)}
          className="mx-3 rounded-lg hover:bg-white p-2 hover:text-primary text-white flex md:hidden"
        >
          <RxHamburgerMenu size={18} />
        </button>
      </div>
      <div className={`flex-col w-full items-center z-10 md:hidden ${toggleNav ? 'flex' : 'hidden'}`}>
        {/* <Link
          onClick={() => setToggleNav((old) => !old)}
          to="/rasheed/organizations/addmasteradmin"
          className={`text-white text-sm md:text-lg mx-3 py-1 px-2 border-b-4 border-[#3E8AA9] cursor-pointer ${
            path.pathname === '/rasheed/organizations/addmasteradmin' ? customPathStyle : ''
          }`}
        >
          إضافة آدمن رئيسي
        </Link> */}
        <Link
          onClick={() => setToggleNav((old) => !old)}
          to="/rasheed/organizations/traffics"
          className={`text-white text-sm md:text-lg mx-3 py-1 px-2 border-b-4 border-transparent cursor-pointer ${
            path.pathname.includes('/rasheed/organizations/traffics') ? customPathStyle : ''
          }`}
        >
      الزيارات
        </Link>
        <Link
          onClick={() => setToggleNav((old) => !old)}
          to="/rasheed/organizations/suggestions"
          className={`text-white text-sm md:text-lg mx-3 py-1 px-2 border-b-4 border-transparent cursor-pointer ${
            path.pathname.includes('/rasheed/organizations/suggestions') ? customPathStyle : ''
          }`}
        >
      المقترحات
        </Link>
        <Link
          onClick={() => setToggleNav((old) => !old)}
          to="/rasheed/organizations"
          className={`text-white text-sm md:text-lg mx-3 py-1 px-2 border-b-4 border-transparent cursor-pointer ${
            path.pathname.includes('/rasheed/organizations') ? customPathStyle : ''
          }`}
        >
          المنظمات
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
