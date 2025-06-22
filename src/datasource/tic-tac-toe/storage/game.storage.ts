import { GameEntity } from '../model/game.entity';

export class GameStorage {
  private games: Map<string, GameEntity> = new Map();

  // Автоматическая очистка старых игр
  private cleanupOldGames() {
    const now = new Date();
    this.games.forEach((game, id) => {
      if (now.getTime() - game.createdAt.getTime() > game.ttl) {
        this.games.delete(id);
      }
    });
  }

  save(game: GameEntity): void {
    this.cleanupOldGames();
    this.games.set(game.id, game);
  }

  get(id: string): GameEntity | null {
    return this.games.get(id) || null;
  }

  getAll(): GameEntity[] {
    return Array.from(this.games.values());
  }

  clear(): void {
    this.games.clear();
  }

  delete(id: string): void {
    this.games.delete(id);
  }
}