const express = require('express')
const port = 5000
const knex = require('knex')
const knexConfig = require('./knexfile')
const { json } = require('body-parser')

const app = express()
app.use(json())
const db = knex(knexConfig.development)

app.get("/",function(req,ress){
    ress.send({
        status: "ok",
        error: false
    })
})

app.listen(port, () => {
    db.raw('select 1=1 as test')
        .then(result => {
            console.log('DB CONNECTION:', result.rows[0].test);
        })
        .catch(err => {
            console.log('ERROR DB:', err);
        });
    console.log("Server started listening on PORT : " + port);
});