let pokemons = [
  {
    name: 'Bulbasaur',
    id: '001',
    sprite: 'assets/images/001.png',
    description:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  {
    name: 'Ivysaur',
    id: '002',
    sprite: 'assets/images/002.png',
    description:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON',
    url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
  },
  {
    name: 'Venusaur',
    id: '003',
    sprite: 'assets/images/003.png',
    description:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON',
    url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
  },
];

const pokemonList = document.querySelector('#main-display .pokemon-list');
const pokemonDetails = document.querySelector('#main-display .pokemon-details');

function setPokemonList() {
  pokemonDetails.innerHTML = '';
  pokemonList.innerHTML = '';
  activePokemonList();

  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    pokemonList.innerHTML += `
    <li>
    <button onclick="setPokemonDetails('${pokemon.id}')"><span> ${pokemon.id}</span> ${pokemon.name}</button>
    </li>
    `;
  }
}

function activePokemonList() {
  pokemonList.classList.add('active');
  pokemonDetails.classList.remove('active');
}

function setPokemonDetails(pokemonId) {
  pokemonList.classList.remove('active');
  pokemonDetails.classList.add('active');

  const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);

  if (pokemon) {
    fetch(pokemon.url).then(async (response) => {
      let data = await response.json();

      let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
      let description = data.flavor_text_entries.find(
        (item) => item.language.name === 'en'
      ).flavor_text;

      pokemon.sprite = sprite;
      pokemon.description = description;

      pokemonDetails.innerHTML = ` 
      <img src="${pokemon.sprite}" alt=" ${pokemon.name}" />
             
      <p class="details"> ${pokemon.description}</p>
      
      <section class="bar">
      <button class="back-button" onclick="activePokemonList()">&lt;</button>
        <h3><span> #${pokemon.id}</span> ${pokemon.name}</h3>
      </section>
      `;
    });
  }
}

function start() {
  // https://pokeapi.co/api/v2/pokemon?limit=2000
  // https://pokeapi.co/api/v2/pokemon-species/1/

  fetch('https://pokeapi.co/api/v2/pokemon-species?limit=2000').then(
    async (response) => {
      let data = await response.json();

      pokemons = data.results.map((pokemon) => {
        let name = pokemon.name.replace('-', ' ');
        let splitedUrl = pokemon.url.split('/').filter((part) => part != '');
        let id = splitedUrl[splitedUrl.length - 1].padStart(3, '0');

        return {
          id: id,
          name: name,
          url: pokemon.url,
        };
      });

      setPokemonList();
    }
  );

  setPokemonList();
}

start();
