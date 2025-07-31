// punteggio iniziale
const scoreDisplay = document.querySelector('#scoreDisplay');
let score = 0;
scoreDisplay.innerText = score;

// timer iniziale
const timerDisplay = document.querySelector('#timerDisplay');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

// velocità iniziale bugs
let bugSpeed = 800; //millisecondi

//prendo le celle
const cells = document.querySelectorAll('.cell');

//ripulisco le celle
function removeBug() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('bug');        
    }
}

// randomizzo bug nelle celle
function randomBug() {
    removeBug();

    const randomNumber = Math.floor( Math.random() * cells.length) 
    cells[randomNumber].classList.add('bug');
}

const bugMovement = setInterval(randomBug, bugSpeed);

// se il giocatore clicca su un bug, si trasforma in splat e poi si ripulisce
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(){
        //se clicco su un bug
        if(cells[i].classList.contains('bug')){

            //incremento il punteggio
            score++;
            scoreDisplay.innerText = score;

            //tolgo il bug e aggiungo lo splat
            cells[i].classList.remove('bug');
            cells[i].classList.add('splat');

            //pulisco le celle dopo qualche millisecondo
            setTimeout(function(){
                cells[i].classList.remove('splat');
            }, 200);
        }
    })
}

//imposto un conto alla rovescia
const timer  = setInterval(countDown, 1000);

function countDown(){
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    // se il timer arriva a 0, fermo il gioco, svuoto celle e mostro alert
    if(timeLeft === 0){
        clearInterval(timer);
        clearInterval(bugMovement);
        removeBug();

        showAlert(`GAME OVER! Punti:  ${score}`);
    }
}
