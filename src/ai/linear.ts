import { RPSMove, RPSNGramCounts, type RPSTurn } from "./ngram";
import { maxIndex } from "./utils";

export type RPSLinearNGramComboPrediction = {
    matrix: number[][],
    probabilities: number[],
    index: number
    move: RPSMove
};

export class RPSLinearNGramCombo {
    maxN: number;
    countDicts: RPSNGramCounts[];
    x: number[];
    lr: number;

    constructor(maxN: number, learningRate: number = 0.1) {
        this.maxN = maxN;
        this.countDicts = Array.from({length: maxN}, (_, i) => new RPSNGramCounts(i+1));
        this.x = Array.from({length: maxN}, () => 1.0/maxN); // Initial assumpion: all ngrams are equally important
        this.lr = learningRate;
    }

    getNextMovePrediction(): RPSLinearNGramComboPrediction {
        const pmat = this.countDicts.map((countDict) => (countDict.getNextMoveProbabilities()));
        const x = this.x;
        const probs = pmat.reduce((acc, p, i) => {return acc.map((p0, j) => (p0+p[j]*x[i])) } , [0.0, 0.0, 0.0]);
        const i = maxIndex(probs);
        const move = ['R', 'P', 'S'][i] as RPSMove;
        return {matrix: pmat, probabilities: probs, index: i, move: move};
    }

    updateWeights(turn: RPSTurn) {
        // First, get the current best prediction
        const pred = this.getNextMovePrediction();
        // Now the true result
        const trueIndex = ['R', 'P', 'S'].indexOf(turn.player);
        // Update the N-grams
        for (let i = 0; i < this.maxN; i++) {
            this.countDicts[i].addTurn(turn);
        }
        // Find which one gave the highest probability for the true result
        const bestIndex = maxIndex(pred.matrix.map(p => p[trueIndex]));
        // Update the weights
        const lr = this.lr;
        this.x = this.x.map((x, i) => (x*(1-lr) + lr*(i === bestIndex ? 1 : 0)));
    }
}