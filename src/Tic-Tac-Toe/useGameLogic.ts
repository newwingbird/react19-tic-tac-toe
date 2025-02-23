import { useState } from 'react';
import { SquareValue, GameHistory } from './models';

type GameLogic = {
    current: GameHistory;
    histories: GameHistory[];
    winner: SquareValue;
    handleMakeMove: (squareIndex: number) => void;
    jumpTo: (step: number) => void;
    handleNewGame: () => void;
};

/**
 * ゲームのロジックを管理するフック
 * @returns ゲームの状態と操作を提供するオブジェクト
 */
export function useGameLogic() : GameLogic {
    const initialHistory: GameHistory[] = [
        { squares: Array(9).fill(null), xIsNext: true, step: 0 }
    ];
    const [histories, setHistories] = useState<GameHistory[]>(initialHistory);

    /**
     * 勝者を判定する
     * @param 盤面の状態
     * @returns 勝者がいる場合は勝者の記号、いない場合はnull
     */
    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const judgeLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const winningLine = judgeLines.find(([a, b, c]) =>
            squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
        );
        return winningLine ? squares[winningLine[0]] : null;
    };

    /**
     * １ターンの処理を行う
     * @param クリックされたマスのインデックス
     */
    const handleMakeMove = (squareIndex: number) => {
        setHistories(prevHistories => {
            const current = prevHistories.at(-1);
            if (!current) throw new Error('current history is undefined');
            const isWinner = calculateWinner(current.squares);
            const isSquareFilled = current.squares[squareIndex];
            // 勝者が決まっている場合やマスが埋まっている場合は処理を行わない
            if (isWinner || isSquareFilled) return prevHistories;
            const newStep = current.step + 1;
            const newSquares = current.squares.map((square, index) =>
                index === squareIndex ? (current.xIsNext ? 'X' : 'O') : square
            );
            // 新しい履歴を追加
            return [
                ...prevHistories,
                { squares: newSquares, xIsNext: !current.xIsNext, step: newStep },
            ];
        });
    };

    /**
     * 指定したステップの履歴にジャンプ
     * @param 履歴のステップ
     */
    const jumpTo = (step: number) => {
        setHistories(prevHistory =>
            prevHistory.filter((_, index) => index <= step)
        );
    };

    /**
     * 履歴を初期化して新しいゲームを開始する
     */
    const handleNewGame = () => {
        setHistories(initialHistory);
    };

    const current = histories.at(-1);
    if (!current) throw new Error('current history is undefined');
    const winner = calculateWinner(current.squares);

    return { current, histories, winner, handleMakeMove, jumpTo, handleNewGame };
}