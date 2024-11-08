import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { HandlerException } from "../common/exceptions/handler.exception";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, HandlerException],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
