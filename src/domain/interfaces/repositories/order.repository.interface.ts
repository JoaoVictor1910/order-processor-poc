import { OrderEntity } from '@/domain/entities/order.entity';

export interface OrderRepositoryInterface {
  save(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
}
