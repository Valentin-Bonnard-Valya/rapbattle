import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRapBattleDto {
  @IsNotEmpty()
  @IsString()
  theme: string;
}
