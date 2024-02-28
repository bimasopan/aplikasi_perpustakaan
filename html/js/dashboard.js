// const time = require('moment')
const C = document.getElementById('C')
const D = document.getElementById('D')
const E = document.getElementById('E')
const F = document.getElementById('F')
const waktu = document.getElementById('time')
const time = new Date;

var indexHari = time.getDay();
const ListHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const hari = ListHari[indexHari];

var tahun = time.getFullYear();
var  bulan = time.getMonth() + 1;
var tanggal = time.getDate();

waktu.innerHTML = `${hari}, ${tanggal} 0${bulan} ${tahun}`;
// console.log(`${hari}, ${tanggal} 0${bulan} ${tahun}`)


// data anggota
fetch("http://localhost:8000/getRangeDB",{
    method: "GET",
    headers: {
        'Content-type' : 'application/json'
    }
})
.then(Response =>{
    if (!Response.ok){
        throw new Error(`HTTP: ERROR, ${Response}`)
    }
    return Response.json()
})
.then(data=>{
    C.innerHTML = data.rowCount
    C.style.color = 'white'
})
.catch(Error=>{
    console.log(`ERROR : ${Error}`)
})

//data buku
fetch("http://localhost:8000/getBuku",{
    method: "GET",
    headers: {
        'Content-type' : 'application/json'
    }
})
.then(Response =>{
    if (!Response.ok){
        throw new Error(`HTTP: ERROR, ${Response}`)
    }
    return Response.json()
})
.then(data=>{
    D.innerHTML = data.result
    D.style.color = 'white'
})
.catch(Error=>{
    console.log(`ERROR : ${Error}`)
})
// data peminjam
fetch("http://localhost:8000/getPinjam",{
    method: "GET",
    headers: {
        'Content-type' : 'application/json'
    }
})
.then(Response =>{
    if (!Response.ok){
        throw new Error(`HTTP: ERROR, ${Response}`)
    }
    return Response.json()
})
.then(data=>{
    E.innerHTML = data.result
    E.style.color = 'white'
})
.catch(Error=>{
    console.log(`ERROR : ${Error}`)
})
//data pengembalian
fetch("http://localhost:8000/getKembali",{
    method: "GET",
    headers: {
        'Content-type' : 'application/json'
    }
})
.then(Response =>{
    if (!Response.ok){
        throw new Error(`HTTP: ERROR, ${Response}`)
    }
    return Response.json()
})
.then(data=>{
    F.innerHTML = data.result
    F.style.color = 'white'
})
.catch(Error=>{
    console.log(`ERROR : ${Error}`)
})
