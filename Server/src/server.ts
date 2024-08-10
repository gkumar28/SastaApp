import { fastify } from 'fastify';
import userPlugin from './service/userService';
import chatPlugin from './service/chatService';
import socketPlugin from './service/messageService';

const PORT = process.env.PORT || 8000;

const server = fastify({  //TODO export connection -> models -> routes
    logger: true,
});

server.register(userPlugin, {
    prefix: '/api/user'
});

server.register(chatPlugin, {
    prefix: '/api/chat'
})

server.register(socketPlugin, {
    prefix: '/api/message'
})

async function start(): Promise<void> {
    try {
        await server.listen(PORT);
        server.log.info(`server listening on ${PORT}`)
    }
    catch(err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();