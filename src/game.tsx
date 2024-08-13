import { RPSLinearNGramCombo } from "./ai";
import { RPSMove } from "./ai/ngram";

export type Score = {
    W: number,
    T: number,
    L: number
}

export default class GameLogic {
    ai: RPSLinearNGramCombo
    score: Score = { W: 0, T: 0, L: 0 }

    constructor(ngramSize: number) {
        this.ai = new RPSLinearNGramCombo(ngramSize);
    }

    play(playerMove: RPSMove): [RPSMove, number] {
        // Get the AI's move
        const aiMove = this.ai.getNextMovePrediction().move;
        // Check who won
        const result = this.checkResult(playerMove, aiMove);
        switch (result) {
            case 1:
                this.score.W++;
                break;
            case 0:
                this.score.T++;
                break;
            case -1:
                this.score.L++;
                break;
            default:
                throw new Error("Invalid result");
        }
        // Update the AI
        this.ai.updateWeights({player: playerMove, opponent: aiMove});
        // Return the AI move and the result
        return [aiMove, result];
    }

    checkResult(m1: RPSMove, m2: RPSMove): number {
        if (m1 === m2) return 0;
        if (m1 === 'R' && m2 === 'S') return 1;
        if (m1 === 'S' && m2 === 'P') return 1;
        if (m1 === 'P' && m2 === 'R') return 1;
        return -1;
    }
}