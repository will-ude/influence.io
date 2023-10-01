import React from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const isLoggedIn = true; // TODO: Temp value to hide/show UI. Change to use authentication values

  function handleSmallNavMenu() {
    setOpenMenu((menu) => !menu);
  }

  function handleOnClickSmallNavMenu() {
    setOpenMenu(false);
  }

  return (
    <nav className="fixed w-full h-16 shadow-xl bg-white">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Logo />

        <LargeScreenNavbar isLoggedIn={isLoggedIn} />

        <HamburgerIcon handleNav={handleSmallNavMenu} />

        <SmallScreenNavbar
          isLoggedIn={isLoggedIn}
          handleNav={handleSmallNavMenu}
          openMenu={openMenu}
          onClickNavMenu={handleOnClickSmallNavMenu}
        />
      </div>
    </nav>
  );
};

function LargeScreenNavbar({ isLoggedIn }) {
  return (
    <div className="hidden sm:flex">
      <ul className="hidden sm:flex">
        {!isLoggedIn && (
          <>
            <Link href={"/account/register"}>
              <li className="ml-10 uppercase hover:border-b text-xl">Register</li>
            </Link>
            <Link href={"/account/login"}>
              <li className="ml-10 uppercase hover:border-b text-xl">Login</li>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href={"/dashboard/analytics"}>
              <li className="ml-10 uppercase hover:border-b text-xl">Dashboard</li>
            </Link>
            <Link href={"/account/profile"}>
              <li className="ml-10 uppercase hover:border-b text-xl">Profile</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

function HamburgerIcon({ handleNav }) {
  return (
    <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
      <AiOutlineMenu size={25} />
    </div>
  );
}

// TODO: Might possibly want to refactor passing down menu state to separate functions. Will work fine as is.
function SmallScreenNavbar({ isLoggedIn, handleNav, handleOnClickSmallNavMenu, openMenu }) {
  return (
    <div
      className={
        openMenu
          ? "fixed left-0 top-0 width-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
          : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
      }
    >
      <div className="flex w-full items-center justify-end">
        <div onClick={handleNav} className="cursor-pointer">
          <AiOutlineClose size={25} />
        </div>
      </div>

      <div>
        <div className="flex-col py-4">
          <ul>
            {!isLoggedIn && (
              <>
                <Link href={"/account/register"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Register
                  </li>
                </Link>
                <Link href={"/account/login"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Login
                  </li>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link href={"/dashboard/analytics"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Dashboard
                  </li>
                </Link>
                <Link href={"/account/profile"}>
                  <li className="py-4 cursor-pointer" onClick={handleOnClickSmallNavMenu}>
                    Profile
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      <Logo />
    </div>
  );
}
export default Navbar;