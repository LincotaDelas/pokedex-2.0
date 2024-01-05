// Seleciona o elemento HTML com o ID "pokeContainer" e atribui à variável pokeContainer
const pokeContainer = document.querySelector("#pokeContainer");

// Define um objeto com cores associadas a tipos de Pokémon
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
}

// Obtém as chaves (tipos de Pokémon) do objeto colors e atribui à variável mainTypes
const mainTypes = Object.keys(colors);

// Função assíncrona que busca e cria cartas para todos os Pokémon
const fetchAllPokemons = async () => {
    try {
        // Obtém o número total de Pokémon disponíveis na API
        const totalPokemonCount = await getTotalPokemonCount();

        // Itera sobre todos os Pokémon e busca suas informações
        for (let i = 1; i <= totalPokemonCount; i++) {
            await getPokemon(i);
        }
    } catch (error) {
        console.error("Erro ao buscar dados dos Pokémon:", error);
    }
}

// Função assíncrona que obtém o número total de Pokémon disponíveis na API
const getTotalPokemonCount = async () => {
    // Faz uma requisição à API para obter dados sobre espécies de Pokémon
    const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=1';
    const response = await fetch(url);
    const data = await response.json();

    // Retorna o número total de Pokémon
    return data.count;
}

// Função assíncrona que busca informações sobre um Pokémon específico por ID
const getPokemon = async (id) => {
    try {
        // Obtém os dados do Pokémon com base no ID
        const pokemonData = await getPokemonData(id);

        // Cria uma carta para o Pokémon com os dados obtidos
        createPokemonCard(pokemonData);
    } catch (error) {
        console.error(`Erro ao buscar dados do Pokémon #${id}:`, error);
    }
}

// Função assíncrona que faz a requisição à API para obter dados de um Pokémon por ID
const getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados do Pokémon #${id}`);
    }

    // Retorna os dados do Pokémon em formato JSON
    return response.json();
}

// Função que cria uma carta (elemento HTML) para um Pokémon com base nos dados recebidos
const createPokemonCard = (poke) => {
    // Cria um elemento <div> para representar a carta do Pokémon
    const card = document.createElement('div');
    card.classList.add("pokemon");

    // Extrai informações relevantes do objeto poke
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, "0");
    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    // Define o fundo da carta com base no tipo do Pokémon
    card.style.backgroundColor = color;

    // Cria a estrutura HTML interna da carta
    const pokemonInnerHtml = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h5 class="name">${name}</h5>
            <small class="type">Tipo:<span>${type}</span></small>
        </div>`;

    // Define o conteúdo HTML da carta
    card.innerHTML = pokemonInnerHtml;

    // Adiciona a carta ao contêiner principal no HTML
    pokeContainer.appendChild(card);
}

// Chama a função principal para buscar e criar cartas para todos os Pokémon
fetchAllPokemons();
