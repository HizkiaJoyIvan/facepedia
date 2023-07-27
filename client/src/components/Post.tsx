import ThumbUp from '@mui/icons-material/ThumbUp'
import Favorite from '@mui/icons-material/Favorite'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { userData } from './Leftbar'

interface postProps {
    userId: string
    desc: string
    image: string
    likes: string[]
    createdAt: Date
}

const Post: React.FC<postProps> = ({userId, desc, image, likes, createdAt}) => {

    const publicFolder = "http://localhost:3200/api/images/"
    const [postUserdata, setPostUserdata] = useState<userData>()

    useEffect(()=> {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3200/api/user/${userId}`)
          setPostUserdata(res.data)
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
          <img
              className="h-9 w-9 object-cover rounded-full  mr-2"
              src={publicFolder + postUserdata?.profilePicture}
              alt="user photo profile"
          />
          <div className="">
            <Link to={`/profile/${userId}`}>{postUserdata?.username}</Link>
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