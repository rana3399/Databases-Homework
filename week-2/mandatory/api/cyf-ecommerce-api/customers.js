const {Pool} = require('pg');
const secret = require("./secret.json")
const myPool = new Pool(secret)

//show all the customers 
function getCustomersFunc(req, res){
    myPool.query('SELECT * FROM customers', (error, result)=> {
        res.send(result.rows);

    })
}

//show customers by ID
const getCustomersById= async (req, res)=> {
    const requestId = req.params.customerId;
    const result = await myPool.query('SELECT * FROM customers WHERE id=$1', [requestId])
    res.status(201).send(result.rows)
}

//app.use(express.json());

        //Create New customer
const createNewCustomer = async (req, res)=> {
    try{
        const requestBody = req.body;
        console.log(requestBody);

        const query = (`INSERT INTO customers (name, address, city, country) 
        VALUES ($1, $2, $3, $4)`);

        const result = await myPool.query(query, 
            [requestBody.name,
            requestBody.address,
            requestBody.city,
            requestBody.country]);
        console.log(result.rows);

        res.send(`A new customer has name ${requestBody.name} created`);
    }catch(error){
        console.log(error);
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


//Add a new DELETE endpoint /customers/:customerId to delete an 
//existing customer only if this customer doesn't have orders.

const deleteCustomer = async (req, res)=>{
    const customerId = req.params.customerId;

    await myPool.query(
        `delete from customers where id = $1`, [customerId]);
    res.status(201).send(`Customer id ${customerId} has been deleted.`)
}

//Add a new DELETE endpoint /customers/:customerId to delete an existing 
//customer only if this customer doesn't have orders.

const deleteCustomerById = async (req, res ) =>{
    try{
    const customerId = req.params.customerId;
    const findOrdersQuery = `SELECT * FROM orders WHERE customer_id = $1`;

    const ordersResult = await myPool.query(findOrdersQuery, [customerId]);
    
    const isOrderExist = ordersResult.rows;
    console.log(ordersResult.rows.length);

    if(isOrderExist.length > 0){
        res
        .status(201)
        .send(`Customer id ${customerId} has orders, are you sure you wanna delete it?.`);
    }else{   
        const deleteCustomer = `DELETE FROM customers WHERE id = $1`;
        const deleteOrders = `DELETE FROM orders WHERE customer_id = $1`;

        await myPool.query(deleteCustomer, [customerId]);
        await myPool.query(deleteOrders, [customerId]);

        res
        .status(201)
        .send(`Customer id ${customerId} has been deleted successfully.`)

    } 

    }catch(error){
        console.log('There is a problem, please try again later');
    }  
} 

module.exports={
    getCustomersFunc,
    getCustomersById,
    createNewCustomer,
    updateCustomerById,
    deleteCustomer,
    deleteCustomerById
}




