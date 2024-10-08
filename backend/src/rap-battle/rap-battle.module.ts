import { Module } from '@nestjs/common';
import { RapBattleService } from './rap-battle.service';
import { RapBattleController } from './rap-battle.controller';

@Module({
  providers: [RapBattleService],
  controllers: [RapBattleController]
})
export class RapBattleModule {}
