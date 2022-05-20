/**
 * Name: Ray Oh
 * Date: May 5, 2022
 * Section: CSE 154 AE
 * This is the javascript file that controls the functionality of my pokedex website. It adds
 * interactivity by having 4 buttons corresponding to the 4 different pokemon regions, and clicking
 * on any one of the buttons will use fetch to list out all the pokemon of that region.
 */

"use strict";
(function() {
  const firstKantoPokemon = 1;
  const lastKantoPokemon = 151;
  const firstJhotoPokemon = 152;
  const lastJhotoPokemon = 251;
  const firstHoennPokemon = 252;
  const lastHoennPokemon = 386;
  const firstSinnohPokemon = 387;
  const lastSinnohPokemon = 493;

  const colors = {
    fire: "rgb(206, 104, 104)",
    grass: "rgb(83, 226, 114)",
    water: "rgb(100, 122, 219)",
    normal: "rgb(238, 222, 180)",
    flying: "rgba(248, 234, 213, 0.699))",
    bug: "rgba(153, 151, 54, 0.897)",
    poison: "purple",
    electric: "rgb(217, 226, 81)",
    ground: "rgb(168, 122, 35)",
    rock: "rgb(97, 67, 10)",
    fighting: "rgba(160, 17, 17, 0.699)",
    psychic: "pink",
    ghost: "rgb(104, 36, 121)",
    dark: "rgb(58, 57, 57)",
    steel: "rgb(165, 163, 163)",
    fairy: "rgb(196, 84, 177)",
    dragon: "rgb(0, 4, 250)",
    ice: "lightblue"
  };
  const types = Object.keys(colors);
  window.addEventListener("load", init);

  /**
   * Will run once the page finishes loading. It sets up event listeners for the website buttons.
   */
  function init() {
    document.getElementById("kanto-btn").addEventListener("click", getRegionsPokemon);
    document.getElementById("jhoto-btn").addEventListener("click", getRegionsPokemon);
    document.getElementById("hoenn-btn").addEventListener("click", getRegionsPokemon);
    document.getElementById("sinnoh-btn").addEventListener("click", getRegionsPokemon);
    document.getElementById("favorite-btn").addEventListener("click", fetchFavoritePokemon);
    document.getElementById("addfavorite-btn").addEventListener("click", fetchSpecificPokemon);
  }

  /**
   * This function loops through all the pokedex numbers of a certain region and calls fetch to
   * display all the pokemon of that region
   */
  function getRegionsPokemon() {
    let firstPokemon;
    let lastPokemon;

    let pokemonContainer = document.getElementById("pokemon-container");
    while (pokemonContainer.hasChildNodes()) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    if (this.id === "kanto-btn") {
      firstPokemon = firstKantoPokemon;
      lastPokemon = lastKantoPokemon;
    } else if (this.id === "jhoto-btn") {
      firstPokemon = firstJhotoPokemon;
      lastPokemon = lastJhotoPokemon;
    } else if (this.id === "hoenn-btn") {
      firstPokemon = firstHoennPokemon;
      lastPokemon = lastHoennPokemon;
    } else if (this.id === "sinnoh-btn") {
      firstPokemon = firstSinnohPokemon;
      lastPokemon = lastSinnohPokemon;
    }

    for (let i = firstPokemon; i <= lastPokemon; i++) {
      fetchPokemon(i);
    }

  }

  /**
   * Fetches all the pokemon info from the pokemon API
   *  @param {object} pokedexNumber - uses the pokedexNumber of the pokemon to fetch the pokemon's
   * information.
   */
  function fetchPokemon(pokedexNumber) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokedexNumber)
      .then(statusCheck)
      .then(res => res.json())
      .then(createPokemonCard)
      .catch(handleError);
  }

  /**
   * Creates a card to display all the information regarding the pokemon - such as the pokemon's
   * image, pokemon's name, pokemon's type, and the pokemon's corresponding pokedex number.
   *  @param {object} pokemon - takes in the current pokemon and gets information/creates a card
   * for this pokemon
   */
  function createPokemonCard(pokemon) {
    let pokemonContainer = document.getElementById("pokemon-container");
    let pokemonEntry = document.createElement("div");
    pokemonEntry.classList.add("pokemon");

    let pokeTypes = pokemon.types.map(temp => temp.type.name);
    let type = types.find(temp => pokeTypes.indexOf(temp) > -1);
    pokemonEntry.style.backgroundColor = colors[type];

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");
    pokemonEntry.appendChild(imageContainer);

    let image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    imageContainer.appendChild(image);

    let info = document.createElement("div");
    info.classList.add("info");
    pokemonEntry.appendChild(info);

    let infoNumber = document.createElement("p");
    infoNumber.classList.add("number");
    infoNumber.innerText = pokemon.id.toString().padStart(3, "0");
    info.appendChild(infoNumber);

    let infoName = document.createElement("p");
    infoName.classList.add("name");
    infoName.innerText = pokemon.name;
    info.appendChild(infoName);

    let infoType = document.createElement("p");
    infoType.innerText = type;
    info.appendChild(infoType);

    pokemonContainer.appendChild(pokemonEntry);
  }

  /**
   * Fetches all our favorite pokemons' info from our pokemon API
   */
  function fetchFavoritePokemon() {
    fetch("/favorite")
      .then(statusCheck)
      .then(res => res.text())
      .then(showFavoritePokemon)
      .catch(handleError);
  }

  /**
   * Takes the list of pokemon returned from the API and displays them
   * @param {text} FAVORITE_POKEMON a list of favorite pokemon from our API
   */
  function showFavoritePokemon(FAVORITE_POKEMON) {
    let pokemonContainer = document.getElementById("pokemon-container");
    while (pokemonContainer.hasChildNodes()) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    let pokemon = FAVORITE_POKEMON.split("\n");
    for (let i = 0; i < pokemon.length; i++) {
      fetchPokemon(pokemon[i]);
    }
  }

  /**
   * Fetches a specific pokemon
   */
  function fetchSpecificPokemon() {
    let pokedexNumber = document.querySelector("input").value;
    if ((pokedexNumber > 0) && (pokedexNumber < 494)) {
      fetch("/specific?number=" + pokedexNumber)
        .then(statusCheck)
        .then(res => res.json())
        .then(showSpecificPokemon)
        .catch(handleError);
    }
  }

  /**
   * Takes the pokemon returned from the API and displays them
   * @param {text} specificPokemon the returned specific pokemon from our API
   */
  function showSpecificPokemon(specificPokemon) {
    let pokemonContainer = document.getElementById("pokemon-container");
    while (pokemonContainer.hasChildNodes()) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    let pokemon = specificPokemon.number;
    fetchPokemon(pokemon);

  }

  /**
   * A helper function that simply returns the response's result if it is ok, but will return the
   * rejected promise
   * @param {object} response - takes in a response and checks its status
   * @returns {object} - if valid, returns text. Otherwise, returns a rejected promise
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * In case of an error, this function display an error message to the user.
   *  @param {object} error - the error
   */
  function handleError(error) {
    let pokemonContainer = document.getElementById("pokemon-container");
    let errorText = document.createElement("p");
    errorText.innerText = "An error occurred:" + error;
    pokemonContainer.appendChild(errorText);
  }

})();
