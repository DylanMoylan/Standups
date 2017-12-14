const db = require('../db/config');

const Comments = {}

Comments.standupPost = (comment, id) => {
  return db.one(`
    INSERT INTO comments
    (comment_body, from_id, to_id, comment_type, time_created)
    VALUES ($1, $2, $3, $4, current_timestamp)
    RETURNING *
  `, [comment.comment_body, id, comment.to_id, comment.comment_type])
}

Comments.create = (comment, id) => {
  return db.one(`
    INSERT INTO comments
    (comment_body, from_id, to_id, comment_type, time_created)
    VALUES ($1, $2, $3, $4, current_timestamp)
    RETURNING *
  `, [comment.comment_body, id, comment.to_id, comment.comment_type])
}

Comment.index = (id) => {
  return db.query(`
    SELECT * FROM comments WHERE to_id = $1 OR from_id = $1
  `, [id])
}

Comment.edit = (comment, id) => {
  return db.one(`
    UPDATE comments SET
    comment_body = $1
    WHERE id = $2 AND from_id = $3
    RETURNING *
  `,[comment.comment_body, comment.id, id])
}

Comment.destroy = (id) => {
  return db.none(`
    DELETE FROM comments
    WHERE id = $1
  `, [id])
}

module.exports = Comments
