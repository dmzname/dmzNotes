//Database utils
const findUserByUserName = require('./db_utils/findUserByUserName');
const findUserBySessionId = require('./db_utils/findUserBySessionId');

//Database methods Authorization
const createUser = require('./db_methods/create/createUser');
const createSession = require('./db_methods/create/createSession');
const deleteSession = require('./db_methods/delete/deleteSession');
const updateUserData = require('./db_methods/update/updateUserData');

//Database methods Notes Api
const createNewNote = require('./db_methods/create/createNewNote');
const editNote = require('./db_methods/update/editNote');
const isArchivedNote = require('./db_methods/update/isArchivedNote');
const getAllNotes = require('./db_methods/read/getAllNotes');
const getOneNote = require('./db_methods/read/getOneNote');
const getArchiveNotes = require('./db_methods/read/getArchiveNotes');

module.exports = {
  createUser,
  createSession,
  updateUserData,
  deleteSession,
  findUserByUserName,
  findUserBySessionId,
  createNewNote,
  editNote,
  isArchivedNote,
  getAllNotes,
  getOneNote,
  getArchiveNotes,
};
