const express = require('express')
const port = 8000
const path = require('path')
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig.development)
const bcrypt = require('bcrypt')
const cors = require('cors')
const { duration } = require('moment')
const app = express()
// const {data_perpus} = require('./data')

app.use('/html',express.static(path.join(__dirname, './html')))
app.use('/css',express.static(path.join(__dirname, './html/css')))
app.use('/js',express.static(path.join(__dirname, './html/js')))
app.use('/v1/css',express.static(path.join(__dirname,'./html/v1/css')))
app.use('/v1/js',express.static(path.join(__dirname, './html/v1/js')))

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//menampilkan login
app.get('/', function(req,ress){
    ress.sendFile(path.join(__dirname, "./html/login.html"))
})
//menampilkan daftar
app.get('/daftar',function(req,ress){
    ress.sendFile(path.join(__dirname, "./html/daftar.html"))
})
//menampilkan beranda
app.get('/v1/dasboard',function(req,ress){
    ress.sendFile(path.join(__dirname, './html/v1/dashboard.html'))
})
app.get('/tes',function(req,ress){
    ress.sendFile(path.join(__dirname,'./testing/tes.html'))
})
app.get('/admin', function(req,ress){
    ress.sendFile(path.join(__dirname, './html/admin.html'))
})
app.post('/admin',function(req,ress){
    const username = req.body.username
    const password = req.body.password

    const user = "admin"
    const pass = "admin"
    if (username === user || password === pass){
        ress.send({message: "ok"})
    }else{
        ress.send({message: "gagal"})
    }
})
//memerika apakah username dan password ada di database
app.post('/', async function(req,ress){
    let username = req.body.username;
    let password = req.body.password;

    try{
        const db = await knex("data_perpus").select("username","password")
        .where({
            username: username
        })
        if (db.length === 0 || !bcrypt.compareSync(password, db[0].password)){
            ress.send({message:"Username atau Password salah"})
            //ress.status(401).json({message:"Username atau Password salah"});
        }else{
            ress.send({message : "login berhasil"})
           // ress.status(200).json({message : "Berhasil",
        }
    }catch(error){
        console.error(error)
        ress.status(500).send({message: "Terjadi kesalahan"})
    }
})
//menambahkan data ke dalam databse
app.post('/daftar',async function(req,res){
    //insert data ke database
    const data = {
        nama: req.body.nama,
        nim: req.body.nim,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        no_telepon: req.body.no_telepon,
        alamat: req.body.alamat
    }
    try{
        const insertData = await knex('data_perpus').insert(data);
        res.send({message: "ok"})
    } catch(e){
        console.log(e)
        res.status(401).json({ message : "Gagal menambahkan data!" });
    }
})
app.get('/getRangeDB', async function(req, ress) {
    try {
        const countResult = await knex('data_perpus').count();
        const rowCount = parseInt(countResult[0].count);

        ress.json({rowCount});
    } catch (error) {
        console.error(error);
        ress.status(500).json({ success: false, error: 'Terjadi kesalahan saat menghitung jumlah data' });
    }
});
app.get('/getPinjam',async function(req,ress){
    try{
        const dataPinjam = await knex('data_peminjam').count()
        const result = parseInt(dataPinjam[0].count)

        ress.json({result})
    }catch(error){
        console.error(error)
        ress.status(500).json({error:'terjadi kesalahan saat memproses data'})
    }
})
app.get('/getBuku',async function(req,ress){
    try{
        const  dataBuku = await knex('data_buku').count()
        const  result= parseInt(dataBuku[0].count)

        ress.json({result})
    }catch(error){
        console.error(error)
        ress.status(500).json({error:'terjadi kesalahan saat memproses data'})
    }
})
app.get('/getKembali',async function(req,ress){
    try{
        const dataKembali = await knex('data_kembali').count()
        const result = parseInt(dataKembali[0].count)

        ress.json({result})
    }catch(error){
        console.error(error)
        ress.status(500).send({error:'terjadi kesalahan saat memproses data'})
    }
})
app.post("/tes",function(req,ress){
    const username = req.body.username
    const password = req.body.password
    
    // const hash = bcrypt.hash(password, 10)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)

    const hash = bcrypt.hashSync(password,salt)
    ress.send({
        username: username,
        password: hash
    })
    console.log({
        username: username,
        password: hash
    })
})
app.get('/testing', (req,ress)=> ress.redirect('https://www.google.com/') )

app.listen(port, () => console.log(`Server berjalan pada port `+port))
