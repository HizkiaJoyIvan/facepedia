import React, { useEffect, useState, useContext } from 'react'
import Post from './Post'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import Share from './Share'

interface postData {
  _id: string
  userId: string
  title: string
  desc: string
  image: string
  likes: string[]
}

const Feed: React.FC = () => {

  const {userId} = useContext(AuthContext)
  const [posts, setPosts] = useState<postData[]>([])

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/post/all/${userId}`)
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
          desc={p.desc}
          image={p.image}
          likes={p.likes}
        />
      ))}
    </div>
  )
}

export default Feed
