// -------------- service worker ---------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((resp) => console.log("Service Worker correctly registered ! ", resp))
    .catch((error) => console.log("Error with Service Worker registration ! ",error))
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
  .then(function(registration) {
    console.log('A service worker is active:', registration.active);
    // begin download of all poke data in background
    getAllPokemon();
  });
}



// -------------- poke api ---------------

// retrieve pokemon data
var apiData = {
  url: 'https://pokeapi.co/api/v2/',
  type: 'pokemon',
  id: '1'
}

// data we want to store in cache for offline use
var numOfPokeToSave = 60;


// user button to launch the research of the pokemon
function searchPoke() {
  let pokeNumber = document.getElementById("pokemon_number").value;
  apiData.id = pokeNumber;
  
  let { url, type, id } = apiData;
  let apiUrl = `${url}${type}/${id}`

  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => displayPoke(poke))
    .catch((err) => console.log(err))
}


// display asked pokemon on the pokedex screen
const displayPoke = (data) => {

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


// get all pokemon data to be able to retrieve the info offline via cache storage 
const getAllPokemon = async () => {

  for (id = 1; id < numOfPokeToSave; id++) {
    const urlPokeData = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resPokeData = await fetch(urlPokeData);
    const pokemonData = await resPokeData.json();
    // console.log(pokemonData);

    const urlPokePic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const resPokePic = await fetch(urlPokePic);
    const pokemonPic = await resPokePic;
    // console.log(pokemonPic);
  }

  // when all poke data and poke pic are downloaded --> say it to the user
  document.querySelector("#cache-status").innerHTML = "Data from Kanto downloaded in the pokedex !";
}




