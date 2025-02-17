document.addEventListener("DOMContentLoaded", () => {
  // console.log("formularioPlanPago.js - DOM cargado completamente");
  
  const form = document.getElementById("form-crear-plan-pago");
  // console.log("Formulario: ", form);
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Crear objeto planPago
    const planPago = {
      // Obtener valores de los inputs
      nro_plan: document.getElementById("nro_plan").value,
      cuit: document.getElementById("cuit").value,
      nombre: document.getElementById("nombre").value,
      cbu: document.getElementById("cbu").value,
      fecha_consolidacion: document.getElementById("fecha_consolidacion").value,
      cantidad_cuotas: document.getElementById("cantidad_cuotas").value,
      cuotas: [],   //  Array de cuotas
    }

    // Capturar informacion de Pago a Cuenta
    const pagoACuenta = {
      capital: parseFloat(document.querySelector(`[name="pago_a_cuenta[capital]"]`).value),                            // Capturar el capital
      fecha_vencimiento: document.querySelector(`[name="pago_a_cuenta[fecha_vencimiento]"]`).value,                               // Capturar el vencimiento
      interes_financiero: parseFloat(document.querySelector(`[name="pago_a_cuenta[interes_financiero]"]`).value),      // Capturar el interes financiero
      interes_resarcitorio: parseFloat(document.querySelector(`[name="pago_a_cuenta[interes_resarcitorio]"]`).value),  // Capturar el interes resarcitorio
      total: parseFloat(document.querySelector(`[name="pago_a_cuenta[total]"]`).value),                                // Capturar el total
    };

    // Agregar informacion de Pago a Cuenta a planPago
    planPago.pago_a_cuenta = pagoACuenta;

    // Capturar todas las Cuotas
    for (let i = 0; i < planPago.cantidad_cuotas; i++) {
      // Capturar el capital de la cuota
      const capital = document.querySelector(`[name="cuotas[${i}][capital]"]`).value;

      // Crear un objeto para la cuota actual
      const cuota = {
        nro_cuota: i + 1,
        capital: parseFloat(capital),
        vencimientos: [],   // Array de vencimientos
      };

      // Capturar todos los vencimientos de la cuota actual
      for (let j = 0; j < 2; j++) { // 2 vencimientos por cuota

        // Crear un objeto para el vencimiento actual
        const vencimiento = {
          fecha_vencimiento: document.querySelector(`[name="cuotas[${i}][vencimientos][${j}][fecha_vencimiento]"]`).value,
          interes_financiero: parseFloat(document.querySelector(`[name="cuotas[${i}][vencimientos][${j}][interes_financiero]"]`).value),
          interes_resarcitorio: parseFloat(document.querySelector(`[name="cuotas[${i}][vencimientos][${j}][interes_resarcitorio]"]`).value),
          total: parseFloat(document.querySelector(`[name="cuotas[${i}][vencimientos][${j}][total]"]`).value),
        } 

        // Agregar el vencimiento al array de vencimientos de la cuota actual
        cuota.vencimientos.push(vencimiento);
      }

      // Agregar la cuota al array de cuotas del plan de pago
      planPago.cuotas.push(cuota);
    }

    // Mostrar el objeto planPago en consola
    console.log("Plan de Pago a Enviar: ", planPago);

    // Enviar los datos al servidor
    try {
      const response = await fetch("/gastos/planes-pagos/crear", {
        method: "POST",                         // Metodo POST
        headers: {
          "Content-Type": "application/json",   // Formato JSON
        },
        body: JSON.stringify(planPago),         // Convertir el Objeto planPago a formato JSON
      });

      if (!response.ok) {
        throw new Error("Error fetching plan de pago");
      }

      const result = await response.json();
      console.log("Respuesta del servidor: ", result);
      
      // Mostrar mensaje de éxito
      alert(result.message);

      // Limpiar el formulario
      form.reset();
      
      // Redirigir al listado de planes de pago
      setTimeout(() => {
        window.location.href = "/gastos/planes-pagos";
      }, 500);  //  500ms de delay

    } catch (error) {
      console.error("Error al enviar el plan de pago: ", error);
      alert("Hubo un error al enviar el plan de pago");
    }
    
  })

})