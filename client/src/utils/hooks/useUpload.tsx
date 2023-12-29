import useAxios from "../helper/useAxios"
import { GeneralAPIMutateResponse } from "../types"

// eslint-disable-next-line react-hooks/rules-of-hooks
const useUpload = async (payload: FormData): Promise<GeneralAPIMutateResponse> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const res = await useAxios(`/upload`, 'POST', payload)
  return res
}

export default useUpload