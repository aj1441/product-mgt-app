
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  detail VARCHAR(500) NOT NULL,
  category TEXT, -- Feature, UI, Bug, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

