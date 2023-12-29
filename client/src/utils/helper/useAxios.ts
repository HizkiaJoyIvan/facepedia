import axiosInstance from "../axiosInstance"
import Cookies from "js-cookie"

type HeadersType = {
    authorization?: string
}

const useAxios = async (url: string, method: string, data?: any, isProtected: boolean = true) => {
  try {
    const headers: HeadersType = {}
    if(isProtected) {
      const token = Cookies.get('user_auth_token')
      if (token) {
        headers['authorization'] = `Bearer ${token}`
      }
    }

    const res = await axiosInstance({
      url,
      method,
      data,
      headers,
    })

    return res.data
  } catch (err) {
    return null
  }
}

export default useAxios
