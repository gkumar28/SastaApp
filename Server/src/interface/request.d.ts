export interface IChatRoomRouteRequest extends IApiRequest {
    chatRoomId?: string
    userIds?: string[]
    name?: string
}



export interface IApiRequest {
    ip?: string
}
