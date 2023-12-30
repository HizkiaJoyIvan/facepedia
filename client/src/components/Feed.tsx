import React, { useEffect, useState, useContext } from 'react'
import Post from './Post'
import { AuthContext } from '../context/AuthContext'
import Share from './Share'
import useGetPostByUser from '../utils/hooks/useGetPostByUser'
import { PostData } from '../utils/types'
import UseNotifications from '../utils/helper/useNotifications'

const Feed: React.FC = () => {

  const {userInfo} = useContext(AuthContext)
  const [posts, setPosts] = useState<PostData[]>([])
  const {onError} = UseNotifications()

  useEffect(()=> {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await useGetPostByUser(userInfo?.userInfo?.id)
        setPosts(data)
      } catch(err){
        onError(err as string)
      }
    }
    fetchData()
  }, [])
    

  return (
    <div className='w-[60%] bg-gray-50 min-h-screen px-5 py-8'>
      <Share />
      {posts.map((p) => (
        <Post 
          _id={p._id || ""}
          userId={p.userId}
          desc={p.desc}
          image={p?.image || ""}
          likes={p.likes || []}
          createdAt = {p.createdAt || new Date}
        />
      ))}
    </div>
  )
}

export default Feed
