const grid = document.querySelector('#grid');
const scoreEl = document.querySelector("#score")

const size = 15;
const rxc = size * size;
const cells = [];
const speed = 600;

let laserSpeed = 200;

const aliens = [0,1,2,3,4,5,6,7,8,9,
                15,16,17,18,19,20,21,22,23,24,
                30,31,32,33,34,35,36,37,38,39,
                45,46,47,48,49,50,51,52,53,54
            ];
const aliensKilled = [];

let score = 0;
scoreEl.innerText = score;

//creo le celle
for(let i = 0; i < rxc; i++){
    const cell = document.createElement('div');
    // cell.innerText = i; //debug
    cells.push(cell);
    grid.appendChild(cell);
}

function checkForHumanWin(){
    if(aliensKilled.length === aliens.length){
        showAlert('HUMAN WINS');
        clearInterval(alienMoveIntval);
    }
}

function  checkForAlienWin(){
    for(let i = 0; i < aliens.length; i++){
        if(
            !aliensKilled.includes(aliens[i]) &&
            aliens[i] >= spaceshipIdx
        ) {
            showAlert('ALIENS WIN');
            clearInterval(alienMoveIntval);
        } 
    }
}

function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        if(!aliensKilled.includes(i)){
            cells[aliens[i]].classList.add('alien');
        }
    }
}

function removeAliens(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.remove('alien');
    }
}
step = 1;
direction = 'forward';


function moveAliens(){
    const leftEdge = aliens[0] % size === 0;
    const rightEdge = aliens[aliens.length - 1] % size === size - 1;

    removeAliens();

    if(direction === 'forward' && rightEdge){
        for(let i = 0; i < aliens.length;  i++){
            aliens[i] = aliens[i] + size + 1;
            step = -1;
            direction = 'backward';
        }
    }
    if(direction === 'backward' && leftEdge){
        for(let i = 0; i < aliens.length;  i++){
            aliens[i] = aliens[i] + size - 1;
            step = 1;
            direction = 'forward';
        }
    }
    for(i = 0; i < aliens.length; i++){
        aliens[i] = aliens[i] + step;
    }

    checkForAlienWin();
    drawAliens();
}

drawAliens();

let alienMoveIntval = setInterval(moveAliens, speed);

let spaceshipIdx = Math.trunc((size * size) - (size/2));
cells[spaceshipIdx].classList.add('spaceship');

function moveSpaceship (e){
    const leftEdge = spaceshipIdx % size === 0;
    const rightEdge = spaceshipIdx % size === size - 1;
    

    cells[spaceshipIdx].classList.remove('spaceship')

    if(e.code === 'ArrowLeft' && !leftEdge){
        spaceshipIdx--;
    }
    else if(e.code === 'ArrowRight' &&!rightEdge){
        spaceshipIdx++;
    }

    cells[spaceshipIdx].classList.add('spaceship');

}

document.addEventListener('keydown', moveSpaceship);


function shoot(e){
    if(e.code !== 'Space') return;

    let laserIdx = spaceshipIdx;
    let laserIntVal = null;

        function moveLaser() {
            cells[laserIdx].classList.remove('laser');
            laserIdx = laserIdx - size;

            if(laserIdx < 0){
                clearInterval(laserIntVal);
                return;
            }

            if(cells[laserIdx].classList.contains('alien')){

                clearInterval(laserIntVal);

                cells[laserIdx].classList.remove('alien');
                cells[laserIdx].classList.remove('laser');

                cells[laserIdx].classList.add('boom');

                setTimeout(function(){

                    cells[laserIdx].classList.remove('boom');

                }, 200);

                const killed = aliens.indexOf(laserIdx);
                aliensKilled.push(killed);

                score++;
                scoreEl.innerText = score;

                checkForHumanWin();

                return;

            }

            cells[laserIdx].classList.add('laser');
        }

    laserIntVal = setInterval(moveLaser, laserSpeed);
}

document.addEventListener('keydown', shoot);

