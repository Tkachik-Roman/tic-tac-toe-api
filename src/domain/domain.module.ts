import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module';
import { TicTacToeService } from './tic-tac-toe/service/tic-tac-toe.service';

@Module({
  imports: [DatasourceModule],
  providers: [
    {
      provide: 'ITicTacToeService',
      useClass: TicTacToeService,
    },
  ],
  exports: ['ITicTacToeService'],
})
export class DomainModule {}