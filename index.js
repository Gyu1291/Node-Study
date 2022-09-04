const {Pool} = require('pg');

const pg = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 1234,
    port: 5678
});

pg.connect(err=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Postgre DB Connected!");
    }
})