export interface FriendData {
    _id: string
    username: string
    profilePicture: string
}

export interface PostData {
    _id: string
    userId: string
    desc: string
    image: string
    likes: string[]
    createdAt: Date
}

export interface UserDetailData {
    username: string
    email: string
    profilePicture?: string
    followings?: string[]
    followers?: string[]
}

export interface UserAuthData {
    username?: string
    email: string
    password: string
}

export interface GeneralAPIResponse<T> {
    status: boolean
    data: T
}

export interface GeneralAPIMutateResponse {
    status: boolean
    message: string
}

export type GeneralUserDetailResponse = GeneralAPIResponse<UserDetailData> 
export type GeneralUserRegisterResponse = GeneralAPIResponse<UserAuthData> 
export type GeneralUserLoginResponse = GeneralAPIResponse<UserAuthData> & { token: string }
export type GeneralPostResponse = GeneralAPIResponse<PostData[]>
export type GeneralFriendListResponse = GeneralAPIResponse<FriendData[]>


