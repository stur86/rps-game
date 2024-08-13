import { RPSMove } from "../ai/ngram";
import Card from "./Card";

const moves = [RPSMove.ROCK, RPSMove.PAPER, RPSMove.SCISSORS];

export default function Hand(props: { playFunction: (m: RPSMove) => void }) {
    return (<div className="rps-hand">
        {
            moves.map((move) => <div onClick={() => { props.playFunction(move); }} key={move}><Card symbol={move} /></div>)
        }
    </div>);
}