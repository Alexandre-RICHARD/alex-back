CREATE TABLE error_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    error_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    stack_trace LONGTEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_error_type (error_type),
    INDEX idx_created_at (created_at)
);
