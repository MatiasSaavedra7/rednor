function Cliente(data) {
  this.nombre = data.nombre;
  this.id_tipo_cliente = data.id_tipo_cliente;
  this.email = data.email;
  this.telefono = data.telefono;
  this.ciudad = data.ciudad;
  this.direccion = data.direccion;
  this.inscripcion_afip = data.inscripcion_afip;
  this.condicion_afip = data.condicion_afip;
  this.formulario_005 = data.formulario_005;
  this.razon_social = data.razon_social;
  this.domicilio_comercial = data.domicilio_comercial;
  this.DocTipo = data.DocTipo;
  this.DocNro = data.DocNro;
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
  this.numero_facturacion = data.numero_facturacion;
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
  this.detalle = data.detalle;
  this.id_estado = data.id_estado;
}

function Egreso(data) {
  this.id_ingreso = data.id_ingreso;
  this.fecha_egreso = data.fecha_egreso;
  this.detalle = data.detalle;
  this.observacion = data.observacion;
  this.costo = data.costo;
}

function EgresoExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.detalle = data.detalle;
  this.precio = data.precio;
  this.id_forma_pago = data.id_forma_pago;
  this.fecha_cobro = data.fecha_cobro;
  this.fecha_egreso = data.fecha_egreso;
}

function Informe(data) {
  this.id_ingreso = data.id_ingreso;
  this.detalle = data.detalle;
  this.pedido_insumos = data.pedido_insumos;
  this.fecha_informe = data.fecha_informe;
}

function InformeExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.detalle = data.detalle;
  this.pedido_insumos = data.pedido_insumos;
  this.fecha_informe = data.fecha_informe;
}

function EquipoExterno(data) {
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.id_tipo_equipo = data.id_tipo_equipo;
}

module.exports = {
  Cliente,
  Habilitado,
  Equipo,
  Alquiler,
  Reajuste,
  Cartucho,
  Ingreso,
  Egreso,
  EgresoExterno,
  Informe,
  InformeExterno,
  EquipoExterno,
};
