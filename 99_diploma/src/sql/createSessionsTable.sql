-- Creates sessions table used migration 20230507171823_create_sessions_table
CREATE TABLE sessions
  (
    session_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id serial NOT NULL REFERENCES users(user_id)
  );

-- Creates index for sessions table
CREATE INDEX idx_session_id ON sessions (session_id);
