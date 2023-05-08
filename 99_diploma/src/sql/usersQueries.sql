-- Get all users from users table
  SELECT * FROM users
  WHERE username = :username
  LIMIT 1;

-- Create new user in users table
  INSERT INTO users (username, password_hash)
  VALUES (:username, :password_hash)
  RETURNING user_id, username, created_at
