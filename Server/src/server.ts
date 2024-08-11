import { fastify, FastifyReply } from 'fastify';
import { chatRoomPlugin } from './controller/chatRoomController';
import socketPlugin from './service/messageService';
import { AppDataSource } from './repository/dataSource';
import { IAppInstance, IAppRequest, IAppRequestContextDefault, IAppResponse } from './interface/application';
import { ChatRoomService } from './service/chatRoomService';
import { ChatRoomRepository } from './repository/chatRoomRepository';
import { UserRepository } from './repository/userRepository';
import { IApiResponse } from './interface/response';

const PORT = process.env.PORT || 8000;

const server: IAppInstance= fastify({ logger: true})

server.addHook('onReady', async (done) => {
    try {
        server.dataSource = await AppDataSource.initialize()
        server.log.info("database connection initiated. source:"+JSON.stringify(server.dataSource))
    } catch(err: any) {
        server.log.fatal("database initialization failed"+JSON.stringify(err))
       done(err)
    }
})

server.addHook('onRequest', async (request: IAppRequest<IAppRequestContextDefault>, reply: IAppResponse, done) => {
    try {
        request.transaction = server.dataSource!.createQueryRunner()
        await request.transaction!.startTransaction()
        console.log("transaction started for request")

        request.chatRoomRepository = new ChatRoomRepository(request.transaction!.manager)
        request.userRepository = new UserRepository(request.transaction!.manager)
        request.chatRoomService = new ChatRoomService(request.chatRoomRepository, request.userRepository)
    } catch(err: any) {
        server.log.fatal("transaction initialization failed"+JSON.stringify(err))
        done(err)
    }
})

server.addHook('onSend', async (request: IAppRequest<IAppRequestContextDefault>, reply: IAppResponse, payload: IApiResponse) => {
    reply.statusCode = payload.response!
})

server.setErrorHandler((err: any, request: IAppRequest<IAppRequestContextDefault>, response: IAppResponse) => {
    response.status(500).send({
        response: 500,
        err: err
    })
})

server.register(chatRoomPlugin, { prefix: '/api/chat_room' })
server.register(socketPlugin, { prefix: '/api/message' })


async function start(): Promise<void> {
    server.listen(PORT)
    .then(() => {
        server.log.info(`server listening on ${PORT}`)
    })
    .catch((err) => {
        server.log.fatal("Error during Data Source initialization", err)
        process.exit(1)
    })
}

start();