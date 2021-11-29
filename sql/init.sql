CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, 
  email TEXT,
  password_hash TEXT
);

CREATE TABLE IF NOT EXISTS collections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS collections_tags (
  id SERIAL PRIMARY KEY, 
  collection_id INTEGER,
  tag_id INTEGER
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE
);


CREATE TABLE IF NOT EXISTS collections_cards (
  id SERIAL PRIMARY KEY,
  collections_id INTEGER,
  cards_id INTEGER
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  front TEXT,
  back TEXT
);
