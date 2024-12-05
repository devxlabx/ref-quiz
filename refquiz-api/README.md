# Quiz App Backend

Welcome to the Quiz App Backend, the server-side application powering a quiz platform designed for referees in basketball and other sports. This backend manages user accounts, quiz content, scoring, and more.

---

# Features

User Management: Register, log in, and manage profiles for referees.
API: RESTful API to interact with the frontend.

---

# Technologies Used

Programming Language: Java 
Framework: Spring Boot
Database: MySQL 
Authentication: JSON Web Tokens (JWT)
Testing: JUnit 
Version Control: Git
Deployment: Docker 

---

# Installation

Prerequisites
Java JDK 17+ installed
MySQL database
Maven
Docker

---

# Steps

1. Clone the Repository

git clone https://github.com/your-username/quiz-app-backend.git
cd quiz-app-backend

2. Create a new database (e.g., quiz_app).

3. Update the database connection details in application.properties.

spring.datasource.url=jdbc:mysql://localhost:3306/quiz_app
spring.datasource.username=your-username
spring.datasource.password=your-password

4. Build the Application

mvn clean install

5. Run the Application

mvn spring-boot:run

---

# API Endpoints

**User Endpoints**

Method	 Endpoint	        Description	               Auth Required
POST	 /api/users     	Register a new user	       No
GET  	 /api/users     	Get all users   	       No
GET	     /api/users/{id}	Get user by id             Yes

---

