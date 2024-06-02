import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-black text-white flex justify-center items-center px-4 h-12 md:h-14 text-xs md:text-base'>
      <p className='text-center'>Copyright &copy; {currentYear} Get Me A Coffee - All rights reserved</p>
    </footer>
  )
}

export default Footer
