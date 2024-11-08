import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../enums/status';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  customer_name: string;

  @Column({ type: 'varchar', length: 150 })
  item: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
