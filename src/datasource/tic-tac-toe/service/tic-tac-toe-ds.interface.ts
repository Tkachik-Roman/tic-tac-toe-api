import { Game } from '../../../domain/tic-tac-toe/model/game.model';

export interface ITicTacToeDsService {
  saveGame(game: Game): Promise<void>;
  getGame(id: string): Promise<Game | null>;
  getAllGames(): Promise<Game[]>;
  deleteGame(id: string): Promise<void>;
}