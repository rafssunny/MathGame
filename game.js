/*Lógica do jogo*/
const numbers_int = [1, 2, 3, 4, 5, 6, 7, 8, 9,]

const timer = document.getElementById('timer')
let easy_seconds = 10

function randomnumbers(numbers, quantidade){
    const selecionados = []
    const numbers_array = [...numbers]

    for (let i =0; i < quantidade && numbers.length > 0; i++){
        const indice = Math.floor(Math.random() * numbers_array.length)
        selecionados.push(numbers_array[indice])
    }

    return selecionados
}

function random_eq_easy(){
    let [n1, n2, n3, n4] = randomnumbers(numbers_int, 4)
    let resposta = (n1+n2)-(n3+n4)
    let calculo = document.getElementById('calc')
    calculo.textContent = (`(${n1}+${n2})-(${n3}+${n4})`)
}

setInterval(updatecountdown, 1000)
function updatecountdown(){
    easy_seconds--
    timer.textContent = (`⏱️${easy_seconds}s`)
    if (easy_seconds == 0){
       easy_seconds+=10
    }
}

random_eq_easy()

const input = document.getElementById('resposta')
let input_resposta = input.value

input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        random_eq_easy()
    }
})
