import axios from 'axios';

const PREFIX = '/api/v1';

/* const req = (url, options = {}) => {
  const { body } = options;

  return fetch((PREFIX + url).replace(/\/\/$/, ''), {
    ...options,
    body: body ? JSON.stringify(body) : null,
    headers: {
      ...options.headers,
      ...(body
        ? {
            'Content-Type': 'application/json',
          }
        : null),
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        }),
  );
}; */

export const getNotes = async ({ age, search, page } = {}) => {
  console.log('GET-NOTES');
  const { data } = await axios.get(PREFIX + '/notes');
  console.log(data);
  return data;
};

export const createNote = async (title, text) => {
  console.log('POST-NOTE');
  const { data } = await axios.post(PREFIX + '/add-note', { title, text });
  return data;
};

export const getNote = async (id) => {
  console.log('GET-NOTE');
  const { data } = await axios.get(PREFIX + `/note/${id}`);
  return data;
};

export const archiveNote = {};

export const unarchiveNote = {};

export const editNote = (id, title, text) => {};

export const deleteNote = (id) => {};

export const deleteAllArchived = () => {};

export const notePdfUrl = (id) => {};
