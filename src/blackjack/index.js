import { crearDeck, mostrarMensaje } from "./usecases";
import { sumarPuntos, determinarGanador, turnoComputadora } from "./game-logic";

// Game constants
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// Game state
const gameState = {
  deck: [],
  puntosJugadores: [],
};

// DOM elements
const dom = {
  btnPedir: document.querySelector("#pedir-cartas"),
  btnDetener: document.querySelector("#detener"),
  btnNuevo: document.querySelector("#nuevo-juego"),
  puntajesJugadorHTML: document.querySelectorAll("small"),
  divCartasJugadores: document.querySelectorAll(".div-cartas"),
};

/**
 * Inicializa el juego, baraja y limpia el estado y la UI.
 * @param {number} numeroJugadores
 */
function iniciarJuego(numeroJugadores = 1) {
  gameState.deck = crearDeck(tipos, especiales);
  dom.puntajesJugadorHTML.forEach((elem) => (elem.textContent = 0));
  dom.divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));
  mostrarMensaje("");
  dom.btnPedir.disabled = false;
  dom.btnDetener.disabled = false;
  gameState.puntosJugadores = new Array(numeroJugadores + 1).fill(0);
}

/**
 * Configura los listeners de los botones principales.
 */
function setupEventListeners() {
  dom.btnPedir.addEventListener("click", () => {
    const carta = gameState.deck.length ? gameState.deck.pop() : null;
    if (!carta) return;
    sumarPuntos(0, carta, gameState.puntosJugadores, dom.puntajesJugadorHTML);
    // Reutiliza insertarCarta desde usecases
    import("./usecases").then(({ insertarCarta }) => {
      insertarCarta(carta, 0, dom.divCartasJugadores);
    });
    if (gameState.puntosJugadores[0] > 21) {
      dom.btnPedir.disabled = true;
      dom.btnDetener.disabled = true;
      turnoComputadora(
        gameState.puntosJugadores[0],
        gameState.puntosJugadores,
        gameState.deck,
        dom.divCartasJugadores,
        dom.puntajesJugadorHTML,
      );
    } else if (gameState.puntosJugadores[0] === 21) {
      dom.btnPedir.disabled = true;
    }
  });

  dom.btnDetener.addEventListener("click", () => {
    dom.btnPedir.disabled = true;
    dom.btnDetener.disabled = true;
    turnoComputadora(
      gameState.puntosJugadores[0],
      gameState.puntosJugadores,
      gameState.deck,
      dom.divCartasJugadores,
      dom.puntajesJugadorHTML,
    );
  });

  dom.btnNuevo.addEventListener("click", () => {
    iniciarJuego();
  });
}

// Inicialización
iniciarJuego();
setupEventListeners();
