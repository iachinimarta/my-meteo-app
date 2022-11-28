// Seleziono i tag HTML che doranno poi essere modificati
const container = document.querySelector('.container');
const weatherIcon = document.querySelector('.icon');
const weatherLocation = document.querySelector('.location');
const weatherTemperature = document.querySelector('.temperature');
const weatherAdvise = document.querySelector('.advise');

// Mi salvo l'endpoint dell'API
const endpoint = 'https://api.openweathermap.org/data/2.5/weather';

//Funzione per recuperare la posizione, accetta due funzioni come parametri
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

// Imposto la Funzione 1 in caso di successo
function onSuccess(position) {

    // Salvo la latitudine ottenuta dalla funzione getCurrentPosition()
    let lat = position.coords.latitude;

    // Salvo la longitudine ottenuta dalla funzione getCurrentPosition()
    let lon = position.coords.longitude;

    // Salvo la API key che ho ottenuto dalla registrazione sul sito dell'API
    const apiKey = '7fd3dbb7e79ffac429432561bb728c54';

    // Imposto l'unità di misura della temperatura
    const units = 'metric';

    // Imposto la lingua della risposta da parte dell'APi
    const lang = 'en'; 

    // Imposto l'URI completo unendo tutti i dati recuperati in precedenza
    const apiUri = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;

    // Chiamata API
    fetch(apiUri)
        // Converto la prima risposta in formato JSON
        .then(function(response) {
            const data = response.json();
            return data;
        })
        // Modifico i tag HTML con le informazioni ottenute
        .then(function(data) {
            console.log(data);
            let iconCode = data.weather[0].icon;
            console.log(iconCode);
            weatherIcon.src = `images/${iconCode}.png`;
            weatherIcon.alt = data.weather[0].description;
            weatherLocation.innerText = data.name;
            weatherTemperature.innerHTML = Math.floor(data.main.temp) + `<span class="symbol">&#176;</span>`;
            weatherAdvise.innerText = data.weather[0].description;
        });

    // Rimuovo la classe loading dal container
    container.classList.remove('loading');
        
}

//Funzione 2 in caso di errore
function onError(error) {
    weatherLocation.innerHTML = 'Ops! <br> Si è verificato un problema.<br>Prova ad attivare la localizzazione!';

}



