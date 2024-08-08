import { Controller } from '@nestjs/common';
import { BullBoardInstance, InjectBullBoard } from '@bull-board/nestjs';

@Controller('my-feature')
export class FeatureController {
  constructor(
    @InjectBullBoard() private readonly boardInstance: BullBoardInstance,
  ) {}
}
