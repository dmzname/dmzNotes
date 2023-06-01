//Authorization
const signup = require('./authorizations/signupController');
const login = require('./authorizations/loginController');
const createUser = require('./authorizations/createUser');
const createSession = require('./authorizations/createSession');
const deleteSession = require('./authorizations/deleteSession');
const updateUserData = require('./authorizations//updateUserData');

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
  createUser,
  createSession,
  deleteSession,
  updateUserData,
  getAllNotes,
  createNewNote,
  editNote,
  getOneNote,
  getArchiveNotes,
  isArchivedNote,
  deleteAllArchive,
  deleteOneNote,
};
