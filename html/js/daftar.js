
//daftar
const nama = document.getElementById('nama')
const nim = document.getElementById('nim')
const user = document.getElementById('user')
const pass = document.getElementById('pass')
const telepon = document.getElementById('telepon')
const alamat = document.getElementById('alamat')
const daftar = document.getElementById('daftar')
const cek = document.getElementsByClassName('cek')[0]
const pesan = document.getElementById('pesan')

daftar.addEventListener('click', function(event){
    const url = "http://localhost:8000/daftar"
    const data = {
        nama: nama.value,
        nim: nim.value,
        username: user.value,
        password: pass.value,
        telepon: telepon.value,
        alamat: alamat.value
    }
    for (let i in data){
        if (data[i] === ''){
            cek.style.display = 'block'
            pesan.innerHTML = "Mohon isi semua field!"

            setTimeout(function(){
                cek.style.display='none';
            },3000)
            return
        }
    }
    fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(Response =>{
        if (!Response.ok){
            throw new Error(`HTTP: error, ${Response.status}`)
        }
        return Response.json()
    })
    .then(data =>{
        if (data.message === "ok"){
            window.location.href = '/'
            console.log(data.message)
        }
    })
    .catch(Error =>{
        console.log(`Error: ${Error}`)
    })

})