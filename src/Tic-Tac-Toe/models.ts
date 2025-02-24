/**
 * マス目の状態
 */
export type SquareValue = 'X' | 'O' | 'empty';

/**
 * ステップ毎のゲーム盤面の履歴
 */
export type GameHistory = {
  step: number;
  squares: SquareValue[];
  xIsNext: boolean;
};

/**
 * ゲーム盤面の履歴 
 * - 初期状態の履歴を持つ
 */
export type GameHitories = GameHistory[];
