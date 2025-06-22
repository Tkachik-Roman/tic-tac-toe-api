import { GameEntity } from '../model/game.entity';

export interface ITicTacToeRepository {
  saveGame(game: GameEntity): Promise<void>;
  getGame(id: string): Promise<GameEntity | null>;
  getAllGames(): Promise<GameEntity[]>;
  deleteGame(id: string): Promise<void>;
}