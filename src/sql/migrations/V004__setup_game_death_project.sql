CREATE OR REPLACE TABLE game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    started_at DATETIME NOT NULL,
    ended_at DATETIME NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_520_ci;

CREATE OR REPLACE TABLE boss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    defeated_at DATETIME NULL,
    CONSTRAINT fk_boss_game
        FOREIGN KEY (game_id) REFERENCES game (id)
        ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_520_ci;

CREATE INDEX idx_boss_game_id ON boss (game_id);


CREATE OR REPLACE TABLE death (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boss_id INT NOT NULL,
    date DATETIME NOT NULL,
    comment VARCHAR(1000) NULL,
    CONSTRAINT fk_death_boss
        FOREIGN KEY (boss_id) REFERENCES boss (id)
        ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_520_ci;

CREATE INDEX idx_death_boss_id ON death (boss_id);
