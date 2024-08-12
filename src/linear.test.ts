import { test, expect } from 'bun:test';
import { RPSLinearNGramCombo, type RPSLinearNGramComboPrediction } from './linear';
import { RPSMove } from './ngram';

test('RPSLinearNGramCombo', () => {
    const combo = new RPSLinearNGramCombo(3);
    expect(combo.countDicts.length).toBe(3);
    expect(combo.countDicts[0].n).toBe(1);
    expect(combo.countDicts[1].n).toBe(2);
    expect(combo.countDicts[2].n).toBe(3);
    expect(combo.x).toEqual([1/3, 1/3, 1/3]);

    // For now, all probabilities are equal
    const npred = combo.getNextMovePrediction();
    expect(npred.matrix).toEqual([
        [1/3, 1/3, 1/3],
        [1/3, 1/3, 1/3],
        [1/3, 1/3, 1/3]
    ]);
    expect(npred.probabilities).toEqual([1/3, 1/3, 1/3]);
    // "Train" the model with a pattern: player always plays Rock-Paper-Scissors
    for (let i = 0; i <= 300; i++) {
        const oppMove = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS][i%3];
        combo.updateWeights({player: RPSMove.ROCK, opponent: oppMove});
        combo.updateWeights({player: RPSMove.PAPER, opponent: oppMove});
        combo.updateWeights({player: RPSMove.SCISSORS, opponent: oppMove});
    }

    const tpred = combo.getNextMovePrediction();
    // Expect the weight of n = 2 to be highest
    expect(combo.x.indexOf(Math.max(...combo.x))).toBe(1);
    // The first row of the matrix should have equal probabilities
    expect(tpred.matrix[0]).toEqual([1/3, 1/3, 1/3]);
    // The other two should overwhelmingly predict the opponent's move
    expect(tpred.matrix[1][0]).toBeCloseTo(101/103);
    expect(tpred.matrix[1][1]).toBeCloseTo(1/103);
    expect(tpred.matrix[1][2]).toBeCloseTo(1/103);

    expect(tpred.matrix[2][0]).toBeCloseTo(101/103);
    expect(tpred.matrix[2][1]).toBeCloseTo(1/103);
    expect(tpred.matrix[2][2]).toBeCloseTo(1/103);

});