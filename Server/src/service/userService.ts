import {IUserRouteRequest } from "../interface/request";
import { ChatRoom } from "../model/chatRoom";
import { ChatRoomRepository } from "../repository/chatRoomRepository";
import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";
import { mapUserRequestToUser } from "../helper/mapper";

export class UserService {
    
    constructor(readonly chatRoomRepository: ChatRoomRepository, readonly userRepository: UserRepository) {}

    async geUser(request: IUserRouteRequest): Promise<User|null> {
        const { userId } = request

        if (userId != null) {
            return await this.userRepository.findById(userId)
        } else {
            return await this.userRepository.findOneBy(request)
        }   
    }

    async saveUser(request: IUserRouteRequest): Promise<User> {
        let user = mapUserRequestToUser(request)
        return await this.userRepository.save(user)
    }
}

