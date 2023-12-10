import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse, PostData } from "../types"

const useCreatePost = async (userID: string, payload: PostData): Promise<GeneralAPIMutateResponse> => {
  const { status } = await useAxios(`/post/${userID}`, 'POST', payload)
  return status
}

export default useCreatePost