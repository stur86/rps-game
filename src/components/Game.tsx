import Hand from "./Hand"
import { type PropsWithChildren } from "react";
import { RPSMove } from "../ai/ngram";
import GameLogic, { type Score } from "../game";
import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import Button from "./Button";

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

function MoveDisplay(props: PropsWithChildren<{ move: RPSMove, fromRight: boolean }>) {
    const divRef = useRef<HTMLDivElement>(null);
    const initStyle = {transform: `translateX(${props.fromRight? '':'-'}100vw)`, transition: "transform 0.2s"};

    divRef.current?.style.setProperty("transition", "transform 0s");
    divRef.current?.style.setProperty("transform", initStyle.transform);

    setTimeout(() => {
        divRef.current?.style.setProperty("transition", initStyle.transition);
        divRef.current?.style.setProperty("transform", "translateX(0)");
    }, 1);

    return (
        <div className="rps-move" ref={divRef} 
        style={initStyle}>
            <Card symbol={props.move}/>{props.children}
        </div>
    )
};

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
                <MoveDisplay move={props.turn.player} fromRight={false}>Player</MoveDisplay>
            }
            {
                props.turn === null ? null : 
                <MoveDisplay move={props.turn.ai} fromRight={true}>AI</MoveDisplay>
            }
        </div>
        <div className="rps-turn-outcome">
            {resultMsg}
        </div>
    </div>);
}

export default function Game(props: { onQuit: () => void }) {
    const [lastTurn, setLastTurn] = useState<TurnInfo | null>(null);

    function playFunction(playerMove: RPSMove) {
        const [aiMove, result] = game.play(playerMove);
        setLastTurn({ player: playerMove, ai: aiMove, result: result});
    }

    return (<div className="rps-game">
        <ScoreDisplay W={game.score.W} T={game.score.T} L={game.score.L} />
        <TurnDisplay turn={lastTurn} />
        <Hand playFunction={playFunction} />
        <Button onClick={props.onQuit} label="Quit" />
    </div>);
}