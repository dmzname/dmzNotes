-- Get all users from users table
  SELECT * FROM users
  WHERE username = :username
  LIMIT 1;

-- Create new user in users table
  INSERT INTO users (username, password)
  VALUES (:username, :password)
  RETURNING user_id, username, created_at;
