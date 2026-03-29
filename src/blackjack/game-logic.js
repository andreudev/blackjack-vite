// src/blackjack/game-logic.js
// Contains core game logic functions for blackjack

import { mostrarMensaje, pedirCarta, insertarCarta, valorCarta } from "./usecases";

/**
 * Suma los puntos de un jugador y actualiza el marcador en el DOM.
 * @param {number} turno - Índice del jugador.
 * @param {string} carta - Carta obtenida.
 * @param {Array<number>} puntosJugadores - Array de puntos de los jugadores.
 * @param {NodeListOf<Element>} puntajesJugadorHTML - Elementos del DOM para los puntajes.
 * @returns {number} - Puntos actualizados del jugador.
 */
export function sumarPuntos(turno, carta, puntosJugadores, puntajesJugadorHTML) {
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  if (!puntajesJugadorHTML[turno]) {
    console.error(`No existe el marcador para el turno ${turno}`);
    mostrarMensaje(`Error: Falta el marcador para el jugador ${turno + 1}`);
    return puntosJugadores[turno];
  }
  puntajesJugadorHTML[turno].textContent = puntosJugadores[turno];
  return puntosJugadores[turno];
}

/**
 * Determina el ganador y muestra el mensaje correspondiente.
 * @param {Array<number>} puntosJugadores - Array de puntos de los jugadores.
 */
export function determinarGanador(puntosJugadores) {
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
}

/**
 * Lógica del turno de la computadora.
 * @param {number} puntosMinimos - Puntos del jugador humano.
 * @param {Array<number>} puntosJugadores - Array de puntos de los jugadores.
 * @param {Array<string>} deck - Mazo de cartas.
 * @param {NodeListOf<Element>} divCartasJugadores - Elementos del DOM para las cartas.
 * @param {NodeListOf<Element>} puntajesJugadorHTML - Elementos del DOM para los puntajes.
 */
export function turnoComputadora(
  puntosMinimos,
  puntosJugadores,
  deck,
  divCartasJugadores,
  puntajesJugadorHTML,
) {
  do {
    const carta = pedirCarta(deck);
    sumarPuntos(puntosJugadores.length - 1, carta, puntosJugadores, puntajesJugadorHTML);
    insertarCarta(carta, puntosJugadores.length - 1, divCartasJugadores);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosJugadores[puntosJugadores.length - 1] < puntosMinimos && puntosMinimos <= 21);
  determinarGanador(puntosJugadores);
}
