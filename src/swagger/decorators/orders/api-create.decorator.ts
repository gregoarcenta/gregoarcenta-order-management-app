import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Order } from "../../../orders/entities/order.entity";

export const ApiCreateResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'Order has been successfully created.',
      type: Order,
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
