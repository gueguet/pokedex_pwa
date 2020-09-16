if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((resp) => console.log("Service Worker correctly registered ! ", resp))
    .catch((error) => console.log("Error with Service Worker registration ! ",error))
}


// retrieve pokemon data
var apiData = {
  url: 'https://pokeapi.co/api/v2/',
  type: 'pokemon',
  id: '1'
}


const getPokemonById = async (id) => {
  const urlPokeData = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const urlPokePic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


  Promise.all([fetch(urlPokeData), fetch(urlPokePic)]).then((values) => {
    console.log(values);
  });



  // const res = await fetch(url);
  // const pokemon = await res.json();

};

function getData() {
  let firstAPICall = fetch("https://api.endpoint.com/first");
  let secondAPICall = fetch("https://api.endpoint.com/second");


}



// get all pokemon at the beginning to be able to retrieve the info offline via cache storage //
const getAllPokemon = async () => {
  for (let i = 1; i <= 151; i++) {
    await getPokemonById(i);
  }
} 


function test() {
  let pokeNumber = document.getElementById("pokemon_number").value;
  console.log(pokeNumber);
  apiData.id = pokeNumber;
  
  let { url, type, id } = apiData;
  let apiUrl = `${url}${type}/${id}`

  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => displayPoke(poke))
    .catch((err) => console.log(err))
}


const displayPoke = (data) => {
  console.log(data);
  const html = `
    <div class="name">${data.name}</div>
    <img src=${data.sprites.front_default}>
    <div class="details">
      <span>Height : ${data.height}</span>
    </div>
  `

  const pokeDiv = document.querySelector('.pokemon');
  pokeDiv.innerHTML = html;
}

