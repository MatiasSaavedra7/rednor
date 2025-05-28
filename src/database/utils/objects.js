function Habilitado(data) {
  this.id_cliente = data.id_cliente;
  this.nombre = data.nombre;
  this.telefono = data.telefono;
  this.email = data.email;
  this.puesto = data.puesto;
  this.ubicacion = data.ubicacion;
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

module.exports = {
  Habilitado,
  Reajuste,
  Cartucho,
};
