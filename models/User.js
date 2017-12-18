const db = require('../db/config');

const User = {};

User.findByEmail = email => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE email = $1
  `, [email]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (name, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.name, user.email, user.password_digest]);
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
