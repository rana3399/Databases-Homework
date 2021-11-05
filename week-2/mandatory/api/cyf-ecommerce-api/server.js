const express =  require("express");
const app = express();
const {Pool} = require('pg');

//connection credentials for Week1_Class/cyf_hotels
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week1_Class',
    password: 'Pro@450',
    port : 5432
})

//connection credentials for Week2_homeWork
const myPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week2_homeWork',
    password: 'Pro@450',
    port : 5432
})

app.get("/hotels", function(req, res) {
    pool.query('SELECT * FROM hotels', (error, result) => {
        res.json(result.rows);
    });
});

//show all the customers 
function getCustomersFunc(req, res){
    pool.query('SELECT * FROM customers', (error, result)=> {
        res.json(result.rows);

    })
}

//show all the suppliers 
function getSuppliersFunc(req, res){
    myPool.query('SELECT * FROM suppliers', (error, result)=> {
        res.json(result.rows);

    })
}

function getProductsFunc (req, res ){
    myPool.query('SELECT * FROM products', function(error, result){
        res.json(result.rows)

    });

};

app.get("/customers", getCustomersFunc)
app.get("/suppliers", getSuppliersFunc)
app.get("/products", getProductsFunc)

const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port }`));

