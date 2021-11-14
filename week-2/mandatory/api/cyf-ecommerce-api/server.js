const { response } = require("express");
const express =  require("express");
const app = express();

const {  
    getCustomersFunc,
    getCustomersById,
    createNewCustomer,
    updateCustomerById    
} = require("./customers")

const {  
    createNewProduct,
    getProductsFunc,
    createNewOrder,
    updateOrder
} = require("./products")

const {Pool} = require('pg');
const myPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week2_homeWork',
    password: 'Pro@450',
    port : 5432
})

app.use(express.json())

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

 app.get("/customers", getCustomersFunc)
 app.get("/customers/:customerId", getCustomersById)
 app.post("/customers", createNewCustomer)
 app.put("/customers/:customerId", updateCustomerById)

 app.post("/orders", createNewOrder);
 app.post("/customers/:customerId/orders", updateOrder)

 app.get("/suppliers", getSuppliersFunc)
 app.get("/suppliers/country", searchSupplierByCountry)

 app.get("/products", getProductsFunc)
 app.post("/products", createNewProduct)

const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port}`));

