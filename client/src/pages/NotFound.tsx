import React from 'react'
import Navbar from '../components/Navbar'

const NotFound: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-5 items-center">
          <h1 className='text-8xl font-bold text-blue-800'>
            404
          </h1>
          <h2 className='text-3xl font-bold text-slate-600'>Not Found</h2>
        </div>
      </div>
    </>
  )
}

export default NotFound
