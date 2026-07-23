CREATE TABLE error_log (
    id INT AUTO_INCREMENT PRIMARY KEY,

    error_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    stack_trace LONGTEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_error_type (error_type),
    INDEX idx_created_at (created_at)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_520_ci;
