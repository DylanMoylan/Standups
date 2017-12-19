const db = require('../db/config');

const Standup = {}

Standup.global = (time) => {
  return db.query(`
    SELECT standups.graph_position, standups.name
    FROM standups
    WHERE time_created::text LIKE $1
    LIMIT 500
  `,[time])
}

Standup.showAllGroup = (id) => {
  return db.query(`
    SELECT standups.*
    FROM standups
    WHERE standups.group_id = $1
  `, [id])
}

Standup.create = (standup, id) => {
  return db.one(`
    INSERT INTO standups
    (graph_position, positives, negatives, time_created, group_id, name)
    VALUES ($1, $2, $3, current_timestamp, $4, $5)
    RETURNING *
  `, [standup.graph_position, standup.positives, standup.negatives, id, standup.name])
}

Standup.daily = (id, name, time) => {
  return db.query(`
    SELECT * FROM standups
    WHERE group_id = $1
    AND name = $2
    AND time_created::text LIKE $2`, [id, name, time])
}

module.exports = Standup
