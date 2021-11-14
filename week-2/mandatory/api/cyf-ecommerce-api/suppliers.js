const {Pool} = require('pg');
const myPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Week2_homeWork',
    password: 'Pro@450',
    port : 5432

});

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

module.exports={
    getSuppliersFunc,
    searchSupplierByCountry
}
