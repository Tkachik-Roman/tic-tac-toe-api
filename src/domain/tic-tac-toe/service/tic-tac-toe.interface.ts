import { Game } from '../model/game.model';
import { GameBoard } from '../model/game-board.model';

export interface ITicTacToeService {
  getNextMove(game: Game): Promise<{ row: number; col: number }>;
  validateBoard(game: Game): boolean;
  checkGameEnd(board: GameBoard): { finished: boolean; winner?: 1 | 2 };
  getGame(id: string): Promise<Game | null>;
}