const pokemonsOl = document.querySelector('.pokemons');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 20;
let offset = 0;

const maxRecords = 151;

const savePokemonIdOnSessionStorage = id => {
  sessionStorage.setItem('id', id);
};

const convertToLi = pokemon => {
  return `
  <li>
  <a onclick="savePokemonIdOnSessionStorage(${
    pokemon.id
  })" href="./assets/html/detail.html" class="pokemon ${pokemon.type}">
  <span class="pokemon-number ">#${pokeApi.convertPokemonId(pokemon.id)}</span>
  <span class="pokemon-name">${pokemon.name}</span>
  <div class="detail">
    <ol class="types">
      ${pokemon.types
        .map(type => `<li class="type ${type}">${type}</li>`)
        .join('')}
    </ol>
    <img
      src="${pokemon.image}"
      alt="${pokemon.name}"
    />
  </div>
  </a>
</li>
`;
};

const loadPokemonItens = (offset, limit) => {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemonsList = []) => {
      pokemonsOl.innerHTML += pokemonsList.map(convertToLi).join('');
    })
    .catch(error => console.error(error));
};

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
