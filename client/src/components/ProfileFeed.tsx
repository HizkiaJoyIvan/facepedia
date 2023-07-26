import React, {useContext, useEffect, useState} from 'react'
import Share from './Share'
import Post from './Post'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Cover from './Cover'

export interface postData {
    _id: string
    userId: string
    title: string
    desc: string
    image: string
    likes: string[]
    createdAt: Date
}

export interface ProfileID {
  id: string
}

const ProfileFeed: React.FC<ProfileID> = ({id}) => {

    const {userId} = useContext(AuthContext)
    const [posts, setPosts] = useState<postData[]>([])

    useEffect(()=> {
        const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3200/api/post/all/${id}`)
            setPosts(res.data)
        } catch(err){
            console.log(err)
        }
        }
        fetchData()
    }, [])  

  return (
    <div className='bg-gray-50 min-h-screen w-full flex-1 px-5 py-8'>
      <Cover id={id ?? ''}/>
      {userId === id ? (
        <Share />
      ) : (
        <div></div>
      )}
      {posts.map((p) => (
        <Post 
          userId={p.userId}
          desc={p.desc}
          image={p.image}
          likes={p.likes}
          createdAt={p.createdAt}
        />
      ))}
    </div>
  )
}

export default ProfileFeed
