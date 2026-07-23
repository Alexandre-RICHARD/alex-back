CREATE OR REPLACE TABLE tests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	is_active BOOLEAN NOT NULL,
	created_at DATETIME(3) NOT NULL DEFAULT NOW(),
  updated_at DATETIME(3)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_520_ci;

INSERT INTO tests (name, is_active)
VALUES
	('jean', TRUE),
	('michel', false);
