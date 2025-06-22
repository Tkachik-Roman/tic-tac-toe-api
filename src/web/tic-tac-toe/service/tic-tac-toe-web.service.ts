import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { ITicTacToeWebService } from './tic-tac-toe-web.interface';
import { GameDto, MakeMoveDto } from '../model/game.dto';
import { ITicTacToeService } from '../../../domain/tic-tac-toe/service/tic-tac-toe.interface';
import { ITicTacToeMapper } from '../mapper/tic-tac-toe.mapper.interface';
import { ITicTacToeDsService } from '../../../datasource/tic-tac-toe/service/tic-tac-toe-ds.interface';
import { Game } from '../../../domain/tic-tac-toe/model/game.model';

@Injectable()
export class TicTacToeWebService implements ITicTacToeWebService {
  constructor(
    @Inject('ITicTacToeMapper')
    private readonly mapper: ITicTacToeMapper,
    @Inject('ITicTacToeService')
    private readonly domainService: ITicTacToeService,
    @Inject('ITicTacToeDsService')
    private readonly dataService: ITicTacToeDsService,
  ) {}

  async createGame(game: Game): Promise<void> {
    await this.dataService.saveGame(game);
  }

  // Обработка хода игрока и вычисление ответа сервера
  async makeMove(move: MakeMoveDto): Promise<GameDto> {
    // Преобразование DTO -> Domain с использованием маппера с загрузкой начальной игровой доски из хранилища
    const game = await this.mapper.toDomain(move);

    // console.log(`Current player: ${game.currentPlayer}, received player: ${move.player}`);
    
    // Проверка существования игры по ее ID
    const existingGame = await this.dataService.getGame(move.gameId);
    if (!existingGame) {
      throw new NotFoundException(`Game with id ${move.gameId} not found`);
    }

    // Проверка, что ход делает текущий игрок
    const expectedPlayer = game.currentPlayer === 1 ? 'X' : 'O';
    if (move.player !== expectedPlayer) {
      throw new BadRequestException(`Not your turn. Current player: ${expectedPlayer}`);
    }

    // Проверка правильности текущего состояния игровой доски
    if (!this.domainService.validateBoard(game)) {
      throw new BadRequestException('Invalid game board state');
    }

    // Проверка окончания игры
    const gameStatus = this.domainService.checkGameEnd(game.board);
    if (gameStatus.finished) {
      throw new BadRequestException(
        gameStatus.winner 
          ? `Game already finished. Winner: ${gameStatus.winner === 1 ? 'X' : 'O'}`
          : 'Game already finished as draw'
      );
    }

    // Обновление доски ходом игрока
    game.board = this.mapper.mapBoardToDomain(move.board);

    // Проверка, не выиграл ли игрок после своего хода
    const playerWinStatus = this.domainService.checkGameEnd(game.board);
    if (playerWinStatus.finished) {
      await this.dataService.saveGame(game);
      // Возврат игровой доски без хода компьютера
      return this.mapper.toDto(game);
    }

    // Ход компьютера
    const computerMove = await this.domainService.getNextMove(game);
    game.board[computerMove.row][computerMove.col] = 2;
    // console.log(`Computer move: [${computerMove.row},${computerMove.col}]`);

    // Проверка, не выиграл ли компьютер
    const computerWinStatus = this.domainService.checkGameEnd(game.board);
    if (!computerWinStatus.finished) {
      // Переключение обратно на текущего игрока ("X")
      game.currentPlayer = 1;
    }

    // Сохранение обновленной игры в хранилище
    await this.dataService.saveGame(game);
    // console.log(`Saved game ${game.id}`, { board: game.board, player: game.currentPlayer });

    // Обратное преобразование Domain -> DTO
    return this.mapper.toDto(game);
  }

  async getGameState(id: string): Promise<GameDto> {
    const game = await this.dataService.getGame(id);
    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return this.mapper.toDto(game);
  }

  async getAllGames(): Promise<GameDto[]> {
    const games = await this.dataService.getAllGames();
    return games.map(game => this.mapper.toDto(game));
  }

  async deleteGame(id: string): Promise<void> {
    await this.dataService.deleteGame(id);
  }
}