const fs = require('fs');
const chalk = require('chalk');

var fileName = 'notes.json';

const addNote = (title, body) => {
    debugger;
    var notes = listNotes();
    var note = notes.find((x) => x.title == title);
    if (!note) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
    }
};

const listNotes = () => {
    try {
        var noteBuffer = fs.readFileSync(fileName);
        var notes = JSON.parse(noteBuffer.toString());
        return notes;
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => {
    var noteData = JSON.stringify(notes);
    fs.writeFileSync(fileName, noteData);
};

const removeNotes = (title) => {
    var notes = listNotes();
    var note = notes.find((x) => x.title === title);
    if (note) {
        notes.splice(notes.indexOf(note, 1));
        saveNotes(notes);
        console.log(chalk.bgGreen('Note Deleted!'));
    } else {
        console.log(chalk.bgRed('Note not found!'));
    }
};

const readNote = (title) => {
    var notes = listNotes();
    return notes.find((x) => x.title === title);
};

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote,
};