import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("reach-out")
export class ReachOutEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ name: "full_name" })
  name: string;

  @Column({ name: "pick_up_location" })
  pickUpLocation: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column({ type: "varchar" })
  query: string;

  @Column({ name: "check_in_date", type: "varchar" })
  checkInDate: string;

  @Column({ name: "check_out_date", type: "varchar" })
  checkOutDate: string;

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
