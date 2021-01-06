export class NoteImg extends React.Component {
    state = {
        note: null,
        display: 'note-none'
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    handleChange = (ev) => {
        var value = ev.target.value
        const noteCopy = { ...this.state.note };
        if (ev.target.name !== "backgroundColor") {
            noteCopy.info[ev.target.name] = value
        } else {
            noteCopy.style[ev.target.name] = value
        }
        this.setState({ note: noteCopy })
    };
    updEdit = () => {
        var val = this.state.display === 'note-none' ? 'note-flex' : 'note-none'
        this.setState({ display: val })
    }


    render() {
        if (!this.state.note) return <div></div>
        var { backgroundColor } = this.state.note.style;
        return <div className="note" style={{ backgroundColor: backgroundColor }}>
            <input type="text" name="title" value={this.state.note.info.title}
                onChange={this.handleChange} className="text-img" />
            <div className="img-container">
                <img src={`${this.state.note.info.url}`} alt="" />
            </div>
            <div className="img-settings">
                <button className="fas pin" onClick={() => { this.props.onPinNote(this.state.note) }}></button>
                <button className="fas edit" onClick={this.updEdit}></button>
                <button className="fas done" onClick={() => { this.props.onUpdateNote(this.state.note) }}></button>
                <button className="fas delete" onClick={this.props.onDeleteNote}></button>
            </div>
            <div className={`img-edit ${this.state.display}`}>
                <input type="text" name="url" placeholder="Enter a new url" onChange={this.handleChange} />
                <input type="color" name="backgroundColor" value={this.state.note.style.backgroundColor} onChange={this.handleChange} />
            </div>
        </div>
    }
}
