const db = require('../db/config');

const Groups = {};

Groups.createGroup = (name, id) => {
  return db.one(`
    INSERT INTO groups
    (group_name, user_id, biz_id)
    VALUES($1,$2,$3)
    RETURNING *
  `,  [name, id, id])
}

Groups.addToGroup = (group) => {
  return db.one(`
    INSERT INTO groups
    (group_name, biz_id, user_id)
    VALUES ($1,$2,$3)
    RETURNING *
  `, [group.group_name, group.biz_id, group.user_id])
}

Groups.showAll = (id) => {
  return db.query(`
  SELECT groups.*, users.*
  FROM groups
  JOIN users ON users.id = groups.user_id
  WHERE groups.biz_id = $1
  `,[id]);
}

Groups.removeFromGroup = (groupMember) => {
  return db.none(`
    DELETE FROM groups
    WHERE group_name = $1
    AND user_id = $2
    AND biz_id = $3
  `, [groupMember.group_name, groupMember.user_id, groupMember.biz_id])
}

Groups.destroyGroup = (group) => {
  return db.none(`
    DELETE FROM groups
    WHERE group_name = $1
    AND biz_id = $2
  `, [group.group_name, group.biz_id])
}

Groups.destroy = id => {
  return db.none(`
    DELETE FROM groups
    WHERE user_id = $1
  `,id)
}

module.exports = Groups;
