import { RPSMove } from "../ai/ngram";
import Card from "./Card";

const moves = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS];

export default function Hand() {
    return (<div className="rps-hand">
        {
            moves.map((move) => <div onClick={() => { console.log(move); }} key={move}><Card symbol={move} /></div>)
        }
    </div>);
}