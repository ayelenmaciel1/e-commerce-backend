const bcrypt = require('bcrypt');

async function generateHash() {
  const password = "1234"; // La contraseña a cifrar
  const salt = await bcrypt.genSalt(10); // Generar un "sal"
  const hashedPassword = await bcrypt.hash(password, salt); // Generar el hash
  console.log(hashedPassword); // Imprime el hash generado
}

generateHash(); // Ejecuta la función
