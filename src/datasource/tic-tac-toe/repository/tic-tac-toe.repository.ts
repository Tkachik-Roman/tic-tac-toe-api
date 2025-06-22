import { Injectable } from '@nestjs/common';
import { ITicTacToeRepository } from './tic-tac-toe.repository.interface';
import { GameEntity } from '../model/game.entity';
import { GameStorage } from '../storage/game.storage';

@Injectable()
export class TicTacToeRepository implements ITicTacToeRepository {
  constructor(private readonly storage: GameStorage) {}

  async saveGame(game: GameEntity): Promise<void> {
    this.storage.save(game);
  }

  async getGame(id: string): Promise<GameEntity | null> {
    return this.storage.get(id);
  }

  async getAllGames(): Promise<GameEntity[]> {
    return this.storage.getAll();
  }

  async deleteGame(id: string): Promise<void> {
    this.storage.delete(id);
  }
}