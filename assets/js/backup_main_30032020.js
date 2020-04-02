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
    segundo: "",
    musica: "",
    adicionarIcone() {
        //Argumentos: (Tipo, nome, nome, nome, nome, nome...)
        for (let i = 1; i < arguments.length; i++) {
            let icone = document.createElement('img')
            icone.setAttribute('src', `./assets/img/icon/${arguments[i]=='rePlay'?'play':arguments[i]}.svg`)
            icone.setAttribute('onclick', `${arguments[i]+arguments[0]}()`)
            this.icones.appendChild(icone)
        }
    },
    limparTela() {
        //Argumentos do tipo string com o nome do elemento a ser limpo
        for (let i = 0; i < arguments.length; i++) {
            switch (arguments[i]) {
                case 'principal':
                    this.principal.innerHTML = ''
                    this.principal.style.color = 'black'
                    break;
                case 'tintro':
                    this.tintro.innerHTML = ''
                    break;
                case 'secundario':
                    this.secundario.innerHTML = ''
                    break;
                case 'icones':
                    this.icones.innerHTML = ''
                    break;
                case 'titulo':
                    this.titulo.innerHTML = ''
                    break;
                case 'menu':
                    this.menu.style.display = 'none'
                    break;
                case 'musica':
                    alarm.Dance_Monkey.pause()
                    alarm.Dance_Monkey.currentTime = 0;
                    break;
                case 'modal':
                    this.modal.style.display = "none"
                    this.menu.style.display = 'block'
                    break;
                case 'relogio':
                    clearInterval(relogio);
                    break;
                case 'timer':
                    clearInterval(timer);
                    break;
            }
        }
    }
}, data = {
    timer: new Date,
    cronometro: new Date,
    lap: new Date,
    uLap: new Date,
    horaCerta: new Date,
    queHorasSao(){
        this.horaCerta = new Date()
        dom.tintro.innerHTML = `Atual: ${("0" + data.horaCerta.getDate()).slice(-2)}/${("0" + (data.horaCerta.getMonth()+1)).slice(-2)}/${data.horaCerta.getFullYear()}`
        return `
            <table class="relogio">
                <tr>
                    <td class="dig">${("0" + data.horaCerta.getHours()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + data.horaCerta.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + data.horaCerta.getSeconds()).slice(-2)}</td>
                </tr>
            </table>
        `
    }
}
const alarm = {
    Dance_Monkey: new Audio('./assets/audio/danceMonkey.mp3'),
}

function selecionarMusica(){
    let label = document.createElement('label')
    label.setAttribute('for', 'musica')
    label.innerHTML = 'Escolha um toque: '
    let select = document.createElement('select')
    select.setAttribute('class', 'musica')
    select.setAttribute('name', 'musica')
    for (i in alarm) {
        let opt = document.createElement('option')
        opt.setAttribute('value', `${i}`)
        opt.setAttribute('id', `${i}`)
        const valor = i.replace("_", " ")
        opt.innerHTML = `${valor}`
        select.appendChild(opt)
    }
    dom.secundario.appendChild(label)
    dom.secundario.appendChild(select)
}
function escolheOAlarme(nome){
    switch (nome) {
        case 'Dance_Monkey':
            alarm.Dance_Monkey.play()
            break;
    }
}

let alarmes = []
let contadorLapCronometro = 0
let timer
let hora
let minuto
let segundo
let tempoPreciso
let tempoReal = ""

dom.span.onclick = function(){
    dom.limparTela('musica', 'modal')
}
window.onclick = function(event){
    if(event.target == dom.modal){
        dom.limparTela('musica', 'modal')
    }
}

function funTimer(){
    dom.titulo.innerHTML = 'Timer'
    dom.limparTela('timer', 'relogio', 'icones', 'tintro', 'secundario')
    tempoReal = ''
    dom.principal.innerHTML = `
        <input 
            class="relogio" 
            id="hora" 
            type="number" 
            placeholder="Hor" 
            min="0" 
            max="23"
        >
        <span>:</span>
        <input 
            class="relogio" 
            id="minuto" 
            type="number" 
            placeholder="Min" 
            min="0" 
            max="59"
        >
        <span>:</span>
        <input 
            class="relogio" 
            id="segundo" 
            type="number" 
            placeholder="Seg" 
            min="0" 
            max="59"
        >
    `
    selecionarMusica()
    dom.adicionarIcone('Timer', 'play')
}
function playTimer(){
    dom.hora = document.querySelector('input#hora')
    dom.minuto = document.querySelector('input#minuto')
    dom.segundo = document.querySelector('input#segundo')
    hora = Number(dom.hora.value)
    minuto = Number(dom.minuto.value)
    segundo = Number(dom.segundo.value)
    if((hora==0&&minuto==0&&segundo==0)||(hora<0||minuto<0||segundo<0)){
        alert(`Valores Incorretos Digitados!\nDigite um tempo válido!`)
    } else if(hora>=24 || minuto>= 60 || segundo>= 60){
        alert(`Valores Incorretos Digitados!\nValores Máximos:\nHora: 23\nMinuto: 59\nSegundo: 59`)
    } else {
        dom.limparTela('menu', 'principal', 'icones')
        let temHora = false
        let temMinuto = false
        tempoPreciso = hora*3600000+minuto*60000+segundo*1000
        data.timer.setHours(hora, minuto, segundo)
        if(data.timer.getHours()!=0){
            tempoReal=dom.hora.value+(hora==1?" Hora":" Horas")
            temHora = true
        }
        if(data.timer.getMinutes()!=0){
            if (temHora){tempoReal+=', '}
            tempoReal+=dom.minuto.value+(minuto==1?" Minuto":" Minutos")
            temMinuto = true
        }
        if(data.timer.getSeconds()!=0){
            if (temMinuto||temHora){tempoReal+=' e '}
            tempoReal+=dom.segundo.value+(segundo==1?" Segundo":" Segundos")
        }
        dom.principal.innerHTML = `
            <table class="relogio">
                <tr>
                    <td class="dig">${("0" + data.timer.getHours()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + data.timer.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + data.timer.getSeconds()).slice(-2)}</td>
                </tr>
            </table>
        `
        timer = window.setInterval(function() {
            dom.principal.innerHTML = tiraUmSegundo()
        }, 1000);
        dom.secundario.innerHTML = tempoReal
        dom.adicionarIcone('Timer', 'stop', 'pause')
    }
}
function pauseTimer() {
    dom.limparTela('timer', 'icones')
    dom.principal.style.color = 'red'
    dom.adicionarIcone('Timer', 'stop', 'rePlay')
}
function rePlayTimer(){
    dom.limparTela('icones')
    timer = window.setInterval(function() {
        dom.principal.innerHTML = tiraUmSegundo()
    }, 1000);
    dom.principal.style.color = 'black'
    dom.adicionarIcone('Timer', 'stop', 'pause')
}
function stopTimer(){
    dom.limparTela('timer', 'secundario')
    dom.menu.style.display = 'block'
    funTimer()
}
function tiraUmSegundo(){
    tempoPreciso-=1000
    if(tempoPreciso<1000){
        dom.limparTela('timer', 'icones')
        alarm.Dance_Monkey.play()
        dom.textoModal.innerHTML = `<strong>Timer Finalizado!</strong><br/>${tempoReal}`
        dom.modal.style.display = "block";
        return '00:00:00'
    }
    data.timer.setSeconds(data.timer.getSeconds()-1)
    return `
        <table class="relogio">
            <tr>
                <td class="dig">${("0" + data.timer.getHours()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.timer.getMinutes()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.timer.getSeconds()).slice(-2)}</td>
            </tr>
        </table>
    `
}

function funCronometro(){
    dom.titulo.innerHTML = 'Cronometro'
    dom.limparTela('relogio', 'secundario', 'principal', 'icones', 'tintro')
    dom.principal.innerHTML = `
        <table class="relogio">
            <tr>
                <td class="dig">00</td>
                <td>:</td>
                <td class="dig">00</td>
                <td>:</td>
                <td class="dig">00</td>
            </tr>
        </table>
    `
    dom.adicionarIcone('Cronometro', 'play')
}
function playCronometro(){
    dom.limparTela('menu', 'icones')
    dom.principal.style.color = 'black'
    data.cronometro.setHours(0,0,0,0)
    timer = window.setInterval(function() {
        dom.principal.innerHTML = botaUmCentesimo()
    }, 10);
    dom.adicionarIcone('Cronometro', 'lap', 'pause')
}
function botaUmCentesimo(){
    data.cronometro.setMilliseconds(data.cronometro.getMilliseconds()+10)
    if (data.cronometro.getHours()>0) {
        return `
        <table class="relogio">
            <tr> 
                <td class="dig">${("0" + data.cronometro.getHours()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.cronometro.getMinutes()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.cronometro.getSeconds()).slice(-2)}</td>
            </tr>
        </table>
    `
    } else {
        return `
        <table class="relogio">
            <tr> 
                <td class="dig">${("0" + data.cronometro.getMinutes()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.cronometro.getSeconds()).slice(-2)}</td>
                <td>:</td>
                <td class="dig">${("0" + data.cronometro.getMilliseconds()).slice(-3).substring(0,2)}</td>
            </tr>
        </table>
    `
    }
}
function pauseCronometro(){
    dom.limparTela('timer', 'icones')
    dom.principal.style.color = 'red'
    dom.adicionarIcone('Cronometro', 'stop', 'rePlay')
}
function lapCronometro(){
    contadorLapCronometro++
    if (contadorLapCronometro==1){
        data.lap.setMilliseconds(data.cronometro.getMilliseconds())
        data.lap.setSeconds(data.cronometro.getSeconds())
        data.lap.setMinutes(data.cronometro.getMinutes())
        data.uLap.setMilliseconds(data.cronometro.getMilliseconds())
        data.uLap.setSeconds(data.cronometro.getSeconds())
        data.uLap.setMinutes(data.cronometro.getMinutes())
        dom.secundario.innerHTML = `
        <p>
            ${("0" + contadorLapCronometro).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + data.lap.getMinutes()).slice(-2)}:${("0" + data.lap.getSeconds()).slice(-2)}.${("0" + data.lap.getMilliseconds()).slice(-3).substring(0,2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + data.cronometro.getMinutes()).slice(-2)}:${("0" + data.cronometro.getSeconds()).slice(-2)}.${("0" + data.cronometro.getMilliseconds()).slice(-3).substring(0,2)}
        </p>
    `
    } else {
        let dulreal = (Number(data.uLap.getMinutes())*60000)+(Number(data.uLap.getSeconds())*1000)+(Number(data.uLap.getMilliseconds()))
        let dcreal = (Number(data.cronometro.getMinutes())*60000)+(Number(data.cronometro.getSeconds())*1000)+(Number(data.cronometro.getMilliseconds()))
        data.lap.setHours(0,0,0,0)
        data.lap.setMilliseconds(dcreal-dulreal)
        data.uLap.setHours(0,0,0,0)
        data.uLap.setMilliseconds(dcreal)
        dom.secundario.innerHTML = `
        <p>
            ${("0" + contadorLapCronometro).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + data.lap.getMinutes()).slice(-2)}:${("0" + data.lap.getSeconds()).slice(-2)}.${("0" + data.lap.getMilliseconds()).slice(-3).substring(0,2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + data.cronometro.getMinutes()).slice(-2)}:${("0" + data.cronometro.getSeconds()).slice(-2)}.${("0" + data.cronometro.getMilliseconds()).slice(-3).substring(0,2)}
        </p>
    ` + dom.secundario.innerHTML
    }
}
function rePlayCronometro(){
    dom.limparTela('icones')
    dom.principal.style.color = 'black'
    timer = window.setInterval(function() {
        dom.principal.innerHTML = botaUmCentesimo()
    }, 10);
    dom.adicionarIcone('Cronometro', 'lap', 'pause')
}
function stopCronometro(){
    dom.limparTela('timer')
    dom.menu.style.display = 'block'
    contadorLapCronometro = 0
    funCronometro()
}

function funRelogio(){
    dom.titulo.innerHTML = 'Relógio'
    dom.limparTela('relogio', 'tintro', 'principal', 'icones', 'secundario')
    relogio = window.setInterval(function() {
        dom.principal.innerHTML = data.queHorasSao()
    }, 500);
    dom.adicionarIcone('Relogio', 'add')
}

function funAlarme(){
    dom.titulo.innerHTML = 'Alarmes'
    dom.limparTela('relogio', 'tintro', 'principal', 'icones', 'secundario')
    mostrarTodosAlarmes()
    timer = window.setInterval(function() {
        testaAlarmes()
    }, 1000);
    dom.adicionarIcone('Alarme', 'add')
}
function testaAlarmes() {
    data.horaCerta = new Date()
    for (let i = 0; i < alarmes.length; i++) {
        if (alarmes[i][4]==true) {
            if (alarmes[i][0].getHours()==data.horaCerta.getHours()&&alarmes[i][0].getMinutes()==data.horaCerta.getMinutes()) {
                continue
            } else {
            alarmes[i][4]==false
            }
        }
        if (alarmes[i][0].getHours()==data.horaCerta.getHours()&&alarmes[i][0].getMinutes()==data.horaCerta.getMinutes()&&alarmes[i][3]==true) {
            alarmes[i][4]=true
            alarm.escolheOAlarme(alarmes[i][5])
            dom.textoModal.innerHTML = `<strong>Alarme!</strong><br/>${("0" + alarmes[i][0].getHours()).slice(-2)}:${("0" + alarmes[i][0].getMinutes()).slice(-2)}`
            dom.modal.style.display = "block";
        }
    }
}
function addAlarme() {
    dom.limparTela('icones')
    dom.principal.innerHTML = `
        <input 
            class="relogio" 
            id="hora" 
            type="number" 
            placeholder="Hor" 
            min="0" 
            max="23"
        >
        <span>:</span>
        <input 
            class="relogio" 
            id="minuto" 
            type="number" 
            placeholder="Min" 
            min="0" 
            max="59"
        >
    `
    selecionarMusica()
    dom.adicionarIcone('Alarme', 'cancel', 'ok')
}
function cancelAlarme(){funAlarme()}
function okAlarme() {
    dom.hora = document.querySelector('input#hora')
    dom.minuto = document.querySelector('input#minuto')
    dom.musica = document.querySelector('select.musica')
    hora = Number(dom.hora.value)
    minuto = Number(dom.minuto.value)
    let jaTem = false
    let quale
    for (i in alarmes) {
        if (alarmes[i][1] == hora && alarmes[i][2] == minuto) {
            jaTem = true
            quale = i
        }
    }
    if ((dom.hora.value.length==0||dom.minuto.value.length==0)) {
        alert(`Valores Incorretos Digitados!\nDigite um horário válido!`)
    } else if (hora > 23 || minuto > 59) {
        alert(`Valores Incorretos Digitados!\nValores Máximos:\nHora: 23\nMinuto: 59`)
    } else if (jaTem) {
        const ativar = confirm('Alarme já adicionado!\nDeseja Ativa-lo?')
        if (ativar) {
            alarmes[quale][3] = true
        } else {
            alarmes[quale][3] = false
        }
        dom.limparTela('principal', 'icones')
        mostrarTodosAlarmes()
        dom.adicionarIcone('Alarme', 'add')
    } else {
        dom.limparTela('icones')
        let segurando = new Date()
        segurando.setHours(hora,minuto,0,0)
        // Valores:     Date()   hora  minuto  check jaTocou      musica
        alarmes.push([segurando, hora, minuto, true, false, dom.musica.value])
        alarmes.sort(function(a, b) {
            if (a[1]<b[1]) return -1;
            if (a[1]>b[1]) return 1;
            if (a[1]==b[1]) { if (a[2]<b[2]) return -1; if (a[2]>b[2]) return 1; }
        })
        dom.limparTela('principal', 'secundario')
        mostrarTodosAlarmes()
        dom.adicionarIcone('Alarme', 'add')
    }
}
function mostrarTodosAlarmes(){
    for (let i = 0; i < alarmes.length; i++) {
        dom.principal.innerHTML += `
            <table class="alarme"><tr>
                <td>${("0" + alarmes[i][0].getHours()).slice(-2)}:${("0" + alarmes[i][0].getMinutes()).slice(-2)}</td>
                <td></td>
                <td><input class="check" type="checkbox" id="alarme${i}" name="alarmeOn" onclick="mudaStatusAlarme(${i})" ${alarmes[i][3]==true ?'checked':''}><label class="ativar" for="alarmeOn">Ativar</label></td>
            </tr></table>
        `
    }
}
function mudaStatusAlarme(interacao){
    alarmes[interacao][3] = alarmes[interacao][3]==true?false:true
}