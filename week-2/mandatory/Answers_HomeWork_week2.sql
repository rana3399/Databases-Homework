SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM products;

--1. Retrieve all the customers names and addresses who lives in United States
SELECT name, address FROM customers WHERE country = 'United States';

--2. Retrieve all the customers ordered by ascending name
SELECT * FROM customers c INNER JOIN orders o ON c.id = o.customer_id ORDER BY name;

--3. Retrieve all the products which cost more than 100
SELECT * FROM products WHERE unit_price >100

--4. Retrieve all the products whose name contains the word `socks`
SELECT * FROM products WHERE product_name LIKE '%socks%';

SELECT product_name, supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id

--5. Retrieve the 5 most expensive products ??
SELECT Max(p.unit_price) AS maximun_prices FROM products p


--6. Retrieve all the products with their corresponding suppliers. The result 
    --should only contain the columns `product_name`, `unit_price` and `supplier_name`
SELECT 
    p.product_name, 
    p.unit_price, 
    s.supplier_name 
        FROM products p INNER JOIN 
        suppliers s ON p.supplier_id = s.id;

--7. Retrieve all the products sold by suppliers based in the United Kingdom. The result 
    --should only contain the columns `product_name` and `supplier_name`.
SELECT 
    p.product_name,  
    s.supplier_name 
        FROM products p INNER JOIN 
        suppliers s ON p.supplier_id = s.id
        WHERE s.country = 'United Kingdom';


--8. Retrieve all orders from customer ID `1`
SELECT * FROM orders WHERE customer_id = 1;

--9. Retrieve all orders from customer named `Hope Crosby`
SELECT * FROM 
	orders o 
	INNER JOIN customers c ON c.id = o.customer_id
	WHERE c.name = 'Hope Crosby';

--10. Retrieve all the products in the order `ORD006`. The result should only contain 
--the columns `product_name`, `unit_price` and `quantity`.  ???
SELECT  p.product_name,
        p.unit_price,
        oItems.quantity

 FROM products p 
    INNER JOIN order_items oItems ON oItems.product_id = p.id
    INNER JOIN orders o ON o.id = oItems.order_id WHERE o.order_reference = 'ORD006';

--11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
SELECT c.name,
    o.order_reference,
    o.order_date,
    p.product_name,
    s.supplier_name,
    oItem.quantity
  FROM products p 
    INNER JOIN order_items oItem ON oItem.product_id = p.id
    INNER JOIN orders o ON o.id = oItem.order_id
    INNER JOIN customers c ON o.id = c.id 
    INNER JOIN suppliers s ON s.id = p.supplier_id

--12. Retrieve the names of all customers who bought a product from a supplier from China.
SELECT c.name as customers_bought_from_China 
    FROM customers c
        INNER JOIN orders o ON o.customer_id = c.id
        INNER JOIN order_items oItems ON oItems.order_id = o.id
        INNER JOIN products p ON p.id = oItems.product_id
        INNER JOIN suppliers s ON s.id = p.supplier_id
            WHERE s.country = 'China';