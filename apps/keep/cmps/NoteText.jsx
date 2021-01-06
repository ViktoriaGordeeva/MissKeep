
export class NoteText extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    handleChange = (ev) => {
        var value = ev.target.value
        const noteCopy = { ...this.state };
        if (ev.target.name === "backgroundColor") {
            noteCopy.note.style[ev.target.name] = value
        } else {
            noteCopy.note.info.txt = value
        }
        this.setState(noteCopy)

    };


    render() {
        if (!this.state.note) return <div></div>
        var { backgroundColor } = this.state.note.style;
        return <div className="note" style={{ backgroundColor: backgroundColor }}>
            <textarea className="text-text" id="" rows="8" value={this.state.note.info.txt} onChange={this.handleChange}></textarea>
            <div className="text-settings">
                <input type="color" name="backgroundColor" value={this.state.note.style.backgroundColor} onChange={this.handleChange} />
                <button className="fas pin" onClick={() => { this.props.onPinNote(this.state.note) }}></button>
                <button className="fas done" onClick={() => { this.props.onUpdateNote(this.state.note) }}></button>
                <button className="fas delete" onClick={this.props.onDeleteNote}></button>
            </div>
        </div>
    }
}
