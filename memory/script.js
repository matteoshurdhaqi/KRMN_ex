const carte = document.querySelectorAll('.carta');
const modale = document.querySelector('modal');
const giocaDiNuovo = modale.querySelector('.giocaDiNuovo');
const toggleClassifica = document.querySelector('.classifica button');

let cartaGirata = false;
let bloccaBoard = false;
let timerPartita = null;
let tempo = null;
let primaCarta, secondaCarta;


function giraCarta(){
    if(!timerPartita) avviaPartita();
    if(bloccaBoard) return;
    if(this === primaCarta) return;
    
    this.classList.add('flip');

    if(!cartaGirata){
        cartaGirata = true;
        primaCarta = this;
        return;
    }

    secondaCarta = this;
    
    
    controllaCorrispondenza();
}

function controllaCorrispondenza(){
    
    let corrisponde = primaCarta.dataset.forma === secondaCarta.dataset.forma;
    corrisponde ? disabilitaCarte() : rigiraCarte(); //
}

function disabilitaCarte(){ 
    primaCarta.removeEventListener('click', giraCarta);
    secondaCarta.removeEventListener('click', giraCarta);
    resetBoard();
    carteTerminate();
}

function rigiraCarte(){
    bloccaBoard = true;
    
    setTimeout(()=>{
        primaCarta.classList.remove('flip');
        secondaCarta.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard(){
    [cartaGirata, bloccaBoard] = [false, false];
    [primaCarta, secondaCarta] = [null, null];
}

function carteTerminate(){
    const carteGirate = document.querySelectorAll('.flip').length;

    if(carteGirate === 12){
        const body = document.body;
        const party = new JSConfetti({body});
        party.addConfetti();
        modale.removeAttribute('hidden');
        body.classList.add("vittoria");
        clearInterval(timerPartita);
        salvaPartita();
    }
}

function avviaPartita(){
    const secondiHtml = document.querySelector('.timer__secondi');
    const minutiHtml = document.querySelector('.timer__minuti');
    const inizioPartita = Date.now();
    timerPartita = setInterval( () => {
        const ora = Date.now();
        const tempoPassato = ora - inizioPartita;
        tempo = new Date(tempoPassato);
        secondiHtml.innerText = `${tempo.getSeconds()<10 ? '0' + tempo.getSeconds() : tempo.getSeconds()}`;

        minutiHtml.innerText = `${tempo.getMinutes()<10 ? '0' + tempo.getMinutes() : tempo.getMinutes()}`;

    }, 1000);
}

function salvaPartita(){
    const userName = prompt('Che nome vuoi inserire in classifica?');
    const classifica = JSON.parse(localStorage.getItem("classifica")) || [];
    classifica.push({userName:userName, tempo: new Intl.DateTimeFormat('it-IT', {minute: 'numeric', second: 'numeric'}).format(tempo)});
    localStorage.setItem("classifica", JSON.stringify(classifica));
}

function mostraClassifica(){
   const classificaContainer = this.parentElement;
   if(classificaContainer.classList.contains('aperta')) {
        classificaContainer.style.right = '-360px';
        classificaContainer.classList.remove('aperta');
   }else{
    classificaContainer.style.right = '0';
    classificaContainer.classList.add('aperta');
   }
}

function ordinaClassifica(a, b){
    const tempoA = a.tempo.split(':');
    const tempoB = b.tempo.split(':');

    const [minutiA, minutiB] = [tempoA[0], tempoB[0]];
    const [secondiA, secondiB] = [tempoA[1], tempoB[1]];

    const dataA = new Date(0);
    dataA.setSeconds(secondiA);
    dataA.setMinutes(minutiA);

    const dataB = new Date(0);
    dataB.setSeconds(secondiB);
    dataB.setMinutes(minutiB);

    return dataA > dataB ? 1 : -1;
}



(function mixCards(){
    //mischia
    carte.forEach(carta => {
        const posizioneCasuale = Math.floor(Math.random() *12);
        carta.style.order = posizioneCasuale;
    });

    //popola classifica 
    const classificaContainer = document.querySelector('.classifica__container');
    const classifica = JSON.parse(localStorage.getItem('classifica')) || [];

    if(classifica || classifica.length > 0){
        classifica.sort(ordinaClassifica)
        classificaContainer.innerHTML += `<ul>` + classifica.map((record, indice)=>{
            return `<li>#${indice+1} ${record.userName} - ${record.tempo}`
        }).join('') + `</ul>`
    }
})()

carte.forEach(carta => carta.addEventListener('click', giraCarta));

giocaDiNuovo.addEventListener('click', () => location.reload());

toggleClassifica.addEventListener('click', mostraClassifica);