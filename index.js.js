//Para poder pedir datos en node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creamos un objeto para almacenar las cuentas
let cuentas = {};

// Esta es una función para crear una cuenta
function crearCuenta(nombre, saldoInicial = 0) {
    // Verificamos que la cuenta no exista
    if (cuentas[nombre]) {
        console.log('La cuenta ya existe.');
        return;
    }

    // Creamos la cuenta
    cuentas[nombre] = { saldo: saldoInicial };
    console.log(`Cuenta creada para ${nombre} con un saldo inicial de ${saldoInicial}.`);
}

// Esta es una función para depositar dinero en una cuenta
function depositarDinero(nombre, monto) {
    // Verificamos que la cuenta exista
    if (!cuentas[nombre]) {
        console.log('La cuenta no existe.');
        return;
    }

    // Incrementamos el saldo
    cuentas[nombre].saldo += monto;
    console.log(`Depositado ${monto} en la cuenta de ${nombre}. Saldo actual: ${cuentas[nombre].saldo}.`);
}

// Esta es una función para enviar dinero de una cuenta a otra
function enviarDinero(nombreOrigen, nombreDestino, monto) {
    // Verificamos que ambas cuentas existan
    if (!cuentas[nombreOrigen]) {
        console.log('La cuenta de origen no existe.');
        return;
    }
    if (!cuentas[nombreDestino]) {
        console.log('La cuenta de destino no existe.');
        return;
    }

    // Verificamos que haya suficiente saldo en la cuenta de origen
    if (cuentas[nombreOrigen].saldo < monto) {
        console.log('No hay suficiente saldo en la cuenta de origen.');
        return;
    }

    // Realizamos la transacción
    cuentas[nombreOrigen].saldo -= monto;
    cuentas[nombreDestino].saldo += monto;
    console.log(`Enviado ${monto} de ${nombreOrigen} a ${nombreDestino}. Saldo actual: ${cuentas[nombreOrigen].saldo}.`);
}

// Esta es una función para listar todas las cuentas
function listarCuentas() {
    console.log('Cuentas:');
    for (let nombre in cuentas) {
        console.log(`- ${nombre}: ${cuentas[nombre].saldo}`);
    }
}

// Esta es una función para obtener los detalles de una cuenta
function detallesCuenta(nombre) {
    // Verificamos que la cuenta exista
    if (!cuentas[nombre]) {
        console.log('La cuenta no existe.');
        return;
    }

    // Imprimimos los detalles de la cuenta
    console.log(`Detalles de la cuenta de ${nombre}:`);
    console.log(`- Saldo: ${cuentas[nombre].saldo}`);
}


function mostrarMenu() {
    console.log('\nMenu:');
    console.log('1. Crear cuenta');
    console.log('2. Depositar dinero');
    console.log('3. Enviar dinero');
    console.log('4. Listar cuentas');
    console.log('5. Detalles de cuenta');
    console.log('6. Salir');
    rl.question('\nPor favor seleccione una opción del menú: ', manejarSeleccionMenu);
}
function manejarSeleccionMenu(opcion) {
    switch(opcion) {
      case '1':
        rl.question('Ingrese el nombre para la nueva cuenta: ', nombre => {
          crearCuenta(nombre);
          mostrarMenu();
        });
        break;
      case '2':
        rl.question('Ingrese el nombre de la cuenta y el monto a depositar (separados por un espacio): ', input => {
          const [nombre, monto] = input.split(' ');
          depositarDinero(nombre, Number(monto));
          mostrarMenu();
        });
        break;
      case '3':
        rl.question('Ingrese la cuenta de origen, la cuenta de destino y el monto a transferir (separados por un espacio): ', input => {
          const [nombreOrigen, nombreDestino, monto] = input.split(' ');
          enviarDinero(nombreOrigen, nombreDestino, Number(monto));
          mostrarMenu();
        });
        break;
      case '4':
        listarCuentas();
        mostrarMenu();
        break;
      case '5':
        rl.question('Ingrese el nombre de la cuenta de la cual quiere obtener detalles: ', nombre => {
          detallesCuenta(nombre);
          mostrarMenu();
        });
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Opción no reconocida.');
        mostrarMenu();
    }
  }
  
mostrarMenu();