import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

const useFollow = async (userID: string, id: string): Promise<GeneralAPIMutateResponse> => {
  const data = {
    userId: userID
  }
  const { status } = await useAxios(`/user/${id}/follow`, 'PUT', data)
  return status
}

export default useFollow