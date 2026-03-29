import { crearDeck } from "./usecases/crear-deck.js";

const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"];
let deck = [],
  puntosJugadores = [];

// HTML
const btnPedir = document.querySelector("#pedir-cartas");
const btnDetener = document.querySelector("#detener");
const btnNuevo = document.querySelector("#nuevo-juego");
const puntajesJugadorHTML = document.querySelectorAll("small");
const divCartasJugadores = document.querySelectorAll(".div-cartas");

const pedirCarta = (deck) => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  return deck.pop();
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const mostrarMensaje = (mensaje) => {
  let mensajeDiv = document.getElementById("mensaje-resultado");
  if (!mensajeDiv) {
    mensajeDiv = document.createElement("div");
    mensajeDiv.id = "mensaje-resultado";
    mensajeDiv.classList.add("title");
    mensajeDiv.style.fontWeight = "bold";
    mensajeDiv.style.fontSize = "2em";
    mensajeDiv.style.textAlign = "center";
    mensajeDiv.style.color = "white";
    document.body.appendChild(mensajeDiv);
  }
  mensajeDiv.textContent = mensaje;
};

const determinarGanador = () => {
  const [puntosMinimos, puntosComputadora] = puntosJugadores;
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      mostrarMensaje("Nadie gana :(");
    } else if (puntosMinimos > 21) {
      mostrarMensaje("Computadora gana");
    } else if (puntosComputadora > 21) {
      mostrarMensaje("Jugador gana");
    } else {
      mostrarMensaje("Computadora gana");
    }
  }, 100);
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta(deck);
    sumarPuntos(puntosJugadores.length - 1, carta);
    insertarCarta(carta, puntosJugadores.length - 1);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosJugadores[puntosJugadores.length - 1] < puntosMinimos && puntosMinimos <= 21);

  determinarGanador();
};

const insertarCarta = (carta, turno) => {
  if (!divCartasJugadores[turno]) {
    console.error(`No existe el contenedor de cartas para el turno ${turno}`);
    mostrarMensaje(`Error: Falta el contenedor de cartas para el jugador ${turno + 1}`);
    return;
  }
  const imgCarta = document.createElement("img");
  imgCarta.src = `/public/assets/cartas/${carta}.png`;
  imgCarta.alt = `Carta ${carta}`;
  imgCarta.classList.add("carta");
  divCartasJugadores[turno].append(imgCarta);
};

const sumarPuntos = (turno, carta) => {
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  if (!puntajesJugadorHTML[turno]) {
    console.error(`No existe el marcador para el turno ${turno}`);
    mostrarMensaje(`Error: Falta el marcador para el jugador ${turno + 1}`);
    return puntosJugadores[turno];
  }
  puntajesJugadorHTML[turno].textContent = puntosJugadores[turno];
  return puntosJugadores[turno];
};

const iniciarJuego = (numeroJugadores = 1) => {
  deck = crearDeck(tipos, especiales);
  // Limpiar marcadores y cartas de todos los jugadores
  puntajesJugadorHTML.forEach((elem) => (elem.textContent = 0));
  divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));
  // Limpiar mensaje
  mostrarMensaje("");
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  puntosJugadores = new Array(numeroJugadores + 1).fill(0);
};

iniciarJuego();

// Events
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta(deck);
  sumarPuntos(0, carta);
  insertarCarta(carta, 0);

  if (puntosJugadores[0] > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  } else if (puntosJugadores[0] === 21) {
    btnPedir.disabled = true;
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugadores[0]);
});

btnNuevo.addEventListener("click", () => {
  iniciarJuego();
});
