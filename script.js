const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1025;
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

const mainTypes = Object.keys(colors);

const fetchPokemons = async()=>{
    for (let i= 1; i <= pokemonCount; i++) {
       await getPokemons(i);
    }
}

//requisiçao

const getPokemons = async(id)=>{ //funçao de requisicao async
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`//link do api
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data);
    //console.log(data)
    //console.log(data.name); //pega o nome do pokemon
   // console.log(data.types[0].type.name); //pega o tipo do pokemon
    //console.log(data.id); //pega o ID do pokemon
    
    
}

const createPokemonCard = (poke)=>{
    
   const card = document.createElement('div')
   card.classList.add("pokemon")

   const name = poke.name[0].toUpperCase() + poke.name.slice(1)
   const id = poke.id.toString().padStart(3,"0")
   const pokeTypes = poke.types.map(type => type.type.name)
   const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
   const color = colors[type]
   card.style.backgroundColor = color
   
   const pokemonInnerHtml = ` <div class="imgContainer">
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
</div>
<div class="info">
   <span class="number">#${id}</span>
   <h5 class="name">${name}</h5>
   <small class="type">Tipo:<span>${type}</span></small>
</div>`

card.innerHTML = pokemonInnerHtml
pokeContainer.appendChild(card)
}

//getPokemons();// chama funçao
fetchPokemons();