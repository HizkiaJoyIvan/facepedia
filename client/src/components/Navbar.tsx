import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Navbar: React.FC = () => {

  const { logoutUser } = useContext(AuthContext)
  const {userInfo} = useContext(AuthContext) 

  return (
    <div className="h-16 bg-blue-600 flex items-center px-5">
        <div className="w-[10%]">
          <h1 className='text-white font-semibold text-2xl'>facepedia</h1>
        </div>
        <div className="flex-3">

        </div>
        <div className="w-[70%] flex gap-8 justify-center">
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
