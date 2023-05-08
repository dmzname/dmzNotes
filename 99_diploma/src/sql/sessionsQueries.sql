-- Creates a session ID for an authorized user.
INSERT INTO sessions (user_id)
VALUES (:user_id)
RETURNING session_id;

-- Finds active sessions with an authorized user.
SELECT users.*
FROM sessions
JOIN users ON sessions.user_id = users.user_id
WHERE sessions.session_id = :sessionId;
