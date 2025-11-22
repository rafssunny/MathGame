/*Lógica do jogo*/
/* vars */
const timer_dom = document.getElementById('timer')
let seconds

let pontos = 0
const pontos_dom = document.getElementById('pontos')

const tela_de_derrota_dom = document.querySelector('.loser')
const pontos_finais_dom = document.getElementById('final_points')

const tela_de_vitoria_dom = document.querySelector('.win')

/* funcoes de expressao numerica*/
function GerarValores(){
    let numeros_selecionados = []

    /* +1 pra evitar q o valor seja igual a 0*/
    numero_para_subtracao_maior = Math.floor(Math.random() * 101) + 1
    numero_para_subtracao_menor = Math.floor(Math.random() * 91) + 1
    while(numero_para_subtracao_menor > numero_para_subtracao_maior){
        numero_para_subtracao_menor = Math.floor(Math.random() * (numero_para_subtracao_maior)) + 1
    }

    numero_para_multiplicacao = Math.floor(Math.random() * 11) + 1

    numero_para_raiz_quadrada = Math.floor(Math.random() * 401) + 1
    while(Math.sqrt(numero_para_raiz_quadrada) % 1 != 0){
        numero_para_raiz_quadrada = Math.floor(Math.random() * 401) + 1
    }

    numero_para_potencia = Math.floor(Math.random() * 9) + 1 

    numero_para_divisao_numerador = Math.floor(Math.random() * 101) + 1
    numero_para_divisao_denominador = Math.floor(Math.random() * 201) + 1
    while(numero_para_divisao_numerador % numero_para_divisao_denominador != 0){
        numero_para_divisao_numerador = Math.floor(Math.random() * 201) + 1
        numero_para_divisao_denominador = Math.floor(Math.random() * 101) + 1
    } 

    numeros_selecionados.push(
        numero_para_subtracao_maior,
        numero_para_subtracao_menor,
        numero_para_multiplicacao,
        numero_para_raiz_quadrada,
        numero_para_potencia,
        numero_para_divisao_numerador,
        numero_para_divisao_denominador
    )
    return numeros_selecionados
}

function GerarExpressoesNumericas(){
    let [n1, n2, n3, n4, n5, n6, n7] = GerarValores()
    let numero_aleatorio = Math.floor(Math.random() * 8)

    switch(numero_aleatorio){
        case 0:
            resultado_da_expressao = n1 - n2
            return [`${n1} - ${n2}`, resultado_da_expressao]
        case 1: 
            resultado_da_expressao = n1 * n3
            return [`${n1} x ${n3}`, resultado_da_expressao]
        case 2:
            resultado_da_expressao = Math.sqrt(n4) + n1
            return [`√${n4} + ${n1}`, resultado_da_expressao]
        case 3:
            resultado_da_expressao = Math.sqrt(n4) + (n5 * n5)
            return [`√${n4} + ${n5}²`, resultado_da_expressao]
        case 4:
            resultado_da_expressao = n6 / n7
            return [`${n6} ÷ ${n7}`, resultado_da_expressao]
        case 5:
            resultado_da_expressao = ((n5 * n5) + (n6 / n7))
            return [`${n5}² + (${n6} ÷ ${n7})`, resultado_da_expressao]
        case 6:
            resultado_da_expressao = n3 * ((n5 * n5) + Math.sqrt(n4))
            return [`${n3} x (${n5}² + √${n4})`, resultado_da_expressao]    
        default:
            resultado_da_expressao = (n6/n7) * (n5*n5)
            return [`(${n6} ÷ ${n7}) x ${n5}²`, resultado_da_expressao]
    }
}

function MostrarExpressaoNaTela(){
    const expressao_numerica_dom = document.getElementById('calc')
    let [expressao_numerica, resultado_da_expressao] = GerarExpressoesNumericas()
    expressao_numerica_dom.textContent = expressao_numerica
    return resultado_da_expressao
}


/* funcoes de timer*/
let interval_id 

function UpdateTime(){
    seconds--
    timer_dom.textContent = (`⏱️${seconds}s`)

    if (seconds == 0){
        FinalizarJogoComoDerrota()
    }
}

function StartTime(){
    seconds = 16
    timer_dom.textContent = (`⏱️${seconds}s`)
    interval_id = setInterval(UpdateTime, 1000)
    UpdateTime()
}

function StopTime(){
    clearInterval(interval_id)
}


/* checar se é vitoria ou derrota*/
function ChecarResposta(){
    input_resposta = input.value.trim()

    if (input_resposta.trim() == resultado_da_expressao){
        pontos++
        const pontuacao_para_ganhar = 25

        if (pontos == pontuacao_para_ganhar){
            FinalizarJogoComoVitoria()
        } else {
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
    tela_de_vitoria_dom.style.display = 'block'
    input.blur()
    StopTime()
}

function GerarNovaExpressao(){
    resultado_da_expressao = MostrarExpressaoNaTela()
    pontos_dom.textContent = ('Pontos: ' + pontos)
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
    pontos_finais_dom.textContent = `Sua pontuação: ${pontos}`
    tela_de_derrota_dom.style.display = 'block'
    input.blur()
}

/* iniciar*/
resultado_da_expressao = MostrarExpressaoNaTela()
StartTime()

/* logica de pegar entrada */
const input = document.getElementById('resposta')
input.focus()
input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        ChecarResposta()
    }
})
