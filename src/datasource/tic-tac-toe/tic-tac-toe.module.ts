import { Module } from '@nestjs/common';
import { TicTacToeRepository } from './repository/tic-tac-toe.repository';
import { TicTacToeDsService } from './service/tic-tac-toe-ds.service';
import { GameStorage } from './storage/game.storage';

@Module({
  providers: [
    GameStorage,
    {
      provide: 'ITicTacToeRepository',
      useClass: TicTacToeRepository,
    },
    {
      provide: 'ITicTacToeDsService',
      useClass: TicTacToeDsService,
    },
  ],
  exports: [
    'ITicTacToeDsService', 
    'ITicTacToeRepository'
  ],
})
export class TicTacToeModule {}