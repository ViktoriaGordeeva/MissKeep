import { util } from '../../../services/util.js'
import { storageService } from '../../../services/storageService.js'


export const keepService = {
    query,
    addNote,
    updNote,
    delNote,
    getNoteById,
    pinNote
};

var KEY = 'notesDB'
var notes;
_createNotes()

function _createNotes() {
    notes = storageService.loadFromStorge(KEY)
    if (!notes || !notes.length) {
        notes = _getDemoNotes()
        _saveNotesToStorage()
    }
}

function query() {
    return Promise.resolve(notes);
}

function addNote(note) {
    var noteToAdd
    if (note.type === 'NoteText') {
        noteToAdd = { ...note }
        noteToAdd.style = {
            backgroundColor: util.getRandomColor(0)
        }
    }
    if (note.type === 'NoteImg') {
        noteToAdd = { ...note }
        noteToAdd.style = {
            backgroundColor: util.getRandomColor(1)
        }
        noteToAdd.info.title = 'Enter your title'
    }
    if (note.type === 'NoteVideo') {
        noteToAdd = { ...note }
        noteToAdd.style = {
            backgroundColor: util.getRandomColor(3)
        }
        noteToAdd.info.title = 'Enter your title'
    }
    if (note.type === 'NoteTodos') {
        noteToAdd = { ...note }
        noteToAdd.info.label = "How was it:"
        noteToAdd.info.todos.forEach(todo => {
            todo.id = util.makeid()
        })
        noteToAdd.style = {
            backgroundColor: util.getRandomColor(2)
        }
    }
    notes = [...notes, noteToAdd];
    _saveNotesToStorage()
    return Promise.resolve(notes);
}

function delNote(idx) {
    notes.splice(idx, 1)
    _saveNotesToStorage()
    return Promise.resolve();
}

function updNote(idx, note) {
    getNoteById(idx)
        .then(res => {
            res = note
            _saveNotesToStorage()
        })
    return Promise.resolve(notes[idx]);
}

function getNoteById(id) {
    return Promise.resolve(notes[id]);
}

function pinNote(id, note) {
    delNote(id)
    notes = [note, ...notes];
    _saveNotesToStorage()
    return Promise.resolve();
}
function _getDemoNotes() {
    const defaultNotes = [
        {
            type: "NoteImg",
            info: {
                url: 'https://miro.medium.com/max/630/0*4Dw1NAZsbHG-zIeq.jpg',
                title: "Don't worry!"
            },
            style: {
                backgroundColor: util.getRandomColor(1)
            }
        },
        {
            type: "NoteTodos",
            info: {
                label: "Way to success:",
                todos: [
                    { txt: "Get a girlfriend", isDone: false, id: util.makeid() },
                    { txt: "Graduate", isDone: false, id: util.makeid() },
                    { txt: "Get a job", isDone: false, id: util.makeid() },
                    { txt: "Get a car", isDone: false, id: util.makeid() },
                    { txt: "Get a beter girlfriend", isDone: false, id: util.makeid() },
                ]
            },
            style: {
                backgroundColor: util.getRandomColor(2)
            }
        },
        {
            type: "NoteText",
            // isPinned: true,
            info: {
                txt: "There are only 10 types of people in the world: Those that understand binary and those that don't."
            },
            style: {
                backgroundColor: util.getRandomColor(0)
            }
        },
        {
            type: "NoteVideo",
            info: {
                url: 'https://www.youtube.com/embed/QK2mtWjtyDU',
                title: "Just enjoy..."
            },
            style: {
                backgroundColor: util.getRandomColor(3)
            }
        },
        {
            type: "NoteImg",
            info: {
                url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-eat-sleep-code-repeat-raymond-sandos.jpg',
                title: ""
            },
            style: {
                backgroundColor: util.getRandomColor(1)
            }
        },
        {
            type: "NoteText",
            // isPinned: true,
            info: {
                txt: "QA Engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. Orders a sfdeljknesv."
            },
            style: {
                backgroundColor: util.getRandomColor(0)
            }
        },
        {
            type: "NoteImg",
            info: {
                url: 'https://i.pinimg.com/originals/d8/0b/99/d80b9960866f4f61ce28e5cc072895a6.gif',
                title: ""
            },
            style: {
                backgroundColor: util.getRandomColor(1)
            }
        },
        {
            type: "NoteTodos",
            info: {
                label: "MUST:",
                todos: [
                    { txt: "Make a todo list", isDone: true, id: util.makeid() },
                    { txt: "Check off first item", isDone: false, id: util.makeid() },
                    { txt: "Realize you already did 2 things of te list", isDone: false, id: util.makeid() },
                    { txt: "Reward youeself with a nice, long nap", isDone: false, id: util.makeid() },
                ]
            },
            style: {
                backgroundColor: util.getRandomColor(2)
            }
        },
    ]
    return defaultNotes
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, notes)
}