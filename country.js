const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector('.country-details img');
const countryNaam = document.querySelector(".country-txt > h1");

const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-Country')

const moon = document.querySelector('.moon')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
    .then(([country]) => {
        console.log(country);

        flagImg.src = country.flags.svg;
        countryNaam.innerText = country.name.common;
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        topLevelDomain.innerText = country.tld.join(', ')



        if (country.capital) {
            capital.innerText = country.capital?.[0]
        }

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ')
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry)

                        const countryBorderTab = document.createElement('a');
                        countryBorderTab.innerText = borderCountry.name.common
                        countryBorderTab.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(countryBorderTab);


                    });
            });

        }

        moon.addEventListener('click', () => {
            document.body.classList.toggle('dark')
            if (document.body.classList.contains('dark')) {
                moon.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp; &nbsp;Light Mode';
        
                
            } else {
                moon.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp; &nbsp;Dark mode';
            }
        })
    });
