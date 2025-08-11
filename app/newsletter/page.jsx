import React from 'react'
import NewsLetterComponents from '@/components/NewsLetterComponents'
// import PasswordProtection from '@/components/NewsLetterComponents/PasswordProtection'

export const metadata = {
  title: 'Newsletter - iVistaz',
  description: 'Newsletter content',
  robots: {
    index: false,
    follow: false,
    // nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const page = () => {
  return (
    // <PasswordProtection>
      <div className='bg-white flex flex-col justify-between min-h-screen pt-10'>
        <div className='lg:px-0'>
          <NewsLetterComponents />
        </div>
      </div>
    // </PasswordProtection>
  )
}

export default page
