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
    let numbers_square = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 400]
    n1 = Math.floor(Math.random() * 101)
    n2 = Math.floor(Math.random() * 51)
    n3 = Math.floor(Math.random() * 11)
    n4 = numbers_square[Math.floor(Math.random() * numbers_square.length)]
    n5 = Math.floor(Math.random() * 10)
    selecionados.push(n1, n2, n3, n4, n5)
    return selecionados
}
function genequations(){
    let [n1, n2, n3, n4, n5] = genvalues()
    let random_number = Math.floor(Math.random() * 4)
    switch(random_number){
        case 0:
            result = n1-n2
            return [`${n1}-${n2}`, result]
        case 1: 
            result = n1*n3
            return [`${n1}x${n2}`, result]
        case 2:
            result = Math.sqrt(n4) + n1
            return [`√${n4} + ${n1}`, result]
        case 3:
            result = Math.sqrt(n4) + (n5*n5)
            return [`√${n4} + ${n5}²`, result]
    }
}
function showequation(){
    const equation_DOM = document.getElementById('calc')
    let[equation, result] = genequations()
    equation_DOM.textContent = equation
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
    input.blur()
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
