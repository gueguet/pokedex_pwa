// -------------- service worker ---------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((resp) => console.log("Service Worker correctly registered ! ", resp))
    .catch((error) => console.log("Error with Service Worker registration ! ",error))
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
  .then(function(registration) {
    // searchPoke();
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
var numOfPokeToSave = 151;
let { url, type, id } = apiData;
let apiUrl = `${url}${type}/${id}`

// user button to launch the research of the pokemon
// function searchPoke() {
//   // let pokeNumber = document.getElementById("pokemon_number").value;
//   id = pokeNumber;
//   let apiUrl = `${url}${type}/${id}`;

//   fetch(apiUrl)
//     .then((data) => data.json())
//     .then((poke) => displayPoke(poke))
//     .catch((err) => console.log(err))
// }

// types colors
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};




// display asked pokemon on the pokedex screen
const displayPoke = (data) => {
  document.querySelector('.poke-image').src = data.sprites.front_default;
  // document.querySelector('.poke-image').src = data.sprites.other["official-artwork"].front_default; // better pics but no front...
  document.querySelector('.poke-name').innerHTML = data.name;
  document.querySelector('.poke-id').innerHTML = "N°" + data.id;
  document.querySelector('.poke-type-one').innerHTML = data.types[0].type.name;
  const color = colors[data.types[0].type.name];
  document.querySelector('.poke-type-one').style.background = color;

  // second type
  if (data.types.length == 2) {
    document.querySelector('.poke-type-two').style.display = "block";
    document.querySelector('.poke-type-two').innerHTML = data.types[1].type.name;
    const color = colors[data.types[1].type.name];
    document.querySelector('.poke-type-two').style.background = color;
  }
  else {
    console.log("Only one type !");
    document.querySelector('.poke-type-two').style.display = "none";
  }
}


// get all pokemon data to be able to retrieve the info offline via cache storage 
const getAllPokemon = async () => {

  for (id = 1; id < numOfPokeToSave; id++) {
    const urlPokeData = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resPokeData = await fetch(urlPokeData);
    const pokemonData = await resPokeData.json();

    const urlPokePic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const resPokePic = await fetch(urlPokePic);
    const pokemonPic = await resPokePic;

    const urlPokePicBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    const resPokePicBack = await fetch(urlPokePicBack);
    const pokemonPicBack = await resPokePicBack;
  }

  // when all poke data and poke pic are downloaded --> say it to the user
  document.querySelector("#cache-status").innerHTML = "You can begin your adventure offline !";
  document.querySelector("#poke-loader").style.display = "none";

}


// prev and next
const prevPoke = () => {
  let pokeNumber = parseInt(document.getElementById("pokemon_number").value);
  if (2 <= pokeNumber <= 151) {
    document.getElementById("pokemon_number").value = pokeNumber - 1;
    searchPoke();
  }
}

const nextPoke = () => {
  let pokeNumber = parseInt(document.getElementById("pokemon_number").value);
  if (1 <= pokeNumber <= 150) {
    document.getElementById("pokemon_number").value = pokeNumber + 1;
    searchPoke();
  }
}


// change sprite of the pokemon --> to back
const backPic = () => {
  let pokeNumber = document.getElementById("pokemon_number").value;
  id = pokeNumber;
  let apiUrl = `${url}${type}/${id}`
  
  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => document.querySelector('.poke-image').src = poke.sprites.back_default)
    .catch((err) => console.log(err))
}

// change sprite of the pokemon --> to front
const frontPic = () => {
  let pokeNumber = document.getElementById("pokemon_number").value;
  id = pokeNumber;
  let apiUrl = `${url}${type}/${id}`
  
  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => document.querySelector('.poke-image').src = poke.sprites.front_default)
    .catch((err) => console.log(err))
}



// pokemon speech 
// I didn't see any general description of pokemon with the PokeAPI... Need to laod it from a json
const descriptionToSpeech = () => {

  let pokeNumber = document.getElementById("pokemon_number").value;

  fetch("/data/poke_desc.json")
    .then((resp) => resp.json())
    .then((json) => {
      if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = json[pokeNumber - 1].description;
        window.speechSynthesis.speak(msg);
      } else {
        alert("Sorry, your browser doesn't support text to speech!");
      }
    });
}


// search bar
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchPoke = async (searchText) => {
  const res = await fetch('/data/poke_desc.json');
  const pokemons = await res.json();

  // get the matches
  let matches = pokemons.filter(poke => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return poke.name.match(regex);
  }); 

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  if (matches.length === 0) {
    matchList.innerHTML = '';
  }

  console.log(matches);
  outputHtml(matches);  
}


// display possibilities in html
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches.map(
      match => `<div onclick=putNameHtml("${match.name}")>${match.name}</div>`
    )
    .join('');

    matchList.innerHTML = html;
  }
}



const putNameHtml = (pokeName) => {
  document.getElementById("search").value = pokeName;
}

search.addEventListener('input', () => searchPoke(search.value));





