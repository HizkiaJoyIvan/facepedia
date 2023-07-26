import ThumbUp from '@mui/icons-material/ThumbUp'
import Favorite from '@mui/icons-material/Favorite'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'

interface postProps {
    userId: string
    desc: string
    image: string
    likes: string[]
    createdAt: Date
}

const Post: React.FC<postProps> = ({userId, desc, image, likes, createdAt}) => {

    const publicFolder = "http://localhost:3200/api/images/"
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

    const getFileComponent = () => {
      const extension = image.substring(image.lastIndexOf('.') + 1).toLowerCase()
      if (extension === 'png' || extension === 'jpg') {
        return <img src={publicFolder + image} alt="" className="w-1/2 h-1/2" />
      } else if (extension === 'mp4') {
        return <video controls className="w-1/2 h-1/2"><source src={publicFolder + image} type="video/mp4" /></video>
      } else {
        return null
      }
    }

    return (
      <div className="bg-white p-4 shadow-md rounded-lg my-5">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full w-9 h-9 mr-2"></div>
          <div className="">
            <Link to={`/profile/${userId}`}>{username}</Link>
            <div className="text-gray-400 font-md">{format(createdAt?.toLocaleString())}</div>
          </div>
        </div>
        <p className="mb-5">
            {desc}
        </p>
        {image && getFileComponent()}
        <div className='flex items-center gap-5 mt-2'>
            <ThumbUp />
            <Favorite />
        </div>
      </div>
    )
  }

export default Post