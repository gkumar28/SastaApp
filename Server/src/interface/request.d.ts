export interface IChatRoomRouteRequest extends IApiRequest {
    chatRoomId?: string
    userIds?: string[]
    name?: string
}

export interface IUserRouteRequest extends IApiRequest {
    userId?: string
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    password?: string
}

export interface IApiRequestBody {
    ip?: string
}
