import React, { useEffect, useState, useContext, useRef, RefObject } from 'react'
import { AuthContext } from '../context/AuthContext'
import UseNotifications from '../utils/helper/useNotifications'
import useUpload from '../utils/hooks/useUpload'
import useCreatePost from '../utils/hooks/useCreatePost'

const Share: React.FC = () => {

  const {userInfo} = useContext(AuthContext)  
  const [file, setFile] = useState<File | null>()
  const {onSuccess, onError} = UseNotifications()
  const desc: RefObject<HTMLInputElement> = useRef(null)

  interface NewPost {
    userId: string
    desc: string
    image?: string
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newPost: NewPost = {
      userId: userInfo?.userInfo?.id,
      desc: desc.current?.value!
    }
    if(file){
      try {
        const formData = new FormData()
        formData.append('file', file)
        useUpload(formData)        
        newPost.image = file.name
      } catch(err) {
          onError(err as string)
      }
    } else {
      onError('No file selected')
    }

    try {
      const res = await useCreatePost(newPost)
      if(res) {
        onSuccess("New post has been created")
      }
      else {
        onError("Error while creating post")
      }
    } catch(err){
      onError(err as string)
    }
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 rounded-full w-8 h-8 mr-2"></div>
        <div className="font-bold text-gray-700">You</div>
      </div>
      <input 
        type="text" 
        className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500 font-semibold"
        placeholder="What's on your mind?"
        ref={desc}/>
       {file && (
        <div className="text-blue-700 py-1 rounded-md w-[20%] font-bold text-lg">{file.name}</div>
       )} 
       <div className="flex justify-between items-center">
        <label 
          className="block bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transform transition-transform hover:-translate-y-1"
          htmlFor='fileinput'
        >
          Upload File
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files?.[0])}
            id='fileinput'
          />
        </label>
        <form action="" onClick={handleSubmit}>
          <button
            className="block bg-green-500 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-green-600 transform transition-transform hover:-translate-y-1"
            type='submit'>
            Share
          </button>
        </form>
       </div>
    </div>
  )
}

export default Share