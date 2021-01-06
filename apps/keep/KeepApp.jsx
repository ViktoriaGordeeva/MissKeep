import { keepService } from './services/keepService.js'
import { DynamicKeepCmp } from './cmps/DynamicKeepCmp.jsx'
import { NoteCreation } from './cmps/NoteCreation.jsx'
import { storageService } from '../../../services/storageService.js'



export class KeepApp extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }


    loadNotes() {
        keepService.query()
            .then(notes => this.setState({ notes }))
    }

    onAddNote = (note) => {
        keepService.addNote(note)
            .then(() => this.loadNotes())
    }
    onUpdateNote = (idx, note) => {
        keepService.updNote(idx, note)
            .then(() => this.loadNotes())
    }
    onDeleteNote = (idx) => {
        keepService.delNote(idx)
            .then(() => this.loadNotes())
    }
    onPinNote(id, note) {
        keepService.pinNote(id, note)
            .then(() => this.setState({ notes: storageService.loadFromStorge('notesDB') }))
    }

    render() {
        const { notes } = this.state
        if (!notes) return <section></section>
        return (
            <section className="keep-main">
                <NoteCreation onAddNote={this.onAddNote} />
                <div className="notes">
                    {notes.map((note, idx) => {
                        return <DynamicKeepCmp key={idx} note={note}
                            onUpdateNote={(res) => this.onUpdateNote(idx, res)}
                            onDeleteNote={() => { this.onDeleteNote(idx) }}
                            onPinNote={(note) => { this.onPinNote(idx, note) }} />
                    })
                    }
                </div>
            </section>
        )
    }
}