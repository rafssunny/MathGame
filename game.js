/*Lógica do jogo*/
/* vars */
const timer = document.getElementById('timer')
let seconds = 10

let points = 0
const points_html = document.getElementById('pontos')

const loser_tela = document.querySelector('.loser')
const final_points = document.getElementById('final_points')

/* funcoes de expressao numerica*/
function genvalues(){
    let selecionados = []

    n1 = Math.floor(Math.random() * 101) + 1
    n2 = Math.floor(Math.random() * 91) + 1
    while(n2 > n1){
        n2 = Math.floor(Math.random()*(n1)) + 1
    }

    n3 = Math.floor(Math.random() * 11) + 1

    n4 = Math.floor(Math.random() * 401) + 1
    while(Math.sqrt(n4) % 1 != 0){
        n4 = Math.floor(Math.random() * 401) + 1
    }

    n5 = Math.floor(Math.random() * 9) + 1 

    n6 = Math.floor(Math.random() * 101) + 1
    n7 = Math.floor(Math.random() * 201) + 1
    while(n6 % n7 != 0){
        n6 = Math.floor(Math.random() * 201) + 1
        n7 = Math.floor(Math.random() * 101) + 1
    } 

    selecionados.push(n1, n2, n3, n4, n5, n6, n7)
    return selecionados

}
function genexpress(){
    let [n1, n2, n3, n4, n5, n6, n7] = genvalues()
    let random_number = Math.floor(Math.random() * 8)
    switch(random_number){
        case 0:
            result = n1-n2
            return [`${n1} - ${n2}`, result]
        case 1: 
            result = n1*n3
            return [`${n1} x ${n3}`, result]
        case 2:
            result = Math.sqrt(n4) + n1
            return [`√${n4} + ${n1}`, result]
        case 3:
            result = Math.sqrt(n4) + (n5*n5)
            return [`√${n4} + ${n5}²`, result]
        case 4:
            result = n6/n7
            return[`${n6} ÷ ${n7}`, result]
        case 5:
            result = ((n5*n5) + (n6/n7))
            return[`${n5}² + (${n6} ÷ ${n7})`, result]
        case 6:
            result = n3*((n5*n5)+Math.sqrt(n4))
            return[`${n3} x (${n5}² + √${n4})`, result]    
        default:
            result = (n6/n7)*(n5*n5)
            return[`(${n6} ÷ ${n7}) x ${n5}²`, result]
    }
}
function showexpress(){
    const express_DOM = document.getElementById('calc')
    let[express, result] = genexpress()
    express_DOM.textContent = express
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
    lose_screen()
}

/* caso de derrota*/
function lose_screen(){
    final_points.textContent = `Sua pontuação: ${points}`
    loser_tela.style.display = 'block'
    input.blur()
}

/* iniciar*/
result = showexpress()
startime()


/* logica de pegar entrada */
const input = document.getElementById('resposta')
input.focus()
input.addEventListener('keyup', function(e){
    if(e.code === 'Enter'){
        input_resposta = input.value.trim()
        if (input_resposta.trim() == result){
            result = showexpress()
            points++
            points_html.textContent = ('Pontos: ' + points)
            input.value = ''
            clearInterval(interval_id)
            startime()
        }
        else if(input.value.trim() == ''){}
        else{
            input.value = ''
            stoptime()
        }
    }
    }
)
