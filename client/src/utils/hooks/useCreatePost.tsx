import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse, PostData } from "../types"

// eslint-disable-next-line react-hooks/rules-of-hooks
const useCreatePost = async (payload: PostData): Promise<GeneralAPIMutateResponse> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const res = await useAxios(`/post`, 'POST', payload)
  return res
}

export default useCreatePost