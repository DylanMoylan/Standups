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
  graph_position VARCHAR(255) NOT NULL,
  positives TEXT,
  negatives TEXT,
  group_id INTEGER REFERENCES users(id) NOT NULL,
  name VARCHAR(255),
  time_created TIMESTAMP
);
