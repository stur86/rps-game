import Button from "./Button";

export default function Notes(props: { visible: boolean, onClose: () => void }) {
    return (<div className={`notes-box ${props.visible? 'visible' : ''}`}>
        <div className="notes-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veritatis atque at voluptatibus sequi laborum repudiandae. Possimus vel culpa rem natus laborum fuga, hic doloremque voluptates quidem est, corrupti eveniet!
        </div>
        <div className="notes-buttons">
            <Button onClick={props.onClose} label="Close"/>
        </div>
    </div>);
}


