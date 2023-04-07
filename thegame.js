//Elementos HTML

const botonRestart = document.querySelector(`.empezar`);
const botonNextTurn = document.querySelector(`.nexturn`);
const botonMazo = document.querySelector(`.mazo`);
const mazoInicial = document.querySelector(`#mazo-inicial`);
const cartaMazo = document.querySelector(`.carta-mazo`);
const seleccionada = document.querySelector(`#seleccionada`);

//constantes y tipos

const tipos = ["unoAscendente", "cienDescendente", "restoNumeros"];
const numeroCartasEnMano = 7; // Siempre tienes que tener 7 cartas en la mano como maximo

// conjunto de cartas en mano
const cartasEnMano = Array.prototype.slice.call(document.querySelectorAll(".espacio-carta"));

let primeraCartaCliqueada = null;

let mazo = [];
let barajado = [];
let mano = [];
let casaAscendente = [];
let casaDescendente = [];

//Tablero inicial

const crearMazo = () => {
  for (let i = 2; i <= 99; i++) {
    const carta = {
      numero: i,
      img: `${i}`,
      id: i,
    };
    mazo.push(carta);
  }
};

//Funciones para crear juego

const barajarMazo = () => {
  mazo = mazo
    .map((carta) => ({ carta, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ carta }) => carta);
};
/*
  
  */
const servir = (numeroDeCartas) => {
  mano = mano.concat(mazo.splice(0, numeroDeCartas));
};

const crearCarta = (numero) => {
  const cartaHTML = document.createElement("div")
  const imagen = new Image();

  imagen.src = `img/${numero}.png`
  cartaHTML.classList.add("carta")
  cartaHTML.dataset.numero = numero
  cartaHTML.appendChild(imagen)


  cartaHTML.onclick = () => {
    comprobarClickEnCarta(cartaHTML)
  }

  return cartaHTML
}

const ponerCartasEnLaManoInicial = () => {
  while (seleccionada.firstChild) {
    seleccionada.removeChild(seleccionada.firstChild);
  }
  while (mazoInicial.firstChild) {
    mazoInicial.removeChild(mazoInicial.firstChild);
  }
  for (let i = 0; i < barajado.length; i++) {
    manoInicial.appendChild(crearCarta(barajado[i]));
  }
};

const mostrarMano = () => {
  for (let i = 0; i < numeroCartasEnMano; i++) {
    const espacio = document.getElementById(`mano-${i}`)
    if (!espacio.hasChildNodes()){
      espacio.appendChild(crearCarta(mano[i].numero))
    }
  }
};

const casas = () => {
  //Descendiente
  const casa0 = document.getElementById("casa-0")
  casa0.appendChild(crearCarta(100))
  const casa1 = document.getElementById("casa-1")
  casa1.appendChild(crearCarta(100))

  //Ascendiente
  const casa2 = document.getElementById("casa-2")
  casa2.appendChild(crearCarta(1))
  const casa3 = document.getElementById("casa-3")
  casa3.appendChild(crearCarta(1))
}

// funcion de inicializacion soy un traMPOSO
const init = () => {
  if (mazo.length == 0) {
    crearMazo();
    barajarMazo();
    casas()
    servir(numeroCartasEnMano);
    mostrarMano();
    // ponerCartasEnLaMano()
  }
}

// -------------------------------------------
//                EVENTAZO :)
// -------------------------------------------

// Listeners
// for (let i = 0; i < cartasEnMano.length; i++) {
//     cartasEnMano[i].addEventListener("click", function(){
//     console.log(this.dataset.numero)
//     this.style.borderColor = "2px solid #red"
//     const casas = document.querySelector('.casa-asdes')
//     for (let j = 0; j < casas.length; j++) {
//       casas[j].onclick = () => {
//         console.log(this.dataset.numero)
//       }
//     }
    
//   });
// }


const comprobarClickEnCarta = (carta) => {
  if (primeraCartaCliqueada){
    const segundaCartaCliqueada = carta 
    console.log('primera ', primeraCartaCliqueada.dataset.numero)
    console.log('segunda ', segundaCartaCliqueada.dataset.numero)
    
    const padreSegundaCarta = segundaCartaCliqueada.parentNode

    if (padreSegundaCarta.classList.contains('casa-asdes')) {
      const esDescendente = padreSegundaCarta.parentNode.classList.contains("casa-descendente")
      let primeraCartaNumero = primeraCartaCliqueada.dataset.numero;
      let segundaCartaNumero = segundaCartaCliqueada.dataset.numero;

      if (esDescendente) {
        if (primeraCartaNumero < segundaCartaNumero) {
          // console.log("Todo bien solo falta mover la carta y no se si este codigo funcione")
          segundaCartaCliqueada.remove()
          padreSegundaCarta.appendChild(primeraCartaCliqueada)
          primeraCartaCliqueada.remove()
          mano = mano.filter((m) => {
            console.log(m.numero)
            console.log(m.numero !== primeraCartaNumero)
            return m.numero !== primeraCartaNumero})
        } else {
          alert('Casa descendiente!!!!!')
        }
      } else {
        if (primeraCartaNumero > segundaCartaNumero) {
          // console.log("Todo bien solo falta mover la carta y no se si este codigo funcione")
          segundaCartaCliqueada.remove()
          primeraCartaCliqueada.remove()
          padreSegundaCarta.appendChild(primeraCartaCliqueada)
          mano = mano.filter((m) => m.numero !== primeraCartaNumero)
        } else {
          alert('Casa ascendiente!!!!!')
        }
      }
    }
    console.log(mano)
    
    primeraCartaCliqueada = null
  } else {
    primeraCartaCliqueada = carta
  }
}



// Botones
botonMazo.onclick = () => {
  init()
};

botonRestart.onclick = () => {
  
  mazo = []
  mano = []
  const divMano = document.getElementById('mano')
  divMano.innerHTML = `
    <div class="espacio-carta" id="mano-0"></div>
    <div class="espacio-carta" id="mano-1"></div>
    <div class="espacio-carta" id="mano-2"></div>
    <div class="espacio-carta" id="mano-3"></div>
    <div class="espacio-carta" id="mano-4"></div>
    <div class="espacio-carta" id="mano-5"></div>
    <div class="espacio-carta" id="mano-6"></div>
  `

  const divCasas = document.getElementById("casas")
  divCasas.innerHTML = `
  <div class="casa-descendente">
      <div class="casa-asdes" id="casa-0"></div>
      <div class="casa-asdes" id="casa-1"></div>
  </div>
  <div class="casa-ascendente">
      <div class="casa-asdes" id="casa-2"></div>
      <div class="casa-asdes" id="casa-3"></div>
  </div>
  `
  init()
}

botonNextTurn.onclick = () => {
  mostrarMano(cartasEnMano - mano.length)
}

//como saber si esa carta se puede mover?
// soy el fantasma de tu codigooooo
// boooooo

const asignarClickEnMazo = () => {
  cartaMazo.onclick = () => {
    const cartaSeleccionada = barajado.pop();
    const eslaUltimaDelMazo = !barajado.length;
    if (!!cartaSeleccionada && !eslaUltimaDelMazo) {
      cartaSeleccionada.estaDadaVuelta = false;
      cartaMazo.children[0].style.display = "block";
      pilaInicial.style.display = "block";
      seleccionada.appendChild(crearCarta(cartaSeleccionada));
      cartasServidas.unshift(cartaSeleccionada);
    } else if (!!cartaSeleccionada && eslaUltimaDelMazo) {
      cartaSeleccionada.estaDadaVuelta = false;
      cartaMazo.children[0].style.display = "none";
      pilaInicial.style.display = "none";
      seleccionada.appendChild(crearCarta(cartaSeleccionada));
      cartasServidas.unshift(cartaSeleccionada);
    } else {
      barajado = [...cartasServidas];
      cartasServidas = [];
      cartaMazo.children[0].style.display = "block";
      ponerCartasEnLaPilaInicial();
      pilaInicial.style.display = "block";
    }
  };
};

const asignarClickEnMano = () => {
  for (let i = 0; i < 7; i++) {
    const pila = document.querySelector(`#pila-${i}`);
    pila.onclick = (e) => {
      e.stopPropagation();
      comprobarClickEnPilaVacia(i);
    };
  }
};

const asignarClickEnCasaAscendente = () => {
  for (let i = 0; i < 4; i++) {
    const casa = document.querySelector(`#casa-${i}`);
    casa.onclick = (e) => {
      comprobarClickEnCasaVacia(i);
    };
  }
};
const asignarClickEnCasaDescendente = () => {
  for (let i = 0; i < 4; i++) {
    const casa = document.querySelector(`#casa-${i}`);
    casa.onclick = (e) => {
      comprobarClickEnCasaVacia(i);
    };
  }
};
