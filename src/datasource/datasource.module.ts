import { Module } from '@nestjs/common';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';

@Module({
  imports: [TicTacToeModule],
  exports: [TicTacToeModule],
})
export class DatasourceModule {}