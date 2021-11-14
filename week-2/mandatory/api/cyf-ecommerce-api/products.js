const {Pool} = require('pg');
const myPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week2_homeWork',
    password: 'Pro@450',
    port : 5432
})

//Create a new product

const createNewProduct= async (req, res)=> {
    try{
        const productBody = req.body;
        console.log(productBody);

        const query = (`INSERT INTO products (product_name, unit_price, supplier_id) 
        VALUES ($1, $2, $3) returning id `);

        const result = await myPool.query(query, 
            [productBody.product_name,
            productBody.unit_price,
            productBody.supplier_id]);

        console.log(result.rows);

        res.send(`A new product, Product ID: ${result.rows[0].id},  
        name: ${productBody.product_name},
        Price: ${productBody.unit_price} 
        has been created`);
        

    }catch(error){
        console.log(error);
    }
}

//show products and suppliers name AND query by products name

const getProductsFunc = async (req, res )=>{
    try{
        const searchName = (req.query.name);
    
        if(searchName){
            const query = `SELECT * FROM products WHERE product_name LIKE '%${searchName}%'`;
            const result = await myPool.query(query)
            res.json(result.rows)
    
        }else{
            const result = await  myPool.query(
                `SELECT product_name, supplier_name FROM products p INNER JOIN 
                suppliers s ON p.supplier_id = s.id`)
            res.json(result.rows)
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
        console.log(orderBody);

        const customerId = req.params.id;
        console.log(customerId);

        const query = (`INSERT INTO orders (order_date, order_reference, customer_id) 
        VALUES ($1, $2, $3) returning id `);

        const result = await myPool.query(query, 
            [orderBody.order_date,
            orderBody.order_reference,
            customerId]);

        console.log(result.rows);

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
        console.log(orderBody);

        const customerId = req.params.customerId;
        console.log(customerId);

        const query = (`INSERT INTO orders (order_date, order_reference, customer_id) 
        VALUES ($1, $2, $3) returning id `);

        const result = await myPool.query(query, 
            [orderBody.order_date,
            orderBody.order_reference,
            customerId]);

        console.log(result.rows);

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

module.exports = {
    createNewProduct,
    getProductsFunc,
    createNewOrder,
    updateOrder
}

