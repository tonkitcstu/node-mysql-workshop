CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

-- Drop the users table if it already exists
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT
);

-- Insert sample data
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john.doe@example.com', 35);
INSERT INTO users (name, email, age) VALUES ('Jane Smith', 'jane.smith@example.com', 28);
