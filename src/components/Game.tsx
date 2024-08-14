import Hand from "./Hand"
import { RPSMove } from "../ai/ngram";
import GameLogic, { type Score } from "../game";
import { useEffect, useState } from "react";

let game = new GameLogic(3);

type TurnInfo = {
    player: RPSMove,
    ai: RPSMove,
    result: number
}

function ScoreDisplay(props: { W: number, T: number, L: number }) {
    return (<div className="rps-score">
        {props.W}W/{props.T}T/{props.L}L
    </div>);
}

export default function Game() {
    const [lastTurn, setLastTurn] = useState<TurnInfo | null>(null);

    function playFunction(playerMove: RPSMove) {
        const [aiMove, result] = game.play(playerMove);
        setLastTurn({ player: playerMove, ai: aiMove, result: result});
    }

    return (<div className="rps-game">
        <ScoreDisplay W={game.score.W} T={game.score.T} L={game.score.L} />
        <Hand playFunction={playFunction} />
    </div>);
}