window.addEventListener("load", () => {
  console.log("CONECTADO!");

  let searchInput = document.querySelector(".search-input");
  let table = document.querySelector("table");
  let tr = table.getElementsByTagName("tr");
  let td, tdValue;

  searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toLowerCase();

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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