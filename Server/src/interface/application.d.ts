import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { ChatRoomRepository } from "../repository/chatRoomRepository"
import { UserRepository } from "../repository/userRepository"
import { ChatRoomService } from "../service/chatRoomService"
import { QueryRunner } from "typeorm"
import { IChatRoomRouteRequest } from "./request"

export interface IAppInstance extends FastifyInstance { 
    dataSource?: DataSource 
}

export interface IRepositoryContext {
    chatRoomRepository?: ChatRoomRepository
    userRepository?: UserRepository
}

export interface IServiceContext {
    chatRoomService?: ChatRoomService
}

export interface IAppHeadersDefault {
    id?: string
}

export interface IAppParamsDefault {
    id?: string
}

export interface IAppBody {
    id?: string
}

export interface IAppRequest<T> extends 
FastifyRequest<{Params: T.Params, Headers: T.Headers, Body: T.Body}>, IRepositoryContext, IServiceContext {
    transaction?: QueryRunner
}

export interface IAppResponse extends FastifyReply {
}

export interface IAppRequestContextDefault {
    Params: IAppParamsDefault,
    Headers: IAppHeadersDefault,
    Body: IAppHeadersDefault
}

export interface IChatRoomRequestContext extends IAppRequestContextDefault {
    Body: IChatRoomRouteRequest
}