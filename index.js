const { inquirerMenu, pausa, leerInput, mostrarListadoCiudades } = require('./helpers/inquirer');
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

                const termino = await leerInput('Ciudad:');
                const ciudades = await busqueda.ciudad(termino);
                const id = await mostrarListadoCiudades(ciudades);            
                const lugarSel = ciudades.find(lugar => lugar.id === id);
    
                // Clima
                const clima= await  busqueda.climaLugar(lugarSel.longitud, lugarSel.latitud);

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.latitud);
                console.log('Lng:', lugarSel.longitud);
                console.log('Temperatura:', clima.temperatura);
                console.log('Mínima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Descripcion:', clima.descripcion+'\n');

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