import { GameBoardDto } from './game-board.dto';
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GameDto {
  constructor(
    public readonly id: string,
    public board: GameBoardDto,
    public readonly currentPlayer: 'X' | 'O',
    public readonly createdAt: Date,
  ) {}
}

export class MakeMoveDto {
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;

  @IsArray()
  @IsNotEmpty()
  readonly board: GameBoardDto;

  @IsIn(['X', 'O'])
  readonly player: 'X' | 'O';

  constructor(gameId: string, board: GameBoardDto, player: 'X' | 'O') {
    this.gameId = gameId;
    this.board = board;
    this.player = player;
  }
}