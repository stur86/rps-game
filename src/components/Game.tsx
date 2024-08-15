import Hand from "./Hand"
import { RPSMove } from "../ai/ngram";
import GameLogic, { type Score } from "../game";
import { useEffect, useState } from "react";
import Card from "./Card";

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

function TurnDisplay(props: { turn: TurnInfo|null }) {

    let resultMsg = "";
    if (props.turn !== null) {
        if (props.turn.result === 1) {
            resultMsg = "You win!";
        } else if (props.turn.result === 0) {
            resultMsg = "It's a tie!";
        } else {
            resultMsg = "You lose!";
        }
    }

    return (<div className="rps-turn">
        <div className="rps-turn-moves">
            {
                props.turn === null ? null : 
                <div className="rps-move"><Card symbol={props.turn.player}/>Player</div>
            }
            {
                props.turn === null ? null : 
                <div className="rps-move"><Card symbol={props.turn.ai}/>AI</div>
            }
        </div>
        <div className="rps-turn-outcome">
            {resultMsg}
        </div>
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
        <TurnDisplay turn={lastTurn} />
        <Hand playFunction={playFunction} />
    </div>);
}