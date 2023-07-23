import React, { useEffect, useState, useContext, useRef, RefObject } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { userData } from './Leftbar'


const Share: React.FC = () => {

  const {userId} = useContext(AuthContext)
  const [userdata, setUserdata] = useState<userData>()
  
  const [file, setFile] = useState<File | null>()
  const desc: RefObject<HTMLInputElement> = useRef(null)

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/user/${userId}`)
        setUserdata(res.data)
      } catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

  interface NewPost {
    userId: string
    desc: string
    image?: string
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newPost: NewPost = {
      userId,
      desc: desc.current?.value!
    }
    if(file){
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post('http://localhost:3200/api/upload', formData)
        console.log(res)
        newPost.image = file.name
      } catch(err) {
          console.log(err)
      }
    } else {
      console.log('No file selected')
    }

    try {
      await axios.post('http://localhost:3200/api/post', newPost)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 rounded-full w-8 h-8 mr-2"></div>
        <div className="font-bold text-gray-700">{userdata?.username}</div>
      </div>
      <input 
        type="text" 
        className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500"
        placeholder="What's on your mind?"
        ref={desc}/>
      <form action="" className='flex justify-between items-center' onSubmit={handleSubmit}>
        <label className="block bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600">
        Upload Image
        <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0])}/>
        </label>
        <button
        className="block bg-green-500 text-white rounded-lg mt-4 px-4 py-2 cursor-pointer hover:bg-green-600"
        type='submit'>
        Share
        </button>
       </form>
    </div>
  )
}

export default Share