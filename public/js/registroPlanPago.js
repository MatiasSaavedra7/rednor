document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOM cargado completamente");
  // console.log("registroPlanPago.js Conectado");

  let cantidadCuotas = document.getElementById("cantidad_cuotas");
  let generarCuotasButton = document.getElementById("generar_cuotas");
  
  // console.log("Cantidad de Cuotas: ", cantidadCuotas);
  // console.log("Generar Cuotas: ", generarCuotasButton);
  
  generarCuotasButton.addEventListener("click", () => {
    let contenedorCuotas = document.getElementById("contenedor_cuotas");
    contenedorCuotas.innerHTML = "";  //  Limpiar contenedor de cuotas

    let cantidad = cantidadCuotas.value;

    // console.log("Cantidad de cuotas: ", cantidad);

    // generarInputs(cantidad, contenedorCuotas);

    generarTabla(cantidad);
  });
  
})

function generarInputs(cantidad, contenedorCuotas) {
  for (let i = 0; i < cantidad; i++) {
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = `Cuota ${i + 1}`;
    label.htmlFor = `cuota_${i + 1}`;

    const input = document.createElement("input");
    input.type = "number";
    input.name = `cuota_${i + 1}  `;
    input.id = `cuota_${i + 1}`;
    input.required = true;
    input.classList.add("form-control");

    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
    contenedorCuotas.appendChild(inputDiv);
  }
}

function generarTabla(cantidad) {
  // Obtener contenedor de cuotas
  const contenedorCuotas = document.getElementById("contenedor_cuotas");

  // Crear tabla
  const table = document.createElement("table");
  table.classList.add("table", "text-center");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Cuota N°</th>
      <th>Capital</th>
      <th>Fecha de Vencimiento</th>
      <th>Interes Financiero</th>
      <th>Interes Resarcitorio</th>
      <th>Total</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  // Fila Pago a Cuenta
  const trPagoACuenta = document.createElement("tr");

  // Pago a Cuenta
  const tdPagoACuenta = document.createElement("td");
  tdPagoACuenta.innerText = "Pago a Cuenta";
  trPagoACuenta.appendChild(tdPagoACuenta);

  // Capital
  const tdCapitalPagoACuenta = document.createElement("td");
  const divCapitalPagoACuenta = document.createElement("div");
  divCapitalPagoACuenta.classList.add("form-group");
  const inputCapitalPagoACuenta = document.createElement("input");
  inputCapitalPagoACuenta.type = "number";
  inputCapitalPagoACuenta.name = "pago_a_cuenta[capital]";
  inputCapitalPagoACuenta.step = "0.00001";
  inputCapitalPagoACuenta.required = true;
  inputCapitalPagoACuenta.classList.add("form-control");
  divCapitalPagoACuenta.appendChild(inputCapitalPagoACuenta);
  tdCapitalPagoACuenta.appendChild(divCapitalPagoACuenta);
  trPagoACuenta.appendChild(tdCapitalPagoACuenta);

  // Fecha de Vencimiento
  const tdFechaVencimientoPagoACuenta = document.createElement("td");
  const divFechaVencimientoPagoACuenta = document.createElement("div");
  divFechaVencimientoPagoACuenta.classList.add("form-group");
  const inputFechaPagoACuenta = document.createElement("input");
  inputFechaPagoACuenta.classList.add("form-control");
  inputFechaPagoACuenta.type = "date";
  inputFechaPagoACuenta.name = "pago_a_cuenta[fecha_vencimiento]";
  inputFechaPagoACuenta.required = true;
  divFechaVencimientoPagoACuenta.appendChild(inputFechaPagoACuenta);
  tdFechaVencimientoPagoACuenta.appendChild(divFechaVencimientoPagoACuenta);
  trPagoACuenta.appendChild(tdFechaVencimientoPagoACuenta);

  // Interes Financiero
  const tdInteresFinancieroPagoACuenta = document.createElement("td");
  const divInteresFinancieroPagoACuenta = document.createElement("div");
  divInteresFinancieroPagoACuenta.classList.add("form-group");
  const inputInteresFinancieroPagoACuenta = document.createElement("input");
  inputInteresFinancieroPagoACuenta.classList.add("form-control");
  inputInteresFinancieroPagoACuenta.type = "number";
  inputInteresFinancieroPagoACuenta.name = "pago_a_cuenta[interes_financiero]";
  inputInteresFinancieroPagoACuenta.step = "0.00001";
  inputInteresFinancieroPagoACuenta.required = true;
  divInteresFinancieroPagoACuenta.appendChild(inputInteresFinancieroPagoACuenta);
  tdInteresFinancieroPagoACuenta.appendChild(divInteresFinancieroPagoACuenta);
  trPagoACuenta.appendChild(tdInteresFinancieroPagoACuenta);

  // Interes Resarcitorio
  const tdInteresResarcitorioPagoACuenta = document.createElement("td");
  const divInteresResarcitorioPagoACuenta = document.createElement("div");
  divInteresResarcitorioPagoACuenta.classList.add("form-group");
  const inputInteresResarcitorioPagoACuenta = document.createElement("input");
  inputInteresResarcitorioPagoACuenta.classList.add("form-control");
  inputInteresResarcitorioPagoACuenta.type = "number";
  inputInteresResarcitorioPagoACuenta.name = "pago_a_cuenta[interes_resarcitorio]";
  inputInteresResarcitorioPagoACuenta.step = "0.00001";
  inputInteresResarcitorioPagoACuenta.required = true;
  divInteresResarcitorioPagoACuenta.appendChild(inputInteresResarcitorioPagoACuenta);
  tdInteresResarcitorioPagoACuenta.appendChild(divInteresResarcitorioPagoACuenta);
  trPagoACuenta.appendChild(tdInteresResarcitorioPagoACuenta);

  // Total
  const tdTotalPagoACuenta = document.createElement("td");
  const divTotalPagoACuenta = document.createElement("div");
  divTotalPagoACuenta.classList.add("form-group");
  const inputTotalPagoACuenta = document.createElement("input");
  inputTotalPagoACuenta.classList.add("form-control");
  inputTotalPagoACuenta.type = "number";
  inputTotalPagoACuenta.name = "pago_a_cuenta[total]";
  inputTotalPagoACuenta.step = "0.00001";
  inputTotalPagoACuenta.readOnly = true;
  inputTotalPagoACuenta.required = true;
  // inputTotalPagoACuenta.value = 110;
  divTotalPagoACuenta.appendChild(inputTotalPagoACuenta);
  tdTotalPagoACuenta.appendChild(divTotalPagoACuenta);
  trPagoACuenta.appendChild(tdTotalPagoACuenta);

  // Funcion para incrementar automaticamente el valor del campo total
  function incrementarTotal() {
    const capital = parseFloat(inputCapitalPagoACuenta.value) || 0;
    const interesFinanciero = parseFloat(inputInteresFinancieroPagoACuenta.value) || 0;
    const interesResarcitorio = parseFloat(inputInteresResarcitorioPagoACuenta.value) || 0;
    const total = capital + interesFinanciero + interesResarcitorio;
    inputTotalPagoACuenta.value = total.toFixed(5); // Redondea a 5 decimales
  }

  // Evento para incrementar el total al cambiar el valor de los campos de interés y capital
  inputCapitalPagoACuenta.addEventListener("input", incrementarTotal);
  inputInteresFinancieroPagoACuenta.addEventListener("input", incrementarTotal);
  inputInteresResarcitorioPagoACuenta.addEventListener("input", incrementarTotal);

  tbody.appendChild(trPagoACuenta);

  for (let i = 0; i < cantidad; i++) {
    // Primera fila
    const trPrimeraFila = document.createElement("tr");

    // Cuota N°
    const tdNroCuota = document.createElement("td");
    tdNroCuota.rowSpan = 2;
    tdNroCuota.classList.add("align-middle");
    const divNroCuota = document.createElement("div");
    divNroCuota.classList.add("form-group");
    divNroCuota.id = `div_cuota_${i + 1}`;
    divNroCuota.innerText = i + 1;
    tdNroCuota.appendChild(divNroCuota);

    // Capital
    const tdCapital = document.createElement("td");
    tdCapital.rowSpan = 2; // Ocupa 2 filas
    tdCapital.classList.add("align-middle");
    const divCapital = document.createElement("div");
    divCapital.classList.add("form-group");
    const inputCapital = document.createElement("input");
    inputCapital.type = "number";
    inputCapital.name = `cuotas[${i}][capital]`;
    inputCapital.step = "0.00001";
    inputCapital.required = true;
    inputCapital.classList.add("form-control");
    divCapital.appendChild(inputCapital);
    tdCapital.appendChild(divCapital);

    // Fecha de Vencimiento
    const tdFechaVencimiento = document.createElement("td");
    const divFechaVencimiento = document.createElement("div");
    divFechaVencimiento.classList.add("form-group");
    const inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.name = `cuotas[${i}][vencimientos][0][fecha_vencimiento]`;
    inputFecha.required = true;
    inputFecha.classList.add("form-control");
    divFechaVencimiento.appendChild(inputFecha);
    tdFechaVencimiento.appendChild(divFechaVencimiento);

    // Interes Financiero
    const tdInteresFinanciero = document.createElement("td");
    const divInteresFinanciero = document.createElement("div");
    divInteresFinanciero.classList.add("form-group");
    const inputInteresFinanciero = document.createElement("input");
    inputInteresFinanciero.type = "number";
    inputInteresFinanciero.name = `cuotas[${i}][vencimientos][0][interes_financiero]`;
    inputInteresFinanciero.step = "0.00001";
    inputInteresFinanciero.required = true;
    inputInteresFinanciero.classList.add("form-control");
    divInteresFinanciero.appendChild(inputInteresFinanciero);
    tdInteresFinanciero.appendChild(divInteresFinanciero);

    // Interes Resarcitorio
    const tdInteresResarcitorio = document.createElement("td");
    const divInteresResarcitorio = document.createElement("div");
    divInteresResarcitorio.classList.add("form-group");
    const inputInteresResarcitorio = document.createElement("input");
    inputInteresResarcitorio.type = "number";
    inputInteresResarcitorio.name = `cuotas[${i}][vencimientos][0][interes_resarcitorio]`;
    inputInteresResarcitorio.step = "0.00001";
    inputInteresResarcitorio.required = true;
    inputInteresResarcitorio.classList.add("form-control");
    divInteresResarcitorio.appendChild(inputInteresResarcitorio);
    tdInteresResarcitorio.appendChild(divInteresResarcitorio);

    // Total
    const tdTotal = document.createElement("td");
    const divTotal = document.createElement("div");
    divTotal.classList.add("form-group");
    const inputTotal = document.createElement("input");
    inputTotal.type = "number";
    inputTotal.name = `cuotas[${i}][vencimientos][0][total]`;
    inputTotal.step = "0.00001";
    inputTotal.readOnly = true;    // El total se calcula automaticamente, es igual a la suma del capital + intereses
    inputTotal.required = true;
    inputTotal.classList.add("form-control");
    divTotal.appendChild(inputTotal);
    tdTotal.appendChild(divTotal);

    // Funcion para incrementar automaticamente el valor del campo total del vencimiento uno
    function incrementarTotalVtoUno () {
      const capital = parseFloat(inputCapital.value) || 0;
      const interesFinanciero = parseFloat(inputInteresFinanciero.value) || 0;
      const interesResarcitorio = parseFloat(inputInteresResarcitorio.value) || 0;
      const total = capital + interesFinanciero + interesResarcitorio;
      inputTotal.value = total.toFixed(5); // Redondea a 5 decimales
    }

    inputCapital.addEventListener("input", incrementarTotalVtoUno);
    inputInteresFinanciero.addEventListener("input", incrementarTotalVtoUno);
    inputInteresResarcitorio.addEventListener("input", incrementarTotalVtoUno);

    // Agregar elementos a la primera fila
    trPrimeraFila.appendChild(tdNroCuota);
    trPrimeraFila.appendChild(tdCapital);
    trPrimeraFila.appendChild(tdFechaVencimiento);
    trPrimeraFila.appendChild(tdInteresFinanciero);
    trPrimeraFila.appendChild(tdInteresResarcitorio);
    trPrimeraFila.appendChild(tdTotal);

    // Segunda fila
    const trSegundaFila = document.createElement("tr");

    // Fecha de Vencimiento
    const tdFechaVencimiento2 = document.createElement("td");
    const divFechaVencimiento2 = document.createElement("div");
    divFechaVencimiento2.classList.add("form-group");
    const inputFecha2 = document.createElement("input");
    inputFecha2.type = "date";
    inputFecha2.name = `cuotas[${i}][vencimientos][1][fecha_vencimiento]`;
    inputFecha2.required = true;
    inputFecha2.classList.add("form-control");
    divFechaVencimiento2.appendChild(inputFecha2);
    tdFechaVencimiento2.appendChild(divFechaVencimiento2);

    // Interes Financiero
    const tdInteresFinanciero2 = document.createElement("td");
    const divInteresFinanciero2 = document.createElement("div");
    divInteresFinanciero2.classList.add("form-group");
    const inputInteresFinanciero2 = document.createElement("input");
    inputInteresFinanciero2.type = "number";
    inputInteresFinanciero2.name = `cuotas[${i}][vencimientos][1][interes_financiero]`;
    inputInteresFinanciero2.step = "0.00001";
    inputInteresFinanciero2.required = true;
    inputInteresFinanciero2.classList.add("form-control");
    divInteresFinanciero2.appendChild(inputInteresFinanciero2);
    tdInteresFinanciero2.appendChild(divInteresFinanciero2);

    // Interes Resarcitorio
    const tdInteresResarcitorio2 = document.createElement("td");
    const divInteresResarcitorio2 = document.createElement("div");
    divInteresResarcitorio2.classList.add("form-group");
    const inputInteresResarcitorio2 = document.createElement("input");
    inputInteresResarcitorio2.type = "number";
    inputInteresResarcitorio2.name = `cuotas[${i}][vencimientos][1][interes_resarcitorio]`;
    inputInteresResarcitorio2.step = "0.00001";
    inputInteresResarcitorio2.required = true;
    inputInteresResarcitorio2.classList.add("form-control");
    divInteresResarcitorio2.appendChild(inputInteresResarcitorio2);
    tdInteresResarcitorio2.appendChild(divInteresResarcitorio2);

    // Total
    const tdTotal2 = document.createElement("td");
    const divTotal2 = document.createElement("div");
    divTotal2.classList.add("form-group");
    const inputTotal2 = document.createElement("input");
    inputTotal2.type = "number";
    inputTotal2.name = `cuotas[${i}][vencimientos][1][total]`;
    inputTotal2.step = "0.00001";
    inputTotal2.readOnly = true;    // El total se calcula automaticamente, es igual a la suma del capital + intereses
    inputTotal2.required = true;
    inputTotal2.classList.add("form-control");
    divTotal2.appendChild(inputTotal2);
    tdTotal2.appendChild(divTotal2);

    // Funcion para incrementar automaticamente el valor del campo total del vencimiento dos
    function incrementarTotalVtoDos () {
      const capital = parseFloat(inputCapital.value) || 0;
      const interesFinanciero = parseFloat(inputInteresFinanciero2.value) || 0;
      const interesResarcitorio = parseFloat(inputInteresResarcitorio2.value) || 0;
      const total = capital + interesFinanciero + interesResarcitorio;
      inputTotal2.value = total.toFixed(5); // Redondea a 5 decimales
    }

    inputCapital.addEventListener("input", incrementarTotalVtoDos);
    inputInteresFinanciero2.addEventListener("input", incrementarTotalVtoDos);
    inputInteresResarcitorio2.addEventListener("input", incrementarTotalVtoDos);
    

    // Agregar elementos a la segunda fila
    trSegundaFila.appendChild(tdFechaVencimiento2);
    trSegundaFila.appendChild(tdInteresFinanciero2);
    trSegundaFila.appendChild(tdInteresResarcitorio2);
    trSegundaFila.appendChild(tdTotal2);

    // Agregar filas al tbody
    tbody.appendChild(trPrimeraFila);
    tbody.appendChild(trSegundaFila);

  }

  table.appendChild(tbody);

  // Limpiar contenedor y agregar la nueva tabla
  contenedorCuotas.innerHTML = "";
  contenedorCuotas.appendChild(table);
}