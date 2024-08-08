import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Name of the customer' })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ description: 'Name of the product' })
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
