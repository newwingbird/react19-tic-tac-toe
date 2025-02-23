/**
 * マス目の状態
 */
export type SquareValue = 'X' | 'O' | null;

/**
 * ステップ毎のゲーム盤面の履歴
 */
export type GameHistory = {
  step: number;
  squares: SquareValue[];
  xIsNext: boolean;
};

