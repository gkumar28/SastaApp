import { error } from "console";
import { IChatRoomRouteRequest } from "../interface/request";
import { ChatRoom } from "../model/chatRoom";
import { ChatRoomRepository } from "../repository/chatRoomRepository";
import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";

/*
    @function GetOrCreateChatRoom
*/
export class ChatRoomService {
    
    constructor(readonly chatRoomRepository: ChatRoomRepository, readonly userRepository: UserRepository) {}
    
    async getOrCreateChatRoom(request: IChatRoomRouteRequest): Promise<ChatRoom> {
        if (request == null || typeof request !== 'object') {
             throw error('Invalid data')
        }
        
        let chatRoom = await this.getChatRoom(request)
        if (chatRoom != null) {
            return chatRoom
        }

        return await this.saveChatRoom(request)
    }

    async getChatRoom(request: IChatRoomRouteRequest): Promise<ChatRoom|null> {
        const { chatRoomId } = request

        if (chatRoomId != null) {
            return await this.chatRoomRepository.findById(chatRoomId)
        } else {
            return await this.chatRoomRepository.findOneBy(request)
        }   
    }

    async saveChatRoom(request: IChatRoomRouteRequest): Promise<ChatRoom> {
        let { userIds, name } = request

        if (userIds == null || name == null) {
            throw error('Insufficient data present to create new chat Room')
        }

        if (userIds.length < 2) {
            throw error('minumum two users required to create a chat room')
        }

        let users: User[] = await this.userRepository.findAllByIdIn(userIds)

        return await this.chatRoomRepository.save({
            name: name,
            users: users
        })
    }
}

