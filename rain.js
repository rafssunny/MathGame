const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
/* Efeito chuva de números(matrix rain)*/
const content = document.getElementById('matrix')
const context = content.getContext('2d')

content.width = window.innerWidth
content.height = window.innerHeight

const fontsize = 18;

const columns = content.width / fontsize

const drops = new Array(Math.floor(columns)).fill(1)

function draw(){
    context.fillStyle = 'rgba(0, 0, 0, 0.05)'
    context.fillRect(0, 0, content.width, content.height)

    context.fillStyle = 'rgba(0, 183, 255, 1)'
    context.font = `${fontsize}px arial`

    for(let i = 0; i < drops.length; i++){
        const text = numbers[Math.floor(Math.random() * numbers.length)]

        context.fillText(text, i * fontsize, drops[i] * fontsize)
        
        drops[i]++

        if (drops[i] * fontsize > content.height && Math.random() > 0.95){
            drops[i] = 0
        }
    }
    
    window.requestAnimationFrame(draw)
}

draw()