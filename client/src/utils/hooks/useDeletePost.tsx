import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useDeletePost = async (id: string): Promise<GeneralAPIMutateResponse> => {
  const { status } = await useAxios(`/post/${id}`, 'DELETE')
  return status
}

export default useDeletePost