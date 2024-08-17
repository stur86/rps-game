import React from "react";
import Game from "./components/Game";
import Title from "./components/Title";
import { useState } from "react";

enum AppState {
    TITLE,
    GAME
};

export default function App() {
    const [state, setState] = useState<AppState>(AppState.TITLE);

    return <React.StrictMode>
        {
            state === AppState.TITLE ?
            <Title onStartGame={() => setState(AppState.GAME)}/> : 
            <Game/>
        }
    </React.StrictMode>
}