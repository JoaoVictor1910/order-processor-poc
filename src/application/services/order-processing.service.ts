import { Inject, Injectable } from '@nestjs/common';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface';
import { CreateOrderDto } from '@/domain/dtos/create-order.dto';
import { v4 as uuid } from 'uuid';
import { STATUS_ENUM } from '@/domain/enums/status.enum';

@Injectable()
export class OrderProcessingService {
  constructor(
    @Inject('OrderRepositoryInterface')
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async processOrder(orderData: CreateOrderDto): Promise<OrderEntity> {
    const order = OrderEntity.create({
      id: uuid(),
      customerName: orderData.customerName,
      product: orderData.product,
      quantity: orderData.quantity,
      status: STATUS_ENUM.PROCESSING,
    });
    return await this.orderRepository.save(order);
  }
}
