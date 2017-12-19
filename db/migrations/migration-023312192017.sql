DROP TABLE IF EXISTS workspace;

CREATE TABLE IF NOT EXISTS workspace (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id integer references users(id) NOT NULL,
  owner_id integer references users(id) NOT NULL
);
