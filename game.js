/*Lógica do jogo*/
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
    let [n1, n2, n3, n4] = randomnumbers(numbers, 4)
    let resposta = (n1+n2)-(n3+n4)
    let calculo = document.getElementById('calc')
    calculo.textContent = (`(${n1}+${n2})-(${n3}+${n4})`)

    return resposta
}

random_eq_easy()

const input = document.getElementById('resposta')
const input_resposta = input.value
input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        random_eq_easy()
    }
})
