import { mostrarMensaje } from "./mostrar-mensaje";
/**
 *
 * @param {String} carta
 * @param {Number} turno
 * @returns void
 * @description Función para insertar la carta en el HTML
 */
export const insertarCarta = (carta, turno, divCartasJugadores) => {
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
