const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" <li class="pokemon ${pokemon.type}" onclick='openModal(${JSON.stringify(pokemon)})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function getColorByType(type) {
    const colors = {
        normal: '#a6a877',
        grass: '#77c850',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7cf2e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7cf',
        dragon: '#6f38f6',
        fairy: '#f9aec7'
    };

    // Verifique se o tipo está no objeto e retorne a cor
    return colors[type] || '#fff'; // Retorna branco se o tipo não for encontrado
}


function openModal(pokemon) {

    document.getElementById('modalPokemonName').innerText = pokemon.name;
    document.getElementById('modalPokemonImage').src = pokemon.photo;
    document.getElementById('modalPokemonNumber').innerText = `#${pokemon.number}`;
    document.getElementById('modalPokemonTypes').innerText = `Types: ${pokemon.types.join(', ')}`;
    document.getElementById('modalPokemonHeight').innerText = `Height: ${pokemon.height} m`;
    document.getElementById('modalPokemonWeight').innerText = `Weight: ${pokemon.weight} kg`;
    document.getElementById('modalPokemonAbilities').innerText = `Abilities: ${pokemon.abilities.join(', ')}`;
    
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.style.backgroundColor = getColorByType(pokemon.types[0]);


    modal.style.display = 'block'; 
   
}

function closeModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none'; // Oculta o modal
}

