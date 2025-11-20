/*Lógica do jogo*/
/* vars */
const numbers_int = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const timer = document.getElementById('timer')
let seconds = 10

let points = 0
const points_html = document.getElementById('pontos')

const loser_tela = document.querySelector('.loser')
const final_points = document.getElementById('final_points')

/* funcoes de equacao*/
function randomnumbers(numbers, quantidade){
    const selecionados = []
    const numbers_array = [...numbers]

    for (let i = 0; i < quantidade && numbers.length > 0; i++){
        const indice = Math.floor(Math.random() * numbers_array.length)
        selecionados.push(numbers_array[indice])
    }

    return selecionados
}

function random_eq_easy(){
    let [n1, n2, n3, n4] = randomnumbers(numbers_int, 4)
    let resposta = (n1-n2)+(n3+n4)
    let calculo = document.getElementById('calc')
    calculo.textContent = (`(${n1}-${n2})+(${n3}+${n4})`)
    return resposta
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
r = random_eq_easy()
startime()

/* logica de pegar entrada */
const input = document.getElementById('resposta')
input.focus()
let input_resposta = input.value.trim()
input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        input_resposta = input.value.trim()
        if (input_resposta == r){
            console.log('correto')
            r = random_eq_easy()
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
