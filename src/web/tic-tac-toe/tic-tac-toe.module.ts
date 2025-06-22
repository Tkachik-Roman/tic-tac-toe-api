import { Module } from '@nestjs/common';
import { TicTacToeController } from './controller/tic-tac-toe.controller';
import { TicTacToeWebService } from './service/tic-tac-toe-web.service';
import { TicTacToeMapper } from './mapper/tic-tac-toe.mapper';
import { DomainModule } from '../../domain/domain.module';
import { DatasourceModule } from '../../datasource/datasource.module';

@Module({
  imports: [DomainModule, DatasourceModule],
  controllers: [TicTacToeController],
  providers: [
    {
      provide: 'ITicTacToeMapper',
      useClass: TicTacToeMapper,
    },
    {
      provide: 'ITicTacToeWebService',
      useClass: TicTacToeWebService,
    },
  ],
  exports: ['ITicTacToeWebService', 'ITicTacToeMapper'],
})
export class TicTacToeModule {}