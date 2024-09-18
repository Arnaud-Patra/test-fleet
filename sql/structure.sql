-- Create the database
CREATE DATABASE IF NOT EXISTS ecommerce_db;

-- Use the new database
USE ecommerce_db;

-- Create Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    order_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Order_Items table. Many-to-Many Relationship. This allows multiple products per order, and multiple orders per product.
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert sample users
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_smith', 'jane@example.com', 'hashed_password_2'),
('bob_johnson', 'bob@example.com', 'hashed_password_3'),
('alice_williams', 'alice@example.com', 'hashed_password_4'),
('charlie_brown', 'charlie@example.com', 'hashed_password_5');

-- Insert sample products
INSERT INTO products (name, description, price, stock_quantity) VALUES
('PRODUCT_1 ', 'High-performance laptop', 999.99, 50),
('PRODUCT_2 ', 'Latest model smartphone', 699.99, 100),
('PRODUCT_3 ', 'Noise-cancelling headphones', 199.99, 75),
('PRODUCT_4 ', '10-inch tablet', 299.99, 30),
('PRODUCT_5 ', 'Fitness tracking smart watch', 149.99, 60),
('PRODUCT_6 ', 'Digital SLR camera', 799.99, 25),
('PRODUCT_7 ', '10000mAh power bank', 49.99, 200);

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, order_date) VALUES
(1, 1199.98, 'Completed', CURDATE() - INTERVAL 6 DAY),
(2, 699.99, 'Shipped', CURDATE() - INTERVAL 6 DAY),
(3, 349.98, 'Processing', CURDATE() - INTERVAL 4 DAY),
(4, 999.99, 'Completed', CURDATE() - INTERVAL 4 DAY),
(1, 249.98, 'Shipped', CURDATE() - INTERVAL 2 DAY),
(5, 849.98, 'Processing', CURDATE() - INTERVAL 1 DAY),
(2, 1499.97, 'Completed', CURDATE()- INTERVAL 10 DAY);

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price_per_unit) VALUES
(1, 1, 1, 999.99),
(1, 3, 1, 199.99),
(2, 2, 1, 699.99),
(3, 3, 1, 199.99),
(3, 5, 1, 149.99),
(4, 1, 1, 999.99),
(5, 4, 1, 299.99),
(6, 6, 1, 799.99),
(6, 7, 1, 49.99),
(7, 1, 1, 999.99),
(7, 2, 1, 699.99);
