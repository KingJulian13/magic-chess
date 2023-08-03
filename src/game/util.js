import { SQUARES } from 'chess.js';

//src/assets/test.svg
import customSvg from '@/src/assets/svg2.js'


export function toDests(chess) {
    const dests = new Map();
    SQUARES.forEach(s => {
        const ms = chess.moves({ square: s, verbose: true });
        if (ms.length) dests.set(s, ms.map(m => m.to));
    });
    return dests;
}

export function toColor(chess) {
    return (chess.turn() === 'w') ? 'white' : 'black';
}

export function playOtherSide(board, chess) {
    return (orig, dest) => {
        chess.move({ from: orig, to: dest });
        board.setShapes([
            { orig: dest, brush: 'red', customSvg }
        ]);
        // block board from inputs for 4 seconds
        board.set({ movable: { color: undefined } })
        setTimeout(() => {
            board.set({
                turnColor: toColor(chess),
                movable: {
                    color: toColor(chess),
                    dests: toDests(chess)
                }
            });
        }, 4000)
    };
}

export function aiPlay(board, chess, delay, firstMove) {
    return (orig, dest) => {
        chess.move({ from: orig, to: dest });
        setTimeout(() => {
            const moves = chess.moves({ verbose: true });
            const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
            chess.move(move.san);
            board.move(move.from, move.to);
            board.set({
                turnColor: toColor(chess),
                movable: {
                    color: toColor(chess),
                    dests: toDests(chess)
                }
            });
            board.playPremove();
        }, delay);
    };
}
