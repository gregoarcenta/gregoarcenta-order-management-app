import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Order } from '../../../orders/entities/order.entity';

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'Order updated successfully.',
      type: Order,
    }),
    ApiParam({ description: 'Order ID', name: 'id' }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      internalServerError: true,
    }),
  );
};
