import React from 'react'
import Image from 'next/image'

const Login = () => {
  return (
    <div className='flex h-screen bg-[#f4f4f5]'>
      <div className='w-1/2 h-full hidden lg:block relative'>
        <Image
          src='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Modern Login Image'
          className='object-cover w-full h-full'
          fill
        />
      </div>

      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-6 text-[#0a0b0b] text-center'>Login</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                Username
              </label>
              <div className='relative'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  placeholder='Username'
                />
              </div>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <div className='relative'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='******************'
                />
              </div>
              <p className='text-red-500 text-xs italic hidden'>Please choose a password.</p>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-[#2562eb] hover:bg-[#1643a7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'
                type='submit'
              >
                Sign In
              </button>
              <a
                className='inline-block align-baseline font-bold text-sm text-[#2562eb] hover:text-[#1643a7] transition-colors duration-300'
                href='#'
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
