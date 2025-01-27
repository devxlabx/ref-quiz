-- Table "users"
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       email_hash VARCHAR(50) NOT NULL UNIQUE,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       email VARCHAR(50) NOT NULL UNIQUE,
                       password VARCHAR(125) NOT NULL,
                       creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
                       status VARCHAR(50) NOT NULL DEFAULT 'DEACTIVATED',
                       last_connexion DATE
);

-- Table "roles"
CREATE TABLE roles (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(50) NOT NULL UNIQUE
);

-- Table "user_roles"
CREATE TABLE user_roles (
                            role_id BIGINT NOT NULL,
                            user_id BIGINT NOT NULL,
                            PRIMARY KEY (role_id, user_id),
                            CONSTRAINT FK_roles FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
                            CONSTRAINT FK_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Table "sports"
CREATE TABLE sports (
                        id BIGSERIAL PRIMARY KEY,
                        label VARCHAR(100) NOT NULL,
                        description TEXT
);

-- Table "themes"
CREATE TABLE themes (
                        id BIGSERIAL PRIMARY KEY,
                        label VARCHAR(100) NOT NULL,
                        description TEXT,
                        sport_id BIGINT NOT NULL,
                        FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- Table "quiz"
CREATE TABLE quiz (
                      id BIGSERIAL PRIMARY KEY,
                      label VARCHAR(100) NOT NULL,
                      status BOOLEAN NOT NULL,
                      theme_id BIGINT NOT NULL,
                      FOREIGN KEY (theme_id) REFERENCES themes(id)
);

-- Table "questions"
CREATE TABLE questions (
                           id BIGSERIAL PRIMARY KEY,
                           text_question TEXT NOT NULL,
                           type_question VARCHAR(50),
                           level_of_difficulty VARCHAR(50),
                           quiz_id BIGINT NOT NULL,
                           FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

-- Table "answers"
CREATE TABLE answers (
                         id BIGSERIAL PRIMARY KEY,
                         text_answer TEXT NOT NULL,
                         is_correct BOOLEAN NOT NULL,
                         question_id BIGINT NOT NULL,
                         FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Table "participation"
CREATE TABLE participation (
                               id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               quiz_id BIGINT NOT NULL,
                               score INT NOT NULL,
                               participation_date DATE NOT NULL,
                               UNIQUE (user_id, quiz_id),
                               FOREIGN KEY (user_id) REFERENCES users(id),
                               FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

-- Table "results"
CREATE TABLE results (
                         id BIGSERIAL PRIMARY KEY,
                         participation_id BIGINT NOT NULL,
                         attempt INT NOT NULL,
                         global_score INT NOT NULL,
                         FOREIGN KEY (participation_id) REFERENCES participation(id) ON DELETE CASCADE
);

-- Table "badges"
CREATE TABLE badges (
                        id BIGSERIAL PRIMARY KEY,
                        label VARCHAR(100) NOT NULL,
                        description TEXT
);

-- Table "user_badges"
CREATE TABLE user_badges (
                             user_id BIGINT NOT NULL,
                             badge_id BIGINT NOT NULL,
                             date_reward DATE NOT NULL,
                             PRIMARY KEY (user_id, badge_id),
                             FOREIGN KEY (user_id) REFERENCES users(id),
                             FOREIGN KEY (badge_id) REFERENCES badges(id)
);

-- Table "users_sports"
CREATE TABLE users_sports (
                              user_id BIGINT NOT NULL,
                              sport_id BIGINT NOT NULL,
                              PRIMARY KEY (user_id, sport_id),
                              FOREIGN KEY (user_id) REFERENCES users(id),
                              FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- Indexes pour améliorer les performances des requêtes
CREATE INDEX IDX_USER_ROLES_ROLE_ID ON user_roles(role_id);
CREATE INDEX IDX_USER_ROLES_USER_ID ON user_roles(user_id);
CREATE INDEX IDX_THEMES_SPORT_ID ON themes(sport_id);
CREATE INDEX IDX_QUIZ_THEME_ID ON quiz(theme_id);
CREATE INDEX IDX_QUESTIONS_QUIZ_ID ON questions(quiz_id);
CREATE INDEX IDX_ANSWERS_QUESTION_ID ON answers(question_id);
CREATE INDEX IDX_PARTICIPATION_USER_ID ON participation(user_id);
CREATE INDEX IDX_PARTICIPATION_QUIZ_ID ON participation(quiz_id);
CREATE INDEX IDX_RESULTS_PARTICIPATION_ID ON results(participation_id);
CREATE INDEX IDX_USER_BADGES_USER_ID ON user_badges(user_id);
CREATE INDEX IDX_USER_BADGES_BADGE_ID ON user_badges(badge_id);
CREATE INDEX IDX_USERS_SPORTS_USER_ID ON users_sports(user_id);
CREATE INDEX IDX_USERS_SPORTS_SPORT_ID ON users_sports(sport_id);
