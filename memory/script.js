const grid = document.querySelector('#grid');
const errorsCounter = document.querySelector('#error');
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
const deck = [...cards, ...cards];

let pick = [];
let errors = 0;

const sorted = deck.sort(function(a,b){
    return 0.5 - Math.random();
});

for (let i = 0; i < deck.length; i++) {
   const card = document.createElement('div');
   const cardName = deck[i];
   card.classList.add('card');
   card.setAttribute('data-name', cardName);
   card.addEventListener('click', flipCard);
   grid.appendChild(card);
}

errorsCounter.innerText = errors;

function flipCard(e){
    const card = e.target;

    if(card.classList.contains('flipped')) return;

    card.classList.add(card.getAttribute('data-name'), 'flipped');

    pick.push(card);

    if (pick.length === 2) {
      checkForMatch();
    }
}

function checkForMatch(){
    const card1  = pick[0];
    const card2  = pick[1];

    card1Name = card1.getAttribute('data-name');
    card2Name = card2.getAttribute('data-name');

    if (card1Name === card2Name) {
        console.log('match');
        checkForWin();
    }
    else {
        setTimeout(function(){
        card1.classList.remove(card1Name, 'flipped');
        card2.classList.remove(card2Name, 'flipped');
        errors++;
        errorsCounter.innerText = errors;
        }, 500);
    }

    pick = [];
}

function checkForWin () {
    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === deck.length) {
        showAlert('Hai vinto!');
    }
}