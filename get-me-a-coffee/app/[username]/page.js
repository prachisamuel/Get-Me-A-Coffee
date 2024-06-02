import PaymentPage from '@/components/PaymentPage'
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import { notFound } from 'next/navigation'
import React from 'react'

const Username = async ({params}) => {
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({username: params.username})
    if (!u) {
      return notFound()
    }
  }
  
  await checkUser()

  return (
    <>
      <PaymentPage username={params.username}/>
    </>
  )
}

export default Username

export async function generateMetadat({params}) {
  return {
    title: `Support ${params.username} - Get Me A Coffee`,
  }
};