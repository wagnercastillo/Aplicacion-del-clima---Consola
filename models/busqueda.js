require('dotenv').config();
const axios = require('axios');


class Busqueda {
    historial = [];

    constructor() {


    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
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
            console.log(respuesta.data);

        } catch {
            console.log('Ups!')
        }

    }
}


module.exports = Busqueda;