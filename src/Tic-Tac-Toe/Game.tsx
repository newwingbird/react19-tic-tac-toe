import { useGameLogic } from "./useGameLogic";
import "./Tic-Tac-Toe.css";
import Board from "./Board";
import History from "./History";

/**
 * マルバツゲームを管理表示するコンポーネント
 */
function Game() {
  const { current, histories, winner, handleMakeMove, jumpTo, handleNewGame } =
    useGameLogic();

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleMakeMove} />
      </div>
      <div className="game-info">
        {winner && (
          <>
            <div className="winner">Winner: {winner}</div>
            <button type="button" className="new-game" onClick={handleNewGame}>
              New Game
            </button>
          </>
        )}
        <History histories={histories} jumpTo={jumpTo} />
      </div>
    </div>
  );
}

export default Game;
