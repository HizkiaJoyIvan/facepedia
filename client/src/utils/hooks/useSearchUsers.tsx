import useAxios from "../helper/useAxios"
import { GeneralFriendListResponse } from "../types"

interface SearchParams {
    search?: string
}

const useSearchUsers = async ({search = ''}: SearchParams = {}): Promise<GeneralFriendListResponse> => {
  const response = await useAxios(`/user${search ? `?search=${search}` : ''}`, 'GET')
  return response
}

export default useSearchUsers