export const mostrarMensaje = (mensaje) => {
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
