export default function Button(props: { onClick: () => void, label: string }) {
    return (
        <div className="button" onClick={props.onClick}>{props.label}</div>
    )
}