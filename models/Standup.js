const db = require('../db/config');

const Standup = {}

Standup.global = () => {
  return db.query('SELECT graph_position FROM standups LIMIT 500')
}

Standup.showAllGroup = (id) => {
  return db.query(`
    SELECT standups.*
    FROM standups
    JOIN users on standups.user_id = users.id
    JOIN groups on groups.user_id = users.id
    WHERE group_name = $1
  `, [id])
}

Standup.create = (standup, id) => {
  return db.one(`
    INSERT INTO standups
    (graph_position, positives, negatives, time_created, user_id)
    VALUES ($1, $2, $3, current_timestamp, $4)
    RETURNING *
  `, [standup.graph_position, standup.positives, standup.negatives, id])
}

Standup.show = (id) => {
  return db.query(`SELECT * FROM standups where user_id = $1`, [id])
}

module.exports = Standup
