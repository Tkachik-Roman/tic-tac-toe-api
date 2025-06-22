import { Injectable, Inject } from '@nestjs/common';
import { ITicTacToeMapper } from './tic-tac-toe.mapper.interface';
import { Game } from '../../../domain/tic-tac-toe/model/game.model';
import { GameDto, MakeMoveDto } from '../model/game.dto';
import { GameBoardDto } from '../model/game-board.dto';
import { GameBoard } from '../../../domain/tic-tac-toe/model/game-board.model';
import { ITicTacToeService } from '../../../domain/tic-tac-toe/service/tic-tac-toe.interface';

@Injectable()
export class TicTacToeMapper implements ITicTacToeMapper {
  constructor(
    @Inject('ITicTacToeService')
    private readonly gameService: ITicTacToeService,
  ) {}

  // Преобразование DataTransferObject запроса на ход MakeMoveDto в доменную модель Game (преобразование DTO -> Domain)
  async toDomain(dto: MakeMoveDto): Promise<Game> {
    // Получение начального состояния игры из хранилища
    const existingGame = await this.gameService.getGame(dto.gameId);
    
    if (!existingGame) {
      throw new Error(`Game with id ${dto.gameId} not found`);
    }

    return new Game(
      dto.gameId,
      // Преобразование строковых X, O, EMPTY в числовые 0, 1, 2
      // Получение текущего состояния игровой доски от клиента
      this.mapBoardToDomain(dto.board),
      // Получение Начального состояния игровой доски из БД
      existingGame.initialBoard,
      // Конвертация X в 1 и O в 2
      dto.player === 'X' ? 1 : 2,
      existingGame.createdAt,
    );
  }

  // Преобразование Domain -> DTO
  toDto(domain: Game): GameDto {
    return new GameDto(
      domain.id,
      this.mapBoardToDto(domain.board),
      domain.currentPlayer === 1 ? 'X' : 'O',
      domain.createdAt,
    );
  }

  // Преобразование игрового поля DTO -> Domain
  public mapBoardToDomain(dtoBoard: GameBoardDto): GameBoard {
    return dtoBoard.map(row =>
      row.map(cell => {
        switch (cell) {
          case 'X': return 1;
          case 'O': return 2;
          default: return 0;
        }
      }),
    ) as GameBoard;
  }

  // Преобразование игрового поля Domain -> DTO
  public mapBoardToDto(domainBoard: GameBoard): GameBoardDto {
    return domainBoard.map(row =>
      row.map(cell => {
        switch (cell) {
          case 1: return 'X';
          case 2: return 'O';
          default: return 'EMPTY';
        }
      }),
    ) as GameBoardDto;
  }
}