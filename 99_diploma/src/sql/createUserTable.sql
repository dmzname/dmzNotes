-- Creates users table used migration 20230507171823_create_user_table
CREATE TABLE users
  (
    user_id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'Europe/Kiev'),
    UNIQUE (user_id, username)
  );

-- Creates indexes for users table
CREATE INDEX idx_username ON users (username);
CREATE INDEX idx_user_id ON users (user_id);
