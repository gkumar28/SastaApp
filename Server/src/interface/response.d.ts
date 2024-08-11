export interface IChatRoomRouteResponse extends IApiResponse {
    name?: string
    chatRoomId?: string
}


export interface IApiResponse {
    response?: number
    errors?: any
}