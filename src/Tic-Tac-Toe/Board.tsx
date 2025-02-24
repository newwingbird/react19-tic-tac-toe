import React from 'react';
import './Tic-Tac-Toe.css';
import { SquareValue } from './models';

type SquareProps = {
  square: SquareValue;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ square, onClick }: SquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      {square === 'empty' ? '' : square}
    </button>
  );
};

type BoardProps = {
  squares: SquareValue[];
  onClick: (i: number) => void;
};

/**
 * 盤面を表示するコンポーネント
 */
const Board: React.FC<BoardProps> = ({squares, onClick}: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        square={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;

