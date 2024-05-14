function Cliente(data, id) {
  this.nombre = data.nombre;
  this.id_contacto = id;
  this.id_tipo = data.id_tipo;
  this.habilitado = data.habilitado;
}

function Contacto(data) {
  this.email = data.email;
  this.telefono = data.telefono;
  this.ciudad = data.ciudad;
  this.direccion = data.direccion;
}

function Equipo(data) {
  this.numero_serie = data.numero_serie;
  this.id_marca = data.id_marca;
  this.modelo = data.modelo;
  this.precio = data.precio;
  this.minimo_copias = data.minimo_copias;
  this.precio_copias = data.precio_copias;
  this.fecha_reajuste = data.fecha_reajuste;
  this.id_estado = 1; // Por defecto, al crear un nuevo equipo, este tendra el estado Disponible = 1.
}

function Alquiler(data) {
  this.id_cliente = data.id_cliente;
  this.id_equipo = data.id_equipo;
  this.id_firma = data.id_firma;
  this.departamento = data.departamento;
  this.fecha_vencimiento = data.fecha_vencimiento;
}

module.exports = { Cliente, Contacto, Equipo, Alquiler };
