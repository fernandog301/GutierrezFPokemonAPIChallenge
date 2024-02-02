import {
  saveToLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./localStorage.js";

let favoritesBtn = document.getElementById("favoritesBtn");
let pokemonTxt = document.getElementById("pokemonTxt");
let pokemonId = document.getElementById("pokemonId");
let EvolutionaryTxt = document.getElementById("EvolutionaryTxt");
let elementTxt = document.getElementById("elementTxt");
let locationTxt = document.getElementById("locationTxt");
let possibleAbilitiesTxt = document.getElementById("possibleAbilitiesTxt");
let possibleMovesTxt = document.getElementById("possibleMovesTxt");
let randomPokemonBtn = document.getElementById("randomPokemonBtn");
let SearchInput = document.getElementById("SearchInput");
let pokemonImg = document.getElementById("pokemonImg");
let getfavoritesBtn = document.getElementById("getfavoritesBtn");
let starBtn = document.getElementById("starBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");
let defaultImg;
let cardShinnyImg;

starBtn.addEventListener("click", () => {

    let favorites = getLocalStorage();
  if(!favorites.includes(pokemon.name)){
    saveToLocalStorage(pokemon.name);
  }else{
    removeFromLocalStorage(pokemon.name);
  }
});

// if (getfavoritesBtn) {
  getfavoritesBtn.addEventListener("click", () => {
    
    // This retrieves our data from local storage and stores it into the favorites variable

    let favorites = getLocalStorage();

    getFavoritesDiv.textContent = "";

    //map through each element in our array
    favorites.map((pokeName) => {
      console.log(pokeName);

      let p = document.createElement("p");
      //creating a p-log dyamically        let p = document.createElement('p');
      p.textContent = pokeName;

      // className replaces all classes with out new classes
      p.className = "text-lg font-medium text-gray-900 dark:text-white";

      //Creating a button
      let button = document.createElement("button");

      button.type = "button";
      button.textContent = "x";

      //classList Allows us to be a little more comics it doesn't replace all classes.
      button.classList.add(
        "text-gray-400",
        "bg-transparent",
        "hover:bg-gray-200",
        "hover:text-gray-900",
        "rounded-lg",
        "text-sm",
        "w-8",
        "h-8",
        "justify-end",
        "dark:hover:bg-gray-600",
        "dark:hover:text-white"
      );

      //creating a addeventListener for our button which remove digimon from our favorites
      button.addEventListener("click", () => {
        removeFromLocalStorage(pokeName);
        p.remove();
      });

      //append our buttons to our p-tag
      p.append(button);

      //apprending out p-tag to our favoritesDiv
      getFavoritesDiv.append(p);
    });
  });



let pokemon = "";

const pokemonApi = async (pokemon) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await promise.json();
  console.log(data);
  return data;
};

// const function locationApi(loc){
//     pokemon = await pokemonApi(event.target.value);

// }

// favoriteBtn.addEventListener("click",  () => {
//     saveToLocalStorage(pokemon[0].name);
// });




randomPokemonBtn.addEventListener("click", async () => {
  let RandomNum = Math.floor(Math.random() * 649);
  pokemon = await pokemonApi(RandomNum);

  console.log(pokemon);
  pokemonIdTxt.textContent = "#" + pokemon.id;
  pokemonTxt.textContent = pokemon.name;
  defaultImg = pokemon.sprites.other["official-artwork"].front_default;
  cardShinnyImg = pokemon.sprites.other["official-artwork"].front_shiny;
  pokemonImg.src = defaultImg;

  // elementTxtTxt.textContent = "element: " + pokemon. ;
  // console.log(pokemon.moves[0].move)
  // pokemon.moves.forEach(move => {
  //     // let name = move.name
  //     console.log(move)
  // });
  console.log(pokemon.species.url);
  const spec = await fetch(pokemon.species.url);
  const species = await spec.json();


  console.log(species);
  const getspec = await fetch(species.evolution_chain.url);
  const getspecies = await getspec.json();
    console.log(getspecies);
    EvolutionaryTxt.textContent = "Evolutionary Paths : " + getspecies.chain.species.name + " > " + getspecies.chain.evolves_to[0].species.name + " > " + getspecies.chain.evolves_to[0].evolves_to[0].species.name;
  // .chain.evolves_to[0].evolution_details.map(species => species.name)

//   console.log(getspecies);
//   EvolutionaryTxt.textContent =
//     "Evolutionary Paths : " +
//     getspecies.chain.evolves_to
//       .map((evolves_to) => evolves_to.species.name)
//       .join(" > ");

  // document.getElementById("cardShinnyImg").addEventListener("click", async () => {
  //     cardShinnyImg.src = pokemon.sprites.front_shiny
  // console.log(pokemon.sprites.front_shiny)
  // });

  console.log(pokemon.location_area_encounters);
  // locationTxt.textContent = "location from game : " + pokemon.location_area_encounters;

  const locat = await fetch(pokemon.location_area_encounters);
  const location = await locat.json();
  if(location.legth ==0){
  locationTxt.textContent = "N/A";
  }else{
    locationTxt.textContent =
    "Location from game : " + location[0].location_area.name.split("-").join(" ");
  }

  possibleMovesTxt.textContent =
    "Possible Moves : " +
    pokemon.moves.map((moves) => moves.move.name).join(", ");
  elementTxt.textContent =
    "Element Type : " + pokemon.types.map((types) => types.type.name).join(" ");
  const ablilityNames = pokemon.abilities.map(ability => ability.ability.name).join(", ").split("-");
    possibleAbilitiesTxt.textContent = "Possible abilities : " + ablilityNames.join(" ");

});

pokemonImg.addEventListener('click', () => {
    if(pokemonImg.src == defaultImg){
        pokemonImg.src = cardShinnyImg;
    }else{
        pokemonImg.src = defaultImg;
    };
});

SearchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    pokemon = await pokemonApi(event.target.value);
    if(pokemon.id > 649){
        alert("Please enter pokemon generations from 1-5 at this time.");
      }else{
    pokemonTxt.textContent = pokemon.name;
    pokemonIdTxt.textContent = "#" + pokemon.id;
    defaultImg = pokemon.sprites.other["official-artwork"].front_default;
  cardShinnyImg = pokemon.sprites.other["official-artwork"].front_shiny;
  pokemonImg.src = defaultImg;
    // elementTxtTxt.textContent = "element: " + pokemon. ;
    const spec = await fetch(pokemon.species.url);
    const species = await spec.json();
    console.log(species);
    const getspec = await fetch(species.evolution_chain.url);
    const getspecies = await getspec.json();
    // .chain.evolves_to[0].evolution_details.map(species => species.name)
    EvolutionaryTxt.textContent = "Evolutionary Paths : " + getspecies.chain.species.name + " > " + getspecies.chain.evolves_to[0].species.name + " > " + getspecies.chain.evolves_to[0].evolves_to[0].species.name;

    // pokemon.moves.forEach(move => {
    //     // let name = move.name
    //     console.log(move)
    // });

    console.log(pokemon.location_area_encounters);
    // locationTxt.textContent = "location from game : " + pokemon.location_area_encounters;

    const locat = await fetch(pokemon.location_area_encounters);
  const location = await locat.json();
  if(location.legth ==0){
  locationTxt.textContent = "N/A";
  }else{
    locationTxt.textContent =
    "Location from game : " + location[0].location_area.name.split("-").join(" ");
  }

  possibleMovesTxt.textContent =
    "Possible Moves : " +
    pokemon.moves.map((moves) => moves.move.name).join(", ");
  elementTxt.textContent =
    "Element Type : " + pokemon.types.map((types) => types.type.name).join(" ");
  const ablilityNames = pokemon.abilities.map(ability => ability.ability.name).join(", ").split("-");
    possibleAbilitiesTxt.textContent = "Possible abilities : " + ablilityNames.join(" ");
  }
  }
});
