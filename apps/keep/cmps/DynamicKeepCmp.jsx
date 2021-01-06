import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'


export function DynamicKeepCmp({ note, onUpdateNote, onDeleteNote, onPinNote }) {
    switch (note.type) {
        case 'NoteText':
            return <NoteText note={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} onPinNote={onPinNote} />
        case 'NoteImg':
            return <NoteImg note={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} onPinNote={onPinNote}/>
        case 'NoteVideo':
            return <NoteVideo note={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} onPinNote={onPinNote}/>
        case 'NoteTodos':
            return <NoteTodos note={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} onPinNote={onPinNote}/>
    }
    return <p>UNKNWON</p>
}