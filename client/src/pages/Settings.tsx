import React, {useState, useContext, useEffect} from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { UserDetailData } from '../utils/types'

const Settings: React.FC = () => {

    const {userInfo} = useContext(AuthContext)
    const userID = userInfo?.userInfo.id
    const [userdata, setUserdata] = useState<UserDetailData>()
    const publicFolder = "http://localhost:3200/api/images/"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3200/api/user/${userID}`)
                setUserdata(res.data)
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
    })

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>()

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        if(profilePictureFile) {
            try {
                const formData = new FormData()
                formData.append("file", profilePictureFile)
                const res = await axios.post('http://localhost:3200/api/upload', formData)
            } catch(err) {
                console.log(err)
            }
        } else {
            console.log('No file selected')
        }
        try {
            await axios.put(`http://localhost:3200/api/user/${userID}`, {
                profilePicture: profilePictureFile?.name
            })
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    console.log(userdata?.profilePicture)
  return (
    <>
        <Navbar />
        <div className="flex">
            <Leftbar />
            <div className="px-8 py-6 max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-2 relative">
                        {userdata?.profilePicture === "''" ? (
                            <img
                            className="h-32 w-32 object-cover rounded-full border-4 border-white mb-3"
                            src={publicFolder + 'defaultPP.jpg'}
                            alt="default photo profile"
                        />
                        ) : (
                            <img
                            className="h-24 w-24 object-cover rounded-full border-4 border-white mb-3"
                            src={publicFolder + "Founder.jpg"}
                            alt="user photo profile"
                        />
                        )}
                        <label 
                            className='text-xs text-white p-1 rounded-md bg-blue-500 cursor-pointer absolute bottom-0 font-semibold'
                            style={{ zIndex: 1 }}>
                                Edit your photo profile
                            <input type="file" className='hidden' onChange={(e) => setProfilePictureFile(e.target.files?.[0])}/>
                        </label>
                        {profilePictureFile && (
                            <div className="bg-green-500 text-white p-2 rounded-md text-xs mt-5">{profilePictureFile.name}</div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 justify-between w-[100%]">
                        <div className="mb-4 flex items-center gap-2 w-[100%] justify-between">
                            <label className="block text-slate-700 text-md font-bold mb-2" htmlFor="email">
                                Username
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-blue-500 shadow-md font-semibold max-w-[85%]"
                                id="text"
                                type="text"
                                placeholder={userdata?.username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 flex items-center gap-2 w-[100%] justify-between">
                            <label className="block text-slate-700 text-md font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-blue-500 shadow-md font-semibold max-w-[85%]"
                                id="email"
                                type="email"
                                placeholder={userdata?.email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Settings