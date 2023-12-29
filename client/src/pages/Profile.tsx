import React from 'react'
import { useParams } from 'react-router'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import ProfileFeed from '../components/ProfileFeed'

const Profile: React.FC = () => {

  const { id } = useParams<string>()

  return (
    <>
        <Navbar />
        <div className="flex">
            <Leftbar />
            <ProfileFeed id={id ?? ''}/>
        </div>
    </>
  )
}

export default Profile
