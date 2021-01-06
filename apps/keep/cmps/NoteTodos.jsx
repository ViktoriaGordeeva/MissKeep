export class NoteTodos extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    handleChange = (ev) => {
        var value = ev.target.value
        const noteCopy = { ...this.state };
        if (ev.target.name === "todo") {
            noteCopy.note.info.todos[ev.target.id].txt = value
        } else if (ev.target.name === "backgroundColor") {
            noteCopy.note.style[ev.target.name] = value
        } else {
            noteCopy.note.info[ev.target.name] = value
        }
        this.setState(noteCopy)
    };
    onUpdStatus = (idx) => {
        const noteCopy = { ...this.state };
        noteCopy.note.info.todos[idx].isDone = !noteCopy.note.info.todos[idx].isDone
        this.setState(noteCopy)
    }
    onDeleteTodo = (idx) => {
        const noteCopy = { ...this.state };
        noteCopy.note.info.todos.splice(idx, 1)
        this.setState(noteCopy)
    }
    onAddTodo = (idx) => {
        const noteCopy = { ...this.state };
        noteCopy.note.info.todos.splice(++idx, 0, { txt: 'To Do', isDone: false })
        this.setState(noteCopy)
    }

    render() {
        if (!this.state.note) return <div></div>
        var { backgroundColor } = this.state.note.style;
        return <div className="note" style={{ backgroundColor: backgroundColor }}>
            <input type="text" name="label" value={this.state.note.info.label}
                onChange={this.handleChange} className="text-todos" />
            <div className="todos">
                {this.state.note.info.todos.map((todo, idx) => {
                    return (
                        <div className="todo-item" key={todo.id}>
                            <button className="fas check" onClick={() => { this.onUpdStatus(idx) }}></button>
                            <input type="text" name="todo" id={todo.id} value={todo.txt}
                                onChange={this.handleChange} className="text-todo"
                                style={todo.isDone ? { textDecoration: 'line-through' } : { textDecoration: 'none' }} />
                            <button className="fas delete-item" onClick={() => { this.onDeleteTodo(idx) }}></button>
                            <button className="fas add-item" onClick={() => { this.onAddTodo(idx) }}></button>
                        </div>
                    )
                })}
            </div>
            <div className="todo-settings">
                <input type="color" name="backgroundColor" value={this.state.note.style.backgroundColor} onChange={this.handleChange} />
                <button className="fas pin" onClick={() => { this.props.onPinNote(this.state.note) }}></button>
                <button className="fas done" onClick={() => { this.props.onUpdateNote(this.state.note) }}></button>
                <button className="fas delete" onClick={this.props.onDeleteNote}></button>
            </div>
        </div>
    }
}