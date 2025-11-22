/*Lógica do jogo*/
/* vars */
const Timer_DOM = document.getElementById('timer')
let seconds

let Pontos = 0
const Pontos_DOM = document.getElementById('pontos')

const TelaDeDerrota_DOM = document.querySelector('.loser')
const PontosFinais_DOM = document.getElementById('final_points')

const TelaDeVitoria_DOM = document.querySelector('.win')

/* funcoes de expressao numerica*/
function GerarValores(){
    let NumerosSelecionados = []

    /* +1 pra evitar q o valor seja igual a 0*/
    NumeroParaSubtracao_maior = Math.floor(Math.random() * 101) + 1
    NumeroParaSubtracao_menor = Math.floor(Math.random() * 91) + 1
    while(NumeroParaSubtracao_menor > NumeroParaSubtracao_maior){
        NumeroParaSubtracao_menor = Math.floor(Math.random()*(NumeroParaSubtracao_maior)) + 1
    }

    NumeroParaMultiplicacao = Math.floor(Math.random() * 11) + 1

    NumeroParaRaizQuadrada = Math.floor(Math.random() * 401) + 1
    while(Math.sqrt(NumeroParaRaizQuadrada) % 1 != 0){
        NumeroParaRaizQuadrada = Math.floor(Math.random() * 401) + 1
    }

    NumeroParaPotencia = Math.floor(Math.random() * 9) + 1 

    NumeroParaDivisao_numerador = Math.floor(Math.random() * 101) + 1
    NumeroParaDivisao_denominador = Math.floor(Math.random() * 201) + 1
    while(NumeroParaDivisao_numerador % NumeroParaDivisao_denominador != 0){
        NumeroParaDivisao_numerador = Math.floor(Math.random() * 201) + 1
        NumeroParaDivisao_denominador = Math.floor(Math.random() * 101) + 1
    } 

    NumerosSelecionados.push(NumeroParaSubtracao_maior, NumeroParaSubtracao_menor, NumeroParaMultiplicacao, NumeroParaRaizQuadrada, NumeroParaPotencia, NumeroParaDivisao_numerador, NumeroParaDivisao_denominador)
    return NumerosSelecionados

}
function GerarExpressoesNumericas(){
    let [n1, n2, n3, n4, n5, n6, n7] = GerarValores()
    let NumeroAleatorio = Math.floor(Math.random() * 8)
    switch(NumeroAleatorio){
        case 0:
            ResultadoDaExpressao = n1-n2
            return [`${n1} - ${n2}`, ResultadoDaExpressao]
        case 1: 
            ResultadoDaExpressao = n1*n3
            return [`${n1} x ${n3}`, ResultadoDaExpressao]
        case 2:
            ResultadoDaExpressao = Math.sqrt(n4) + n1
            return [`√${n4} + ${n1}`, ResultadoDaExpressao]
        case 3:
            ResultadoDaExpressao = Math.sqrt(n4) + (n5*n5)
            return [`√${n4} + ${n5}²`, ResultadoDaExpressao]
        case 4:
            ResultadoDaExpressao = n6/n7
            return[`${n6} ÷ ${n7}`, ResultadoDaExpressao]
        case 5:
            ResultadoDaExpressao = ((n5*n5) + (n6/n7))
            return[`${n5}² + (${n6} ÷ ${n7})`, ResultadoDaExpressao]
        case 6:
            ResultadoDaExpressao = n3*((n5*n5)+Math.sqrt(n4))
            return[`${n3} x (${n5}² + √${n4})`, ResultadoDaExpressao]    
        default:
            ResultadoDaExpressao = (n6/n7)*(n5*n5)
            return[`(${n6} ÷ ${n7}) x ${n5}²`, ResultadoDaExpressao]
    }
}
function MostrarExpressaoNaTela(){
    const ExpressaoNumerica_DOM = document.getElementById('calc')
    let[ExpressaoNumerica, ResultadoDaExpressao] = GerarExpressoesNumericas()
    ExpressaoNumerica_DOM.textContent = ExpressaoNumerica
    return ResultadoDaExpressao
}

/* funcoes de timer*/
let interval_id 
function UpdateTime(){
    seconds--
    Timer_DOM.textContent = (`⏱️${seconds}s`)
    if (seconds == 0){
        FinalizarJogoComoDerrota()
    }
}
function StartTime(){
    seconds = 16
    Timer_DOM.textContent = (`⏱️${seconds}s`)
    interval_id = setInterval(UpdateTime, 1000)
    UpdateTime()
}

function StopTime(){
    clearInterval(interval_id)
}

/* checar se é vitoria ou derrota*/
function ChecarResposta(){
    input_resposta = input.value.trim()
    if (input_resposta.trim() == ResultadoDaExpressao){
        Pontos++
        const PontuacaoParaGanhar = 25
        if (Pontos == PontuacaoParaGanhar){
            FinalizarJogoComoVitoria()
        }
        else{
            GerarNovaExpressao()
        }
    }
    else if(input.value.trim() == ''){}
    else{
        FinalizarJogoComoDerrota()
    }
    }
/* caso de vitoria*/
function FinalizarJogoComoVitoria(){
    TelaDeVitoria_DOM.style.display = 'block'
    input.blur()
    StopTime()
}
function GerarNovaExpressao(){
    ResultadoDaExpressao = MostrarExpressaoNaTela()
    Pontos_DOM.textContent = ('Pontos: ' + Pontos)
    input.value = ''
    clearInterval(interval_id)
    StartTime()
}

/* caso de derrota*/
function FinalizarJogoComoDerrota(){
    input.value = ''
    StopTime()
    MostrarTelaDeDerrota()
}
function MostrarTelaDeDerrota(){
    PontosFinais_DOM.textContent = `Sua pontuação: ${Pontos}`
    TelaDeDerrota_DOM.style.display = 'block'
    input.blur()
}

/* iniciar*/
ResultadoDaExpressao = MostrarExpressaoNaTela()
StartTime()


/* logica de pegar entrada */
const input = document.getElementById('resposta')
input.focus()
input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        ChecarResposta()
    }
    }
)
