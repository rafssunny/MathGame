/*Lógica do jogo*/
/* vars */
const timer = document.getElementById('timer')
let seconds = 10

let points = 0
const points_html = document.getElementById('pontos')

const loser_tela = document.querySelector('.loser')
const final_points = document.getElementById('final_points')

/* funcoes de equacao*/
function genvalues(){
    let selecionados = []
    n2 = Math.floor(Math.random() * 20)
    n4 = Math.floor(Math.random() * 20)
    n1 = 0
    n3 = 0
    while(n1 < n2){
        n1 = Math.floor(Math.random() * 30)
    }
    while(n3 < 4){
        n3 = Math.floor(Math.random() * 30)
    }
    selecionados.push(n1, n2, n3, n4)
    return selecionados
}
function genequations(){
    let [n1, n2, n3, n4] = genvalues()
    let random_number = Math.floor(Math.random() * 4)
    switch(random_number){
        case 0: 
            result = n3*n4
            return [`${n3}*${n4}`, result]
        case 1:
            result = n1-n2
            return [`${n1}-${n2}`, result]
        case 2:
            result = (n1+n2) * n3
            return [`(${n1}+${n2}) x ${n3}`, result]
        case 3: 
            result = (n1+n2) * (n3-n4)
            return [`(${n1}+${n2}) x (${n3}-${n4})`, result]
    }
}
function showequation(){
    const equation_DOM = document.getElementById('calc')
    let[equation, result] = genequations()
    equation_DOM.textContent = equation
    console.log(equation, result)
    return result
}

/* funcoes de timer*/
let interval_id 
function updatetime(){
    seconds--
    timer.textContent = (`⏱️${seconds}s`)
    if (seconds == 0){
        stoptime()
    }
}
function startime(){
    seconds = 11
    timer.textContent = (`⏱️${seconds}s`)
    interval_id = setInterval(updatetime, 1000)
    updatetime()
}
function stoptime(){
    clearInterval(interval_id)
    final_points.textContent = `Sua pontuação: ${points}`
    loser_tela.style.display = 'block'
}

/* iniciar*/
result = showequation()
startime()


/* logica de pegar entrada */
const input = document.getElementById('resposta')
input.focus()
let input_resposta = input.value.trim()
input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        input_resposta = input.value.trim()
        if (input_resposta == result){
            result = showequation()
            points++
            points_html.textContent = ('Pontos: ' + points)
            input.value = ''
            clearInterval(interval_id)
            startime()
        }
        else{
            input.value = ''
            stoptime()
        }
    }
    }
)
