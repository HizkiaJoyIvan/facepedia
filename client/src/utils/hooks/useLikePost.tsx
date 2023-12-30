import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useLikePost = async (userID: string, id: string): Promise<GeneralAPIMutateResponse> => {
  const data = {
    userID: userID
  }
  const { status } = await useAxios(`/post/like/${id}`, 'PUT', data)
  return status
}

export default useLikePost