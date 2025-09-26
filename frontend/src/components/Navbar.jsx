import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  return(
 <>
  <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-#fff5fa relative transition-all  ">

            <a href="https://prebuiltui.com">
                           <img className="max-w-26 h-15 object-cover rounded-3xl hover:-translate-y-1 transition-all duration-300" src="/images/logo.png" alt="image" />

            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 text-black">
                <Link to= '/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/product'>Products</Link>
                <Link to='/contact'>Contact</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-white-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer">
                    <Link to='/cart'>
                   <FontAwesomeIcon icon={faCartShopping} className="text-indigo-500" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full ">3
                       
                    </button>
                   </Link>
                </div>

                <Link to='/login' className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full active:scale-95 transition">
                    Login
                </Link>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
               <Link to= '/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/product'>Products</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login' className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </Link>
            </div>

        </nav>
 </>

    
  );
};

export default Navbar;
