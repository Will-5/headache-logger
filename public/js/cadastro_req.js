const cadastro = document.getElementById('cadastro')


cadastro.addEventListener('submit',(e) => {
    e.preventDefault()
    const c_cnome = document.querySelectorAll('.cadastro')[0].value
    const c_email = document.querySelectorAll('.cadastro')[1].value
    const c_senha = document.querySelectorAll('.cadastro')[2].value
    const c_idade = document.querySelectorAll('.cadastro')[3].value
    const url = '/users'

    fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": c_cnome,
            "email": c_email,
            "password": c_senha,
            "age": c_idade
        })
    }).then((res) => res.json()).then((data) => {
        if (data.errors) {
            console.log(data.errors.message)
            alert("Erro no cadastro");
        } else {
            console.log(data)
            alert("cadastro com sucesso")
        }
        })
        .catch((err) => {
        console.log(err);
        });
    
})