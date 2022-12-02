const logged = sessionStorage.getItem("logged")

if(logged==="1"){
    fetch("/users/me", {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    }).then((res) => res.json()).then((data) => {
        if (data.error) {
            console.log(data)
        } else {
            console.log(data)
            var meuperfil = document.createElement('a')
            var dor = document.createElement('a')
            var sair = document.createElement('a')

            meuperfil.href = "/meuperfil"
            dor.href = "/cadastrar_dor"
            sair.href = "/users/logout_all"

            meuperfil.innerText = "Minha área"
            dor.innerText = "Cadastrar dor"
            sair.innerText = "Sair"

            document.getElementsByTagName("header")[0].appendChild(meuperfil)
            document.getElementsByTagName("header")[0].appendChild(dor)
            document.getElementsByTagName("header")[0].appendChild(sair)
        } 
    })

} else {
    var home = document.createElement('a')
            
        home.href = "/"
        home.innerText = "Home"

        document.getElementsByTagName("header")[0].appendChild(home)
}
    
    