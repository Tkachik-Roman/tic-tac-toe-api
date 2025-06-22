// Возможные ячейки на игровой доске: 0 - пусто, 1 - X, 2 - O
export type CellValue = 0 | 1 | 2;
// Матрица 3х3 из элементов типа CellValue
export type GameBoard = CellValue[][];

// Начальное состояние игровой доски
export const EMPTY_BOARD: GameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];