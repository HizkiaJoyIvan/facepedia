import useAxios from "../helper/useAxios"
import { GeneralUserDetailResponse } from "../types"

const useGetUserDetail = async (userID: string): Promise<GeneralUserDetailResponse> => {
  const response = await useAxios(`/user/${userID}`, 'GET')
  return response
}

export default useGetUserDetail