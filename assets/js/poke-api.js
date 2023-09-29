const pokeApi = {};

const baseURL = 'https://pokeapi.co/api/v2/pokemon';

const convertPokeApiDetailToPokemon = pokeDetail => {
  const Pokemon = new pokemon();

  Pokemon.name = pokeDetail.name;
  Pokemon.id = pokeDetail.id;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;

  Pokemon.types = types;
  Pokemon.type = type;
  Pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

  return Pokemon;
};

pokeApi.getAllPokemonsDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset, limit) => {
  let URL = `${baseURL}?offset=${offset}&limit=${limit}`;

  return fetch(URL)
    .then(response => response.json())
    .then(response => response.results)
    .then(pokemons => pokemons.map(pokeApi.getAllPokemonsDetail))
    .then(pokemonRequests => Promise.all(pokemonRequests))
    .then(pokemonDetails => pokemonDetails)
    .catch(error => console.error(error));
};

pokeApi.getPokemonDetail = id => {
  let URL = `${baseURL}/${id}`;

  return fetch(URL).then(response => response.json());
};

pokeApi.convertPokemonId = id => {
  if (id >= 100) {
    return id;
  } else if (id >= 10) {
    return '0' + id;
  } else {
    return '00' + id;
  }
};
