import { svgPaperPath, svgRockPath, svgScissorsPath } from "./Card"

export default function Title() {
    return (
        <div className="title-page">
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
        </div>
    )
}