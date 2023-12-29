import ThumbUp from '@mui/icons-material/ThumbUp'
import Favorite from '@mui/icons-material/Favorite'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useGetUserDetail from '../utils/hooks/useGetUserDetail'
import { PostData, UserDetailData } from '../utils/types'

const Post: React.FC<PostData> = ({userId, desc, image, likes, createdAt}) => {

    const {userInfo} = useContext(AuthContext)
    const publicFolder = process.env.REACT_APP_BACKEND_URI + "/images/"
    const [postUserdata, setPostUserdata] = useState<UserDetailData>()

    useEffect(()=> {
      const fetchData = async () => {
        try {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { data } = await useGetUserDetail(userId)
          setPostUserdata(data)
        } catch(err) {
          console.log(err)
        }
      }
      fetchData()
    }, [])

    const getFileComponent = () => {
      const extension = image?.substring(image.lastIndexOf('.') + 1).toLowerCase()
      if (extension === 'png' || extension === 'jpg') {
        return <img src={publicFolder + image} alt="" className="w-1/2 h-1/2" />
      } else if (extension === 'mp4') {
        return <video controls className="w-1/2 h-1/2"><source src={publicFolder + image} type="video/mp4" /></video>
      } else {
        return null
      }
    }

    return (
      <div className="bg-white p-4 shadow-md rounded-lg my-5 flex flex-col gap-2">
        <div className="flex items-center mb-4 gap-2">
          <img
              className="h-12 w-12 object-cover rounded-full  mr-2"
              src={publicFolder + "Founder.jpg"}
              alt="user photo profile"
          />
          <div className="flex flex-col gap-0.5">
            <Link 
              to={`/profile/${userId}`}
              className='text-slate-800 text-md font-bold'
            >
              {postUserdata?.username}
            </Link>
            <div className="text-gray-400 font-md">
                {createdAt && format(new Date(createdAt).toLocaleString())}
            </div>
          </div>
        </div>
        <p className="mb-5 text-slate-700 font-semibold">
            {desc}
        </p>
        {image && getFileComponent()}
        <div className='flex items-center gap-5 mt-2'>
          <div className="flex gap-1 items-center">
            <ThumbUp className='cursor-pointer hover:scale-105 hover:text-blue-500'/>
            <p className='text-slate-600 text-sm font-semibold'>{likes?.length}</p>
          </div>
            <Favorite className='cursor-pointer hover:scale-105 hover:text-red-500'/>
        </div>
      </div>
    )
  }

export default Post

//655b7cbc6c85a7d7e061ab38