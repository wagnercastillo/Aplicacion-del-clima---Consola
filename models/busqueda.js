require('dotenv').config();
const axios = require('axios');


class Busqueda {
    historial = [];

    constructor() {


    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 10,
            'languaje': 'es'
        }
    }

    async ciudad(lugar = '') {

        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox

            })
            const respuesta = await intance.get();

            return respuesta.data.features.map(lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]

            }))

        } catch (error) {
            console.log('Ups!')
            return []
        }

    }
}


module.exports = Busqueda;