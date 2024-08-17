import Button from "./Button";

export default function Notes(props: { visible: boolean, onClose: () => void }) {
    return (<div className={`notes-box ${props.visible? 'visible' : ''}`}>
        <div className="notes-content">
            <p>
                This game uses a simple AI to try and predict your next move. 
                The AI stores multiple <a href="https://en.wikipedia.org/wiki/N-gram">N-grams</a> - it keeps count of various possible
                sequences of turns (including both yours and the AI's own play) and what
                you played next.
            </p>

            <p>
                The AI keeps several such counts for different lengths of sequences (e.g. 
                pairs, triplets and so on). The probabilities that they generate are then
                combined with linear weights to make a final prediction.
                After a play is made, the weights are updated based on the actual outcome,
                to <a href="https://en.wikipedia.org/wiki/Cross-entropy">maximize the cross-entropy
                of the predicted and real distributions</a>.
            </p>
            <p>
                This allows the AI to pick up on simple repeated patterns in your play. If played
                completely randomly, rock-paper-scissors should lead to a ~33% win rate for each
                player. After playing enough turns (about 40 usually are enough), check
                your score at the top of the page and see what happened. If your play is not
                truly random, the AI will have exploited that to win more games than you.
            </p>
            <p>
                To clear the AI's memory and start anew, simply refresh the page.
            </p>
        </div>
        <div className="notes-buttons">
            <Button onClick={props.onClose} label="Close"/>
        </div>
    </div>);
}


