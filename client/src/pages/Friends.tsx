import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import Cover from '../components/Cover'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

interface FriendData {
  _id: string
  username: string
  profilePicture: string
}

const Friends: React.FC = () => {

  const {userId} = useContext(AuthContext)
  const [friendlist, setFriendlist] = useState<FriendData[]>()
  const {id} = useParams<string>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/api/user/${id}/friendlist`)
        setFriendlist(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [userId])

  return (
    <>
        {userId === id ? (
          <>
            <Navbar />
            <div className="flex">
                <Leftbar />
                <div className="p-5">
                  <p className="font-bold text-gray-600 text-xl mb-5">Your Friends</p>
                  {friendlist?.map((friend) => (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                      <Link to={`/profile/${friend._id}`} className='text-gray-700 font-bold'>{friend.username}</Link>
                    </div>
                  ))}
                </div>
            </div>
          </>
        ): (
          <>
            <Navbar />
            <Cover id={id ?? ''}/>
            <div className="p-5">
              <p className="font-bold text-gray-600 text-xl mb-5">Friend List</p>
              {friendlist?.map((friend) => (
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                  <Link to={`/profile/${friend._id}`} className='text-gray-700 font-bold'>{friend.username}</Link>
                </div>
              ))}
            </div>
          </>
        )}
    </>
  )
}

export default Friends
