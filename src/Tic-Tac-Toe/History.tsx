import React from 'react';
import { GameHistory } from "./models";
import './Tic-Tac-Toe.css';

type HistoryProps = {
  histories: GameHistory[];
  jumpTo: (step: number) => void;
};

/**
 * ゲームの履歴を表示するコンポーネント
 */
const History: React.FC<HistoryProps> = ({ histories, jumpTo }: HistoryProps) => {
  return (
    <div>
      <ol className="history">
        {histories.map((_, move) => {
          // moveが0なら初期状態、それ以外ならムーブ番号を表示
          return (
            <li key={move}>
              <button className="history-item" onClick={() => jumpTo(move)}>
                {`Go to move #${move}`}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default History;
