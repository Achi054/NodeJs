const getNotes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

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
			type: 'string',
		},
	},
	handler: function (argv) {
		console.log(`Note with title '${argv.title}' created.\nText: ${argv.body}`);
	},
});

yargs.command({
	command: 'remove',
	describe: 'Removed a note',
	handler: function () {
		console.log('Note removed !');
	},
});

yargs.command({
	command: 'read',
	describe: 'Opening a note',
	handler: function () {
		console.log('Note opened !');
	},
});

yargs.command({
	command: 'list',
	describe: 'Display list of existing notes !',
	handler: function () {
		console.log('notes !');
	},
});
