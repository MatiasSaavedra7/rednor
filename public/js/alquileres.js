window.addEventListener("load", () => {
  console.log("CONECTADO");

  let select = document.querySelector("#select");
  let searchInput = document.querySelector(".search-input");
  let table = document.querySelector("table");
  let tr = table.getElementsByTagName("tr");
  let td, tdValue, tdIndex;

  searchInput.addEventListener("keyup", () => {

    if (select.value == 'Cliente') {
      tdIndex = 0;
    } else {
      tdIndex = 2;
    }

    let filter = searchInput.value.toLowerCase();

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[tdIndex];
      if (td) {
        tdValue = td.textContent || td.innerText;
        if (tdValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
});
