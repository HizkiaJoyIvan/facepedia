import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useUnfollow = async (userID: string, id: string): Promise<GeneralAPIMutateResponse> => {
  const data = {
    userId: userID
  }
  const { status } = await useAxios(`/user/${id}/unfollow`, 'PUT', data)
  return status
}

export default useUnfollow