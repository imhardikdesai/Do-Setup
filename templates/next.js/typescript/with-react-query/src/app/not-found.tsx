import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='min-h-screen bg-[#f4f4f5] dark:bg-[#18181a] flex items-center justify-center'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-6'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-[#0a0b0b] dark:text-[#f4f4f5] mb-4'>404</h1>
            <p className='text-lg text-[#e4e4e7] dark:text-[#e4e4e7] mb-8'>
              Page Not Found - We could not find the page you were looking for.
            </p>

            <Link
              href='/'
              className='inline-block bg-[#0a0b0b] dark:bg-[#f4f4f5] text-[#f4f4f5] dark:text-[#0a0b0b] px-6 py-3 rounded-md hover:bg-[#18181a] dark:hover:bg-[#e4e4e7] focus:outline-none focus:ring-2 focus:ring-[#0a0b0b] dark:focus:ring-[#f4f4f5] transition-colors'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
