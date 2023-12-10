import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useUnfollow = async (userID: string, id: string): Promise<GeneralAPIMutateResponse> => {
  const { status } = await useAxios(`/post/${id}/unfollow`, 'PUT', userID)
  return status
}

export default useUnfollow