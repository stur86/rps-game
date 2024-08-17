import { svgPaperPath, svgRockPath, svgScissorsPath } from "./Card"
import Button from "./Button"
import Notes from "./Notes"
import { useState } from "react"

export default function Title(props: { onStartGame: () => void }) {
    const [notesVisible, setNotesVisible] = useState(false);

    return (
        <div className="title-page">
            <Notes visible={notesVisible} onClose={() => { setNotesVisible(false) }}/>
            <h1>N-Gram Rock-Paper-Scissors</h1>
            <div className="title-icons">
                <svg viewBox="0 -5 45 80" width={30}>
                    {svgScissorsPath}
                </svg>
                <svg viewBox="0 -10 45 80" width={30}>
                    {svgRockPath}
                </svg>
                <svg viewBox="0 -5 45 80" width={30}>
                    {svgPaperPath}
                </svg>
            </div>
            <Button onClick={props.onStartGame} label="Start Game" />
            <Button onClick={() => { setNotesVisible(true); }} label="How it works" />
        </div>
    )
}