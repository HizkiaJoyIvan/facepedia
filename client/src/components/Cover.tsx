import React, {useState, useEffect, useContext} from 'react'
import { ProfileID } from './ProfileFeed'
import axios from 'axios'
import { userData } from './Leftbar'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Cover: React.FC<ProfileID> = ({id}) => {

  const [userdata, setUserdata] = useState<userData>()
  const {userId} = useContext(AuthContext)

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/user/${id}`)
        setUserdata(res.data)
      } catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleFollow = async () => {
    try {
      await axios.put(`http://localhost:3200/api/user/${id}/follow`, {
        userId
      })
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  const handleUnfollow = async () => {
    try {
      await axios.put(`http://localhost:3200/api/user/${id}/unfollow`, {
        userId
      })
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-white mb-5 shadow-md">
          <div className="relative">
                <img
                    className="h-80 w-full bg-cover bg-center rounded-md"
                    src="https://images8.alphacoders.com/294/294069.jpg"
                    alt="Bottom Image"
                />
                <div className="flex absolute bottom-8 left-10 items-center">
                    <img
                        className="h-40 w-40 object-cover rounded-full border-4 border-white"
                        src="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
                        alt="Top Image"
                        style={{ zIndex: 1 }}
                    />
                </div>
                <div className="p-4 h-30">
                    <h1 className="text-2xl font-bold text-white">.</h1>
                </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="px-4 ml-2 h-30 pb-5">
                  <h1 className="text-2xl font-bold">{userdata?.username}</h1>
                  <p className="text-gray-600">{userdata?.email}</p>
          </div>
          <div className='flex items-center gap-5 justify-center p-2'>
            {userId !== id && (
              <div className="px-4 ml-2 h-30 pb-5">
                {userdata?.followers?.includes(userId) ? (
                  <button className='bg-blue-500 rounded-md px-3 py-2 text-white' onClick={handleUnfollow}>Unfollow</button>
                ) : (
                  <button className='bg-blue-800 rounded-md px-3 py-2 text-white' onClick={handleFollow}>Follow</button>
                )}
                <Link to={`/friends/${id}`} className='bg-gray-200 rounded-md px-3 py-2 ml-3'>Friend List</Link>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Cover
