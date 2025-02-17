document.addEventListener("DOMContentLoaded", () => {
  console.log("registroGastos.js cargado");
  
  const pathname = window.location.pathname;
  console.log("Pathname: " + pathname);

  let pathParts = pathname.split("/");
  console.log("pathParts: [" + pathParts + "]");
  let idCategoria = pathParts[2];
  console.log("idCategoria: [" + idCategoria + "]");
  
  
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const condicionesLead = document.getElementById("condiciones-lead");
  const condiciones = document.getElementById("condiciones");
  const diaVencimiento = document.getElementById("dia_vencimiento");
  const frecuencia = document.getElementById("frecuencia");
  const meses = document.getElementById("mes");
  const formaPago = document.getElementById("forma_pago");
  const nroTarjeta = document.getElementById("nro_tarjeta");
  const entidadBancaria = document.getElementById("entidad_bancaria");
  const cbu = document.getElementById("cbu");
  const cuit = document.getElementById("cuit");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const divisa = document.getElementById("divisa");
  const monto = document.getElementById("monto");

  switch (idCategoria) {
    case "1":   //  Gastos Operativos
      meses.parentNode.style.display = "none";
      nroTarjeta.parentNode.style.display = "none";
      break;
    case "2":   //  Servicios
      nroTarjeta.parentNode.style.display = "none";
      break;
    case "3":   //  Sueldos
      //  Code
      break;
    case "4":   //  Honorarios
      meses.parentNode.style.display = "none";
      nroTarjeta.parentNode.style.display = "none";
      break;
    case "5":   //  Impuestos Nacionales
      meses.parentNode.style.display = "none";
      nroTarjeta.parentNode.style.display = "none";
      email.parentNode.style.display = "none";
      telefono.parentNode.style.display = "none";
      break;
    case "6":   //  Impuestos Provinciales
      meses.parentNode.style.display = "none";
      nroTarjeta.parentNode.style.display = "none";
      email.parentNode.style.display = "none";
      telefono.parentNode.style.display = "none";
      break;
    case "7":   //  Impuestos Municipales
      meses.parentNode.style.display = "none";
      nroTarjeta.parentNode.style.display = "none";
      email.parentNode.style.display = "none";
      telefono.parentNode.style.display = "none";
      break;
    case "8":   //  Planes de Pago & Moratorias
      //  Code
      break;
    case "9":   //  Tarjeta Visa
      descripcion.parentNode.style.display = "none";
      condicionesLead.style.display = "none";
      condiciones.parentNode.style.display = "none";
      meses.parentNode.style.display = "none";
      email.parentNode.style.display = "none";
      telefono.parentNode.style.display = "none";
      break;
    case "10":  //  Automotores
      //  Code
      condicionesLead.style.display = "none";
      condiciones.style.display = "none";
      break;
    case "11":  //  Sindicatos
      nroTarjeta.parentNode.style.display = "none";
      email.parentNode.style.display = "none";
      telefono.parentNode.style.display = "none";
      meses.parentNode.style.display = "none";
      break;
    case "12":  //  Proximos Vencimientos
      //  Code
      break;
    case "13":  //  Proveedores
      //  Code
      break;
    case "14":  //  Viaticos
      //  Code
      break;
    default:
      //  Nada para hacer
      break;
  }

})