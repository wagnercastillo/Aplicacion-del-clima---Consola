const { inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');

let opcion;

const main = async () => {

    const busqueda = new Busquedas();

    do {
        opcion = await inquirerMenu();
        switch (opcion) {
            case 1:
                // Mostar mensaje
                // Buscar los lugares
                // Seleccionar los mensajes
                // Clima
                // Mostrar los resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Maxima:',);

                busqueda.ciudad();
                break;
            case 2:
                console.log("2");
                break;
            case 0:
                console.log("0. Gracias!");
                break;
        }
        await pausa();


    } while (opcion !== 0)

}


main();