CREATE DATABASE AcadRev;
USE AcadRev;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique ID for each user (Auto-incremented)
    username VARCHAR(100) NOT NULL UNIQUE,    -- User's username (unique)
    password VARCHAR(255) NOT NULL,           -- User's password (hashed)
    email VARCHAR(100) NOT NULL UNIQUE,       -- User's email (must be unique)
    level VARCHAR(50) NOT NULL,               -- User's level (e.g., Student, Admin)
    university VARCHAR(255) NOT NULL,         -- User's university
    college VARCHAR(255) NOT NULL,            -- User's college
    department VARCHAR(255) NOT NULL,         -- User's department
    program VARCHAR(255) NOT NULL,            -- User's program (e.g., Computer Science)
    perm VARCHAR(255)                   -- Permissions for the user (could store roles or specific permissions)
);
SHOW TABLES;
SELECT * FROM users;

INSERT INTO users (username, password, email, level, university, college, department, program, perm)
VALUES
('john_doe', 'hashedpassword123', 'john.doe@example.com', 'Student', 'Sample University', 'Engineering', 'Computer Science', 'BSc Computer Science', 'read, write'),
('jane_smith', 'hashedpassword456', 'jane.smith@example.com', 'Admin', 'Sample University', 'Engineering', 'Computer Science', 'MSc Computer Science', 'read, write, delete'),
('ameer', '123456', 'ameer@gmail.com', 'Admin', 'ameerUni', NULL, NULL, NULL, 'read, write, delete, edit');



