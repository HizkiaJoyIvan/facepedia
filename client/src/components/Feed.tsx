import React, { useEffect, useState, useContext } from 'react'
import Post from './Post'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import Share from './Share'
import {format} from 'timeago.js'

interface postData {
  _id: string
  userId: string
  title: string
  desc: string
  image: string
  likes: string[]
  createdAt: Date
}

const Feed: React.FC = () => {

  const {userInfo} = useContext(AuthContext)
  const [posts, setPosts] = useState<postData[]>([])

  // useEffect(()=> {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:3200/api/post/timeline/${userId}`)
  //       setPosts(res.data)
  //     } catch(err){
  //       console.log(err)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className='w-[60%] bg-gray-50 min-h-screen px-5 py-8'>
      <Share />
      {posts.map((p) => (
        <Post 
          userId={p.userId}
          desc={p.desc}
          image={p.image}
          likes={p.likes}
          createdAt = {p.createdAt}
        />
      ))}
    </div>
  )
}

export default Feed
