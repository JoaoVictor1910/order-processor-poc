import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullConfigModule } from './bull-config.module';
import { OrdersModule } from './orders.module';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRoot({
      route: '/admin',
      adapter: ExpressAdapter,
    }),
    BullConfigModule,
    OrdersModule,
  ],
})
export class AppModule {}
