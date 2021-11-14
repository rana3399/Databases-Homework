const { response } = require("express");
const express =  require("express");
const app = express();
const {Pool} = require('pg');


//connection credentials for Week2_homeWork
const myPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week2_homeWork',
    password: 'Pro@450',
    port : 5432
})


//show all the customers 
function getCustomersFunc(req, res){
    myPool.query('SELECT * FROM customers', (error, result)=> {
        res.json(result.rows);

    })
}

//show customers by ID
const getCustomersById= async (req, res)=> {
    const requestId = req.params.customerId;
    const result = await myPool.query('SELECT * FROM customers WHERE id=$1', [requestId])
    res.status(201).send(result.rows)
}

app.use(express.json());

        //Create New customer
const createNewCustomer= async (req, res)=> {
    try{
        const requestBody = req.body;
        console.log(requestBody);

        const query = (`INSERT INTO customers (name, address, city, country) 
        VALUES ($1, $2, $3, $4)`);

        const result = await myPool.query(query, 
            [requestBody.name,
            requestBody.address,
            requestBody.city,
            requestBody.country]
            );
        console.log(result.rows);

        res.json(`A new customer has name ${requestBody.name} created`);
    }catch(error){
        console.log(error);
    }
}

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

        res.json(`A new product, Product ID: ${result.rows[0].id},  
        name: ${productBody.product_name},
        Price: ${productBody.unit_price} 
        has been created`);

    }catch(error){
        console.log(error);
    }
}

        //search products by name with query parameter // NOT DONE !! 

const searchProductsByName = async (req, res)=>{
 try{
    const searchName = (req.query.name).toString();

    const query = `SELECT * FROM products WHERE product_name LIKE '%${searchName}%'`;
    const result = await myPool.query(query)
    res.json(result.rows)

 }catch(error){
     console.log(error);
 }

}

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

        //Add a new POST endpoint /customers/:customerId/orders
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

 //Add a new PUT endpoint `/customers/:customerId` to update an 
 //existing customer (name, address, city and country).

 const updateCustomerById = async (req, res )=>{
    try{
        const customerId = req.params.customerId;
        console.log(customerId);

        const customerBody = req.body;
        console.log(customerBody);

        const query = (`UPDATE customers SET name=$1, address=$2, city=$3, country=$4  
        WHERE id=$5`);

        const result = await myPool.query(query,
            [customerBody.name,
            customerBody.address,
            customerBody.city,
            customerBody.country,
            customerId
            ]);

        console.log(result.rows);

        res.json(`Customer ID: ${customerId} has been updated`);

    }catch(error){
        console.log(error);
    }

}


//show all the suppliers 
function getSuppliersFunc(req, res){
    myPool.query('SELECT * FROM suppliers', (error, result)=> {
        if(error){
            res.status(500).send('sorry there is a problem!')
        }else{
            res.json(result.rows);
        }
       
    });
}

        //search suppliers by their origin of country -  query parameter.

const searchSupplierByCountry = async (req, res)=>{
    const searchCountry = req.query.country

    const result = await myPool.query(`SELECT * FROM suppliers WHERE country = $1`, [searchCountry]);
    res.json(result.rows)


}


//show products and suppliers name only
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

} ;



app.get("/customers", getCustomersFunc)
app.get("/customers/:customerId", getCustomersById)
app.post("/customers", createNewCustomer)
app.put("/customers/:customerId", updateCustomerById)

app.post("/orders", createNewOrder);

app.post("/customers/:customerId/orders", updateOrder)

app.get("/suppliers", getSuppliersFunc)
app.get("/suppliers/country", searchSupplierByCountry)

app.get("/products", getProductsFunc)
//app.get("/products/:name", searchProductsByName)

app.post("/products", createNewProduct)




const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port}`));

