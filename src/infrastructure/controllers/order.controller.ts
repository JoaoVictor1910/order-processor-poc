import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOrderDto } from '@/domain/dtos/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(@InjectQueue('orders') private readonly ordersQueue: Queue) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const job = await this.ordersQueue.add('process', createOrderDto);
    return { jobId: job.id };
  }
}
