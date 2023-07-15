import React from 'react'
import Feed from '../components/Feed'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'

const Home: React.FC = () => {
  return (
    <>
        <Navbar />
        <div className="flex">
            <Leftbar />
            <Feed />
            <Rightbar />
        </div>
    </>
  )
}

export default Home
