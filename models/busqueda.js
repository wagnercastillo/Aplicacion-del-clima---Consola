const axios = require('axios');


class Busqueda {
    historial = [];

    constructor() {


    }

    async ciudad(lugar = '') {

        const respuesta = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?access_token=pk.eyJ1Ijoid2FnbmVyY2FzdGlsbG8iLCJhIjoiY2tzem53MjY5MmR2ZDJ3cXpxOTB6M3ZtOCJ9.AOIfrQa19GURNGvp3A13Fg&cachebuster=1630389736021&autocomplete=true&limit=10&language=es');
        console.log(respuesta.data);

    }
}


module.exports= Busqueda;