import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("lets_connect")
export class LetsConnectEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "full_name" })
    fullName: string;

    @Column()
    contact: string;

    @Column()
    email: string;

    @Column({ name: "place" })
    place: string;

    @Column({ type: "varchar", nullable: true })
    query: string;

    @Column({ name: "terms_and_conditions", type: "boolean", default: false })
    termsAndConditions: boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        name: "created_at",
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        name: "updated_at",
    })
    public updatedAt: Date;
}
