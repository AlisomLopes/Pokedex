// Elementos a serem alterados!
const pokemonImage = document.querySelector('#display>img.pokemon_img');
const pokemonName = document.querySelector('span.pokemon_name');
const pokemonNum = document.querySelector('span.pokemon_num');

//Elementos de interação do usuário
const el_form = document.querySelector('form');
const pokemonSerch = document.querySelector('form>input#pokemon_search');
const btnPrev = document.querySelector('.container_btns>#btn_prev');
const btnNext = document.querySelector('.container_btns>#btn_next');

let srchPokemonBtn = 1;

async function fetchPokemon(pokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    switch (APIResponse.status) {
        case 200:
            const data = await APIResponse.json();
            return data;
        case 404:
            return window.alert('Pokemon não encontrado! Tenha certeza de escrever o nome corretamente ou um número válido!');
        default:
            break;
    }
}

async function renderPokemon(pokemon) {
    pokemonName.textContent = '';
    pokemonNum.textContent = 'Loading...';

    return await fetchPokemon(pokemon).then((data) => {
        pokemonImage.setAttribute('src', whatImage(data)); 
        pokemonName.textContent = data.name;
        pokemonNum.textContent = data.id;
        srchPokemonBtn = data.id;
    }).catch((err) => console.log(err));
}
// data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
el_form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(pokemonSerch.value.toLowerCase());

    pokemonSerch.value = '';
});

btnPrev.addEventListener('click', (e) => {
    if (srchPokemonBtn === 1) {
        return;
    }
    srchPokemonBtn--;
    renderPokemon(srchPokemonBtn);

    pokemonSerch.value = '';
    return;
})
btnNext.addEventListener('click', (e) => {
    if (srchPokemonBtn === 1025) {
        return;
    }
    srchPokemonBtn++;
    renderPokemon(srchPokemonBtn);

    pokemonSerch.value = '';
    return;
});

//Teste para verificar se tem um gif do pokemon na API. Se não tiver, usara a imagem padrão
function whatImage(pokemon) {
    if (pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] === null) {
        pokemonImage.style.width = '110px';
        pokemonImage.style.height = '22%';
        return pokemon['sprites']['other']['home']['front_default'];
    }else{
        pokemonImage.style.width = '90px';
        pokemonImage.style.height = '20%';
        return pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
}

renderPokemon(srchPokemonBtn);