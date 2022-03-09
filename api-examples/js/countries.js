const loadCountries = () => {
    fetch('https://restcountries.com/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries();

const displayCountries = countires => {
    //     for (const country of countires) {
    //         console.log(country);
    //     }
    const countiresDiv = document.getElementById('countries');
    countires.forEach(country => {
        // console.log(country);
        const div = document.createElement('div');
        div.classList.add('country')
        div.innerHTML = `
        <h3>${country.name}</h3>
        <p> ${country.capital} </p>
        <!-- set dinamic function parameter-->
        <button onclick="loadCountryByName('${country.name}')"> Details </button>

        `;
        countiresDiv.appendChild(div);

        /*   const h3 = document.createElement('h3');
          h3.innerText = country.name;
          div.appendChild(h3);
          const p = document.createElement('p');
          p.innerText = country.capital
          div.appendChild(p);
        countiresDiv.appendChild(div);*/
    });
}
const loadCountryByName = name => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data[0]));
}
const displayCountryDetail = country => {
    const countryDiv = document.getElementById('country-detail');
    countryDiv.innerHTML = `
      <h5> ${country.name.common} </h5>
      <p>population: ${country.population}</p>
      <img width="200px" src="${country.flags.png}">
      `;
    // console.log(country.name.common);
}