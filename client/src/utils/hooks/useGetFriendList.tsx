import useAxios from "../helper/useAxios"
import { GeneralFriendListResponse } from "../types"

const useGetFriendList = async (userID: string): Promise<GeneralFriendListResponse> => {
  const { data } = await useAxios(`/user/${userID}/friendlist`, 'GET')
  return data
}

export default useGetFriendList