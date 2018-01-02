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

Standup.datesList = (id) => {
  return db.query(`
    SELECT DISTINCT
    time_created::date from standups;
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

Standup.daily = (id, time) => {
  return db.query(`
    SELECT * FROM standups
    WHERE group_id = $1
    AND time_created::text LIKE $2`, [id, time])
}

Standup.createSeveral = (standups, id) => {
  return db.tx(t => {
    const queries = standups.map(standup => {
      return t.one(`
        INSERT INTO standups
        (graph_position, positives, negatives, time_created, group_id, name)
        VALUES($1, $2, $3, current_timestamp, $4, $5)
        RETURNING *
      `,[standup.graph_position, standup.positives, standup.negatives, id, standup.name])
    })
    return t.batch(queries)
  })
}

Standup.findByDate = (date, id) => {
  let query = `
    SELECT * from standups
    WHERE group_id = ${id}
    AND time_created::text LIKE ${date}
  `;
  console.log(query)
  return db.query(`
    SELECT * from standups
    WHERE group_id = $2
    AND time_created::text LIKE $1
  `, [date, id])
}

module.exports = Standup
