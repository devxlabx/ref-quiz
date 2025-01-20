-- Insertion de rôles par défaut
INSERT INTO roles (name) VALUES ('USER'), ('ADMIN');

-- Insertion d'un utilisateur de test
INSERT INTO users (first_name, last_name, email, password, uuid, status)
VALUES ('John', 'Doe', 'jdoe@example.com', 'hashed_password', 'gvjgdfvfgjhfjf', true);

-- Attribution d'un rôle à l'utilisateur
INSERT INTO user_roles (role_id, user_id)
VALUES ((SELECT id FROM roles WHERE name = 'USER'),
        (SELECT id FROM users WHERE email = 'jdoe@example.com'));