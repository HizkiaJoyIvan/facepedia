import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'


export interface userData {
  username: string
  email: string
  profilePicture: string
  followings?: string[]
  followers?: string[]
}

const Leftbar: React.FC = () => {

  const [userdata, setUserdata] = useState<userData>()
  const {userId} = useContext(AuthContext)
  const publicFolder = "http://localhost:3200/api/images/"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/user/${userId}`)
        setUserdata({
          username: res.data.username,
          email: res.data.email,
          profilePicture: res.data.profilePicture
        })
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className=' w-65 flex-shrink-0 p-3 flex flex-col gap-8'>
      <div className="p-5 bg-gray-100 shadow-md rounded-md hover:scale-110 flex gap-2 items-center">
        <img
              className="h-12 w-12 object-cover rounded-full"
              src={publicFolder + userdata?.profilePicture}
              alt="user photo profile"
        />
        <div className='mr-2'>
          <div className="text-xl font-bold">{userdata?.username}</div>
          <div className="text-gray-600">{userdata?.email}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Feed</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
              <Link to={`/profile/${userId}`} className='text-gray-700 font-bold'>Profile</Link>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Gallery</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Videos</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
              <Link to={`/settings/${userId}`} className='text-gray-700 font-bold'>Settings</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar
