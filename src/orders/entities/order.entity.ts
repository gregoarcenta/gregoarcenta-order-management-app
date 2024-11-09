import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../enums/status';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Order ID',
    example: '50b476f9-2ace-4154-9538-2b888d48295d',
  })
  id: string;

  @Column({ type: 'varchar', length: 150 })
  @ApiProperty({
    description: 'Order customer name',
    example: 'Test name',
    maxLength: 150,
  })
  customer_name: string;

  @Column({ type: 'varchar', length: 150 })
  @ApiProperty({ description: 'Order item', example: 'Axe', maxLength: 150 })
  item: string;

  @Column({ type: 'integer' })
  @ApiProperty({ description: 'Order quantity', example: 1 })
  quantity: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  @ApiProperty({
    description: 'Order status',
    example: Status.COMPLETED,
    default: Status.PENDING,
    enumName: 'OrderStatusEnum',
    enum: Status,
  })
  status?: Status;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({
    description: 'Order created at',
    example: '2024-11-08T22:51:11.862Z',
  })
  created_at: Date;
}
