import { maxIndex } from "./utils";

export enum RPSMove {
    ROCK = 'R',
    PAPER = 'P',
    SCISSORS = 'S'
};

export type RPSTurn = {
    player: RPSMove,
    opponent: RPSMove
};

export class RPSNGram {

    n: number;
    trajectory: RPSTurn[];

    constructor(n: number) {
        this.n = n;
        this.trajectory = [];
    }

    get isValid(): boolean {
        return this.trajectory.length === this.n;
    }

    addTurn(turn: RPSTurn) {
        this.trajectory.push(turn);
        if (this.trajectory.length > this.n) {
            this.trajectory.shift();
        }
    }

    getKey(): string {
        // Chain the moves together with a colon; discart the last opponent move
        return this.trajectory.map(t => `${t.player}${t.opponent}`).join(':').slice(0, -1);
    }

    getNextKeyPrefix(): string {
        if (this.n === 1) {
            return '';
        }
        return this.trajectory.slice(1).map(t => `${t.player}${t.opponent}`).join(':') + ':';
    }
}

export class RPSNGramCounts {
    n: number;
    dict: {[key: string]: number};
    last: RPSNGram;
    N0: number;
    N: number;

    constructor(n: number) {
        this.n = n;
        this.dict = {};
        this.last = new RPSNGram(n);
        // Compute how many possible combinations there are for smoothing
        this.N0 = Math.pow(9, this.n-1)*3;
        this.N = this.N0;
    }

    addTurn(turn: RPSTurn) {
        this.last.addTurn(turn);
        if (this.last.isValid) {
            const key = this.last.getKey();
            this.dict[key] = (this.dict[key] || 0) + 1;
            this.N++;
        }
    }

    getProbability(key: string): number {
        // Check if the key is valid
        const keyRe = new RegExp(`^([RPS]{2}:){${this.n-1}}[RPS]$`);
        if (!keyRe.test(key)) {
            throw new Error(`Invalid key: ${key}`);
        }

        return ((this.dict[key] || 0) + 1)/this.N;
    }

    getNextMoveProbabilities(): number[] {
        const nextKeyPrefix = this.last.getNextKeyPrefix();
        const nextMoves = ['R', 'P', 'S'];
        try {
            const P = nextMoves.map(m => this.getProbability(nextKeyPrefix + m));
            const norm = P.reduce((a, b) => a + b, 0);
            return P.map(p => p/norm);    
        }
        catch (e) {
            // If there's not enough data, return uniform probabilities
            return [1/3, 1/3, 1/3];
        }
    }

    getNextMovePrediction(): RPSMove {
        const probs = this.getNextMoveProbabilities();
        return [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS][maxIndex(probs)];
    }

}