import { GameDto } from '../model/game.dto';
import { MakeMoveDto } from '../model/game.dto';
import { Game } from '../../../domain/tic-tac-toe/model/game.model';

export interface ITicTacToeWebService {
  createGame(game: Game): Promise<void>;
  makeMove(move: MakeMoveDto): Promise<GameDto>;
  getGameState(id: string): Promise<GameDto>;
  getAllGames(): Promise<GameDto[]>;
  deleteGame(id: string): Promise<void>;
}