export interface IChatRoomRouteResponse extends IApiResponse {
    name?: string
    chatRoomId?: string
}


export interface IApiResponse {
    response?: string
    succeess?: boolean
    errors?: any
}