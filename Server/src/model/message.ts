import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Getters, Setters } from "../util/classUtil"
import { User } from "./user"
import { ChatRoom } from "./chatRoom"

@Entity()
@Getters()
@Setters()
export class Message {

    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id?:string

    @ManyToOne(type => User, user => user.id)
    senderId?: string
    
    @ManyToOne(type => User, user => user.id)
    receiverId?: string

    @ManyToOne(type => ChatRoom, chatRoom => chatRoom.id)
    chatRoomId?: string

    @Column()
    content?: string

    @Column()
    status?: string

    @Column()
    timeStamp?: Date
}