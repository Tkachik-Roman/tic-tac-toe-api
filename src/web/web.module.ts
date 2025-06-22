import { Module } from '@nestjs/common';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    DomainModule,
    TicTacToeModule,
  ],
  exports: [TicTacToeModule],
})
export class WebModule {}