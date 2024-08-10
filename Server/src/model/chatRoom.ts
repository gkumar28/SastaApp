import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Getters, Setters } from "../util/classUtil";
import { User } from "./user";
import BaseEntity from "./baseEntity";

@Entity()
@Getters()
@Setters()
export class ChatRoom extends BaseEntity {

    @Column({ nullable: true })
    name?: string

    @ManyToMany(type => User, user => user.id) @JoinTable()
    users?: User[]

}