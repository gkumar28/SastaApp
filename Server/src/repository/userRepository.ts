import { EntityManager, In } from "typeorm";
import { ChatRoom } from "../model/chatRoom";
import { EntityRepository } from "./entityRepository";
import { filterObj } from "../util/objectUtil";
import { USER_BUSINESS_FIELDS } from "../helper/FieldConstants";
import { User } from "../model/user";

export class UserRepository extends EntityRepository<User> {

    constructor(entityManager: EntityManager) {
        super(User, entityManager)
    }

    async findAllBy(_args: any): Promise<ChatRoom[]> {
        const requestBody = filterObj(_args, USER_BUSINESS_FIELDS)

        return await this.repository.find({
            where: requestBody
        })
    }

    async findOneBy(_args: any): Promise<ChatRoom|null> {
        const requestBody = filterObj(_args, USER_BUSINESS_FIELDS)

        return await this.repository.findOne({
            where: requestBody
        })
    }

    async findAllByIdIn(userIds: string[]): Promise<User[]> {
        return await this.repository.find({
            where: {id: In(userIds)}
        })
    }
}
