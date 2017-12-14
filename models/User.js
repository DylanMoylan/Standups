const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (name, email, permissions, avatar, password_digest)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user.name, user.email, user.permissions, user.avatar, user.password_digest]);
};

User.destroy = id => {
  return db.none(`
    DELETE FROM users
    WHERE id = $1
  `,id)
}

User.update = (user, id) => {
  return db.one(`
    UPDATE users SET
    name = $1,
    email = $2,
    permissions = $3,
    avatar = $4
    WHERE id = $5
    RETURNING *
  `, [user.name, user.email, user.permissions, user.avatar, id])
}

module.exports = User;
