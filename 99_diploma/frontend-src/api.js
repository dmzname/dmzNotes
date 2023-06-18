import axios from 'axios';

const PREFIX = '/api/v1';

export const getNotes = async ({ age, search, page } = {}) => {
  try {
    const { data } = await axios.get(PREFIX + '/notes', {
      params: {
        page,
        age,
        search,
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

export const notePdfUrl = (id) => {
  axios
    .get('/download-pdf', {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf',
      },
      params: {
        id,
      },
    })
    .then((response) => {
      const filenameHeader = response.headers.get('content-disposition');
      const filenameMatch = filenameHeader && filenameHeader.match(/filename\*=UTF-8''([^']+)/);
      const decodedFilename = filenameMatch && decodeURIComponent(filenameMatch[1]);
      const filename = decodedFilename ? decodedFilename : 'file.pdf';

      const file = new Blob([response.data], { type: 'application/pdf' });

      // Создаем ссылку на Blob-объект
      const url = URL.createObjectURL(file);

      // Создаем ссылку на скачивание файла
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();

      // Освобождаем ресурсы
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 0);
    })
    .catch((err) => {
      throw new Error(err.response.data);
    });
};
