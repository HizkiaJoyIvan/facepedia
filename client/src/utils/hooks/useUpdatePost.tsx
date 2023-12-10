import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse, PostData } from "../types"

const useUpdatePost = async (id: string, payload: PostData): Promise<GeneralAPIMutateResponse> => {
  const { status } = await useAxios(`/post/${id}`, 'PUT', payload)
  return status
}

export default useUpdatePost