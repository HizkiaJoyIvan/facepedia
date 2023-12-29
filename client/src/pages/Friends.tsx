import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import Cover from '../components/Cover'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import useGetFriendList from '../utils/hooks/useGetFriendList'
import { FriendData } from '../utils/types'
import UseNotifications from '../utils/helper/useNotifications'

const Friends: React.FC = () => {

  const {userInfo} = useContext(AuthContext)
  const userID = userInfo?.userInfo.id
  const [friendlist, setFriendlist] = useState<FriendData[]>()
  const {id} = useParams<string>()
  const {onError} = UseNotifications()
  const publicFolder = "http://localhost:3200/api/images/"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await useGetFriendList(id as string)
        setFriendlist(data)
      } catch(err) {
        onError(err as string)
      }
    }
    fetchData()
  }, [userID])

  return (
    <>
        {userID === id ? (
          <>
            <Navbar />
            <div className="flex">
                <Leftbar />
                <div className="p-5">
                  <p className="font-bold text-gray-600 text-xl mb-5">Your Friends</p>
                  {friendlist?.map((friend) => (
                    <Link to={`/profile/${friend._id}`}>
                      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md hover:scale-105">
                        <img
                          className="h-9 w-9 object-cover rounded-full  mr-2"
                          src={publicFolder + "Founder.jpg"}
                          alt="user photo profile"
                        />
                        <div className="flex flex-col gap-1">
                          <p className='text-slate-800 font-bold'>{friend.username}</p>
                          <p className='text-slate-500 font-medium text-xs'>{friend.email}</p>
                        </div>
                      </div>
                    </Link>
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
                <Link to={`/profile/${friend._id}`}>
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md hover:scale-105">
                    <img
                      className="h-9 w-9 object-cover rounded-full  mr-2"
                      src={publicFolder + "Founder.jpg"}
                      alt="user photo profile"
                    />
                    <div className="flex flex-col gap-1">
                      <p className='text-slate-800 font-bold'>{friend.username}</p>
                      <p className='text-slate-500 font-medium text-xs'>{friend.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
    </>
  )
}

export default Friends
