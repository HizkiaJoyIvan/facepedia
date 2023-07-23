  import React, {useState, useEffect, useContext} from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

  const Login: React.FC = () => {

    const {setUserId} = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const navigate = useNavigate()
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const userData = {
        email, pwd
      }
      try {
        const res = await axios.post('http://localhost:3200/api/auth/login', userData)
        setUserId(res.data.user._id)
        navigate('/')
      } catch(err){
        console.log(err)
      }

    }


    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e)=>setPwd(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Link to={'/register'} className='font-bold text-gray-500 cursor-pointer'>Don't have an account</Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  export default Login
