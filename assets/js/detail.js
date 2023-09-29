const pokemonId = sessionStorage.getItem('id');
const pokemonSection = document.querySelector('.pokemon-section');
const contentDetailElement = document.querySelector('.content-detail');
const infoOptions = document.querySelectorAll('.info-selection');
let indexOption = 0;

let pokemonDetail;

const handleTypes = types => {
  contentDetailElement.classList.add(types[0].type.name);

  let type = types
    .map(
      type => `<li class="detail-type ${type.type.name}">${type.type.name}</li>`
    )
    .join('');

  return type;
};

const showPokemon = pokemon => {
  pokemonSection.innerHTML = `
  <h2>${pokemon.name}</h2>
  <span class="pokemon-id">#${pokeApi.convertPokemonId(pokemon.id)}</span>
  <ul class="detail-types types">
  ${handleTypes(pokemon.types)}
  </ul>
  <figure>
    <img
      src="${pokemon.sprites.other.dream_world.front_default}"
      alt="${pokemon.name}"
    />`;
};

const showInfo = (index, pokemon) => {
  const infoContent = document.querySelector('.info-content');
  const selectedInfo = infoOptions[index];

  infoOptions.forEach((info, idx) => {
    info.classList.toggle('selected', idx === index);
  });

  infoContent.innerHTML = '';
  if (index === 0) {
    const aboutInfo = [
      { label: 'name', value: pokemon.name },
      { label: 'height', value: pokemon.height },
      { label: 'weight', value: pokemon.weight },
      { label: 'order', value: pokemon.order },
      { label: 'base experience', value: pokemon.base_experience }
    ];

    aboutInfo.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('about');
      div.innerHTML = `<span>${item.label}</span><p>${item.value}</p>`;
      infoContent.appendChild(div);
    });
  } else if (index === 1) {
    pokemon.stats.forEach(pokestat => {
      const div = document.createElement('div');
      div.classList.add('stats');
      div.innerHTML = `
        <span class="stat-name">${pokestat.stat.name}</span>
        <span class="stat-value">${pokestat.base_stat}</span>
        <div class="stat-bar-container">
          <div class="stat-bar ${
            pokestat.base_stat >= 50 ? 'green-stat' : 'red-stat'
          }" style="width: ${pokestat.base_stat}%;"></div>
        </div>`;
      infoContent.appendChild(div);
    });
  }
};

infoOptions.forEach((info, index) => {
  info.addEventListener('click', () => {
    indexOption = index;
    showInfo(indexOption, pokemonDetail);
  });
});

pokeApi
  .getPokemonDetail(pokemonId)
  .then(pokemon => {
    pokemonDetail = pokemon;
    showPokemon(pokemon);
    showInfo(indexOption, pokemonDetail);
  })
  .catch(error => {
    console.error(error);
  });
