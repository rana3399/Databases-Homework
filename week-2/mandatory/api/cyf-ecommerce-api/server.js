const { response } = require("express");
const express =  require("express");
const app = express();

const {  
    getCustomersFunc,
    getCustomersById,
    createNewCustomer,
    updateCustomerById,
    deleteCustomerById   
} = require("./customers")

const {  
    createNewProduct,
    getProductsFunc,
    createNewOrder,
    updateOrder,
    deleteOrder,
    getCustomersOrderInfoById
} = require("./products")

const {  
    getSuppliersFunc,
    searchSupplierByCountry  
} = require("./suppliers")

const {Pool} = require('pg');
const secret = require("./secret.json")
const myPool = new Pool(secret);

app.use(express.json())

 app.get("/customers", getCustomersFunc)
 app.get("/customers/:customerId", getCustomersById)
 app.post("/customers", createNewCustomer)
 app.put("/customers/:customerId", updateCustomerById)

 app.post("/orders", createNewOrder);
 app.post("/customers/:customerId/orders", updateOrder)
 app.get("/customers/:customerId/orders", getCustomersOrderInfoById)

 app.get("/suppliers", getSuppliersFunc)
 app.get("/suppliers/country", searchSupplierByCountry)

 app.get("/products", getProductsFunc)
 app.post("/products", createNewProduct)

 app.delete("/orders/:orderId", deleteOrder);
 app.delete("/customers/:customerId", deleteCustomerById);
 

const port  = 4000;
app.listen (port, () => console.log(`app listening to port: ${port}`));

