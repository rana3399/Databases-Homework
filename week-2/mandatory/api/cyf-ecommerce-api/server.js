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

//show products and suppliers name only
function getProductsFunc (req, res ){
    myPool.query(
        'SELECT product_name, supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id', function(error, result){
        res.json(result.rows)

    });

};

app.get("/customers", getCustomersFunc)
app.get("/customers/:customerId", getCustomersById)
app.post("/customers", createNewCustomer)

app.get("/suppliers", getSuppliersFunc)
app.get("/products", getProductsFunc)

const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port}`));

