import { Injectable, Inject } from '@nestjs/common';
import { ITicTacToeDsService } from './tic-tac-toe-ds.interface';
import { Game } from '../../../domain/tic-tac-toe/model/game.model';
import { ITicTacToeRepository } from '../repository/tic-tac-toe.repository.interface';
import { GameMapper } from '../mapper/game.mapper';

@Injectable()
export class TicTacToeDsService implements ITicTacToeDsService {
  constructor(
    @Inject('ITicTacToeRepository')
    private readonly repository: ITicTacToeRepository,
  ) {}

  async saveGame(game: Game): Promise<void> {
    const entity = GameMapper.toEntity(game);
    await this.repository.saveGame(entity);
  }

  async getGame(id: string): Promise<Game | null> {
    const entity = await this.repository.getGame(id);
    return entity ? GameMapper.toDomain(entity) : null;
  }

  async getAllGames(): Promise<Game[]> {
    const entities = await this.repository.getAllGames();
    return entities.map(GameMapper.toDomain);
  }

  async deleteGame(id: string): Promise<void> {
    await this.repository.deleteGame(id);
  }
}