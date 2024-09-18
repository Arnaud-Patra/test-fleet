Select * from users;
Select * from products;
Select * from orders;
Select * from order_items;


-- Query to find all users who have bought a laptop in the last 7 days
SELECT DISTINCT u.email 
FROM users u
JOIN orders o ON u.user_id = o.user_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE p.name = 'laptop'
AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)

-- Query to find the total sales per day
SELECT DATE(o.order_date) AS sale_date, SUM(o.total_amount) as total_sales
FROM orders as o
group by DATE(order_date)
ORDER BY sale_date DESC;


