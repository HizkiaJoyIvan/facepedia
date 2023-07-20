import React, {useState, useEffect} from 'react'
import OtherHouses from '@mui/icons-material/OtherHouses'
import axios from 'axios'

interface userData {
  username: string
  email: string
  profilePicture: string
}

const userId = '64b8c52f8d04d5af49b7dcd2'

const Leftbar: React.FC = () => {

  const [userdata, setUserdata] = useState<userData>()

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
    <div className=' w-64 flex-shrink-0 p-3 flex flex-col gap-8'>
      <div className="p-4 bg-gray-100 shadow-md rounded-md hover:scale-110">
        <div className="text-xl font-bold">{userdata?.username}</div>
        <div className="text-gray-600">{userdata?.email}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Feed</p>
            </div>
        </div>
        <div className="p-3 bg-white shadow-md rounded-md hover:scale-110">
            <div className="flex">
                <p className='text-gray-700 font-bold'>Profile</p>
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
      </div>
    </div>
  )
}

export default Leftbar
