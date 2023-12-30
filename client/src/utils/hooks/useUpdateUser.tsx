import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse, UserDetailData } from "../types"

const useUpdateUser = async (id: string, payload: UserDetailData): Promise<GeneralAPIMutateResponse> => {
  const response = await useAxios(`/user/${id}`, 'PUT', payload)
  return response
}

export default useUpdateUser