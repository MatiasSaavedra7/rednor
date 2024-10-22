document.addEventListener("DOMContentLoaded", () => {
  // Obtener los elementos del DOM
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const paginationContainer = document.querySelector('.pagination');

  // Función para desplazar la paginación
  const scrollPagination = (direction) => {
    const scrollAmount = 150; // Ajusta este valor para controlar la velocidad de desplazamiento
    if (direction === 'prev') {
      paginationContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'next') {
      paginationContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Eventos de clic para los botones de navegación
  prevBtn.addEventListener('click', () => {
    scrollPagination('prev');
  });

  nextBtn.addEventListener('click', () => {
    scrollPagination('next');
  });

  // SCRIPT PARA EL MODAL DE PAGO
  const formaPago = document.getElementById("id_forma_pago");
  
  formaPago.addEventListener("change", function () {
    if (this.value === "2") {
      document.getElementById("entidad_bancaria_modal").style.display = "block";
      document.getElementById("cbu_modal").style.display = "block";
      document.getElementById("cuit_modal").style.display = "block"
    } else {
      document.getElementById("entidad_bancaria_modal").style.display = "none";
      document.getElementById("cbu_modal").style.display = "none";
      document.getElementById("cuit_modal").style.display = "none";
    }
  })

  const cuit_modal = document.getElementById("cuit_modal");
  const cuit_input = cuit_modal.querySelector("input[name='cuit']");

  cuit_input.addEventListener("input", (event) => {
    event.target.value = patternMatch({
      input: event.target.value,
    template: "xx-xxxxxxxx-x",
    })
  })

  // SCRIPT PARA EL MODAL DE SUBIR ARCHIVOS
  const archivosInput = document.getElementById("archivos_pagos");
  const archivosLabel = document.querySelector("label[for='archivos_pagos']");
  const resetButton = document.querySelector("button[type='reset']");

  archivosInput.addEventListener("change", () => {
    const files = Array.from(archivosInput.files);
    const fileNames = files.map(file => file.name).join(", ");
    archivosLabel.textContent = fileNames || "Elegir un archivo...";
  })

  resetButton.addEventListener("click", () => {
    archivosInput.value = "";
    archivosLabel.textContent = "Elegir un archivo...";
  })

})