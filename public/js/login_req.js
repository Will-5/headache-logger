const login = document.getElementById('login')


login.addEventListener('submit',(e) => {
    e.preventDefault()
    const l_email = document.querySelectorAll('.login')[0].value
    const l_senha = document.querySelectorAll('.login')[1].value
    const url = '/users/login'

    fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": l_email,
            "password": l_senha
        })
    }).then((res) => res.json()).then((data) => {
        if (data.error || Object.keys(data).length === 0) {
            alert("Erro no login");
        } else {
            console.log(data)
            window.location.href = "/meuperfil"
        }
        })
        .catch((err) => {
            console.log(err);
        });
    
})