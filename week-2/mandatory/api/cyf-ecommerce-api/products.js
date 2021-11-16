const {Pool} = require('pg');
const secret = require("./secret.json");
const myPool = new Pool(secret);

//Add a new POST endpoint /products to create a new product (with a product name, a 
//price and a supplier id). Check that the price is a positive integer and that the 
//supplier ID exists in the database, otherwise return an error.

const createNewProduct= async (req, res)=> {
    try{
        const productName = req.body.product_name;
        const productPrice = req.body.unit_price;
        const supplierId = req.body.supplier_id;

        const findSupplierIdQuery = `SELECT * FROM suppliers WHERE id = $1`;
        const findSupplierId = await myPool.query(findSupplierIdQuery,  [supplierId]);


        if(!Number.isInteger(productPrice) && !Number.isInteger(supplierId)){
            res.status(400).send('Price and Supplier id must be a number.');

        }else if(findSupplierId.rows.length < 1){
            res.status(400).send('Supplier id doesent exist.');
        }
        
        else{
            const query = (`INSERT INTO products (product_name, unit_price, supplier_id) 
            VALUES ($1, $2, $3) returning id `);
    
            const result = await myPool.query(query, 
                [productName,
                productPrice,
                supplierId]);
    
            res.send(`A new product, Product ID: ${result.rows[0].id},  
            name: ${productName},
            Price: ${productPrice} 
            has been created`);
        }

    }catch(error){
        res
        .status(500)
        .send('Something went wrong! Please try again later.')
        console.log(error);
    } 
}

//show products and suppliers name AND query by products name

const getProductsFunc = async (req, res )=>{
    try{
        const searchName = (req.query.name);
    
        if(searchName){
            const query = `SELECT * FROM products WHERE product_name LIKE '%${searchName}%'`;
            const result = await myPool.query(query);
            res.json(result.rows);
    
        }else{
            const result = await  myPool.query(
                `SELECT product_name, supplier_name FROM products p INNER JOIN 
                suppliers s ON p.supplier_id = s.id`)
            res.json(result.rows);
        }
    }catch(error){
        res
        .status(500)
        .send('Try again later.')
    }   
};

        //Add a new POST endpoint /customers/:customerId/orders
const createNewOrder = async (req, res )=>{
    try{
        const orderBody = req.body;
        const customerId = req.params.id;

        const query = (`INSERT INTO orders (order_date, order_reference, customer_id) 
        VALUES ($1, $2, $3) returning id `);

        const result = await myPool.query(query, 
            [orderBody.order_date,
            orderBody.order_reference,
            customerId]);

        //console.log(result.rows);
        res.json(`A new order, order ID: ${result.rows[0].id},  
        order-date: ${orderBody.order_date},
        order-ref: ${orderBody.order_reference} 
        has been created`);

    }catch(error){
        console.log(error);
    }
}

    //  Add a new POST endpoint /customers/:customerId/orders
const updateOrder = async (req, res )=>{
    try{
        const orderBody = req.body;


        const customerId = req.params.customerId;
        const query = (`INSERT INTO orders (order_date, order_reference, customer_id) 
        VALUES ($1, $2, $3) returning id `);

        const result = await myPool.query(query, 
            [orderBody.order_date,
            orderBody.order_reference,
            customerId]);

        res.json(`A new order, order ID: ${result.rows[0].id},  
        order-date: ${orderBody.order_date},
        order-ref: ${orderBody.order_reference} 
        has been created`);

    }catch(error){
        if(error.code == 23503){
            res.status(404)
            .send( 'Customers doesent exists!')

        }
    }
}

// Add a new DELETE endpoint /orders/:orderId to delete an 
//existing order along all the associated order items.

const deleteOrder = async (req, res)=>{
    const orderId = req.params.orderId;

    await myPool.query(
        `delete from order_items where order_id = $1`, [orderId]);
    res.status(201).send(`Order id ${orderId} has been deleted.`)
}


//Add a new GET endpoint /customers/:customerId/orders to load all the orders along 
//the items in the orders of a specific customer. Especially, the following information 
//should be returned: order references, order dates, product names, unit prices, suppliers and quantities.

const getCustomersOrderInfoById = async (req, res )=>{
    try{
        const customerId = req.params.id;
        const query = (`SELECT 
        c.name AS searched_customer_name,
        c.id AS searched_customer_ID,
        o.order_reference,
        o.order_date,
        p.product_name,
        P.unit_price,
        s.supplier_name,
        oItem.quantity
        FROM products p 
            INNER JOIN order_items oItem ON oItem.product_id = p.id
            INNER JOIN orders o ON o.id = oItem.order_id
            INNER JOIN customers c ON o.id = c.id 
            INNER JOIN suppliers s ON s.id = p.supplier_id
                WHERE c.id = $1`);

       const result = await myPool.query(query, [customerId]);
       res.status(201).send(`Successfully created`)
       //res.json("Successfully created")

    }catch(error){
        console.log(error);
    }

}

module.exports = {
    createNewProduct,
    getProductsFunc,
    createNewOrder,
    updateOrder,
    deleteOrder,
    getCustomersOrderInfoById
}

