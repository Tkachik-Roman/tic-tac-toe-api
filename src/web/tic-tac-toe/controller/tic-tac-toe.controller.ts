import { Controller, Post, Body, Param, BadRequestException, Inject, Delete, Get } from '@nestjs/common';
import { ITicTacToeWebService } from '../service/tic-tac-toe-web.interface';
import { GameDto, MakeMoveDto } from '../model/game.dto';
import { validate } from 'class-validator';
import { Game } from '../../../domain/tic-tac-toe/model/game.model';
import { v4 as uuidv4 } from 'uuid';
import { EMPTY_BOARD } from '../../../domain/tic-tac-toe/model/game-board.model';
import { ITicTacToeMapper } from '../mapper/tic-tac-toe.mapper.interface'

// Указание обслуживаемых маршрутов
@Controller('game')
export class TicTacToeController {
  constructor(
    @Inject('ITicTacToeWebService')
    private readonly webService: ITicTacToeWebService,
    @Inject('ITicTacToeMapper')
    private readonly mapper: ITicTacToeMapper
  ) {}

  // Создание игры
  @Post()
  async createGame(): Promise<GameDto> {
    const game = new Game(
      uuidv4(),
      EMPTY_BOARD,
      EMPTY_BOARD,
      1
    );
    
    await this.webService.createGame(game);
    return this.mapper.toDto(game);
  }

  // Ход игрока
  @Post(':id/move')
  async makeMove(
    @Param('id') gameId: string,
    @Body() body: Omit<MakeMoveDto, 'gameId'>,
  ): Promise<GameDto> {
    const moveDto = new MakeMoveDto(gameId, body.board, body.player);
    
    // Валидация DTO (валидность полученных данных)
    const errors = await validate(moveDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.webService.makeMove(moveDto);
  }

  // Получение игры по ее ID
  @Get(':id')
  async getGame(@Param('id') id: string): Promise<GameDto> {
    return this.webService.getGameState(id);
  }

  // Получение списка сохраненных игр
  @Get()
  async getAllGames(): Promise<GameDto[]> {
    return this.webService.getAllGames();
  }

  // Удаление сохраненной игры по ее ID
  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<void> {
    await this.webService.deleteGame(id);
  }
}