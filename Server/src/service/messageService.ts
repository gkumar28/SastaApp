import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
interface user {
    id: string,
}

interface Message {
    id: string,
    recipient: string,
    message: string,
    time: Date
}

interface RequestInterface extends RouteGenericInterface {
    Body: {
        id: string,
        new?: boolean,
        message?: string
    }
}

const findConnectionIndex = function(connections: user[],value: string): number {
    for(let i=0;i<connections.length;i++) {
        if(connections[i].id == value) return i;
    }
    return connections.length;
};

const findConnection = function(connections: user[], value: string): user | null {
    let ind = findConnectionIndex(connections,value);
    return (ind == connections.length)? null : connections[ind];
}

let connections: user[] = [];
//TODO test socket.ts
const plugin: FastifyPluginCallback 
= function(fastify: FastifyInstance, options: FastifyPluginOptions, next) {
    next();
}

export default plugin;