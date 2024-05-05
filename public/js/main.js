window.addEventListener("load", () => {
  console.log("CONECTADO!");

  const open = document.querySelector(".open-menu");
  const close = document.querySelector(".close-menu");
  const aside = document.querySelector(".aside-menu");

  open.addEventListener("click", () => {
    aside.classList.toggle('visible')
  });

  close.addEventListener("click", () => {
    aside.classList.toggle('visible')
  });
});
