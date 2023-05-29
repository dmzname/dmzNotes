//Authorization
const signup = require('./authorizations/signupController');
const login = require('./authorizations/loginController');

//Notes
const getAllNotes = require('./notes/getAllNotesController');
const createNewNote = require('./notes/createNewNoteController');
const editNote = require('./notes/editNoteController');
const getOneNote = require('./notes/getOneNoteController');

module.exports = { signup, login, getAllNotes, createNewNote, editNote, getOneNote };
