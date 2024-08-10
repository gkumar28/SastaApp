import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Getters, required, Setters } from "../util/classUtil"

@Entity()
@Getters()
@Setters()
export class User {

    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id?:string

    @Column()
    FirstName?: string
    
    @Column({ nullable: true})
    LastName?: string

    @Column()
    username?: string

    @Column()
    email?: string

    @Column()
    password?: string
}