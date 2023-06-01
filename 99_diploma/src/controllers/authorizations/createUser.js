const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const createNewNote = require('../notes/createNewNote');

const text = `### Поздравляем с регистрацией

---

Теперь Вам доступны следующие операции:
*  создание новой заметки;
*  просмотр заметки, редактирование заметки;
*  архивация заметки;
*  восстановление заметки из архива;
*  удаление заархивированных заметок;
*  фильтрация списка заметок по диапазону дат.`;

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/usersQueries.sql'))
  .toString()
  .split(';')[1];

module.exports = async (username, password) => {
  const { rows } = await db.raw(sql, { username, password });
  const user = rows[0];

  await createNewNote({
    user_id: user.user_id,
    title: `Привет ${user.username}`,
    text,
  });

  return user;
};
