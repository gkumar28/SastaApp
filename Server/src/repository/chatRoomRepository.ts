import { EntityManager, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import { ChatRoom } from "../model/chatRoom";
import { EntityRepository } from "./entityRepository";
import { filterObj } from "../util/objectUtil";
import { CHATROOM_BUSINESS_FIELDS } from "../helper/FieldConstants";

export class ChatRoomRepository extends EntityRepository<ChatRoom> {

    constructor(entityManager: EntityManager) {
        super(ChatRoom, entityManager);
    }

    async findAllBy(_args: any): Promise<ChatRoom[]> {
        const requestBody = filterObj(_args, CHATROOM_BUSINESS_FIELDS)

        return await this.repository.find({
            where: requestBody
        })
    }

    async findOneBy(_args: any): Promise<ChatRoom|null> {
        const requestBody = filterObj(_args, CHATROOM_BUSINESS_FIELDS)

        return await this.repository.findOne({
            where: requestBody
        })
    }
}
