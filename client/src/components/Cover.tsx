import React, {useState, useEffect} from 'react'
import { ProfileID } from './ProfileFeed'
import axios from 'axios'
import { userData } from './Leftbar'

const Cover: React.FC<ProfileID> = ({id}) => {

  const [userdata, setUserdata] = useState<userData>()

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
        <div className="px-4 ml-2 h-30 pb-5">
                <h1 className="text-2xl font-bold">{userdata?.username}</h1>
                <p className="text-gray-600">{userdata?.email}</p>
        </div>
    </div>
  )
}

export default Cover
