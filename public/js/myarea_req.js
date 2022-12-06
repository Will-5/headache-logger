// let c = document.cookie.Token;
// console.log(c)
// if (!c) {
//     alert("Realize login")
//     window.location.href = "/"
// }

const booleanToSimOuNao = (bool) => {
    if (bool)
        return "Sim"
    else
        return "Não"
}

const remediesWriter = (remedies) => {
    return remedies.filter(element => {
        return element != ''
    })
}

const mostCommonTriggerWriter = (data) => {
    let triggers = []
    for(let i=0;i<data.length;i++){
        triggers.push(data[i].trigger)
    }
    if(triggers.length == 0)
        return null
    let modeMap = {}
    let maxEl = triggers[0], maxCount = 1
    for(let i = 0; i < triggers.length; i++)
    {
        let el = triggers[i]
        if(modeMap[el] == null)
            modeMap[el] = 1
        else
            modeMap[el]++; 
        if(modeMap[el] > maxCount)
        {
            maxEl = el
            maxCount = modeMap[el]
        }
    }
    document.getElementById("gatilho_comum").innerText = maxEl
}

const monthlyFreqWriter = (data) => {
    const month = (new  Date().getMonth())+1
    let counter = 0
    for(let i=0;i<data.length;i++){
        if(data[i].headacheStartDate.split('-')[1] == month){
            counter++
        }
        document.getElementById("freq_mes").innerText = counter
    }
}

const worstHeadacheWriter = (data) => {
    let maior = 0, indexMaior = 0
    for(let i = data.length-1; i >= 0; i--){
        if (data[i].intensity > maior) {
            maior = data[i].intensity
            indexMaior = i
        }
    }

    document.getElementById("pior_dor_desc").innerText = data[indexMaior].description
    document.getElementById("pior_dor_inicio").innerText = data[indexMaior].headacheStartDate.split('T')[0]
    document.getElementById("pior_dor_duracao").innerText = data[indexMaior].duration
    document.getElementById("pior_dor_remedio").innerText = remediesWriter(data[indexMaior].remedy)
    document.getElementById("pior_dor_remedio_funcionou").innerText = booleanToSimOuNao(data[indexMaior].remedyWorked)
    document.getElementById("pior_dor_gatilho").innerText = data[indexMaior].trigger
    document.getElementById("pior_dor_intensidade").innerText = data[indexMaior].intensity
}

const deleteHeadache = (id) => {
    fetch("/headaches/"+id, {
        method: 'DELETE',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    }).then((res) => res.json()).then((data) => {
        if (data.errors) {
            console.log(data)
            alert(data.message)
        } else {
            alert("dor de cabeça apagada!")
            location.reload()
        } 
    })
}

const allHeadachesWriter = (data) => {
    const div_dores = document.querySelector("#outras_dores").getElementsByTagName("ul")[0]
    for(let i = data.length-1; i >= 0; i--){
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Descrição: " + data[i].description}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Duração: " + data[i].duration}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Início: " + data[i].headacheStartDate.split("T")[0]}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Intensidade: " + data[i].intensity}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Remédios: " + remediesWriter(data[i].remedy)}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Remédio funcionou? " + booleanToSimOuNao(data[i].remedyWorked)}))
        div_dores.append(Object.assign(document.createElement('li'),{innerText:"Gatilho: " + data[i].trigger}))
        div_dores.append(Object.assign(document.createElement('br')))
        div_dores.append(Object.assign(document.createElement('button'),{onclick:() => deleteHeadache(data[i]._id), className: "apagar", innerText:"Apagar"}))
        div_dores.append(Object.assign(document.createElement('hr')))
    }
}

fetch("/headaches", {
    method: 'GET',
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
    },
}).then((res) => res.json()).then((data) => {
    if (data.errors) {
        console.log(data)
        alert(data.message)
    } else {
        console.log(data)
        mostCommonTriggerWriter(data)
        monthlyFreqWriter(data)
        worstHeadacheWriter(data)
        allHeadachesWriter(data)
    } 
})