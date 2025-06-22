import { GameBoardDs } from './game-board.entity';

export class GameEntity {
  constructor(
    public readonly id: string,
    public board: GameBoardDs,
    public readonly initialBoard: GameBoardDs,
    public currentPlayer: 1 | 2,
    public readonly createdAt: Date = new Date(),
    public readonly ttl: number = 24 * 60 * 60 * 1000
  ) {}
}