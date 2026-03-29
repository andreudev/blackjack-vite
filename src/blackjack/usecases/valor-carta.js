/**
 * @description Esta función recibe una carta y devuelve su valor numérico.
 * Las cartas numéricas (2-10) devuelven su valor, las figuras (J, Q, K) valen 10 y el As (A) vale 11.
 * @param {string} carta
 * @returns {number} El valor numérico de la carta
 * @throws {Error} Si la carta no es válida (no sigue el formato esperado)
 */

export const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};
