import { OrderEntity } from '@/domain/entities/order.entity';
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  private orders: OrderEntity[] = [];

  async save(order: OrderEntity): Promise<OrderEntity> {
    this.orders.push(order);
    return order;
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.orders.find((order) => order.id === id) || null;
  }
}
