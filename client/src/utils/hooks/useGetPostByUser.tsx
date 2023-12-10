import useAxios from "../helper/useAxios"
import { GeneralPostResponse } from "../types"

const useGetPostByUser = async (userID: string): Promise<GeneralPostResponse> => {
  const { data } = await useAxios(`/post/${userID}`, 'GET')
  return data
}

export default useGetPostByUser