import Hand from "./Hand"
import { RPSMove } from "../ai/ngram";

export default function Game() {

    function playFunction(m: RPSMove) {
        console.log(m);
    }

    return (<div className="rps-game">
        <Hand playFunction={playFunction} />
    </div>);
}