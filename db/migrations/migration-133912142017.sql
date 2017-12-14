DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS standups;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password_digest TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  permissions INT,
  avatar VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS standups (
  id SERIAL PRIMARY KEY,
  graph_position INT NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(255),
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  parent_group INTEGER
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  comment_body TEXT,
  from_id INTEGER REFERENCES users(id) NOT NULL,
  to_id INTEGER REFERENCES standups(id) NOT NULL,
  time_created TIMESTAMP,
  comment_type VARCHAR(255)
);
