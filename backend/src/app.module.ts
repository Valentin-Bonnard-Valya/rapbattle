import { Module } from '@nestjs/common';
import { RapBattleModule } from './rap-battle/rap-battle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    RapBattleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
