export type CellValueDto = 'EMPTY' | 'X' | 'O';
export type GameBoardDto = CellValueDto[][];

export const EMPTY_BOARD_DTO: GameBoardDto = [
  ['EMPTY', 'EMPTY', 'EMPTY'],
  ['EMPTY', 'EMPTY', 'EMPTY'],
  ['EMPTY', 'EMPTY', 'EMPTY'],
];