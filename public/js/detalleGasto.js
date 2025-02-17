document.addEventListener("DOMContentLoaded", () => {
  
  // Obtener los elementos del DOM
  // const prevBtn = document.getElementById('prev-month');
  // const nextBtn = document.getElementById('next-month');
  const paginationContainer = document.querySelector('.pagination');

  const entidadBancariaModal = document.getElementById("entidad_bancaria_modal");
  const cbuModal = document.getElementById("cbu_modal");
  const cuitModal = document.getElementById("cuit_modal");

  const formaPago = document.getElementById("id_forma_pago");

  const formularioPago = document.getElementById("form-pagar-servicio");

  function toggleFieldsModal() {
    if (formaPago.value == "2") {
      entidadBancariaModal.style.display = "block";
      cbuModal.style.display = "block";
      cuitModal.style.display = "block";
    } else {
      entidadBancariaModal.style.display = "none";
      cbuModal.style.display = "none";
      cuitModal.style.display = "none";
    }
  }

  toggleFieldsModal();

  formaPago.addEventListener("change", toggleFieldsModal);

  formularioPago.addEventListener("submit", (event) => {
    if (formaPago.value != 2) {
      entidadBancariaModal.querySelector("input").remove();
      cbuModal.querySelector("input").remove();
      cuitModal.querySelector("input").remove();
      nroTarjetaModal.querySelector("input").remove();
    }
    
  })

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
  /*prevBtn.addEventListener('click', () => {
    scrollPagination('prev');
  });

  nextBtn.addEventListener('click', () => {
    scrollPagination('next');
  });*/

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