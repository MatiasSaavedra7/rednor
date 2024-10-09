function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(precio).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
