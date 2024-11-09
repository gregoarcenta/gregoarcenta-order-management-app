import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly handlerException: HandlerException,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.ordersRepository.create(createOrderDto);
      return await this.ordersRepository.save(order);
    } catch (error) {
      this.handlerException.handlerDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Order[]> {
    paginationDto.page ??= 1;
    paginationDto.page_size ??= 5;
    const skip = (paginationDto.page - 1) * paginationDto.page_size;
    const take = paginationDto.page_size;
    const status = paginationDto.status;

    const queryBuilder = this.ordersRepository.createQueryBuilder('order');
    try {
      if (paginationDto.status) {
        queryBuilder.where('order.status = :status', { status });
      }

      return await queryBuilder
        .skip(skip)
        .take(take)
        .orderBy('order.created_at', 'DESC')
        .getMany();
    } catch (error) {
      this.handlerException.handlerDBException(error);
    }
  }

  async findOne(id: string): Promise<Order> {
    let order: Order = null;

    try {
      order = await this.ordersRepository.findOneBy({ id });
    } catch (error) {
      this.handlerException.handlerDBException(error);
    }

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    let order: Order = await this.findOne(id);
    try {
      order = await this.ordersRepository.preload({
        ...order,
        ...updateOrderDto,
      });
      await this.ordersRepository.save(order);
    } catch (error) {
      this.handlerException.handlerDBException(error);
    }
    return order;
  }

  async remove(id: string): Promise<string> {
    const order: Order = await this.findOne(id);
    try {
      await this.ordersRepository.remove(order);
    } catch (error) {
      this.handlerException.handlerDBException(error);
    }
    return `Order with id ${id} has been removed`;
  }
}
