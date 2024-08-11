import { FastifyInstance, FastifyReply, FastifyPluginOptions, FastifyPluginCallback } from "fastify";
import { IAppRequest, IAppRequestContextDefault, IAppResponse, IChatRoomRequestContext } from '../interface/application';
import { IChatRoomRouteRequest } from "../interface/request";
import { IChatRoomRouteResponse } from "../interface/response";

const sendData = function(reply: FastifyReply, code: number = 200,data: any = undefined) {
    reply.code(code);
    reply.send(data);
}

export const chatRoomPlugin: FastifyPluginCallback 
    = function(fastify: FastifyInstance, options: FastifyPluginOptions, next) {
        
        fastify.get<IAppRequestContextDefault>('/:id', {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' }
                    },
                    required: ['id']
                }
            }
        },
        async (request: IAppRequest<IAppRequestContextDefault>, reply: IAppResponse) => {
            const { id } = request.params
            let chatRoomRequest = {
                chatRoomId: id
            }
            let chatRoomGetResponse: IChatRoomRouteResponse = {
                response: 200
            }

            let chatRoom = await request.chatRoomService!.getChatRoom(chatRoomRequest)
            if (chatRoom != null) {
                let { name, id } = chatRoom
                chatRoomGetResponse.name = name
                chatRoomGetResponse.chatRoomId = id
            } else {
                chatRoomGetResponse.response = 404
                chatRoomGetResponse.errors = "Given Chat Room does not exist"
            }

            return chatRoomGetResponse
        });   

        fastify.post<IChatRoomRequestContext>('/', {
            schema: {
                body: {
                    properties: {
                        users: {
                            type: 'array',
                            items: { type: 'string' }
                        },
                        name: { type: 'string' }
                    }
                }
            }
        },
        async (request: IAppRequest<IChatRoomRequestContext>, reply: IAppResponse) => {
            let { users, name } = request.body

            let chatRoomCreateRequest: IChatRoomRouteRequest = {
                userIds: users,
                name: name
            }
            let chatRoomCreateResponse: IChatRoomRouteResponse = {
                response: 200,
                name: name
            }

            let { id } = await request.chatRoomService!.saveChatRoom(chatRoomCreateRequest)
            chatRoomCreateResponse.chatRoomId = id
            
            return chatRoomCreateResponse
        });

        next();
}
