import { EntityManager, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import { ChatRoom } from "../model/chatRoom";
import { EntityRepository } from "./entityRepository";
import { RepositoryRequest } from "../interface/repository";

export class ChatRepository<T extends ChatRoom> extends EntityRepository<T> {
    entityTarget: EntityTarget<T>
    repository: Repository<T>

    constructor(entityManager: EntityManager, entityTarget: EntityTarget<T>) {
        super(entityTarget, entityManager);
        this.entityTarget = entityTarget;
        this.repository = entityManager.getRepository(entityTarget);
    }

    async findAllByName(value: string): Promise<T[]> {
        if (!value) {
            throw "value cannot be null"    
        }

        return await this.repository.find({
            where: {
                id: value
            } as unknown as FindOptionsWhere<T>
        })
    }

    async findAllByNameOrId(name: string, id: string): Promise<T[]> {
        const body : Partial<RepositoryRequest> = {}

        if (!name && !id) {
            throw "both name and chat room id cannot be null"    
        }

        if (!name) body.name = name
        if (!id) body.id = id

        return await this.repository.find({
            where: body as unknown as FindOptionsWhere<T>
        })
    }
}