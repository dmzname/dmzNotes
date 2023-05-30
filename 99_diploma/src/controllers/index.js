//Authorization
const signup = require('./authorizations/signupController');
const login = require('./authorizations/loginController');

//Notes
const getAllNotes = require('./notes/getAllNotes');
const createNewNote = require('./notes/createNewNote');
const editNote = require('./notes/editNote');
const getOneNote = require('./notes/getOneNote');
const getArchiveNotes = require('./notes/getArchiveNotes');
const isArchivedNote = require('./notes/isArchivedNote');
const deleteAllArchive = require('./notes/deleteAllArchive');
const deleteOneNote = require('./notes/deleteOneNote');

module.exports = {
  signup,
  login,
  getAllNotes,
  createNewNote,
  editNote,
  getOneNote,
  getArchiveNotes,
  isArchivedNote,
  deleteAllArchive,
  deleteOneNote,
};
