import { EntityManager, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import BaseEntity from "../model/baseEntity";

export class EntityRepository<T extends BaseEntity> extends Repository<T> {
    entityTarget: EntityTarget<T>
    repository: Repository<T>

    constructor(entityTarget: EntityTarget<T>, entityManager: EntityManager) {
        super(entityTarget, entityManager);
        this.entityTarget = entityTarget;
        this.repository = entityManager.getRepository(entityTarget);
    }

    async findById(value: string): Promise<T|null> {
        if (value == null) {
            throw "id cannot be null"    
        }

        return await this.repository.findOne({
            where: {
                id: value
            } as unknown as FindOptionsWhere<T>
        })
    }

    async findAllBy(_args: object): Promise<T[]> {
        if (_args == null) {
            throw "Invalid data supplied"
        }

        return await this.repository.find({
            where: _args
        })
    }
}