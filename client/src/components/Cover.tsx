import React, {useState, useEffect, useContext} from 'react'
import { ProfileID } from './ProfileFeed'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { UserDetailData } from '../utils/types'
import useGetUserDetail from '../utils/hooks/useGetUserDetail'
import useFollow from '../utils/hooks/useFollow'
import useUnfollow from '../utils/hooks/useUnfollow'
import UseNotifications from '../utils/helper/useNotifications'

const Cover: React.FC<ProfileID> = ({id}) => {

  const [userdata, setUserdata] = useState<UserDetailData>()
  const [loading, setLoading] = useState(false)
  const { userInfo } = useContext(AuthContext)
  const {onError} = UseNotifications()
  const userID = userInfo?.userInfo.id

  const publicFolder = process.env.REACT_APP_BACKEND_URI + "/images/"

  useEffect(()=> {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await useGetUserDetail(id)
        setUserdata(data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [loading])

  const handleFollow = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useFollow(userID, id)
      setLoading(!loading)
    } catch(err) {
      onError(err as string)
    }
  }

  const handleUnfollow = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useUnfollow(userID, id)
      setLoading(!loading)
    } catch(err) {
      onError(err as string)
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
                        src={publicFolder + "Founder.jpg"}
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
                  <h1 className="text-2xl text-slate-800 font-bold">{userdata?.username}</h1>
                  <p className="text-slate-600 font-semibold">{userdata?.email}</p>
          </div>
          <div className='flex items-center gap-5 justify-center p-2'>
            {userID !== id && (
              <div className="px-4 ml-2 h-30 pb-5">
                {userdata?.followers?.includes(userID) ? (
                  <button className='bg-blue-500 rounded-lg px-3 py-2 text-white font-semibold transform transition-transform hover:-translate-y-1 hover:bg-blue-300' onClick={handleUnfollow}>Unfollow</button>
                ) : (
                  <button className='bg-blue-800 rounded-lg px-3 py-2 text-white font-semibold transform transition-transform hover:-translate-y-1 hover:bg-blue-600' onClick={handleFollow}>Follow</button>
                )}
                <Link to={`/friends/${id}`} className='bg-gray-200 rounded-md px-3 py-2 ml-3 font-semibold text-slate-800 transform transition-transform hover:-translate-y-1'>Friend List</Link>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Cover
