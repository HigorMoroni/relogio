let dom = {
    menu: document.querySelector('div#menu'),
    titulo: document.querySelector('h1#titulo'),
    principal: document.querySelector('p#principal'),
    secundario: document.querySelector('p#secundario'),
    tintro: document.querySelector('p#tintro'),
    icones: document.querySelector('div#icones'),
    modal: document.getElementById("myModal"),
    span: document.getElementsByClassName("close")[0],
    textoModal: document.querySelector('p#modal'),
    hora: "",
    minuto: "",
    segundo: ""
}
let contadorLapCronometro = 0
let timer
let hora
let minuto
let segundo
let dataTimer = new Date
let dataCronometro = new Date
let dataLap = new Date
let dataULap = new Date
let tempoPreciso
let tempoReal = ""
const alarm = new Audio('./assets/audio/alarm.mp3')
dom.span.onclick = function() {
    dom.modal.style.display = "none";
    alarm.pause()
    alarm.currentTime = 0;
    funTimer()
}
window.onclick = function(event) {
  if (event.target == dom.modal) {
    dom.modal.style.display = "none";
    alarm.pause()
    alarm.currentTime = 0;
    funTimer()
  }
}

function funTimer(){
    dom.titulo.innerHTML = 'Timer'
    dom.principal.innerHTML = ''
    dom.tintro.innerHTML = ''
    dom.principal.style.color = 'black'
    dom.secundario.innerHTML = ''
    dom.icones.innerHTML = ''
    tempoReal = ''
    dom.principal.innerHTML = `
        <input 
            class="relogio" 
            id="hora" 
            type="number" 
            placeholder="Hor" 
            min="0" 
            max="24"
        >
        <span>:</span>
        <input 
            class="relogio" 
            id="minuto" 
            type="number" 
            placeholder="Min" 
            min="0" 
            max="60"
        >
        <span>:</span>
        <input 
            class="relogio" 
            id="segundo" 
            type="number" 
            placeholder="Seg" 
            min="0" 
            max="60"
        >
    `
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/play.svg')
    icone1.setAttribute('onclick', 'playTimer()')
    dom.icones.appendChild(icone1)
}
function playTimer(){
    dom.menu.style.display = 'none'
    dom.hora = document.querySelector('input#hora')
    dom.minuto = document.querySelector('input#minuto')
    dom.segundo = document.querySelector('input#segundo')
    hora = Number(dom.hora.value)
    minuto = Number(dom.minuto.value)
    segundo = Number(dom.segundo.value)
    if((hora==0&&minuto==0&&segundo==0)||(hora<0||minuto<0||segundo<0)){
        alert(`Valores Incorretos Digitados!\nDigite um tempo válido!`)
    } else if(hora>24 || minuto> 60 || segundo> 60){
        alert(`Valores Incorretos Digitados!\nValores Máximos:\nHora: 24\nMinuto: 60\nSegundo: 60`)
    } else {
        dom.principal.innerHTML = ''
        dom.icones.innerHTML = ''
        let temHora = false
        let temMinuto = false
        tempoPreciso = hora*3600000+minuto*60000+segundo*1000
        dataTimer.setHours(hora, minuto, segundo)
        if(dataTimer.getHours()!=0){
            tempoReal=dom.hora.value+(hora==1?" Hora":" Horas")
            temHora = true
        }
        if(dataTimer.getMinutes()!=0){
            if (temHora){tempoReal+=', '}
            tempoReal+=dom.minuto.value+(minuto==1?" Minuto":" Minutos")
            temMinuto = true
        }
        if(dataTimer.getSeconds()!=0){
            if (temMinuto||temHora){tempoReal+=' e '}
            tempoReal+=dom.segundo.value+(segundo==1?" Segundo":" Segundos")
        }
        dom.principal.innerHTML = `${("0" + dataTimer.getHours()).slice(-2)}:${("0" + dataTimer.getMinutes()).slice(-2)}:${("0" + dataTimer.getSeconds()).slice(-2)}`
        timer = window.setInterval(function() {
            dom.principal.innerHTML = tiraUmSegundo()
        }, 1000);
        dom.secundario.innerHTML = tempoReal
        let icone1 = document.createElement('img')
        icone1.setAttribute('src', './assets/img/icon/stop.svg')
        icone1.setAttribute('onclick', 'stopTimer()')
        dom.icones.appendChild(icone1)
        let icone2 = document.createElement('img')
        icone2.setAttribute('src', './assets/img/icon/pause.svg')
        icone2.setAttribute('onclick', 'pauseTimer()')
        dom.icones.appendChild(icone2)
    }
}
function pauseTimer() {
    dom.icones.innerHTML = ""
    clearInterval(timer);
    dom.principal.style.color = 'red'
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/stop.svg')
    icone1.setAttribute('onclick', 'stopTimer()')
    dom.icones.appendChild(icone1)
    let icone2 = document.createElement('img')
    icone2.setAttribute('src', './assets/img/icon/play.svg')
    icone2.setAttribute('onclick', 'rePlayTimer()')
    dom.icones.appendChild(icone2)
}
function rePlayTimer(){
    dom.icones.innerHTML = ''
    timer = window.setInterval(function() {
        dom.principal.innerHTML = tiraUmSegundo()
    }, 1000);
    dom.principal.style.color = 'black'
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/stop.svg')
    icone1.setAttribute('onclick', 'stopTimer()')
    dom.icones.appendChild(icone1)
    let icone2 = document.createElement('img')
    icone2.setAttribute('src', './assets/img/icon/pause.svg')
    icone2.setAttribute('onclick', 'pauseTimer()')
    dom.icones.appendChild(icone2)
}
function stopTimer(){
    clearInterval(timer);
    dom.menu.style.display = 'block'
    funTimer()
}
function tiraUmSegundo(){
    tempoPreciso-=1000
    if(tempoPreciso<1000){
        clearInterval(timer);
        dom.icones.innerHTML = ""
        alarm.play()
        dom.textoModal.innerHTML = `<strong>Timer Finalizado!</strong><br/>${tempoReal}`
        dom.modal.style.display = "block";
        return '00:00:00'
    }
    dataTimer.setSeconds(dataTimer.getSeconds()-1)
    return `${("0" + dataTimer.getHours()).slice(-2)}:${("0" + dataTimer.getMinutes()).slice(-2)}:${("0" + dataTimer.getSeconds()).slice(-2)}`
}
function funCronometro(){
    dom.titulo.innerHTML = 'Cronometro'
    dom.principal.innerHTML = '00:00:00'
    dom.tintro.innerHTML = ''
    dom.principal.style.color = 'black'
    dom.secundario.innerHTML = ''
    dom.icones.innerHTML = ''
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/play.svg')
    icone1.setAttribute('onclick', 'playCronometro()')
    dom.icones.appendChild(icone1)
}
function playCronometro(){
    dom.menu.style.display = 'none'
    dom.icones.innerHTML = ''
    dom.principal.style.color = 'black'
    dataCronometro.setHours(0, 0, 0)
    timer = window.setInterval(function() {
        dom.principal.innerHTML = botaUmSegundo()
    }, 1000);
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/lap.svg')
    icone1.setAttribute('onclick', 'lapCronometro()')
    dom.icones.appendChild(icone1)
    let icone2 = document.createElement('img')
    icone2.setAttribute('src', './assets/img/icon/pause.svg')
    icone2.setAttribute('onclick', 'pauseCronometro()')
    dom.icones.appendChild(icone2)
}
function botaUmSegundo(){
    dataCronometro.setSeconds(dataCronometro.getSeconds()+1)
    return `${("0" + dataCronometro.getHours()).slice(-2)}:${("0" + dataCronometro.getMinutes()).slice(-2)}:${("0" + dataCronometro.getSeconds()).slice(-2)}`
}
function pauseCronometro(){
    dom.icones.innerHTML = ""
    clearInterval(timer);
    dom.principal.style.color = 'red'
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/stop.svg')
    icone1.setAttribute('onclick', 'stopCronometro()')
    dom.icones.appendChild(icone1)
    let icone2 = document.createElement('img')
    icone2.setAttribute('src', './assets/img/icon/play.svg')
    icone2.setAttribute('onclick', 'rePlayCronometro()')
    dom.icones.appendChild(icone2)
}
function lapCronometro(){
    contadorLapCronometro++
    if (contadorLapCronometro==1){
        dataLap.setSeconds(dataCronometro.getSeconds())
        dataLap.setMinutes(dataCronometro.getMinutes())
        dataLap.setHours(dataCronometro.getHours())
        dataULap.setSeconds(dataCronometro.getSeconds())
        dom.secundario.innerHTML = `
        <p>
            ${("0" + contadorLapCronometro).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + dataLap.getHours()).slice(-2)}:${("0" + dataLap.getMinutes()).slice(-2)}.${("0" + dataLap.getSeconds()).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + dataCronometro.getHours()).slice(-2)}:${("0" + dataCronometro.getMinutes()).slice(-2)}.${("0" + dataCronometro.getSeconds()).slice(-2)}
        </p>
    `
    } else {
        dataLap.setSeconds(dataCronometro.getSeconds()-dataULap.getSeconds())
        dataULap.setSeconds(dataCronometro.getSeconds())
        dom.secundario.innerHTML = `
        <p>
            ${("0" + contadorLapCronometro).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + dataLap.getHours()).slice(-2)}:${("0" + dataLap.getMinutes()).slice(-2)}.${("0" + dataLap.getSeconds()).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + dataCronometro.getHours()).slice(-2)}:${("0" + dataCronometro.getMinutes()).slice(-2)}.${("0" + dataCronometro.getSeconds()).slice(-2)}
        </p>
    ` + dom.secundario.innerHTML
    }
}
function rePlayCronometro(){
    dom.icones.innerHTML = ''
    dom.principal.style.color = 'black'
    timer = window.setInterval(function() {
        dom.principal.innerHTML = botaUmSegundo()
    }, 1000);
    let icone1 = document.createElement('img')
    icone1.setAttribute('src', './assets/img/icon/lap.svg')
    icone1.setAttribute('onclick', 'lapCronometro()')
    dom.icones.appendChild(icone1)
    let icone2 = document.createElement('img')
    icone2.setAttribute('src', './assets/img/icon/pause.svg')
    icone2.setAttribute('onclick', 'pauseCronometro()')
    dom.icones.appendChild(icone2)
}
function stopCronometro(){
    clearInterval(timer);
    dom.menu.style.display = 'block'
    funCronometro()
}

/* Inputs do Timer de forma correta */

    // let hora = document.createElement('input')
    // hora.setAttribute('class', 'relogio')
    // hora.setAttribute('type', 'number')
    // hora.setAttribute('min', '0')
    // hora.setAttribute('max', '24')
    // hora.setAttribute('id', 'hora')
    // hora.setAttribute('placeholder', 'Hor')
    // let minuto = document.createElement('input')
    // minuto.setAttribute('class', 'relogio')
    // minuto.setAttribute('id', 'minuto')
    // minuto.setAttribute('type', 'number')
    // minuto.setAttribute('placeholder', 'Min')
    // minuto.setAttribute('min', '0')
    // minuto.setAttribute('max', '60')
    // let segundo = document.createElement('input')
    // segundo.setAttribute('class', 'relogio')
    // segundo.setAttribute('id', 'segundo')
    // segundo.setAttribute('type', 'number')
    // segundo.setAttribute('placeholder', 'Seg')
    // segundo.setAttribute('min', '0')
    // segundo.setAttribute('max', '60')
    // dom.principal.appendChild(hora)
    // dom.principal.innerHTML += '<span>:</span>'
    // dom.principal.appendChild(minuto)
    // dom.principal.innerHTML += '<span>:</span>'
    // dom.principal.appendChild(segundo)