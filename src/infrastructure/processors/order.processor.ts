import { OrderProcessingService } from '@/application/services/order-processing.service';
import { CreateOrderDto } from '@/domain/dtos/create-order.dto';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('orders')
export class OrderProcessor {
  constructor(
    private readonly orderProcessingService: OrderProcessingService,
  ) {}

  @Process('process')
  async handleProcess(job: Job<CreateOrderDto>) {
    const { data } = job;
    await this.orderProcessingService.processOrder(data);
    console.log('Processing order:', data);
  }
}
