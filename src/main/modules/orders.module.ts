import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { OrderController } from '@/infrastructure/controllers/order.controller';
import { OrderProcessor } from '@/infrastructure/processors/order.processor';
import { OrderProcessingService } from '@/application/services/order-processing.service';
import { OrderRepository } from '@/infrastructure/repositories/order.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderProcessor,
    OrderProcessingService,
    { provide: 'OrderRepositoryInterface', useClass: OrderRepository },
  ],
})
export class OrdersModule {}
