"use client"

import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { fetchUser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})
  
  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    else {
      getData()
    }
  }, [router, session])

  const getData = async () => {
    let u = await fetchUser(session.user.name)
    setForm(u)
  }
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    // update()
    let a = await updateProfile(e, session.user.name)
    toast('Profile Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='container mx-auto py-5 px-6'>
        <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your dashboard</h1>
        <form className='max-w-2xl mx-auto' action={handleSubmit}>
          <div className='my-2'>
            <label htmlFor="name" className='block mb-2 text-sm font-medium'>Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id='name' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="email" className='block mb-2 text-sm font-medium'>Email</label>
            <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id='email' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="username" className='block mb-2 text-sm font-medium'>Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id='username' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="profilepic" className='block mb-2 text-sm font-medium'>Profile Picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id='profilepic' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="coverpic" className='block mb-2 text-sm font-medium'>Cover Picture</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id='coverpic' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="razorpayid" className='block mb-2 text-sm font-medium'>Razorpay Id</label>
            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id='razorpayid' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-2'>
            <label htmlFor="razorpaysecret" className='block mb-2 text-sm font-medium'>Razorpay secret</label>
            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id='razorpaysecret' className='block w-full p-2 rounded-lg bg-[#523526] placeholder-white border border-white' />
          </div>
          <div className='my-6'>
            <button type='submit' className='block text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full'>Save</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Dashboard
