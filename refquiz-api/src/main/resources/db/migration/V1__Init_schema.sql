-- Création de la table des rôles
CREATE TABLE roles (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL UNIQUE
);
-- Création de la table des utilisateurs
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       statut VARCHAR(50) NOT NULL DEFAULT 'Actif',
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       last_login_at TIMESTAMP NULL
);
-- Création de la table intermédiaire pour la relation Many-to-Many
CREATE TABLE user_roles (
                            role_id BIGINT NOT NULL,
                            user_id BIGINT NOT NULL,
                            PRIMARY KEY (role_id, user_id),
                            FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
                            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
-- Insertion de rôles par défaut
INSERT INTO roles (name) VALUES ('USER'), ('ADMIN');

-- Insertion d'un utilisateur de test
INSERT INTO users (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'jdoe@example.com', 'hashed_password');

-- Attribution d'un rôle à l'utilisateur
INSERT INTO user_roles (role_id, user_id)
VALUES ((SELECT id FROM roles WHERE name = 'USER'),
        (SELECT id FROM users WHERE email = 'jdoe@example.com'));
