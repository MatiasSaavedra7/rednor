window.addEventListener("load", () => {
  console.log("CONECTADO!");

  const open = document.querySelector(".open-menu");
  const close = document.querySelector(".close-menu");
  const aside = document.querySelector(".aside-menu");
  const dropdown = document.querySelectorAll(".dropdown-btn");

  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      let dropdownContent = this.nextElementSibling;  
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  open.addEventListener("click", () => {
    aside.classList.toggle("visible");
  });

  close.addEventListener("click", () => {
    aside.classList.toggle("visible");
  });
});
