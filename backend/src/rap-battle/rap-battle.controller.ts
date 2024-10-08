import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { RapBattleService } from './rap-battle.service';

@Controller('rap-battle')
export class RapBattleController {
  constructor(private readonly rapBattleService: RapBattleService) {}

  @Get('stream')
  async streamRap(@Query('theme') theme: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked'); 

    const rapStream = this.rapBattleService.rapBattleStream(theme);

    for await (const chunk of rapStream) {
      res.write(chunk); 
    }

    res.end();
  }
}
