import useAxios from "../helper/useAxios"
import { GeneralFriendListResponse } from "../types"

const useGetFriendList = async (userID: string): Promise<GeneralFriendListResponse> => {
  const response = await useAxios(`/user/${userID}/friendlist`, 'GET')
  return response
}

export default useGetFriendList