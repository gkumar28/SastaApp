import { Entity, Column } from "typeorm"
import { Getters, Setters } from "../util/classUtil"
import BaseEntity from "./baseEntity"

@Entity()
@Getters()
@Setters()
export class User extends BaseEntity {

    @Column()
    firstName?: string
    
    @Column({ nullable: true})
    lastName?: string

    @Column()
    username?: string

    @Column()
    email?: string

    @Column()
    password?: string
}