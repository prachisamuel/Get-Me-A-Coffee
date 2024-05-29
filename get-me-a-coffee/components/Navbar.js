"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <nav className='bg-black text-white flex justify-between items-center px-4 h-16'>
      <Link href={'/'} className="logo font-bold text-lg">GetMeACoffee!</Link> {/* not added img */}
      <div className='relative'>
        {session && <> 
          <button onClick={() => {setShowdropdown(!showdropdown)}} onBlur={() => {setTimeout(() => {setShowdropdown(false)}, 100);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-4 inline-flex items-center" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
          </button>
          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute w-full rounded-lg shadow bg-[#452B1F]`}>
              <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link onClick={(e) => {e.preventDefault()}} href="/dashboard" className="block px-4 py-2 hover:bg-[#786C3B]">Dashboard</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-[#786C3B]">Your Page</Link>
                </li>
                <li>
                  <Link onClick={() => {signOut()}} href="#" className="block px-4 py-2 hover:bg-[#786C3B]">Logout</Link>
                </li>
              </ul>
          </div>
        </>}
        {/* {session && <button onClick={() => {signOut()}} className="text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Logout</button>} */}
        {!session && <Link href={'/login'} >
          <button className="text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Login</button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar
