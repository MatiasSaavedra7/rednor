function Cliente(data) {
  this.nombre = data.nombre;
  this.id_tipo = data.id_tipo;
  this.email = data.email;
  this.telefono = data.telefono;
  this.ciudad = data.ciudad;
  this.direccion = data.direccion;
  this.cuit = data.cuit;
  this.condicion_afip = data.condicion_afip;
  this.inscripcion_afip = data.inscripcion_afip;
  this.formulario_005 = data.formulario_005;
}

function Equipo(data) {
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.precio = data.precio;
  this.minimo_copias = data.minimo_copias;
  this.precio_copias = data.precio_copias;
  this.fecha_reajuste = data.fecha_reajuste;
  this.id_estado = data.id_estado;
}

function Alquiler(data) {
  this.id_cliente = data.id_cliente;
  this.id_equipo = data.id_equipo;
  this.firma = data.firma;
  this.departamento = data.departamento;
  this.fecha_alta = data.fecha_alta;
  this.fecha_baja = data.fecha_baja;
  this.activo = true; // Por defecto, al crear un nuevo alquiler, el valor será true (o 1).
}

function Cartucho(data) {
  this.nombre = data.nombre;
  this.etiqueta = data.etiqueta;
  this.SKU = data.SKU;
  this.stock = data.stock;
  this.id_categoria_cartucho = data.categoria;
}

function Ingreso(data) {
  this.id_equipo = data.id_equipo;
  this.fecha_ingreso = data.fecha_ingreso;
  this.motivo = data.motivo;
  this.descripcion = data.descripcion;
}

function Egreso(data) {
  this.id_ingreso = data.id_ingreso;
  this.fecha_egreso = data.fecha_egreso;
  this.detalle_reparacion = data.detalle_reparacion;
  this.costo = data.costo;
}

module.exports = { Cliente, Equipo, Alquiler, Cartucho, Ingreso, Egreso };
