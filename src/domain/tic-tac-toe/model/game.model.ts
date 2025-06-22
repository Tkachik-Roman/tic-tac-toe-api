import { GameBoard } from './game-board.model';

export class Game {
  constructor(
    // Уникальный идентификатор игры
    public readonly id: string,
    // Текущее состояние игровой доски
    public board: GameBoard,
    // Начальное состояние игровой доски 
    public readonly initialBoard: GameBoard,
    // Текущий игрок 1 - X, 2 - O
    public currentPlayer: 1 | 2 = 1,
    // Дата начала игры
    public readonly createdAt: Date = new Date(),
    // Автоматическое удаление игры через 24 часа
    public readonly ttl: number = 24 * 60 * 60 * 1000
  ) {}
}