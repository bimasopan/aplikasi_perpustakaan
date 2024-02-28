const express = require('express')
const port = 5000
const path = require('path')
const body_parser = require('body-parser')
const knexConfig = require('./knexfile')
const bcrypt = require('bcrypt')
const knex = require('knex')(knexConfig.development)
const  app = express()

app.use('/css', express.static(path.join(__dirname, '/css')))
app.use('/ja',express.static(path.join(__dirname, '/js')))


//middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',function(req,ress){
    ress.sendFile(path.join(__dirname+'/index.html'))
})
app.get('/akun/daftar',function(req,ress){
    ress.sendFile(path.join(__dirname, '/daftar.html'))
})
app.get('/tes',function(req,ress){
    ress.sendFile(path.join(__dirname,'./testing/tes.html'))
})
app.post('/login', async function ( req, res ){
    let user = req.body.username;
    let pass = req.body.password;
    try{
        const db = await knex('data_perpus').select('username','password')
        .where({
            username: user,
            password: pass
        }).returning('*')
        if (db.length === 0){
            res.status(401).send({message:'username dan password salah'});
        }else {
            res.status(200).send({message:'username dan password benar'});
            console.log(db)
        }
    }catch(error){
        console.error(error)
        res.status(500).send("Terjadi kesalah")
    }

})
app.post("/tes",function(req,ress){
    const username = req.body.username
    const password = req.body.password
    ress.send({
        username: username,
        password: password
    })
})
app.post('/daftar',async function(req,ress){
    let data = {
        nama: req.body.nama,
        nim: req.body.nim,
        username: req.body.username,
        password: req.body.password,
        no_telepon: req.body.no_telepon,
        alamat: req.body.alamat
    }
    try{
        const hash = await bcrypt.hash(req.body.password, 10);
        data.password = hash;
        const  insertData = await knex('data_perpus').insert(data)
        ress.send("data berhasil ditambahkan")
        console.log(insertData)
    }catch(error){
        console.error(error)
        ress.status(500).send("server telah dimatikan")
    }
})
app.listen(port,function(){
    console.log("server start on port "+port)
})

