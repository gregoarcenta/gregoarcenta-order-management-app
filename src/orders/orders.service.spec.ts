import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { HandlerException } from '../common/exceptions/handler.exception';
import { PaginationDto } from './dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { mockOrders } from '../../test/data/orders';
import { Status } from './enums/status';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        HandlerException,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            preload: jest.fn(),
            createQueryBuilder: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create order', async () => {
    const createOrderDto: CreateOrderDto = {
      customer_name: 'John Doe',
      item: 'Product A',
      quantity: 2,
    };

    jest.spyOn(ordersRepository, 'create').mockReturnValue(mockOrders[0]);
    jest.spyOn(ordersRepository, 'save').mockResolvedValue(mockOrders[0]);

    const result = await service.create(createOrderDto);

    expect(result).toEqual(mockOrders[0]);
    expect(ordersRepository.create).toHaveBeenCalledWith(createOrderDto);
    expect(ordersRepository.save).toHaveBeenCalledWith(mockOrders[0]);
  });

  it('find all orders', async () => {
    const paginationDto: PaginationDto = {
      page: 2,
      page_size: 2,
    };

    const queryBuilderMock = {
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockImplementation(async () => {
        const { page, page_size } = paginationDto;

        const startIndex = (page - 1) * page_size;
        const endIndex = startIndex + page_size;

        return mockOrders.slice(startIndex, endIndex);
      }),
    };

    jest
      .spyOn(ordersRepository, 'createQueryBuilder')
      .mockReturnValue(queryBuilderMock as any);

    const result = await service.findAll(paginationDto);
    expect(queryBuilderMock.where).not.toHaveBeenCalledWith();
    expect(queryBuilderMock.skip).toHaveBeenCalledWith(2); // (2 - 1) * 2 = 2
    expect(queryBuilderMock.take).toHaveBeenCalledWith(2);
    expect(queryBuilderMock.orderBy).toHaveBeenCalledWith(
      'order.created_at',
      'DESC',
    );
    expect(queryBuilderMock.getMany).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: '49bbf435-1ad4-4f1c-bec7-5d74c84f7b98',
        created_at: new Date('2023-08-15T14:30:00Z'),
        customer_name: 'Test Name',
        item: 'Axe',
        quantity: 5,
        status: Status.CANCELLED,
      },
      {
        id: '6a80e182-8268-450d-b4db-55c780f4ac52',
        created_at: new Date('2023-08-15T14:30:00Z'),
        customer_name: 'Test Name',
        item: 'Axe',
        quantity: 2,
        status: Status.PENDING,
      },
    ]);
  });

  it('should return the order when found', async () => {
    jest.spyOn(ordersRepository, 'findOneBy').mockResolvedValue(mockOrders[0]);

    const result = await service.findOne('1');

    expect(ordersRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(mockOrders[0]);
  });

  it('should throw NotFoundException when the order is not found', async () => {
    // Mocking the findOneBy method to return null
    jest.spyOn(ordersRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(
      new NotFoundException('Order with id 1 not found'),
    );
  });

  it('should update an order successfully', async () => {
    const updateOrderDto: UpdateOrderDto = { item: 'Product B', quantity: 3 };
    const mockUpdatedOrder = {
      ...mockOrders[0],
      ...updateOrderDto,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrders[0]);
    jest.spyOn(ordersRepository, 'preload').mockResolvedValue(mockUpdatedOrder);
    jest.spyOn(ordersRepository, 'save').mockResolvedValue(mockUpdatedOrder);

    const result = await service.update('1', updateOrderDto);

    expect(ordersRepository.preload).toHaveBeenCalledWith(mockUpdatedOrder);
    expect(ordersRepository.save).toHaveBeenCalledWith(mockUpdatedOrder);
    expect(result).toEqual(mockUpdatedOrder);
  });

  it('should remove an order successfully', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrders[1]);
    jest.spyOn(ordersRepository, 'remove').mockResolvedValue(undefined);

    const result = await service.remove('1');

    expect(result).toBe(`Order with id 1 has been removed`);
    expect(ordersRepository.remove).toHaveBeenCalledWith(mockOrders[1]);
  });
});
