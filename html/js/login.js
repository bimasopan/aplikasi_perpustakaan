//login
const user = document.getElementById('user')
const pass = document.getElementById('pass')
const cek = document.getElementsByClassName('cek')[0]
const pesan = document.getElementById('pesan')
const btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    const data = {
        username: user.value,
        password: pass.value
    }
    const url = "http://localhost:8000/";

    if ( data.username === '' || data.password === ''){
        cek.style.display = "block"
        pesan.innerHTML = "username dan password tidak boleh kosong"
        setTimeout(function(){
            cek.style.display='none'
        },2000)
    }else{
        fetch(url,{
            method:'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(Response =>{
            if (!Response.ok){
                throw new Error(`HTTP error! status: ${Response.status}`)
            }
            return Response.json()
        })
        .then(data =>{
            if (data.message === "Username atau Password salah"){
                cek.style.display = "block"
                pesan.innerHTML = data.message
                setTimeout(function(){
                    cek.style.display='none'
                },2000)
            }else if (data.message === "login berhasil"){
                window.location.href = '/admin/dasboard'
            }
        })
        .catch(Error => {
            console.log(`error : ${Error.message}`)
        })
    }
})

