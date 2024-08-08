import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
    }),

    BullBoardModule.forFeature({
      name: 'orders',
      adapter: BullMQAdapter,
    }),
  ],
})
export class BullConfigModule {}
