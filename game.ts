import { RPSMove } from "./src/ngram";
import { RPSLinearNGramCombo } from "./src/linear";

// Use the command argument to determine the number of n-grams to use
const n = parseInt(process.argv[2]) || 3;
const ai = new RPSLinearNGramCombo(n);

const moves = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS];
// Read from stdin
process.stdout.write('Enter your move [R, P, S]: ');
for await (const line of console) {
    const playerMove = line.trim().toUpperCase() as RPSMove;
    const aiMove = moves[(ai.getNextMovePrediction().index+1)%3];
    console.log(`AI plays: ${aiMove}`);
    ai.updateWeights({player: aiMove, opponent: playerMove});
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
    console.log(ai.x);
    console.log(ai.getNextMovePrediction().matrix);
    process.stdout.write('Enter your move [R, P, S]: ');
}