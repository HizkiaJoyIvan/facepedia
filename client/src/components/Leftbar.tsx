import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"
import { IoPerson } from "react-icons/io5"
import { FaUserFriends } from "react-icons/fa"

export interface userData {
  username: string
  email: string
  profilePicture: string
  followings?: string[]
  followers?: string[]
}

const Leftbar: React.FC = () => {

  const [userdata, setUserdata] = useState<userData>()
  const {userInfo} = useContext(AuthContext)
  const publicFolder = process.env.REACT_APP_BACKEND_URI + "/images/"

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:3200/api/user/${userId}`)
  //       setUserdata({
  //         username: res.data.username,
  //         email: res.data.email,
  //         profilePicture: res.data.profilePicture
  //       })
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className='w-[20%] p-3 flex flex-col gap-8 bg-gray-50'>
      <div className="p-5 bg-white shadow-md rounded-md hover:scale-110 flex gap-2 items-center cursor-pointer">
        <img
              className="h-12 w-12 object-cover rounded-full"
              src={publicFolder + "Founder.jpg"}
              alt="user photo profile"
        />
        <div className='mr-2'>
          <div className="text-xl font-bold text-slate-800">{userInfo?.userInfo?.username}</div>
          <div className="text-slate-600 font-semibold text-sm">{userInfo?.userInfo?.email}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer py-2">
            <div className="flex items-center gap-5">
                <FaHome className='text-blue-700'/>
                <Link to={`/`}>
                  <p className='text-blue-700 font-semibold text-md'>Feed</p>
                </Link>
            </div>
        </div>
        <div className="px-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer py-2">
            <div className="flex items-center gap-5">
                <IoPerson className='text-blue-700'/>
                <Link to={`/profile/${userInfo?.userInfo.id}`}>
                  <p className='text-blue-700 font-semibold text-md'>Profile</p>
                </Link>
            </div>
        </div>
        <div className="px-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer py-2">
            <div className="flex items-center gap-5">
                <FaUserFriends className='text-blue-700'/>
                <Link to={`/friends/${userInfo?.userInfo.id}`}>
                  <p className='text-blue-700 font-semibold text-md'>Friends</p>
                </Link>
            </div>
        </div>
        <div className="px-3 bg-white shadow-md rounded-md hover:scale-105 cursor-pointer py-2">
            <div className="flex items-center gap-5">
                <IoSettings className='text-blue-700'/>
                <Link to={`/settings`}>
                  <p className='text-blue-700 font-semibold text-md'>Settings</p>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar
