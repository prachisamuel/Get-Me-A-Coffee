import mongoose from 'mongoose'
import NextAuth from 'next-auth'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import axios from 'axios'

const getRandomImage = async (type) => {
  try {
    const response = await axios.get(`https://picsum.photos/200`, {
      responseType: 'arraybuffer'
    })
    const base64 = Buffer.from(response.data, 'binary').toString('base64')
    return `data:image/jpeg;base64,${base64}`
  } catch (error) {
    console.error(`Error fetching ${type} image:`, error)
    return null
  }
}

export const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        await connectDB()
        const currentUser = await User.findOne({ email: email })
        if (!currentUser) {
          const profilePicture = await getRandomImage('profile')
          const coverPicture = await getRandomImage('cover')
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            profilepic: profilePicture,
            coverpic: coverPicture
          })
        }
        return true
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
      return session
    },
  }
})

export {authOptions as GET, authOptions as POST}