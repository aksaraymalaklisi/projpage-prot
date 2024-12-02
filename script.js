// Sidebar

const webMain = document.querySelectorAll('header, main, footer')
const sideMain = document.getElementById("odio")
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function navToggle() { // Queria entender if e else no JS. 
                                   //Isso provavelmente seria muito mais fácil ao trocar para uma pseudoclasse que poderia alternar os valores de um para outro.
    webMain.forEach(element => {
        if (element.style.marginLeft === "250px") { // Se o elemento da lista (header, main e footer) tiver 250px de margem na direita
            element.style.marginLeft = '0'; // então defina a sua margem para 0.
        } else { // Caso contrário
            element.style.marginLeft = '250px'; // defina para 200px.
        }
    });
    if (sideMain.style.width === "250px") { // Se o elemento (sidebar, com id = "odio") tiver 250px de largura (width)
        sideMain.style.width = '0'; // então defina a sua largura para 0.
    } else { // Caso contrário
        sideMain.style.width = '250px'; // defina para 200px.
    }
}

function navEscape() {
    webMain.forEach(element => {
        if (element.style.marginLeft === "250px") { // Se o elemento da lista (header, main e footer) tiver 250px de margem na direita
            element.style.marginLeft = '0'; // então defina a sua margem para 0.
            sideMain.style.width = '0'; // então defina a sua largura para 0.
        }
    });
}

// Acordeão

const acorde = document.getElementsByClassName("accordion") // Ele não puxa um nodelist igual o querySelectorAll.

Array.from(acorde).forEach(element => { // ??? Eu não sei como Array.from() funciona. Nodelist funciona, mas HTMLCollection  não deixa eu usar o array.
    element.addEventListener("click", function() { // Início da função. Cada elemento (botão) da array terá essa função atrelada a ele.
        element.classList.toggle('active');
        var acordeBox = element.nextElementSibling; // a var acordeText será o próximo parentesco do botão (nextElementSibling), que é uma caixa de texto (div).  Esse código pode ter me salvado de horas de sofrimento, meu Deus.
        if (acordeBox.style.display === "block") { 
            acordeBox.style.display = "none";
        } else {
            acordeBox.style.display = "block";
        }
    }); // Fim da função do elemento da array.
});

// Testando...

function loadGPX(file) {
    return new Promise((resolve, reject) => {
        const gpxLayer = new L.GPX(file, {
            async: true,
            marker_options: {
                shadowUrl: null 
            }
        }).on('addline', function(event) {
            const latLngs = event.line.getLatLngs();
            gpxLayer.line = event.line;
            resolve(gpxLayer);
        }).on('error', function(e) {
            reject(`Error loading file: ${file}`);
        }).addTo(map);
    });
}

const map = L.map('map').setView([-22.973390, -43.02463], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let count = 1;
const gpxArray = [];

async function loadPath() {
    const file = `markers/file${count}.gpx`;
    console.log(`Trying to load: ${file}`);

    try {
        const gpxLayer = await loadGPX(file);
        console.log(`Successfully loaded file ${count}.gpx`);
        gpxArray.push(gpxLayer);

        const latLngs = gpxLayer.line.getLatLngs();

        if (latLngs.length > 0) {
            const startLatLng = latLngs[0];
            const marker = L.marker(startLatLng).addTo(map);

            marker.on('click', () => {
                if (gpxLayer.line) {
                    if (map.hasLayer(gpxLayer.line)) {
                        map.removeLayer(gpxLayer.line);
                    } else {
                        map.addLayer(gpxLayer.line);
                    }
                }
            });
        }

        count++;
        loadPath(); 
    } catch (error) {
        console.log(error);
        console.log('Finished loading.');
    }
}

loadPath();

const apiKey = "320f1bd9cbfa69270e808018b406ab52"; // Substitua pela sua chave de API
const city = "Maricá,BR";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const { main, weather, wind } = data;
            const weatherContainer = document.getElementById('weather');

            weatherContainer.innerHTML = `
                <p><strong>Temperatura:</strong> ${main.temp} °C</p>
                <p><strong>Condição:</strong> ${weather[0].description}</p>
                <p><strong>Umidade:</strong> ${main.humidity}%</p>
                <p><strong>Vento:</strong> ${wind.speed} m/s</p>
            `;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('weather').textContent = "Erro ao obter dados do clima.";
        console.error(error);
    }
}

fetchWeather()