CREATE OR REPLACE TABLE tests (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	is_active BOOLEAN NOT NULL,
	created_at DATETIME(3) NOT NULL DEFAULT NOW(),
  updated_at DATETIME(3)
);

INSERT INTO tests (name, is_active)
VALUES
	('jean', TRUE),
	('michel', false);
