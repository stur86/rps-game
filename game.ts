import { RPSMove } from "./src/ai/ngram";
import { RPSLinearNGramCombo } from "./src/ai/linear";

// Use the command argument to determine the number of n-grams to use
const n = parseInt(process.argv[2]) || 3;
const debug = process.argv[3] === 'debug';
const ai = new RPSLinearNGramCombo(n);

const moves = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS];
const score = [0, 0, 0]; // Wins, ties, losses

process.stdout.write('Enter your move [R, P, S]: ');
// Read from stdin
for await (const line of console) {
    const playerMove = line.trim().toUpperCase() as RPSMove;
    const aiPred = ai.getNextMovePrediction();
    if (debug) {
        console.log("Prediction matrix:\n", aiPred.matrix);
        console.log("Probabilities:\n", aiPred.probabilities);
        console.log("Weights:\n", ai.x);
    }
    const aiMove = moves[(aiPred.index+1)%3];
    console.log(`AI plays: ${aiMove}`);
    ai.updateWeights({player: playerMove, opponent: aiMove});
    // Who won?
    const pI = moves.indexOf(playerMove);
    const aI = moves.indexOf(aiMove);
    if (pI === aI) {
        console.log('Tie!');
        score[1]++;
    } else if ((3+aI-pI)%3 === 1){
        console.log('AI wins!');
        score[2]++;
    } else {
        console.log('Player wins!');
        score[0]++;
    }
    process.stdout.write(`Wins/Ties/Losses: ${score[0]}/${score[1]}/${score[2]}\n`);
    process.stdout.write('Enter your move [R, P, S]: ');
}