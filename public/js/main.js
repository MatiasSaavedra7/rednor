window.addEventListener("load", () => {
  console.log("CONECTADO!");

  let volverAtrasButton = document.getElementById("volverAtras");

  volverAtrasButton.addEventListener("click", () => {
    history.back();
  });
});
