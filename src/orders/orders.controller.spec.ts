import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { mockOrders } from '../../test/data/orders';

const mockOrdersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create order', async () => {
    const createOrderDto: CreateOrderDto = {
      customer_name: 'John Doe',
      item: 'Product A',
      quantity: 2,
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockOrders[0]);

    await expect(controller.create(createOrderDto)).resolves.toEqual(
      mockOrders[0],
    );
    expect(service.create).toHaveBeenCalledWith(createOrderDto);
  });

  it('find all orders', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

    await expect(controller.findAll({ page: 2 })).resolves.toEqual(mockOrders);
    expect(service.findAll).toHaveBeenCalledWith({ page: 2 });
  });

  it('find order by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrders[1]);

    await expect(controller.findOne('abc123')).resolves.toEqual(mockOrders[1]);
    expect(service.findOne).toHaveBeenCalledWith('abc123');
  });

  it('update order', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(mockOrders[3]);

    await expect(
      controller.update('abc123', { quantity: 11 }),
    ).resolves.toEqual(mockOrders[3]);

    expect(service.update).toHaveBeenCalledWith('abc123', { quantity: 11 });
  });

  it('remove order', async () => {
    const msgRemove: string = `Order with id ${mockOrders[0].id} has been removed`;
    jest.spyOn(service, 'remove').mockResolvedValue(msgRemove);

    await expect(controller.remove('abc123')).resolves.toEqual(msgRemove);
    expect(service.remove).toHaveBeenCalledWith('abc123');
  });
});
