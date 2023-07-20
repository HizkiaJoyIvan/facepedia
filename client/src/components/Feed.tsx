import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'


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

interface postData {
  _id: string
  userId: string
  title: string
  desc: string
  image: string
  likes: string[]
}

const Feed: React.FC = () => {

  const [posts, setPosts] = useState<postData[]>([])

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/post/all/64b8c52f8d04d5af49b7dcd2`)
        setPosts(res.data)
      } catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='bg-gray-50 min-h-screen w-full flex-1 px-5 py-8'>
      <Share />
      {posts.map((p) => (
        <Post 
          userId={p.userId}
          title={p.title} 
          desc={p.desc}
          image={p.image}
          likes={p.likes}
        />
      ))}
    </div>
  )
}

export default Feed
