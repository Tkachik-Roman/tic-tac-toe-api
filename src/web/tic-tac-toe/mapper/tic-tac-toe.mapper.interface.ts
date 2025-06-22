import { Game } from '../../../domain/tic-tac-toe/model/game.model';
import { GameDto, MakeMoveDto } from '../model/game.dto';
import { GameBoardDto } from '../model/game-board.dto';
import { GameBoard } from '../../../domain/tic-tac-toe/model/game-board.model';

export interface ITicTacToeMapper {
  toDomain(dto: MakeMoveDto): Promise<Game>;
  toDto(domain: Game): GameDto;
  mapBoardToDomain(dtoBoard: GameBoardDto): GameBoard;
}