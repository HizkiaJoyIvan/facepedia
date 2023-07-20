import React from 'react'
import Post from './Post'

const Share: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 rounded-full w-8 h-8 mr-2"></div>
        <div className="font-bold text-gray-700">Walter White</div>
      </div>
      <textarea
        className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500"
        placeholder="What's on your mind?"
      ></textarea>
      <div className='flex justify-between items-center'>
        <label className="block bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600">
          Upload Image
          <input type="file" className="hidden"/>
        </label>
        <button
          className="block bg-green-500 text-white rounded-lg mt-4 px-4 py-2 cursor-pointer hover:bg-green-600">
          Share
        </button>
      </div>
    </div>
  )
}

const Feed: React.FC = () => {
  return (
    <div className='bg-gray-50 min-h-screen w-full flex-1 px-5 py-8'>
      <Share />
      <Post />
    </div>
  )
}

export default Feed
