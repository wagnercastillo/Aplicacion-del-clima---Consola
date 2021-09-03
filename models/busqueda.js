const fs = require('fs');

require('dotenv').config();
const axios = require('axios');



class Busqueda {
    historial = [];
    dbPath = './database/data.json'

    constructor() {
        this.readData();
    }

    get historialCapitalizado() {
        return this.historial;
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

            return respuesta.data.features.map(lugar => ({
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

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es'
        }
    }

    async climaLugar(lon, lat) {

        try {

            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }

            })

            const respuesta = await intance.get();

            const { main, weather } = respuesta.data;


            return {

                descripcion: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temperatura: main.temp

            }

        } catch (error) {
            console.log(error);
            console.log('Clima Lugar Ups')
            return []
        }

    }

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarData();

    }

    guardarData() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }

    readData() {

        //Debe de existeir 
        //  
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const data = JSON.parse(info);
        this.historial = data;




    }
}


module.exports = Busqueda;