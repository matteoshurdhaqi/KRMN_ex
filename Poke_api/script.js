const pokeSearch = document.querySelector('.poke-search');
const baseEndpoint = 'https://pokeapi.co/api/v2';

// function findPokemon(event) {
//     event.preventDefault();
    
//     const baseEndpoint = 'https://pokeapi.co/api/v2';

//     const data = dataCleaner(event.target);

//     fetch(`${baseEndpoint}/pokemon/${data[0]}`)
//     .then(response => {
//         if(!response.ok){
//             throw new Error(`Impossibile recuperare il Pokémon ${data[0]}. Assicurati che esista`)
//         }
//         return response.json()
//     })
//     .then(pokeData => {
//         if(pokeData.count){
//             throw new Error(`Nessuna Pokémon trovato`)
//         }
//         renderPokemon(pokeData);
//         return fetch(`${baseEndpoint}/pokemon/${pokeData.id + 1}`);
//     })
//     .then(response => response.json())
//     .then(pokeData => {
//         insertAdjacentPokemon('next', pokeData);
//         if(pokeData.id - 2 >= 1){
//             return fetch(`${baseEndpoint}/pokemon/${pokeData.id-2}`);
//         }
//     })
//     .then(response => response.json())
//     .then(pokeData => insertAdjacentPokemon('previous', pokeData))
//     .catch(e => {
//         alert(e);
//     })
// }

async function findPokemon(event){
    event.preventDefault();
    const data = dataCleaner(event.target);
    const poke = await loadPokemon(data[0]);
    console.log(poke);
}

async function loadPokemon(pokemon) {
    try {
        const res = await fetch(`${baseEndpoint}/pokemon/${pokemon}`);
        if(!res.ok){
            throw new Error(`Impossibile recuperare il Pokémon ${data[0]}. Assicurati che esista`)
        }
        const pokeData = await res.json();
        if(pokeData.count){
            throw new Error(`Nessuna Pokémon trovato`)
        }
        renderPokemon(pokeData);
        if(pokeData.id>1010){
            throw new Error('Questo Pokemon non esiste')
        }
        if(pokeData.id+1 < 1010){
            getNextPoke('next', pokeData.id + 1);
        }
        if(pokeData.id-1 >= 1){
            getNextPoke('previous', pokeData.id - 1);
        }
        
        return pokeData;
        
    } catch(e){
        alert(e);
    }
}

async function getNextPoke(pos, id){
    const res = await fetch(`${baseEndpoint}/pokemon/${id}`);
    const pokemon = await res.json();
    insertAdjacentPokemon(pos, pokemon);
}


function insertAdjacentPokemon(position, data) {
    const card = document.querySelector('.card');

    switch(position){
        case 'next':
            card.insertAdjacentHTML('beforeend', `<div class="next-pokemon"><img width="50" src="${data.sprites.front_default}" alt="${data.name}"/>${data.name}</div>`);
        break;

        case 'previous':
            card.insertAdjacentHTML('beforeend', `<div class="prev-pokemon"><img width="50" src="${data.sprites.front_default}" alt="${data.name}"/>${data.name}</div>`);
        break;
    }
}

function renderPokemon(dati){
    resetResult(dati);
    
    const card = document.createElement('div');
    card.classList.add('card', dati.types[0].type.name);

    card.insertAdjacentHTML("afterbegin", `
        <div class="media"><img src="${dati.sprites.front_default}" alt="${dati.name}" /></div>
        <div class="stats">
            <h2>${dati.name}</h2>
            <ul>
                <li><span>Punti vita: </span>${dati.stats[0].base_stat}</li>
                <li><span>Attacco: </span>${dati.stats[1].base_stat}</li>
                <li><span>Difesa: </span>${dati.stats[2].base_stat}</li>
            </ul>
        </div>
    `);

    pokeSearch.insertAdjacentElement("afterend", card);
}

function resetResult(){
    const card = pokeSearch.nextElementSibling;
    if (card?.classList.contains("card")) {
        card.remove();
    }
}

function dataCleaner(form) {
    const sendedData = new FormData(form);
    const cleanData = [];

    for(let input of sendedData.entries()) {
        cleanData.push(clean(input[1]));
    }

    return cleanData;
}

function clean(input) {
    return input.trim().toLowerCase();
}

pokeSearch.addEventListener('submit', findPokemon);


async function getJSON(url){
    const res = await fetch(url);
    const data = res.json();
    return data;
}

async function searchPokemon(p1, p2, p3){
    const pokeData1 = await getJSON(`${baseEndpoint}/pokemon/${p1}`);
    const pokeData2 = await getJSON(`${baseEndpoint}/pokemon/${p2}`);
    const pokeData3 = await getJSON(`${baseEndpoint}/pokemon/${p3}`);

    const pokeData = await Promise.all([
        getJSON(`${baseEndpoint}/pokemon/${p1}`), 
        getJSON(`${baseEndpoint}/pokemon/${p2}`), 
        getJSON(`${baseEndpoint}/pokemon/${p3}`), 
    ])

    console.log(pokeData1.name, pokeData2.name, pokeData3.name);
    console.log(pokeData.map(pokemon => pokemon.name));
}

searchPokemon('charizard', 'torchic', 'mewtwo');