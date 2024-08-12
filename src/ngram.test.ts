import { RPSMove, type RPSTurn, RPSNGram, RPSNGramCounts } from './ngram';
import { test, expect } from 'bun:test';

test('RPSNGram.getKey', () => {
    const ngram = new RPSNGram(2);
    ngram.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER});
    ngram.addTurn({player: RPSMove.PAPER, opponent: RPSMove.SCISSORS});
    ngram.addTurn({player: RPSMove.SCISSORS, opponent: RPSMove.ROCK});
    expect(ngram.getKey()).toBe('PS:S');
    expect(ngram.getNextKeyPrefix()).toBe('SR:');

    // Special case of n=1
    const ngram1 = new RPSNGram(1);
    ngram1.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER});
    expect(ngram1.getKey()).toBe('R');
    expect(ngram1.getNextKeyPrefix()).toBe('');

});

test('RPSNGramCounts', () => {
    const ngramCounts = new RPSNGramCounts(2);
    expect(ngramCounts.N).toBe(27);
    expect(ngramCounts.N0).toBe(27);
    expect(ngramCounts.getProbability('RR:S')).toBe(1/27);

    // Check invalid keys
    expect(() => { ngramCounts.getProbability('RR'); }).toThrow();
    expect(() => { ngramCounts.getProbability('RL:S'); }).toThrow();
    expect(() => { ngramCounts.getProbability('RPS:S'); }).toThrow();
    expect(() => { ngramCounts.getProbability('RP:PS:S'); }).toThrow();

    ngramCounts.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER});
    
    // Should still have an empty dictionary
    expect(ngramCounts.N).toBe(27);
    expect(ngramCounts.dict).toEqual({});

    ngramCounts.addTurn({player: RPSMove.PAPER, opponent: RPSMove.SCISSORS});

    expect(ngramCounts.N).toBe(28);
    expect(ngramCounts.getProbability('RP:P')).toBe(1/14);
    expect(ngramCounts.getProbability('PP:S')).toBe(1/28);

    // Next move probability
    expect(ngramCounts.getNextMoveProbabilities()).toEqual([1/3, 1/3, 1/3]);

    ngramCounts.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER });
    // Now there's been two rounds of rock-paper; probability of paper should be higher
    expect(ngramCounts.getNextMoveProbabilities()).toEqual([1/4, 1/2, 1/4]);
    expect(ngramCounts.getNextMovePrediction()).toBe(RPSMove.PAPER);
});