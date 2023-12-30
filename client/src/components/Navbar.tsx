import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useSearchUsers from '../utils/hooks/useSearchUsers'
import { UserDetailData } from '../utils/types'

const Navbar: React.FC = () => {

  const { logoutUser } = useContext(AuthContext)
  const [usersList, setUsersList] = useState<UserDetailData[]>([])
  const {userInfo} = useContext(AuthContext) 
  const [searchQuery, setSearchQuery] = useState('')
  const publicFolder = process.env.REACT_APP_BACKEND_URI + "/images/"

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data } = await useSearchUsers({ search: searchQuery })
      setUsersList(data)
    }
    fetchData()
  }, [searchQuery])

  const handleSearchUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="h-16 bg-blue-600 flex items-center px-5">
        <div className="w-[10%]">
          <h1 className='text-white font-semibold text-2xl'>facepedia</h1>
        </div>
        <div className="w-[40%] ml-10 flex justify-center">
          <input 
            type="search" 
            className='bg-white rounded-2xl px-3 py-2 w-[100%] outline-blue-200 hover:outline-blue-300 text-slate-600 font-semibold text-sm'
            onChange={handleSearchUsers}
          />
          {searchQuery ? (
            usersList.length ? (
              <div className="bg-white absolute top-14 rounded-2xl px-2 py-2 shadow-md left-50 w-[38%] flex flex-col gap-1">
                {usersList.map(user => (
                  <Link to={`/profile/${user._id}`}>
                    <div className="flex p-1 items-center gap-2 hover:bg-slate-100 cursor-pointer rounded-md">
                      {user?.profilePicture === "" ? (
                        <img
                          className="h-10 w-10 object-cover rounded-full border-4 border-white"
                          src={publicFolder + "DefaultPP.jpg"}
                          alt="Default photo profile"
                        />
                      ) : 
                      (
                        <img
                          className="h-10 w-10 object-cover rounded-full border-4 border-white"
                          src={publicFolder + user?.profilePicture}
                          alt="User photo profile"
                        />
                      )}
                      <p className='text-slate-800 font-semibold'>{user?.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ): (
              <div className="bg-white absolute top-14 rounded-2xl px-2 py-2 shadow-md left-50 w-[38%]">
                <p className='text-blue-600 font-semibold text-center'>No results</p>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
        <div className="w-[30%] flex gap-8 justify-center">
          <Link to={"/"} className='text-white font-medium text-md transform transition-transform hover:-translate-y-0.5'>Home</Link>
          <Link to={`/profile/${userInfo?.userInfo.id}`} className='text-white font-medium text-md transform transition-transform hover:-translate-y-0.5'>Profile</Link>
          <Link to={`/friends/${userInfo?.userInfo.id}`} className='text-white font-medium text-md transform transition-transform hover:-translate-y-0.5'>Friends</Link>
        </div>
        <div className="w-[20%] flex justify-end">
          <button 
            className='text-blue-600 bg-white hover:bg-gray-300 px-3 py-2 rounded-md font-semibold text-md transform transition-transform hover:-translate-y-1'
            onClick={logoutUser}>
              Logout
          </button>
        </div>
    </div>
  )
}

export default Navbar
