const db = require('../db/config');

const Groups = {};

Groups.createGroup = (name, id) => {
  return db.one(`
    INSERT INTO groups
    (group_name, user_id, owner_id)
    VALUES($1,$2,$3)
    RETURNING *
  `,  [name, id, id])
}
Groups.findGroup = (name) => {
  return db.query(`
    SELECT COUNT(id)
    FROM groups
    WHERE group_name = $1
  `,[name])
}

Groups.addToGroup = (group, id) => {
  return db.one(`
    INSERT INTO groups
    (group_name, user_id, owner_id)
    VALUES ($1,$2,$3)
    RETURNING *
  `, [group.group_name, group.user_id, id])
}

Groups.index = (name) => {
  return db.query(`
  SELECT groups.*, users.*
  FROM groups
  JOIN users ON users.id = groups.user_id
  WHERE groups.group_name = $1
  `,[name]);
}

Groups.removeFromGroup = (groupMember, id) => {
  return db.none(`
    DELETE FROM groups
    WHERE group_name = $1
    AND user_id = $2
    AND owner_id = $3
  `, [groupMember.group_name, groupMember.user_id, id])
}

Groups.destroyGroup = (group, id) => {
  return db.none(`
    DELETE FROM groups
    WHERE group_name = $1
    AND owner_id = $2
  `, [group, id])
}

module.exports = Groups;
