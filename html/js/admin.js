const user = document.getElementById('user')
const pass = document.getElementById('pass')
const cek = document.getElementsByClassName('cek')[0]
const pesan = document.getElementById('pesan')
// const btn = document.getElementById('btn');



function admin(){
    const data = {
        username: user.value,
        password: pass.value
    }
    if (data.username === '' || data.password === ''){
        cek.style.display = 'block'
        pesan.innerHTML = "Username dan Password tidak boleh kosong"

        setTimeout(function(){
            cek.style.display = 'none'
        },3000)
    }else{
        fetch("http://localhost:8000/admin",{
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(Response =>{
            if (!Response.ok){
                throw new Error(`HTTP: ERROR, ${Response.status}`)
            }
            return Response.json()
        })
        .then(data =>{
            if (data.message === "ok"){
                window.location.href = '/admin/dasboard'
            }else if (data.message ==="gagal"){
                cek.style.display = 'block'
                pesan.innerHTML = data.message
                setTimeout(function(){
                    cek.style.display = 'none'
                },3000)
            }
        })
        .catch(Error =>{
            console.log(`ERROR: ${Error}`)
        })
    }
}