import useAxios from "../helper/useAxios"
import { GeneralPostResponse } from "../types"

// eslint-disable-next-line react-hooks/rules-of-hooks
const useGetPostByUser = async (userID: string): Promise<GeneralPostResponse> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = await useAxios(`/post/timeline/${userID}`, 'GET')
  return response
}

export default useGetPostByUser