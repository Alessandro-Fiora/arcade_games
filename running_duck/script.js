// IMPORTO I DIV DELLA ROAD e score
const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');
let score = 0;
// DEBUG NUMERINI
// for (let i = 0; i < road.length; i++) {
//     road[i].innerText = i;
//  }

// POSIZIONO LA PAPERA
const duckPos = 1;
const duck = road[duckPos];
duck.classList.add('duck');

// VELOCITA' PIANTA
let speed = 150;

// AGGIUNTA PIANTA ALL'INIZIO
function addPlant() {
    let plantPos = road.length - 1;
    road[plantPos].classList.add('plant');
// SPOSTO LA PIANTA
    const plantIntVal = setInterval(function(){
        if(score % 25 === 0){
            speed = speed - 5;
        }

        road[plantPos].classList.remove('plant');
        plantPos--;

       
        if(plantPos < 0){
            clearInterval(plantIntVal);
            addPlant()
            return;
        }

        if(
            plantPos === duckPos && 
            !road[plantPos].classList.contains('duck-jump')
        ){
            road[duckPos].classList.remove('duck');
            road[plantPos].classList.remove('plant');
            showAlert('CRASH!');
            clearInterval(plantIntVal);
        }
        scoreEl.innerText = score;
        road[plantPos].classList.add('plant');
        score++;
    }, speed)
}
addPlant();

function jump(e) {
    if(e.code === 'Space'&& !e.repeat){
    duck.classList.add('duck-jump');
        setTimeout(function(){
            duck.classList.remove('duck-jump');
        },  250)
    }
}

document.addEventListener('keydown', jump);