import { RPSMove } from "./src/ngram";
import { RPSLinearNGramCombo } from "./src/linear";

// Use the command argument to determine the number of n-grams to use
const n = parseInt(process.argv[2]) || 3;
const debug = process.argv[3] === 'debug';
const ai = new RPSLinearNGramCombo(n);

const moves = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS];
// Read from stdin
process.stdout.write('Enter your move [R, P, S]: ');
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
    } else if ((3+aI-pI)%3 === 1){
        console.log('AI wins!');
    } else {
        console.log('Player wins!');
    }
    process.stdout.write('Enter your move [R, P, S]: ');
}