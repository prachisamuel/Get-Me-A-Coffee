"use client"

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchUser, fetchPayments, initiate } from '@/actions/useractions'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { signIn, signOut, useSession } from "next-auth/react";

const PaymentPage = ({username}) => {
    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        if (!session) {
          router.push('/login')
        }
        else {
          getData()
        }
    }, [router, session])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
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
        router.push(`/${username}`)
    }, [])

    const handleChange = (e) => {
        setPaymentform({...paymentform, [e.target.name]: e.target.value})
    }

    const getData = async (params) => {
      let u = await fetchUser(username)
      setCurrentUser(u)
      let dbpayments = await fetchPayments(username)
      setPayments(dbpayments)
    }
    
    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Coffee", //your business name
            "deScription": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
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
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <div className='cover w-full relative'>
            <img className='object-fill w-full h-48 md:h-80' src={currentUser.coverpic} alt="cover" />
        </div>
        <div className='absolute top-60 md:top-80 right-[34%] md:right-[41%] lg:right-[45%] border-black border-2 overflow-hidden rounded-full size-36'>
            <img className='rounded-full object-fill size-36' width={128} height={128} src={currentUser.profilepic} alt="profile" />
        </div>
        <div className='info flex justify-center items-center my-24 mb-32 flex-col gap-2'>
            <div className='font-bold text-lg'>
                @{username}
            </div>
            <div className='text-slate-50'>
                Lets help {username} get a coffee!
            </div>
            <div className='text-slate-50'>
                {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
            </div>
            <div className='payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row'>
                <div className='supporters w-full md:w-1/2 bg-[#3b251b] rounded-lg p-10'>
                    <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='mx-1 text-lg'>
                            {payments.length == 0 && <li>No Payments Yet</li>}
                            {payments.map((p, i) => {
                                return (
                                    <li key={i} className='my-4 flex gap-2 items-center'>
                                        <img width={30} src="avatar.gif" alt="avatar" />
                                        <span>
                                            {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                                        </span>
                                    </li>
                            )})}
                        </ul>
                </div>
                <div className='makePayment w-full md:w-1/2 bg-[#3b251b] rounded-lg p-10'>
                    <h2 className='text-2xl font-bold my-5'>Make a Payemnt</h2>
                    <div className='flex gap-2 flex-col'>
                        <div>
                            <input type="text" onChange={handleChange} name='name' value={paymentform.name} className='w-full p-3 rounded-lg bg-[#523526] placeholder-white' placeholder='Enter Name' />
                        </div>
                        <input type="text" onChange={handleChange} name='message' value={paymentform.message} className='w-full p-3 rounded-lg bg-[#523526] placeholder-white' placeholder='Enter Message' />
                        <input type="text" onChange={handleChange} name='amount' value={paymentform.amount} className='w-full p-3 rounded-lg bg-[#523526] placeholder-white' placeholder='Enter Amount' />
                        <button onClick={() => pay(Number.parseInt(paymentform.amount)*100)} className='text-white bg-gradient-to-br from-[#786C3B] to-[#452B1F] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#452B1F] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full disabled:from-[#523526] disabled:to-[#523526]' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2 mt-5'>
                        <button className='bg-[#523526] p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                        <button className='bg-[#523526] p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                        <button className='bg-[#523526] p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PaymentPage
