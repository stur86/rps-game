import Hand from "./Hand"
import { type RPSTurn, RPSMove } from "../ai/ngram";
import GameLogic, { type Score } from "../game";
import { useEffect, useState } from "react";

let game = new GameLogic(3);

function ScoreDisplay(props: { W: number, T: number, L: number }) {
    return (<div className="rps-score">
        {props.W}W/{props.T}T/{props.L}L
    </div>);
}

export default function Game() {
    const [lastTurn, setLastTurn] = useState<RPSTurn | null>(null);

    function playFunction(m: RPSMove) {
        console.log(m);
    }

    return (<div className="rps-game">
        <ScoreDisplay W={game.score.W} T={game.score.T} L={game.score.L} />
        <Hand playFunction={playFunction} />
    </div>);
}