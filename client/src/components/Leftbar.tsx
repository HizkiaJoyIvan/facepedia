import React from 'react'
import OtherHouses from '@mui/icons-material/OtherHouses'

const Leftbar: React.FC = () => {
  return (
    <div className=' w-64 flex-shrink-0 p-3 flex flex-col gap-8'>
      <div className="p-4 bg-gray-100 shadow-md rounded-md hover:scale-110">
        <div className="text-xl font-bold">Username</div>
        <div className="text-gray-600">username@gmail.com</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Feed</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Profile</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Gallery</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Videos</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar
