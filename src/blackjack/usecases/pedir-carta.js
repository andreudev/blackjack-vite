/**
 * @description Función para pedir una carta del deck
 * @param {Array<String>} deck
 * @returns {String} La carta pedida
 */

export const pedirCarta = (deck) => {
  if (deck.length === 0) {
    throw new Error("No hay cartas en el deck");
  }
  return deck.pop();
};
