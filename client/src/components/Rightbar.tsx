import React from 'react'

const Rightbar: React.FC = () => {
  return (
    <div className='w-[20%] bg-white p-5'>
      <div className="flex flex-col gap-2">
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer">
            <div className="flex justify-between items-center">
                <p className='text-gray-700 font-bold text-lg'>Events</p>
                <p className="text-blue-500 text-sm font-semibold">See All</p>
            </div>
            <div className="text-slate-600 font-semibold text-md">Your friend just uploaded a new post</div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer">
            <div className="flex justify-between">
                <p className='text-gray-700 font-bold'>Conversation</p>
                <p className="text-blue-500 text-sm font-semibold">See All</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar
