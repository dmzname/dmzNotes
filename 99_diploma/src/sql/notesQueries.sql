
-- [0] Create new note in notes table
INSERT INTO notes (user_id, title, text, html)
VALUES (:user_id, :title, :text, :html)
RETURNING *;

-- [1] Edit note in notes table by id
UPDATE notes
SET title = :title, text = :text, html = :html
WHERE note_id = :id AND user_id = :user_id
RETURNING *;

-- [2] Get one note by id
SELECT *
FROM notes
WHERE note_id = :id AND user_id = :user_id;

-- [3] Get all notes filtered by date
WITH filtered_notes AS (
  SELECT *
  FROM notes
  WHERE user_id = :user_id
    AND (
      (:age = '1month' AND created_at >= current_date - interval '1 month')
      OR
      (:age = '3months' AND created_at >= current_date - interval '3 months')
      OR
      :age = 'alltime'
    )
),
total_count AS (
  SELECT COUNT(*) AS count
  FROM filtered_notes
)
SELECT filtered_notes.*, CEIL(total_count.count::numeric / page_size) AS total_pages
FROM filtered_notes, total_count
ORDER BY note_id DESC
LIMIT (SELECT page_size FROM notes WHERE user_id = :user_id LIMIT 1)
OFFSET ((:page - 1) * (SELECT page_size FROM notes WHERE user_id = :user_id LIMIT 1));
