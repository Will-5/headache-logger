const registro_dor = document.getElementById("registro_dor")
const getRadioInput = () => {
    var t = document.getElementsByName("radio_input")
    for (var i=0;i<t.length;i++){
        if (t[i].checked){
            return t[i].value
        }
    }
}
const getRemedios =() =>{
    var r = document.querySelectorAll(".cadastro.remedio")
    let arr = []
    for (var i=0;i<r.length;i++){
        arr.push(r[i].value)
    }
    return arr
}

registro_dor.addEventListener("submit",(e) => {
    e.preventDefault()

    const desc = document.getElementById("input_desc").value
    const duracao = document.getElementById("input_duracao").value
    const inicio = document.getElementById("input_inicio").value
    const intensidade = document.getElementById("input_intensidade").value
    const remedioFuncionou = document.getElementById("input_funcionou").checked
    const gatilho = getRadioInput()
    const remedios = getRemedios()
    const url = '/headaches'

    if(!inicio.includes('-')
        && !Date.parse(inicio)
        && inicio.slice(4,5) != '-'
        && inicio.slice(7,8) != '-'
        && inicio.slice(5,7) > 12
        && inicio.slice(8,10) > 31
    ){
        alert("digite a data no formato correto")
    } else{
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "description": desc,
                "duration": duracao,
                "headacheStartDate": Date.parse(inicio),
                "intensity": intensidade,
                "trigger": gatilho,
                "remedy": remedios,
                "remedyWorked": remedioFuncionou
            })
        }).then((res) => res.json()).then((data) => {
            if (data.errors) {
                console.log(data)
                alert(data.message)
            } else {
                console.log(data)
                alert("Cadastro de  dor de cabeça foi um sucesso")
            }
            }).catch((err) => {
                console.log(err);
            })
    }
})    

