import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Order } from '../../../orders/entities/order.entity';

export const ApiFindAllResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'List of all orders retrieved successfully.',
      type: [Order],
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
