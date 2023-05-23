const db = require('../../db/connect');

module.exports = async ({ user_id, page, age }) => {
  return db.raw(
    `
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
    `,
    { user_id, page, age },
  );
};
