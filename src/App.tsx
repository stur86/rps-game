import React from "react";
import Game from "./components/Game";
import Card from "./components/Card";
import { RPSMove } from "./ai/ngram";

export default function App() {
    return <React.StrictMode>
        <Card symbol={RPSMove.SCISSORS} />
        <Card symbol={RPSMove.ROCK} />
        <Card symbol={RPSMove.PAPER} />
    </React.StrictMode>
}