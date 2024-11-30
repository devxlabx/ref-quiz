CREATE TABLE Users
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    role          VARCHAR(50)  NOT NULL DEFAULT 'USER',
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Inserting data into Users table
INSERT INTO Users (username, email, password, role, last_login_at)
VALUES ('jdoe', 'jdoe@example.com', 'hashed_password', 'USER', CURRENT_TIMESTAMP);
