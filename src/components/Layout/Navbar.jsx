import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { BsPersonFillGear } from 'react-icons/bs';
// import { images } from '../../constants/index';
import { RxHamburgerMenu } from 'react-icons/rx';
import useStore from '../../zustand/useStore';
const Navbar = () => {
  const { user, logoutMaster, logoutOrg } = useStore();
  const navigate = useNavigate();
  const path = useLocation();
  const customPathStyle = 'border-white';
  const [toggleNav, setToggleNav] = useState(false);
  const logout = async () => {
    user.role === 'Master' ? await logoutMaster() : await logoutOrg();
    sessionStorage.setItem('accessT', null);
    sessionStorage.setItem('user', null);
    sessionStorage.setItem('organization', null);
    navigate('/rasheed');
  };
  return (
    <div
      className="fixed z-50 w-full md:w-[80%] flex flex-col items-center 
     md:border-[0.5px] md:border-slate-600 md:left-[10%] top-0 md:top-8 rounded-b-lg md:rounded-xl
     bg-opacity-45 backdrop-blur-sm bg-[#181818]"
    >
      <div className="w-full flex items-center justify-end md:pr-8">
        {/* <div className="flex-1 ml-5 md:ml-12 h-6">
          <img className="w-8 md:w-16 rounded-lg " src={images.loginLogo} alt="لوغو" />
          </div> */}
        {user?.role === 'Master' && (
          <>
            <Link
              to="/rasheed/organizations/profile"
              className={`text-white hidden md:flex mr-auto text-3xl py-3 px-3 ml-5 border-b-4 hover:text-green-500 border-transparent cursor-pointer ${
                path.pathname === '/rasheed/organizations/profile' ? customPathStyle : ''
              }`}
            >
              <BsPersonFillGear />
            </Link>
          </>
        )}
        <div className="hidden md:flex">
          {user?.role === 'Master' && (
            <>
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
                className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                  path.pathname.includes('/rasheed/organizations/traffics') ? customPathStyle : ''
                }`}
              >
                الزيارات
              </Link>
              {/* <Link
                to="/rasheed/organizations/openions"
                className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                  path.pathname.includes('/rasheed/organizations/openions') ? customPathStyle : ''
                }`}
              >
                الاستطلاع
              </Link> */}
              <Link
                to="/rasheed/organizations/problems"
                className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                  path.pathname.includes('/rasheed/organizations/problems') ? customPathStyle : ''
                }`}
              >
                الشكاوي
              </Link>
              <Link
                to="/rasheed/organizations/suggestions"
                className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                  path.pathname.includes('/rasheed/organizations/suggestions') ? customPathStyle : ''
                }`}
              >
                المقترحات
              </Link>
              <Link
                to="/rasheed/organizations"
                className={`text-white text-sm md:text-lg mx-3 py-3 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                  path.pathname === '/rasheed/organizations' ? customPathStyle : ''
                }`}
              >
                المنظمات
              </Link>
            </>
          )}

          <button onClick={logout} className={`text-white text-3xl ml-5 py-3  cursor-pointer hover:text-green-500`}>
            <HiOutlineLogout />
          </button>
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
        {user?.role === 'Master' && (
          <>
            <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations/traffics"
              className={`text-white text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname.includes('/rasheed/organizations/traffics') ? customPathStyle : ''
              }`}
            >
              الزيارات
            </Link>
            <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations/problems"
              className={`text-white text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname.includes('/rasheed/organizations/problems') ? customPathStyle : ''
              }`}
            >
              الشكاوي
            </Link>
            {/* <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations/openions"
              className={`text-white text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname.includes('/rasheed/organizations/openions') ? customPathStyle : ''
              }`}
            >
              الاستطلاع
            </Link> */}
            <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations/suggestions"
              className={`text-white text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname.includes('/rasheed/organizations/suggestions') ? customPathStyle : ''
              }`}
            >
              المقترحات
            </Link>
            <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations"
              className={`text-white text-sm md:text-lg mx-3 my-2 py-1 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname === '/rasheed/organizations' ? customPathStyle : ''
              }`}
            >
              المنظمات
            </Link>
            <Link
              onClick={() => setToggleNav((old) => !old)}
              to="/rasheed/organizations/profile"
              className={`text-white text-sm md:text-lg mx-3 my-2 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500 ${
                path.pathname === '/rasheed/organizations/profile' ? customPathStyle : ''
              }`}
            >
              الملف الشخصي
            </Link>
          </>
        )}
        <button
          onClick={logout}
          className={`text-white text-sm md:text-lg mx-3 my-2 px-2 border-b-4 border-transparent cursor-pointer hover:text-green-500`}
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Navbar;
