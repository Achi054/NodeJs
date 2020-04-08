const yargs = require('yargs');
const notes = require('./notes');
const chalk = require('chalk');

yargs.command({
	command: 'add',
	describe: 'Adding new note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Text for the note',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: 'remove',
	describe: 'Removed a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string',
		}
	},
	handler(argv) {
		notes.removeNotes(argv.title);
	},
});

yargs.command({
	command: 'read',
	describe: 'Opening a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string',
		}
	},
	handler(argv) {
		console.log(chalk.bgBlue(notes.readNote(argv.title)));
	},
});

yargs.command({
	command: 'list',
	describe: 'Display list of existing notes !',
	handler() {
		console.log(chalk.blue('Your lists:\n'));
		var notes = notes.listNotes();
		notes.foreach((note) => console.log(note.title + "\n"));
	},
});

console.log(yargs.argv);