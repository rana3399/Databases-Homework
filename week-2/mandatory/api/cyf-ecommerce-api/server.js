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
    pool.query('SELECT * FROM customers', (error, result)=> {
        res.json(result.rows);

    })
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
    myPool.query('SELECT product_name, supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id', function(error, result){
        res.json(result.rows)

    });

};

app.get("/customers", getCustomersFunc)
app.get("/suppliers", getSuppliersFunc)
app.get("/products", getProductsFunc)

const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port }`));

