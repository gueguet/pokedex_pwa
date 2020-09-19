// -------------- service worker ---------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((resp) => console.log("Service Worker correctly registered ! ", resp))
    .catch((error) => console.log("Error with Service Worker registration ! ",error))
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
  .then(function(registration) {
    pokeToSeach = 1;
    getPoke();
    getAllPokemon();
  });
}


window.addEventListener('online', () => console.log('came online'));
window.addEventListener('offline', () => console.log('came offline'));


// -------------- poke api ---------------

// retrieve pokemon data
var apiData = {
  url: 'https://pokeapi.co/api/v2/',
  type: 'pokemon',
  id: '1'
}

// data we want to store in cache for offline use
var numOfPokeToSave = 151;
var pokeToSeach = 0;

let { url, type, id } = apiData;
let apiUrl = `${url}${type}/${id}`


// user button to launch the research of the pokemon
function getPoke() {
  id = pokeToSeach;
  let apiUrl = `${url}${type}/${id}`;

  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => displayPoke(poke))
    .catch((err) => console.log(err))
}

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
  document.querySelector('.poke-name').innerHTML = data.name.toUpperCase();
  document.querySelector("#poke-id").innerHTML = `N° ${pokeToSeach}`;

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
    document.querySelector('.poke-type-two').style.display = "none";
  }

  document.querySelector(".poke-weight").innerHTML = data.weight + " dm";
  document.querySelector(".poke-height").innerHTML = data.height + " hg";


  document.querySelector("#hp-value").innerHTML = data.stats[0].base_stat;
  document.querySelector("#hp-bar").style.width = data.stats[0].base_stat + 'px';

  document.querySelector("#attack-value").innerHTML = data.stats[1].base_stat;
  document.querySelector("#attack-bar").style.width = data.stats[1].base_stat + 'px';

  document.querySelector("#defense-value").innerHTML = data.stats[2].base_stat;
  document.querySelector("#defense-bar").style.width = data.stats[2].base_stat + 'px';

  document.querySelector("#special-attack-value").innerHTML = data.stats[3].base_stat;
  document.querySelector("#special-attack-bar").style.width = data.stats[3].base_stat + 'px';

  document.querySelector("#special-defense-value").innerHTML = data.stats[4].base_stat;
  document.querySelector("#special-defense-bar").style.width = data.stats[4].base_stat + 'px';

  document.querySelector("#speed-value").innerHTML = data.stats[5].base_stat;
  document.querySelector("#speed-bar").style.width = data.stats[5].base_stat + 'px';
  
  // long and nasty... stats
  if (data.stats[0].base_stat <= 50) {
    
    document.querySelector("#hp-bar").classList.remove("orange-style");
    document.querySelector("#hp-bar").classList.remove("green-style");
    document.querySelector("#hp-bar").classList.add("red-style");
  } 
  if (data.stats[0].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#hp-bar").classList.remove("red-style");
    document.querySelector("#hp-bar").classList.remove("green-style");
    document.querySelector("#hp-bar").classList.add("orange-style");
  }
  if (data.stats[0].base_stat >= 100) {
    document.querySelector("#hp-bar").classList.remove("red-style");
    document.querySelector("#hp-bar").classList.remove("orange-style");
    document.querySelector("#hp-bar").classList.add("green-style");
  }

  if (data.stats[1].base_stat <= 50) {
    
    document.querySelector("#attack-bar").classList.remove("orange-style");
    document.querySelector("#attack-bar").classList.remove("green-style");
    document.querySelector("#attack-bar").classList.add("red-style");
  } 
  if (data.stats[1].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#attack-bar").classList.remove("red-style");
    document.querySelector("#attack-bar").classList.remove("green-style");
    document.querySelector("#attack-bar").classList.add("orange-style");
  }
  if (data.stats[1].base_stat >= 100) {
    document.querySelector("#attack-bar").classList.remove("red-style");
    document.querySelector("#attack-bar").classList.remove("orange-style");
    document.querySelector("#attack-bar").classList.add("green-style");
  }

  if (data.stats[2].base_stat <= 50) {
    
    document.querySelector("#defense-bar").classList.remove("orange-style");
    document.querySelector("#defense-bar").classList.remove("green-style");
    document.querySelector("#defense-bar").classList.add("red-style");
  } 
  if (data.stats[2].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#defense-bar").classList.remove("red-style");
    document.querySelector("#defense-bar").classList.remove("green-style");
    document.querySelector("#defense-bar").classList.add("orange-style");
  }
  if (data.stats[2].base_stat >= 100) {
    document.querySelector("#defense-bar").classList.remove("red-style");
    document.querySelector("#defense-bar").classList.remove("orange-style");
    document.querySelector("#defense-bar").classList.add("green-style");
  }

  if (data.stats[3].base_stat <= 50) {
    
    document.querySelector("#special-attack-bar").classList.remove("orange-style");
    document.querySelector("#special-attack-bar").classList.remove("green-style");
    document.querySelector("#special-attack-bar").classList.add("red-style");
  } 
  if (data.stats[3].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#special-attack-bar").classList.remove("red-style");
    document.querySelector("#special-attack-bar").classList.remove("green-style");
    document.querySelector("#special-attack-bar").classList.add("orange-style");
  }
  if (data.stats[3].base_stat >= 100) {
    document.querySelector("#special-attack-bar").classList.remove("red-style");
    document.querySelector("#special-attack-bar").classList.remove("orange-style");
    document.querySelector("#special-attack-bar").classList.add("green-style");
  }

  if (data.stats[4].base_stat <= 50) {
    
    document.querySelector("#special-defense-bar").classList.remove("orange-style");
    document.querySelector("#special-defense-bar").classList.remove("green-style");
    document.querySelector("#special-defense-bar").classList.add("red-style");
  } 
  if (data.stats[4].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#special-defense-bar").classList.remove("red-style");
    document.querySelector("#special-defense-bar").classList.remove("green-style");
    document.querySelector("#special-defense-bar").classList.add("orange-style");
  }
  if (data.stats[4].base_stat >= 100) {
    document.querySelector("#special-defense-bar").classList.remove("red-style");
    document.querySelector("#special-defense-bar").classList.remove("orange-style");
    document.querySelector("#special-defense-bar").classList.add("green-style");
  }

  if (data.stats[5].base_stat <= 50) {
    
    document.querySelector("#speed-bar").classList.remove("orange-style");
    document.querySelector("#speed-bar").classList.remove("green-style");
    document.querySelector("#speed-bar").classList.add("red-style");
  } 
  if (data.stats[5].base_stat > 50 && data.stats[0].base_stat < 100) {
    
    document.querySelector("#speed-bar").classList.remove("red-style");
    document.querySelector("#speed-bar").classList.remove("green-style");
    document.querySelector("#speed-bar").classList.add("orange-style");
  }
  if (data.stats[5].base_stat >= 100) {
    document.querySelector("#speed-bar").classList.remove("red-style");
    document.querySelector("#speed-bar").classList.remove("orange-style");
    document.querySelector("#speed-bar").classList.add("green-style");
  }





  data.moves.forEach(elt => {
    document.querySelector("#list-moves").innerHTML += `<h5>${elt.move.name}</h5>`;
  })






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

    document.querySelector("#download-state").innerHTML = `${id}/151`
  }

  // when all poke data and poke pic are downloaded --> say it to the user
  document.querySelector("#cache-status").innerHTML = "You can begin your adventure offline !";
  document.querySelector("#poke-loader").style.display = "none";

}


// prev and next
const prevPoke = () => {
  if (pokeToSeach >= 2) {
    pokeToSeach --;
    document.querySelector("#poke-id").innerHTML = `N° ${pokeToSeach}`;
    getPoke();
  }
}

const nextPoke = () => {
  if (pokeToSeach <= 150) {
    pokeToSeach ++;
    document.querySelector("#poke-id").innerHTML = `N° ${pokeToSeach}`;
    getPoke();
  }
}


// change sprite of the pokemon --> to back
const backPic = () => {
  id = pokeToSeach;
  let apiUrl = `${url}${type}/${id}`
  
  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => document.querySelector('.poke-image').src = poke.sprites.back_default)
    .catch((err) => console.log(err))
}

// change sprite of the pokemon --> to front
const frontPic = () => {
  id = pokeToSeach;
  let apiUrl = `${url}${type}/${id}`
  
  fetch(apiUrl)
    .then((data) => data.json())
    .then((poke) => document.querySelector('.poke-image').src = poke.sprites.front_default)
    .catch((err) => console.log(err))
}



// pokemon speech 
// I didn't see any general description of pokemon with the PokeAPI... Need to laod it from a json
const descriptionToSpeech = () => {

  fetch("/data/poke_desc.json")
    .then((resp) => resp.json())
    .then((json) => {
      if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = json[pokeToSeach - 1].description;
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


  outputHtml(matches);  
}


// display possibilities in html
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches.map(
      match => `<div class="poke-suggestions" onclick=putNameHtml("${match.name}","${match.id}")>${match.name}</div>`
    )
    .join('');

    matchList.innerHTML = html;
  }
}



const putNameHtml = (pokeNameToSearch, pokeIdToSearch) => {
  document.getElementById("search").value = pokeNameToSearch;
  document.getElementById("match-list").style.display = "None";
  pokeToSeach = pokeIdToSearch;
}

search.addEventListener('input', () => {
  document.getElementById("match-list").style.display = "Block";
  searchPoke(search.value);
});

search.addEventListener('click', () => {
  document.getElementById("match-list").style.display = "Block";
  searchPoke(search.value);
});

search.addEventListener('input', () => {
  searchPoke(search.value);

});





