import { RPSMove, type RPSTurn, RPSNGram, RPSNGramCounts } from './ngram';
import { test, expect } from 'bun:test';

test('RPSNGram.getKey', () => {
    const ngram = new RPSNGram(2);
    ngram.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER});
    ngram.addTurn({player: RPSMove.PAPER, opponent: RPSMove.SCISSORS});
    ngram.addTurn({player: RPSMove.SCISSORS, opponent: RPSMove.ROCK});
    expect(ngram.getKey()).toBe('PS:S');

});

test('RPSNGramCounts', () => {
    const ngramCounts = new RPSNGramCounts(2);
    expect(ngramCounts.N).toBe(27);
    expect(ngramCounts.N0).toBe(27);
    expect(ngramCounts.getP('RR:S')).toBe(1/27);

    // Check invalid keys
    expect(() => { ngramCounts.getP('RR'); }).toThrow();
    expect(() => { ngramCounts.getP('RL:S'); }).toThrow();
    expect(() => { ngramCounts.getP('RPS:S'); }).toThrow();
    expect(() => { ngramCounts.getP('RP:PS:S'); }).toThrow();

    ngramCounts.addTurn({player: RPSMove.ROCK, opponent: RPSMove.PAPER});
    
    // Should still have an empty dictionary
    expect(ngramCounts.N).toBe(27);
    expect(ngramCounts.dict).toEqual({});

    ngramCounts.addTurn({player: RPSMove.PAPER, opponent: RPSMove.SCISSORS});

    expect(ngramCounts.N).toBe(28);
    expect(ngramCounts.getP('RP:P')).toBe(1/14);
    expect(ngramCounts.getP('PP:S')).toBe(1/28);
});