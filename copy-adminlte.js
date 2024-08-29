const copy = require("copy");

// Copiar los archivos CSS y JS de AdminLTE a la carpeta public del proyecto.
copy("node_modules/admin-lte/dist/**/*", "public/", function(err, files) {
  if (err) throw err;
  console.log("Archivos CSS y JS copiados con exito");
})

// Copiar los plugins de AdminLTE a la carpeta public del proyecto.
copy("node_modules/admin-lte/plugins/**/*", "public/plugins", function(err, files) {
  if (err) throw err;
  console.log("Plugins de AdminLTE copiados con exito");
})