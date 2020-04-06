let dom = {
    menu: document.querySelector('div#menu'),
    inicial: document.querySelector('div#inicial'),
    alarme: {
        nome: 'Alarme',
        div: document.querySelector('div#alarme'),
        tintro: document.querySelector('p#Atintro'),
        principal: document.querySelector('p#Aprincipal'),
        secundario: document.querySelector('p#Asecundario'),
        icones: document.querySelector('div#Aicones'),
        musica: document.querySelector('select#Amusica'),
        hora: "",
        minuto: "",
        tables: "",
        selectDasMusicas() {
            let i = 0
            for (key in sons) {
                if (i>0&&i<=sons.quantidade) { 
                        let valor = key
                    valor = valor.replace("_", " ")
                    valor = valor.replace("_", " ")
                    valor = valor.replace("_", " ")
                    this.musica.innerHTML += `<option value="${key}" id="${key}">${valor}</option>` 
                }
                i++
            }
        }
    },
    relogio: {
        nome: 'Relogio',
        div: document.querySelector('div#relogio'),
        tintro: document.querySelector('p#Rtintro'),
        principal: document.querySelector('p#Rprincipal'),
        secundario: document.querySelector('p#Rsecundario'),
        icones: document.querySelector('div#Ricones')
    },
    cronometro: {
        nome: 'Cronometro',
        div: document.querySelector('div#cronometro'),
        tintro: document.querySelector('p#Ctintro'),
        principal: document.querySelector('div#Cprincipal'),
        secundario: document.querySelector('p#Csecundario'),
        icones: document.querySelector('div#Cicones')
    },
    timer: {
        nome: 'Timer',
        div: document.querySelector('div#timer'),
        tintro: document.querySelector('p#Ttintro'),
        principal: document.querySelector('p#Tprincipal'),
        secundario: document.querySelector('p#Tsecundario'),
        secundario2: document.querySelector('p#Tsecundario2'),
        icones: document.querySelector('div#Ticones'),
        musica: document.querySelector('select#Tmusica'),
        hora: "",
        minuto: "",
        segundo: "",
        selectDasMusicas() {
            let i = 0
            for (key in sons) {
                if (i>0&&i<=sons.quantidade) { 
                        let valor = key
                    valor = valor.replace("_", " ")
                    valor = valor.replace("_", " ")
                    valor = valor.replace("_", " ")
                    this.musica.innerHTML += `<option value="${key}" id="${key}">${valor}</option>` 
                }
                i++
            }
        }
    },
    modal: {
        div: document.getElementById("myModal"),
        span: document.getElementsByClassName("close")[0],
        texto: document.querySelector('p#modal')
    },
    adicionarIcone() {
        //Argumentos: (Tipo, nome, nome, nome, nome, nome...)
        for (let i=1;i<arguments.length;i++) {
            let icone = document.createElement('img')
            icone.setAttribute('src', `./assets/img/icon/${arguments[i]}.svg`)
            icone.setAttribute('onclick', `${arguments[i]+arguments[0]}()`)
            icone.setAttribute('class', `icone`)
            if (arguments[0]=='Alarme') this.alarme.icones.appendChild(icone)
            if (arguments[0]=='Relogio') this.relogio.icones.appendChild(icone)
            if (arguments[0]=='Cronometro') this.cronometro.icones.appendChild(icone)
            if (arguments[0]=='Timer') this.timer.icones.appendChild(icone)
        }
    },
    trocarTela(nome) {
        this.inicial.style.display = 'none'
        if(nome!=this.alarme.nome) this.alarme.div.style.display = 'none'
        if(nome!=this.relogio.nome) this.relogio.div.style.display = 'none'
        if(nome!=this.cronometro.nome) this.cronometro.div.style.display = 'none'
        if(nome!=this.timer.nome) this.timer.div.style.display = 'none'
        if(nome==this.alarme.nome) this.alarme.div.style.display = 'block'
        if(nome==this.relogio.nome) this.relogio.div.style.display = 'block'
        if(nome==this.cronometro.nome) this.cronometro.div.style.display = 'block'
        if(nome==this.timer.nome) {
            this.timer.div.style.display = 'block'
            dom.timer.hora = document.querySelector('input#hora')
            dom.timer.minuto = document.querySelector('input#minuto')
            dom.timer.segundo = document.querySelector('input#segundo')
            dom.timer.hora.focus()
            dom.timer.hora.addEventListener('input', function() {
                dom.timer.hora = document.querySelector('input#hora')
                valor.timer.hora = Number(dom.timer.hora.value)
                if (dom.timer.hora.value.length>=2) {
                    dom.timer.minuto.focus()
                    if (valor.timer.hora>23) {
                        dom.timer.hora.value = '23'
                        valor.timer.hora = 23
                    }
                }
            })
            dom.timer.minuto.addEventListener('input', function() {
                dom.timer.minuto = document.querySelector('input#minuto')
                valor.timer.minuto = Number(dom.timer.minuto.value)
                if (dom.timer.minuto.value.length>=2) {
                    dom.timer.segundo.focus()
                    if (valor.timer.minuto>59) {
                        dom.timer.minuto.value = '59'
                        valor.timer.minuto = 59
                    }
                }
            })
            dom.timer.segundo.addEventListener('input', function() {
                dom.timer.segundo = document.querySelector('input#segundo')
                valor.timer.segundo = Number(dom.timer.segundo.value)
                if (dom.timer.segundo.value.length>=2) {
                    dom.timer.musica.focus()
                    if (valor.timer.segundo>59) {
                        dom.timer.segundo.value = '59'
                        valor.timer.segundo = 59
                    }
                }
            })
        }
    },
    limparEsconderOuMostrarTela(tipo, acao, nome) {
        //Argumentos: Tipo: nome da funcao / Acão: 0-Limpar 1-Esconder 2-Mostrar / Nome: array com todos os obejetos dom a serem limpos/escondidos
        if (tipo==dom.alarme.nome) {
            for (let i in nome) {
                if (nome[i]=='tintro') acao==0?this.alarme.tintro.innerHTML = '':acao==1?this.alarme.tintro.style.display = 'none':this.alarme.tintro.style.display = 'block'
                if (nome[i]=='secundario') acao==0?this.alarme.secundario.innerHTML = '':acao==1?this.alarme.secundario.style.display = 'none':this.alarme.secundario.style.display = 'block'
                if (nome[i]=='icones') acao==0?this.alarme.icones.innerHTML = '':acao==1?this.alarme.icones.style.display = 'none':this.alarme.icones.style.display = 'block'
                if (nome[i]=='titulo') acao==0?this.alarme.titulo.innerHTML = '':acao==1?this.alarme.titulo.style.display = 'none':this.alarme.titulo.style.display = 'block'
                if (nome[i]=='menu') acao==0?this.alarme.menu.innerHTML = '':acao==1?this.alarme.menu.style.display = 'none':this.alarme.menu.style.display = 'block'
                if (nome[i]=='principal') {
                    if (acao==0) {
                        this.alarme.principal.innerHTML = ''
                        this.alarme.principal.style.color = 'black'
                    } else if (acao==1) {
                        this.alarme.principal.style.display = 'none'
                    } else {
                        this.alarme.principal.style.display = 'block'
                    }
                }
            }
        }
        if (tipo==dom.relogio.nome) {
            for (let i in nome) {
                if (nome[i]=='tintro') acao==0?this.relogio.tintro.innerHTML = '':acao==1?this.relogio.tintro.style.display = 'none':this.relogio.tintro.style.display = 'block'
                if (nome[i]=='secundario') acao==0?this.relogio.secundario.innerHTML = '':acao==1?this.relogio.secundario.style.display = 'none':this.relogio.secundario.style.display = 'block'
                if (nome[i]=='icones') acao==0?this.relogio.icones.innerHTML = '':acao==1?this.relogio.icones.style.display = 'none':this.relogio.icones.style.display = 'block'
                if (nome[i]=='titulo') acao==0?this.relogio.titulo.innerHTML = '':acao==1?this.relogio.titulo.style.display = 'none':this.relogio.titulo.style.display = 'block'
                if (nome[i]=='menu') acao==0?this.relogio.menu.innerHTML = '':acao==1?this.relogio.menu.style.display = 'none':this.relogio.menu.style.display = 'block'
                if (nome[i]=='principal') {
                    if (acao==0) {
                        this.relogio.principal.innerHTML = ''
                        this.relogio.principal.style.color = 'black'
                    } else if (acao==1) {
                        this.relogio.principal.style.display = 'none'
                    } else {
                        this.relogio.principal.style.display = 'block'
                    }
                }
            }
        }
        if (tipo==dom.cronometro.nome) {
            for (let i in nome) {
                if (nome[i]=='tintro') acao==0?this.cronometro.tintro.innerHTML = '':acao==1?this.cronometro.tintro.style.display = 'none':this.cronometro.tintro.style.display = 'block'
                if (nome[i]=='secundario') acao==0?this.cronometro.secundario.innerHTML = '':acao==1?this.cronometro.secundario.style.display = 'none':this.cronometro.secundario.style.display = 'block'
                if (nome[i]=='icones') acao==0?this.cronometro.icones.innerHTML = '':acao==1?this.cronometro.icones.style.display = 'none':this.cronometro.icones.style.display = 'block'
                if (nome[i]=='titulo') acao==0?this.cronometro.titulo.innerHTML = '':acao==1?this.cronometro.titulo.style.display = 'none':this.cronometro.titulo.style.display = 'block'
                if (nome[i]=='menu') acao==0?this.cronometro.menu.innerHTML = '':acao==1?this.cronometro.menu.style.display = 'none':this.cronometro.menu.style.display = 'block'
                if (nome[i]=='funcao') if (acao==0) clearInterval(funcao.cronometro);
                if (nome[i]=='principal') {
                    if (acao==0) {
                        this.cronometro.principal.innerHTML = `
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
                        this.cronometro.principal.style.color = 'black'
                    } else if (acao==1) {
                        this.cronometro.principal.style.display = 'none'
                    } else {
                        this.cronometro.principal.style.display = 'block'
                    }
                }
            }
        }
        if (tipo==dom.timer.nome) {
            for (let i in nome) {
                if (nome[i]=='tintro') acao==0?this.timer.tintro.innerHTML = '':acao==1?this.timer.tintro.style.display = 'none':this.timer.tintro.style.display = 'block'
                if (nome[i]=='secundario') acao==0?this.timer.secundario.innerHTML = '':acao==1?this.timer.secundario.style.display = 'none':this.timer.secundario.style.display = 'block'
                if (nome[i]=='secundario2') acao==0?this.timer.secundario2.innerHTML = '':acao==1?this.timer.secundario2.style.display = 'none':this.timer.secundario2.style.display = 'block'
                if (nome[i]=='icones') acao==0?this.timer.icones.innerHTML = '':acao==1?this.timer.icones.style.display = 'none':this.timer.icones.style.display = 'block'
                if (nome[i]=='titulo') acao==0?this.timer.titulo.innerHTML = '':acao==1?this.timer.titulo.style.display = 'none':this.timer.titulo.style.display = 'block'
                if (nome[i]=='menu') acao==0?this.timer.menu.innerHTML = '':acao==1?this.timer.menu.style.display = 'none':this.timer.menu.style.display = 'block'
                if (nome[i]=='funcao') if (acao==0) clearInterval(funcao.timer);
                if (nome[i]=='principal') {
                    if (acao==0) {
                        this.timer.principal.innerHTML = ''
                        this.timer.principal.style.color = 'black'
                    } else if (acao==1) {
                        this.timer.principal.style.display = 'none'
                    } else {
                        this.timer.principal.style.display = 'block'
                    }
                }
            }
        }
    }
}, data = {
    alarme: new Date,
    relogio: new Date,
    cronometro: {
        principal: '',
        volta: new Date,
        ultimaVolta: new Date,
    },
    timer: new Date,
    horaCerta(){
        this.relogio = new Date()
        dom.relogio.tintro.innerHTML = `Atual: ${("0" + this.relogio.getDate()).slice(-2)}/${("0" + (this.relogio.getMonth()+1)).slice(-2)}/${this.relogio.getFullYear()}`
        return `
            <table class="relogio">
                <tr>
                    <td class="dig">${("0" + this.relogio.getHours()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.relogio.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.relogio.getSeconds()).slice(-2)}</td>
                </tr>
            </table>
        `
    },
    botaUmCentesimo(){
        this.cronometro.principal.setMilliseconds(this.cronometro.principal.getMilliseconds()+10)
        if (this.cronometro.principal.getHours()>0) {
            return `
            <table class="relogio">
                <tr> 
                    <td class="dig">${("0" + this.cronometro.principal.getHours()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.cronometro.principal.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.cronometro.principal.getSeconds()).slice(-2)}</td>
                </tr>
            </table>
        `
        } else {
            return `
            <table class="relogio">
                <tr> 
                    <td class="dig">${("0" + this.cronometro.principal.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.cronometro.principal.getSeconds()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.cronometro.principal.getMilliseconds()).slice(-3).substring(0,2)}</td>
                </tr>
            </table>
        `
        }
    },
    tiraUmSegundo(){
        contador.timer.preciso-=1000
        if(contador.timer.preciso<1000){
            dom.limparEsconderOuMostrarTela(dom.timer.nome, 0, ['funcao', 'icones'])
            sons.escolherOSom(dom.timer.musica.value)
            dom.modal.texto.innerHTML = `<strong>Timer Finalizado!</strong><br/>${contador.timer.real}`
            dom.modal.div.style.display = "block";
            dom.adicionarIcone(dom.timer.nome, 'stop')
            return `
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
        }
        this.timer.setSeconds(this.timer.getSeconds()-1)
        return `
            <table class="relogio">
                <tr>
                    <td class="dig">${("0" + this.timer.getHours()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.timer.getMinutes()).slice(-2)}</td>
                    <td>:</td>
                    <td class="dig">${("0" + this.timer.getSeconds()).slice(-2)}</td>
                </tr>
            </table>
        `
    }
}, funcao = {
    relogio: '',
    cronometro: '',
    timer: ''
}, valor = {
    alarme: {
        hora: '',
        minuto: ''
    },
    timer: {
        hora: '',
        minuto: '',
        segundo: ''
    }
}, contador = {
    cronometro: {
        volta: ''
    },
    timer: {
        real: '',
        preciso: ''
    },
    sons: {
        tocando: ''
    },
}
const sons = {
    quantidade: 5,
    Bella_Ciao: new Audio('./assets/audio/bellaCiao.mp3'),
    Coffin_Dance: new Audio('./assets/audio/coffinDance.mp3'),
    Dance_Monkey: new Audio('./assets/audio/danceMonkey.mp3'),
    Dorime_Ameno: new Audio('./assets/audio/dorimeAmeno.mp3'),
    Old_Town_Road: new Audio('./assets/audio/oldTownRoad.mp3'),
    escolherOSom(nome){
        if (nome=='Bella_Ciao') {
            this.Bella_Ciao.play()
            contador.sons.tocando = 'Bella_Ciao'
        } else if (nome=='Coffin_Dance') {
            this.Coffin_Dance.play()
            contador.sons.tocando = 'Coffin_Dance'
        } else if (nome=='Dance_Monkey') {
            this.Dance_Monkey.play()
            contador.sons.tocando = 'Dance_Monkey'
        } else if (nome=='Dorime_Ameno') {
            this.Dorime_Ameno.play()
            contador.sons.tocando = 'Dorime_Ameno'
        } else if (nome=='Old_Town_Road') {
            this.Old_Town_Road.play()
            contador.sons.tocando = 'Old_Town_Road'
        }
    },
    pararOSom(){
        if (contador.sons.tocando=='Bella_Ciao') {
            this.Bella_Ciao.pause()
            this.Bella_Ciao.currentTime = 0;
        } else if (contador.sons.tocando=='Coffin_Dance') {
            this.Coffin_Dance.pause()
            this.Coffin_Dance.currentTime = 0;
        } else if (contador.sons.tocando=='Dance_Monkey') {
            this.Dance_Monkey.pause()
            this.Dance_Monkey.currentTime = 0;
        } else if (contador.sons.tocando=='Dorime_Ameno') {
            this.Dorime_Ameno.pause()
            this.Dorime_Ameno.currentTime = 0;
        } else if (contador.sons.tocando=='Old_Town_Road') {
            this.Old_Town_Road.pause()
            this.Old_Town_Road.currentTime = 0;
        }
    }
}
let alarmes = []

dom.modal.span.onclick = function() {
    dom.modal.div.style.display = "none"
    sons.pararOSom()
}
window.onclick = function(event) {
    if(event.target == dom.modal.div) {
        dom.modal.div.style.display = "none"
        sons.pararOSom()
    }
}
window.onload = function() {
    dom.timer.selectDasMusicas()
    dom.alarme.selectDasMusicas()
    if (localStorage.hasOwnProperty('alarmes')) {
        let arrayDoChrome = JSON.parse(localStorage.getItem('alarmes'))
        for (let i in arrayDoChrome) {
            arrayDoChrome[i][0] = new Date
            arrayDoChrome[i][0].setHours(arrayDoChrome[i][1],arrayDoChrome[i][2],0,0)
            alarmes.push(arrayDoChrome[i])
        }
    }
    
    mostrarTodosAlarmes()
    funcao.alarme = window.setInterval(function() {
        data.alarme = new Date()
        for (let i in alarmes) {
            if (alarmes[i][4]==true) {
                if (alarmes[i][0].getHours()==data.alarme.getHours()&&alarmes[i][0].getMinutes()==data.alarme.getMinutes()) {
                    continue
                } else {
                alarmes[i][4]==false
                }
            }
            if (alarmes[i][0].getHours()==data.alarme.getHours()&&alarmes[i][0].getMinutes()==data.alarme.getMinutes()&&alarmes[i][3]==true) {
                alarmes[i][4]=true
                sons.escolherOSom(alarmes[i][5])
                dom.modal.texto.innerHTML = `<strong>Alarme!</strong><br/>${("0" + alarmes[i][0].getHours()).slice(-2)}:${("0" + alarmes[i][0].getMinutes()).slice(-2)}`
                dom.modal.div.style.display = "block";
            }
        }
    }, 1000);
    funcao.relogio = window.setInterval(function() {
        dom.relogio.principal.innerHTML = data.horaCerta()
    }, 500);
};

function mostrarTodosAlarmes(){
    for (let i in alarmes) {
        dom.alarme.principal.innerHTML += `
            <table class="alarme"><tr>
                <td></td>
                <td>${("0" + alarmes[i][0].getHours()).slice(-2)}:${("0" + alarmes[i][0].getMinutes()).slice(-2)}</td>
                <td></td>
                <td><div class="slideCheck"><input type="checkbox" value="None" id="alarme${i}" name="alarmeOn" onclick="mudaStatusAlarme(${i})" ${alarmes[i][3]==true ?'checked':''}/><label class="ativar" for="alarme${i}"></label></div></td>
                <td><img class="icone" src="./assets/img/icon/trash.svg" onclick="excluirAlarme(${i})"></td>
            </tr></table>
        `
    }
}
function salvarAlarmesNoLocalStorage() {
    const alarmeJSON = JSON.stringify(alarmes)
    localStorage.setItem(`alarmes`, alarmeJSON)
}
function mudaStatusAlarme(interacao){
    alarmes[interacao][3] = alarmes[interacao][3]==true?false:true
    salvarAlarmesNoLocalStorage()
}
function addAlarme() {
    dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['icones'])
    dom.limparEsconderOuMostrarTela(dom.alarme.nome, 2, ['secundario'])
    dom.alarme.principal.innerHTML = `
        <input class="relogio" name="hora" id="hora" type="number" placeholder="Hor" min="0" max="23">
        <span>:</span>
        <input class="relogio" name="minuto" id="minuto" type="number" placeholder="Min" min="0" max="59">
        `
    dom.adicionarIcone(dom.alarme.nome, 'cancel', 'ok')
    dom.alarme.hora = document.querySelector('input#hora')
    dom.alarme.minuto = document.querySelector('input#minuto')
    dom.alarme.hora.focus()
    dom.alarme.hora.addEventListener('input', function() {
        dom.alarme.hora = document.querySelector('input#hora')
        valor.alarme.hora = Number(dom.alarme.hora.value)
        if (dom.alarme.hora.value.length>=2) {
            dom.alarme.minuto.focus()
            if (valor.alarme.hora>23) {
                dom.alarme.hora.value = '23'
                valor.alarme.hora = 23
            }
        }
    })
    dom.alarme.minuto.addEventListener('input', function() {
        dom.alarme.minuto = document.querySelector('input#minuto')
        valor.alarme.minuto = Number(dom.alarme.minuto.value)
        if (dom.alarme.minuto.value.length>=2) {
            dom.alarme.musica.focus()
            if (valor.alarme.minuto>59) {
                dom.alarme.minuto.value = '59'
                valor.alarme.minuto = 59
            }
        }
    })
}
function cancelAlarme() {
    dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['principal', 'icones'])
    dom.limparEsconderOuMostrarTela(dom.alarme.nome, 1, ['secundario'])
    mostrarTodosAlarmes()
    dom.adicionarIcone(dom.alarme.nome, 'add')
}
function okAlarme() {
    dom.alarme.musica = document.querySelector('select.musica')
    let jaTem = false
    let quale
    for (i in alarmes) {
        if (alarmes[i][1] == valor.alarme.hora && alarmes[i][2] == valor.alarme.minuto) {
            jaTem = true
            quale = i
        }
    }
    if ((dom.alarme.hora.value.length==0||dom.alarme.minuto.value.length==0)) {
        alert(`Valores Incorretos Digitados!\nDigite um horário válido!`)
    } else if (valor.alarme.hora > 23 || valor.alarme.minuto > 59) {
        alert(`Valores Incorretos Digitados!\nValores Máximos:\nHora: 23\nMinuto: 59`)
    } else if (jaTem) {
        const ativar = confirm('Alarme já adicionado!\nDeseja Ativa-lo?')
        if (ativar) {
            alarmes[quale][3] = true
        } else {
            alarmes[quale][3] = false
        }
        dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['principal', 'icones'])
        dom.limparEsconderOuMostrarTela(dom.alarme.nome, 1, ['secundario'])
        mostrarTodosAlarmes()
        dom.adicionarIcone(dom.alarme.nome, 'add')
    } else {
        dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['icones'])
        let segurando = new Date()
        segurando.setHours(valor.alarme.hora,valor.alarme.minuto,0,0)
        // Valores:     Date()          hora              minuto        check jaTocou          musica
        alarmes.push([segurando, valor.alarme.hora, valor.alarme.minuto, true, false, dom.alarme.musica.value])
        alarmes.sort(function(a, b) {
            if (a[1]<b[1]) return -1;
            if (a[1]>b[1]) return 1;
            if (a[1]==b[1]) { if (a[2]<b[2]) return -1; if (a[2]>b[2]) return 1; }
        })
        salvarAlarmesNoLocalStorage()
        dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['principal'])
        dom.limparEsconderOuMostrarTela(dom.alarme.nome, 1, ['secundario'])
        mostrarTodosAlarmes()
        dom.adicionarIcone(dom.alarme.nome, 'add')
    }
}
function excluirAlarme(numero) {
    dom.alarme.tables = document.querySelectorAll('table.alarme')
    dom.alarme.tables[numero].remove()
    alarmes.splice(numero, 1);
    alarmes.sort()
    dom.limparEsconderOuMostrarTela(dom.alarme.nome, 0, ['principal'])
    mostrarTodosAlarmes()
    salvarAlarmesNoLocalStorage()
}

function playCronometro(){
    dom.limparEsconderOuMostrarTela(dom.cronometro.nome, 0, ['icones'])
    if (data.cronometro.principal == '') {
        data.cronometro.principal = new Date
        data.cronometro.principal.setHours(0,0,0,0)
    } else {
        dom.cronometro.principal.style.color = 'black'
    }
    funcao.cronometro = window.setInterval(function() {
       dom.cronometro.principal.innerHTML = data.botaUmCentesimo()
    }, 10);
    dom.adicionarIcone(dom.cronometro.nome, 'lap', 'pause')
}
function lapCronometro(){
    contador.cronometro.volta++
    if (contador.cronometro.volta==1){
        data.cronometro.volta.setMilliseconds(data.cronometro.principal.getMilliseconds())
        data.cronometro.volta.setSeconds(data.cronometro.principal.getSeconds())
        data.cronometro.volta.setMinutes(data.cronometro.principal.getMinutes())
        data.cronometro.ultimaVolta.setMilliseconds(data.cronometro.principal.getMilliseconds())
        data.cronometro.ultimaVolta.setSeconds(data.cronometro.principal.getSeconds())
        data.cronometro.ultimaVolta.setMinutes(data.cronometro.principal.getMinutes())
        dom.cronometro.secundario.innerHTML = `
        <p>
            ${("0" + contador.cronometro.volta).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + data.cronometro.volta.getMinutes()).slice(-2)}:${("0" + data.cronometro.volta.getSeconds()).slice(-2)}.${("0" + data.cronometro.volta.getMilliseconds()).slice(-3).substring(0,2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + data.cronometro.principal.getMinutes()).slice(-2)}:${("0" + data.cronometro.principal.getSeconds()).slice(-2)}.${("0" + data.cronometro.principal.getMilliseconds()).slice(-3).substring(0,2)}
        </p>
    `
    } else {
        let dataRealUltimaVolta = (Number(data.cronometro.ultimaVolta.getMinutes())*60000)+(Number(data.cronometro.ultimaVolta.getSeconds())*1000)+(Number(data.cronometro.ultimaVolta.getMilliseconds()))
        let dataRealCronometro = (Number(data.cronometro.principal.getMinutes())*60000)+(Number(data.cronometro.principal.getSeconds())*1000)+(Number(data.cronometro.principal.getMilliseconds()))
        data.cronometro.volta.setHours(0,0,0,0)
        data.cronometro.volta.setMilliseconds(dataRealCronometro-dataRealUltimaVolta)
        data.cronometro.ultimaVolta.setHours(0,0,0,0)
        data.cronometro.ultimaVolta.setMilliseconds(dataRealCronometro)
        dom.cronometro.secundario.innerHTML = `
        <p>
            ${("0" + contador.cronometro.volta).slice(-2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            +${("0" + data.cronometro.volta.getMinutes()).slice(-2)}:${("0" + data.cronometro.volta.getSeconds()).slice(-2)}.${("0" + data.cronometro.volta.getMilliseconds()).slice(-3).substring(0,2)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ${("0" + data.cronometro.principal.getMinutes()).slice(-2)}:${("0" + data.cronometro.principal.getSeconds()).slice(-2)}.${("0" + data.cronometro.principal.getMilliseconds()).slice(-3).substring(0,2)}
        </p>
    ` + dom.cronometro.secundario.innerHTML
    }
}
function pauseCronometro(){
    clearInterval(funcao.cronometro);
    dom.limparEsconderOuMostrarTela(dom.cronometro.nome, 0, ['icones'])
    dom.cronometro.principal.style.color = 'red'
    dom.adicionarIcone(dom.cronometro.nome, 'stop', 'play')
}
function stopCronometro(){
    dom.limparEsconderOuMostrarTela(dom.cronometro.nome, 0, ['principal', 'secundario', 'funcao'])
    contador.cronometro.volta = 0
    data.cronometro.principal = ''
}

function playTimer(){
    if (contador.timer.preciso>1000) {
        dom.limparEsconderOuMostrarTela(dom.timer.nome, 0, ['icones'])
        dom.timer.principal.style.color = 'black'
        funcao.timer = window.setInterval(function() {
            dom.timer.principal.innerHTML = data.tiraUmSegundo()
        }, 1000);
        dom.adicionarIcone('Timer', 'stop', 'pause')
    } else {
        dom.timer.hora = document.querySelector('input#hora')
        dom.timer.minuto = document.querySelector('input#minuto')
        dom.timer.segundo = document.querySelector('input#segundo')
        dom.timer.musica = document.querySelector('select#Tmusica')
        valor.timer.hora = Number(dom.timer.hora.value)
        valor.timer.minuto = Number(dom.timer.minuto.value)
        valor.timer.segundo = Number(dom.timer.segundo.value)
        if((valor.timer.hora==0&&valor.timer.minuto==0&&valor.timer.segundo==0)||(valor.timer.hora<0||valor.timer.minuto<0||valor.timer.segundo<0)){
            alert(`Valores Incorretos Digitados!\nDigite um tempo válido!`)
        } else if(valor.timer.hora>=24 || valor.timer.minuto>= 60 || valor.timer.segundo>= 60){
            alert(`Valores Incorretos Digitados!\nValores Máximos:\nHora: 23\nMinuto: 59\nSegundo: 59`)
        } else {
            let temHora = false
            let temMinuto = false
            contador.timer.preciso = valor.timer.hora*3600000+valor.timer.minuto*60000+valor.timer.segundo*1000
            data.timer.setHours(valor.timer.hora, valor.timer.minuto, valor.timer.segundo)
            if(data.timer.getHours()!=0){
                contador.timer.real=dom.timer.hora.value+(valor.timer.hora==1?" Hora":" Horas")
                temHora = true
            }
            if(data.timer.getMinutes()!=0){
                if (temHora){contador.timer.real+=', '}
                contador.timer.real+=dom.timer.minuto.value+(valor.timer.minuto==1?" Minuto":" Minutos")
                temMinuto = true
            }
            if(data.timer.getSeconds()!=0){
                if (temMinuto||temHora){contador.timer.real+=' e '}
                contador.timer.real+=dom.timer.segundo.value+(valor.timer.segundo==1?" Segundo":" Segundos")
            }
            dom.limparEsconderOuMostrarTela(dom.timer.nome, 0, ['principal', 'icones'])
            dom.limparEsconderOuMostrarTela(dom.timer.nome, 1, ['secundario'])
            dom.timer.principal.innerHTML = `
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
            funcao.timer = window.setInterval(function() {
                dom.timer.principal.innerHTML = data.tiraUmSegundo()
            }, 1000);
            dom.timer.secundario2.innerHTML = contador.timer.real
            dom.limparEsconderOuMostrarTela(dom.timer.nome, 2, ['secundario2'])
            dom.adicionarIcone('Timer', 'stop', 'pause')
        }
    }
}
function pauseTimer() {
    dom.limparEsconderOuMostrarTela(dom.timer.nome, 0, ['icones', 'funcao'])
    dom.timer.principal.style.color = 'red'
    dom.adicionarIcone('Timer', 'stop', 'play')
}
function stopTimer(){
    dom.limparEsconderOuMostrarTela(dom.timer.nome, 0, ['funcao', 'principal', 'icones'])
    dom.limparEsconderOuMostrarTela(dom.timer.nome, 1, ['secundario2'])
    dom.limparEsconderOuMostrarTela(dom.timer.nome, 2, ['secundario'])
    dom.timer.principal.innerHTML = `
        <input class="relogio" id="hora" type="number" placeholder="Hor" min="0" max="23">
        <span>:</span>
        <input class="relogio" id="minuto" type="number" placeholder="Min" min="0" max="59">
        <span>:</span>
        <input class="relogio" id="segundo" type="number" placeholder="Seg" min="0" max="59">
    `
    contador.timer.preciso = 0
    contador.timer.real = ''
    dom.adicionarIcone(dom.timer.nome, 'play')
}