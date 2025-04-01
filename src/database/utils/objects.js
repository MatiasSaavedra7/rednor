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
  Reajuste,
  Cartucho,
  EquipoExterno,
};
