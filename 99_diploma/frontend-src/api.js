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
  try {
    const { data } = await axios.get(PREFIX + '/notes', {
      params: {
        page,
        age,
      },
    });

    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const createNote = async (title, text) => {
  try {
    const { data } = await axios.post(PREFIX + '/add', { title, text });
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const getNote = async (id) => {
  try {
    const { data } = await axios.get(PREFIX + `/note/${id}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

const archivedHandler = async (id, method) => {
  try {
    const { data } = await axios[method](PREFIX + `/archive${!id ? '' : '/' + id}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const archiveNote = (id) => archivedHandler(id, 'patch');
export const unarchiveNote = (id) => archivedHandler(id, 'patch');
export const deleteNote = (id) => archivedHandler(id, 'delete');
export const deleteAllArchived = () => archivedHandler('', 'delete');

export const editNote = async (id, title, text) => {
  try {
    const { data } = await axios.patch(PREFIX + `/edit/${id}`, { title, text });
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const notePdfUrl = (id) => {};
