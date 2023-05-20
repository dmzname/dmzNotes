-- Creates notes table used migration 20230519122949_create_notes_table
CREATE TABLE notes
  (
    note_id serial PRIMARY KEY,
    user_id serial NOT NULL REFERENCES users(user_id),
    title text,
    text text,
    html text,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'Europe/Kiev'),
    UNIQUE (note_id)
  );

-- Creates index for sessions table
CREATE INDEX idx_note_id ON notes (note_id);
