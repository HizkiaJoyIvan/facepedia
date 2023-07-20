import ThumbUp from '@mui/icons-material/ThumbUp'
import Favorite from '@mui/icons-material/Favorite'
import {useState, useEffect} from 'react'
import axios from 'axios'

interface postProps {
    userId: string
    title: string
    desc: string
    image: string
    likes: string[]
}

const Post: React.FC<postProps> = ({userId, title, desc, image, likes}) => {

    const [username, setUsername] = useState<string>('')

    useEffect(()=> {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3200/api/user/${userId}`)
          setUsername(res.data.username)
        } catch(err) {
          console.log(err)
        }
      }
      fetchData()
    }, [])
    return (
      <div className="bg-white p-4 shadow-md rounded-lg my-5">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-9 h-9 mr-2"></div>
          <div className="">
            <div className="font-bold text-gray-700">{username}</div>
            <div className="text-gray-400 font-md">2 hours ago</div>
          </div>
        </div>
        <p className="mb-5">
            {desc}
        </p>
        <div className='flex items-center gap-5'>
            <ThumbUp />
            <Favorite />
        </div>
      </div>
    )
  }

export default Post