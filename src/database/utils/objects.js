function Usuario(data) {
  this.nombre = data.nombre;
  this.apellido = data.apellido;
  this.usuario = data.usuario;
  this.password = data.password;
  this.id_rol = data.id_rol
}

function Cliente(data) {
  this.nombre = data.nombre;
  this.id_tipo_cliente = data.id_tipo_cliente;
  this.email = data.email;
  this.telefono = data.telefono;
  this.ciudad = data.ciudad;
  this.direccion = data.direccion;
  this.cuit = data.cuit;
  this.inscripcion_afip = data.inscripcion_afip;
  this.condicion_afip = data.condicion_afip;
  this.formulario_005 = data.formulario_005;
}

function Habilitado(data) {
  this.id_cliente = data.id_cliente;
  this.nombre = data.nombre;
  this.telefono = data.telefono;
  this.email = data.email;
  this.puesto = data.puesto;
  this.ubicacion = data.ubicacion;
}

function Equipo(data) {
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.id_tipo_equipo = data.id_tipo_equipo;
  this.id_estado = data.id_estado;
}

function Alquiler(data) {
  this.id_cliente = data.id_cliente;
  this.id_equipo = data.id_equipo;
  this.minimo_copias = data.minimo_copias;
  this.precio_copias = data.precio_copias;
  this.precio = data.precio;
  this.firma = data.firma;
  this.departamento = data.departamento;
  this.fecha_alta = data.fecha_alta;
  this.fecha_baja = data.fecha_baja;
  this.fecha_reajuste = data.fecha_reajuste;
  this.activo = data.activo; // Por defecto, al crear un nuevo alquiler, el valor será true (o 1).
}

function Reajuste(data) {
  this.id_alquiler = data.id_alquiler;
  this.minimo_copias = data.minimo_copias;
  this.precio_copias = data.precio_copias;
  this.precio = data.precio;
  this.fecha_reajuste = data.fecha_reajuste;
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
  this.id_estado = data.id_estado;
}

function Egreso(data) {
  this.id_ingreso = data.id_ingreso;
  this.fecha_egreso = data.fecha_egreso;
  this.detalle_reparacion = data.detalle_reparacion;
  this.costo = data.costo;
}

function IngresoExterno(data) {
  this.fecha_ingreso = data.fecha_ingreso;
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.motivo = data.motivo;
  this.descripcion = data.descripcion;
  this.id_estado = data.id_estado;
}

function EgresoExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.fecha_egreso = data.fecha_egreso;
  this.detalle_reparacion = data.detalle_reparacion;
  this.costo = data.costo;
}

function Informe(data) {
  this.id_ingreso = data.id_ingreso;
  this.detalle = data.detalle;
  this.fecha = data.fecha;
}

function InformeExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.detalle = data.detalle;
  this.fecha = data.fecha;
}

module.exports = { Usuario, Cliente, Habilitado, Equipo, Alquiler, Reajuste, Cartucho, Ingreso, Egreso, IngresoExterno, EgresoExterno, Informe, InformeExterno };
