
const container = document.querySelector(".container");
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input')
const moon = document.querySelector('.moon')

let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', () => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
})


function renderCountries(data) {


    container.innerHTML = ""

    data.forEach(country => {


        const cards = document.createElement("a")
        cards.classList.add("cards");
        cards.href = `/country.html?name=${country.name.common}`

        //adding the countries page. ${} gives us the name of the counrty card which is clicked.

        // const cardImg = document.createElement("img");
        // cardImg.src = "https://flagcdn.com/is.svg";
        // cards.append(cardImg); //adding the img into the card after seperately making them.

        // this is too lengthy we will follow a different apporach.

        const cardHtml = `

            <img src="${country.flags.svg}" alt="flag ${country.name.common}">

            <div class="card-txt">
            <h3>${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString()}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>

`

        //?. = optional chaining, will only execute when its present.

        cards.innerHTML = cardHtml;
        container.append(cards);

    });


}



searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

moon.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        moon.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp; &nbsp;Light Mode';

        
    } else {
        moon.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp; &nbsp;Dark mode';
    }
})






