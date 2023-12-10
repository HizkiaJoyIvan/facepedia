import useAxios from "../helper/useAxios"
import { GeneralUserDetailResponse } from "../types"

const useGetUserDetail = async (userID: string): Promise<GeneralUserDetailResponse> => {
  const { data } = await useAxios(`/user/${userID}`, 'GET')
  return data
}

export default useGetUserDetail