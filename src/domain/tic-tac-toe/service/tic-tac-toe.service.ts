import { Inject, Injectable } from '@nestjs/common';
import { ITicTacToeService } from './tic-tac-toe.interface';
import { Game } from '../model/game.model';
import { ITicTacToeDsService } from '../../../datasource/tic-tac-toe/service/tic-tac-toe-ds.interface';
import { GameBoard, CellValue } from '../model/game-board.model';

@Injectable()
export class TicTacToeService implements ITicTacToeService {
  constructor(
    @Inject('ITicTacToeDsService')
    private readonly dataService: ITicTacToeDsService,
  ) {}

  async getGame(id: string): Promise<Game | null> {
    return this.dataService.getGame(id);
  }

  // Получение следующего хода игрока на игровой доске
  async getNextMove(game: Game): Promise<{ row: number; col: number }> {
    const { board, currentPlayer } = game;
    const { row, col } = this.findBestMove(board, currentPlayer);
    return { row, col };
  }

  // Проверка текущей игровой доски на правильность (доска 3x3, значения 0/1/2)
  validateBoard(game: Game): boolean {
    if (!game.board || game.board.length !== 3 || game.board.some(row => row.length !== 3)) {
      return false;
    }
    return true;
  }

  checkGameEnd(board: GameBoard): { finished: boolean; winner?: 1 | 2 } {
    // Проверка строк (горизонтальных рядов) на заполнение одинаковыми элементами
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return { finished: true, winner: board[i][0] as 1 | 2 };
      }
    }

    // Проверка столбцов (вертикальных рядов)
    for (let j = 0; j < 3; j++) {
      if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return { finished: true, winner: board[0][j] as 1 | 2 };
      }
    }

    // Проверка главных диагоналей
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return { finished: true, winner: board[0][0] as 1 | 2 };
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return { finished: true, winner: board[0][2] as 1 | 2 };
    }

    // Проверка на ничью
    const isDraw = board.flat().every(cell => cell !== 0);
    return { finished: isDraw };
  }

  // Нахождение координат наилучшего возможного следующего хода
  private findBestMove(board: GameBoard, player: CellValue): { row: number; col: number } {
    // Оценка лучшего хода (лучший найденный балл)
    let bestScore = -Infinity;
    let bestMove = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = player;
          const score = this.minimax(board, 0, false, player);
          board[i][j] = 0;

          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, col: j };
          }
        }
      }
    }

    return bestMove;
  }

  // Нахождение балла для оценки текущего состояния игровой доски
  private minimax(
    board: GameBoard,
    depth: number,
    isMaximizing: boolean,
    aiPlayer: CellValue,
  ): number {
    const result = this.checkGameEnd(board);
    // Проверка окончания игры
    if (result.finished) {
      if (result.winner === aiPlayer) return 10 - depth;
      if (result.winner === this.getOpponent(aiPlayer)) return depth - 10;
      return 0;
    }

    // Выбор лучшего хода среди возможных
    // Для максимализирующего этапа (ход первого икрока)
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = aiPlayer;
            // Рекурсивный вызов алгоритма Минимакс с увеличением глубины и переключением на противоположного игрока
            const score = this.minimax(board, depth + 1, false, aiPlayer);
            board[i][j] = 0;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      // Для минимизирующего этапа (ход оппонента игрока)
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = this.getOpponent(aiPlayer);
            const score = this.minimax(board, depth + 1, true, aiPlayer);
            board[i][j] = 0;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  // Определение противоположного игрока заменой значений друг на друга (Х на О или О на Х)
  private getOpponent(player: CellValue): CellValue {
    return player === 1 ? 2 : 1;
  }

}