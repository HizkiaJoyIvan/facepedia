import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useFollow = async (userID: string, id: string): Promise<GeneralAPIMutateResponse> => {
  const { status } = await useAxios(`/post/${id}/follow`, 'PUT', userID)
  return status
}

export default useFollow