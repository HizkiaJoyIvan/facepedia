import React from 'react'

const Rightbar: React.FC = () => {
  return (
    <div className='bg-white flex-shrink-0 p-5'>
      <div className="flex flex-col gap-2">
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex justify-between items-center">
                <p className='text-gray-700 font-bold'>Events</p>
                <p className="text-blue-500 text-sm">See All</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Conversation</p>
                <p className="text-blue-500 text-sm">See All</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar
