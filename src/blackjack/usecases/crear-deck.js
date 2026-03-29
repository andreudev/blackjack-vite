import { shuffle } from "underscore";

/**
 *
 * @param {Array<String>} tipos Ejemplo: ["C", "D", "H", "S"]
 * @param {Array<String>} especiales Ejemplo: ["A", "J", "Q", "K"]
 * @returns {Array<String>} regresa un nuevo deck de cartas mezclado
 */
export const crearDeck = (tipos, especiales) => {
  let deck = [];

  if (!Array.isArray(tipos) || !Array.isArray(especiales)) {
    throw new Error("Los parámetros tipos y especiales deben ser arreglos de strings");
  }
  if (tipos.length === 0 || especiales.length === 0) {
    throw new Error("Los arreglos tipos y especiales no pueden estar vacíos");
  }

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  return shuffle(deck);
};
