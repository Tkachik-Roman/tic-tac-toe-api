import { Game } from '../../../domain/tic-tac-toe/model/game.model';
import { GameEntity } from '../model/game.entity';
import { GameBoard } from '../../../domain/tic-tac-toe/model/game-board.model';
import { GameBoardDs } from '../model/game-board.entity';

// Класс преобразования междую моделью доменного уровня и уровнем представлений (мост между двумя разными моделями данных)
export class GameMapper {
  static toDomain(entity: GameEntity): Game {
    return new Game(
      entity.id,
      entity.board.map(row => [...row]) as GameBoard,
      entity.initialBoard.map(row => [...row]) as GameBoard,
      entity.currentPlayer,
      entity.createdAt,
      entity.ttl
    );
  }

  static toEntity(domain: Game): GameEntity {
    return new GameEntity(
      domain.id,
      domain.board.map(row => [...row]) as GameBoardDs,
      domain.initialBoard.map(row => [...row]) as GameBoardDs,
      domain.currentPlayer,
      domain.createdAt,
      domain.ttl
    );
  }
}