CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  user_full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  detail VARCHAR(500) NOT NULL,
  category TEXT, -- Feature, UI, Bug, etc.
  status TEXT,   -- Planned, In-Progress, Live
  upvotes INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  feedback_id INTEGER REFERENCES feedback(id),
  user_id INTEGER REFERENCES users(id),
  content VARCHAR(500),
  created_at TIMESTAMP
)

CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  comment_id INTEGER REFERENCES comments(id),
  user_id INTEGER REFERENCES users(id),
  content VARCHAR(500),
  created_at TIMESTAMP
)
