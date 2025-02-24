import { expect, test, describe } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from './useGameLogic';

describe('useGameLogic', () => {
    test('初期状態が正しく設定される', () => {
        const { result } = renderHook(() => useGameLogic());
        const { current, histories, winner } = result.current;
        
        expect(histories.length).toBe(1);
        expect(current.squares).toEqual(Array(9).fill(null));
        expect(winner).toBeNull();
    });

    test('handleMakeMoveで盤面が更新される', () => {
        const { result } = renderHook(() => useGameLogic());
        
        act(() => {
            result.current.handleMakeMove(0);
        });
        const { current, histories, winner } = result.current;
        
        // 初手なので、Xが0番のマスに入り、履歴が追加される
        expect(histories.length).toBe(2);
        expect(current.squares[0]).toBe('X');
        expect(winner).toBeNull();
    });

    test('勝者が決定した後、handleMakeMoveが無視される', () => {
        const { result } = renderHook(() => useGameLogic());
        
        // 勝つ条件を作る: 0,1,2番でXが揃うようにする
        act(() => {
            result.current.handleMakeMove(0); // X
            result.current.handleMakeMove(3); // O
            result.current.handleMakeMove(1); // X
            result.current.handleMakeMove(4); // O
            result.current.handleMakeMove(2); // X で勝利
        });
        const { histories, winner } = result.current;
        expect(winner).toBe('X');
        
        // 勝者が決定している状態でのクリックは無視されるはず
        const previousLength = histories.length;
        act(() => {
            result.current.handleMakeMove(5);
        });
        expect(result.current.histories.length).toBe(previousLength);
    });

    test('jumpToHistoryで履歴の状態が巻き戻る', () => {
        const { result } = renderHook(() => useGameLogic());
        
        act(() => {
            result.current.handleMakeMove(0); // step 1
            result.current.handleMakeMove(1); // step 2
        });
        expect(result.current.histories.length).toBe(3);

        act(() => {
            result.current.jumpToHistory(1);
        });
        // jumpTo(1)実行後、履歴は step0（初期状態） と step1までになるので配列の長さは2になる
        expect(result.current.histories.length).toBe(2);
    });

    test('handleNewGameで状態が初期化される', () => {
        const { result } = renderHook(() => useGameLogic());
        
        act(() => {
            result.current.handleMakeMove(0);
            result.current.handleMakeMove(1);
        });
        expect(result.current.histories.length).toBeGreaterThan(1);
        
        act(() => {
            result.current.handleNewGame();
        });
        // 新しいゲーム開始後は履歴が初期状態に戻る
        expect(result.current.histories.length).toBe(1);
        expect(result.current.current.squares).toEqual(Array(9).fill(null));
    });
});