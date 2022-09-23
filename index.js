const fetch = require('node-fetch');

console.log('- App works!');

const apikey            = 'yXpbmDtUwXMzmb0krV9YAO7L46AcCOXi';
// const apikey            = 'Zg0gUOMeo7TjPfsCQXP8vhzKfY0Tep3N';
// const apikey            = 'gL6zrnbDKkebQ7awGu1HQQV7Vwa6QGZv';

const baseUrl           = 'http://dataservice.accuweather.com';
const searchLocation    = 'san';

const getWeather = async (locationSearch) => {
    fetch(`${baseUrl}/locations/v1/cities/search/?apikey=${apikey}&q=${locationSearch}&language=en-us&details=false`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error en la peticion");
        }
    })
    .then(response => {
        console.log(response);

        response.forEach(async element => {
            let idLocation  = element.Key;
            let location    = element.LocalizedName;
            let state       = element.AdministrativeArea.LocalizedName;
            let country     = element.Country.LocalizedName;
            
            await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${idLocation}/?apikey=${apikey}&details=true`)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                let humedades = [];

                response.forEach(element => {
                    let temp        = element.Temperature.Metric.Value;
                    let unitTemp    = element.Temperature.Metric.Unit;
                    let weatherText = element.WeatherText;
                    let humidity    = element.RelativeHumidity;

                    humedad.push(humidity);

                    console.log(`- El tiempo en [${location}, ${state}, ${country}]: ${temp}º${unitTemp} / ${weatherText} / Humedad: ${humidity}`);
                });

                let totalRegs   = humedades.length;
                humedadProm     = humedades.reduce((previous, current) => current+= previous);
                humedadProm     /= totalRegs;

                console.log(`- La Humedad Promedio es: ${humedadProm}`);
            })
        });
    })
}

getWeather(searchLocation);

console.log('- App finished...');
