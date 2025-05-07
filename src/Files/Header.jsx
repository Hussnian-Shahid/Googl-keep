import React, { useState } from 'react'
import { useStore } from "./store"; 

const Header = () => {


  const enterFunction = () => {
    if(e.key == "Enter") {
      findFunction()
    }
  }

  const input = useStore((state) => state.input)

  const findFunction = () => {
    
  }
  return (
    <div className="w-full md:px-6.5 md:py-3 flex  items-center text-white bg-[#202124] border-b border-white ">
      {/* menu svg */}
      <div>
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="currentcolor"
            fillRule="evenodd"
            d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
          />
        </svg>
      </div>
      {/* logo */}
      <div>
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 md:ml-4.5 md:mr-2 "
        />
      </div>
      {/* website name */}
      <div className="font-custom text-xl ">Keep</div>
      {/* input */}
      <div className="rounded-xl relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#525355] text-white text-[17px] md:ml-22 outline-0 rounded-md  py-2.5 pl-15 w-180 "
          value={search}
          onChange={(e) => setSearch(e.target.value) }
          onKeyDown={enterFunction}
        />
        {/* search icon */}
        <div className="absolute top-1 md:ml-26 py-2  left-0 rounded-full">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentcolor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* close icon */}
        <div className="absolute top-1  py-2  right-3 rounded-full">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
              fill="currentcolor"
            />
          </svg>
        </div>
      </div>
      {/* more logos */}
      <div className="flex items-center gap-6 md:pl-13 ">
        <div>
          <img src="/refresh-arrow.png" className="w-5 h-5 " alt="" />
        </div>
        <div>
          <img src="/view.png" className="w-5 h-5 " alt="" />
        </div>
        <div>
          <img src="/setting.png" className="w-5 h-5 " alt="" />
        </div>
      </div>
      {/* Google apps */}
      <div className="flex items-center gap-6 md:pl-13 ">
        <div>
          <img src="/application.png" className="w-5 h-5 " alt="" />
        </div>
        <div>
          <img src="/user.png" className="w-5 h-5 " alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header