const apiKey = "412e4b68ef7e0f64a1cab919d08543d0";

document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.querySelector("#city-input");
    const searchBtn = document.querySelector("#search");

    const cityElement = document.querySelector("#city");
    const tempElement = document.querySelector("#temperature span");
    const descElement = document.querySelector("#description");
    const weatherIconElement = document.querySelector("#weather-icon");
    const umidityElement = document.querySelector("#umidity span");
    const windElement = document.querySelector("#wind span");

    searchBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim(); // Adicionado trim() para remover espaços em branco
        if (city) {
            await showWeatherData(city);
        }
    });

    const showWeatherData = async (city) => {
        try {
            const data = await getWeatherData(city);

            if (data.cod !== 200) {
                cityElement.innerText = "Cidade não encontrada!";
                return;
            }

            cityElement.innerText = data.name;
            tempElement.innerText = parseInt(data.main.temp);
            descElement.innerText = data.weather[0].description;
            weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            umidityElement.innerText = `${data.main.humidity}%`;
            windElement.innerText = `${data.wind.speed}km/h`;
        } catch (error) {
            console.error("Erro ao buscar dados do tempo:", error);
            cityElement.innerText = "Erro ao buscar dados do tempo";
        }
    };

    const getWeatherData = async (city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL);
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.statusText}`);
        }
        const data = await res.json();

        return data;
    };
});
