import useAxios from "../helper/useAxios"
import { GeneralPostDetailResponse } from "../types"

const useGetPostDetail = async (postID: string): Promise<GeneralPostDetailResponse> => {
  const response = await useAxios(`/post/${postID}`, 'GET')
  return response
}

export default useGetPostDetail