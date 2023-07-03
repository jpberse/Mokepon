const sectionSeleccionarAtk = document.getElementById('selecionar-atk')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('selecionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigas = document.getElementById('vidas-enemigo')

const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const sectionMensaje = document.getElementById('resultado')
const sectionReiniciar = document.getElementById('reiniciar')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokeponesEnemigos = []
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma
let mascotaJugador
let mascotaJugadorObjeto
let mascotaEnemigo
let vetajaJugadorTipo
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image
mapaBackground.src = './assets/mokemap.webp'
let alturaDeseada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 600

if(anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}

alturaDeseada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaDeseada

class Mokepon{
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tipo = tipo
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, '💧', './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, '🌱', './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, '🔥', './assets/ratigueya.png')

let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, '🔥', './assets/langostelvis.png')

let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, '💧', './assets/pydos.png')

let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5,'🌱', './assets/tucapalma.png')

const PYDOS_HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const TUCAPALMA_CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]

const LANGOSTELVIS_RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},  
]

hipodoge.ataques.push(...PYDOS_HIPODOGE_ATAQUES)

capipepo.ataques.push(...TUCAPALMA_CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...LANGOSTELVIS_RATIGUEYA_ATAQUES)

langostelvis.ataques.push(...LANGOSTELVIS_RATIGUEYA_ATAQUES)

pydos.ataques.push(...PYDOS_HIPODOGE_ATAQUES)

tucapalma.ataques.push(...TUCAPALMA_CAPIPEPO_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)

function iniciarJuego(){
    sectionSeleccionarAtk.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')
    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador,) 
    botonReiniciar.addEventListener('click',reiniciarJuego)
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch('http://192.168.1.89:8080/unirse')
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }     else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }     else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id    
    }   else if(inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    }   else if(inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id   
    }   else if(inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id        
    }   else{
        alert('Selecciona una mascota')
        return
    }
    
    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)
    
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.89:8080/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
           mokepon: mascotaJugador 
        })
    })
}


function extraerAtaques(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques    
        }
    }
    mostrarAtaques(ataques)
}


function mostrarAtaques(ataques){   
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
      `


      contenedorAtaques.innerHTML += ataquesMokepon
    })

        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#AEBDCA'
                boton.disabled = true
            } else if(e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#AEBDCA'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#AEBDCA'
                boton.disabled = true  
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.1.89:8080/mokepon/${jugadorId}/ataques`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.89:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }   
                    })   
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    /* let mascotaAleatorio = aleatorio(0,mokepones.length -1)

    mascotaEnemigo = mokepones[mascotaAleatorio].nombre */
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    
   
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '🔥') {
        ataqueEnemigo.push('FUEGO')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    } else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '💧') {
        ataqueEnemigo.push('AGUA')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    } else {
        ataqueEnemigo.push('TIERRA')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    }

    console.log(ataqueEnemigo)
    console.log(ataquesMokeponEnemigo)
|   iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes([i] , [i])
            crearMensaje("EMPATE 👐")
        } else if((ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA') || (ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') || (ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA')) {
            indexAmbosOponentes([i], [i])
            crearMensaje("GANASTE 🎊")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else{
            indexAmbosOponentes([i], [i])
            crearMensaje("PERDISTE 😢")
            victoriasEnemigo++
            spanVidasEnemigas.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function revisarVictorias(){
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('ESTO FUE UN EMPATE.')
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICIDADES, GANASTE!')
    } else {
        crearMensajeFinal('HAS PERDIDO.')
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let resultadoJugador = ""
    let resultadoEnemigo = ""
    
    if (resultado === "EMPATE 👐"){
        resultadoJugador = " 🟡"
        resultadoEnemigo = " 🟡"
    } else if (resultado === "GANASTE 🎊") {
        resultadoJugador = " ✅"
        resultadoEnemigo = " ❌"
    } else {
        resultadoJugador = " ❌"
        resultadoEnemigo = " ✅"
    }

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador + resultadoJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo + resultadoEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensaje.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })  
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.89:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ''
                        if (mokeponNombre === 'Hipodoge') {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, '💧', './assets/hipodoge.png', enemigo.id)
                        } else if (mokeponNombre === 'Capipepo') {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, '🌱', './assets/capipepo.png', enemigo.id)
                        } else if (mokeponNombre === 'Ratigueya') {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, '🔥', './assets/ratigueya.png', enemigo.id)
                        } else if (mokeponNombre === 'Langostelvis') {
                            mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, '🔥', './assets/langostelvis.png', enemigo.id)
                        } else if (mokeponNombre === 'Pydos') {
                            mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, '💧', './assets/pydos.png', enemigo.id)
                        } else if (mokeponNombre === 'Tucapalma') {
                            mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5,'🌱', './assets/tucapalma.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
     })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionarTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break     
        case 'ArrowRight':
            moverDerecha()
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',presionarTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]    
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtk.style.display = 'flex'
    sectionVerMapa.style.display ='none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)