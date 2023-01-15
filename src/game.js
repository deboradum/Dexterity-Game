const NODES = 16;
const CLASS_WHITE = 'bg-white';
const CLASS_BLACK = 'bg-black';
let playing = false;
let points = 0;
let personal_record = 0;
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.getElementById("timer-div");
let int = null;

function setup() {
    for (let i=0; i<NODES; i++) {
        let node = document.getElementById(i);
        node.addEventListener("click", nodeClicked)
    }
    for (let j=0; j<4; j++) {
        activateNode();
    }
}

function nodeClicked(event) {
    let node = event.target;
    let nodeNum = node.id;

    if (!playing) {
        playing = true;
        clearInterval(int);
        [milliseconds,seconds,minutes,hours] = [0,0,0,0];
        timerRef.innerHTML = '00:000';
        startStopwatch();
    }

    if (isActive(nodeNum)) {
        document.getElementById("lost-div").innerHTML = '';
        deactivateNode(nodeNum);
        activateNode();
        points++;
        document.getElementById("points-div").innerHTML = points;
    } else {
        document.getElementById("lost-div").innerHTML = 'You lost!';
        if (points > personal_record) {
            personal_record = points;
            document.getElementById('pr-div').innerHTML = personal_record;
        }
        reset()
    }
}

function reset() {
    playing = false;
    points = 0;
    document.getElementById("points-div").innerHTML = points;
    clearInterval(int);
    for (let i=0; i<NODES; i++) {
        if (isActive(i)) {
            deactivateNode(i);
        }
    }
    for (let j=0; j<4; j++) {
        activateNode();
    }
}


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isActive(nodeNum) {
    if (nodeNum === -1) {
        return
    }
    let nodeEl = document.getElementById(nodeNum);

    classes = nodeEl.classList;
    if (classes.contains(CLASS_BLACK)) {
        return true;
    } else {
        return false;
    }
}

function activateNode() {
    let nodeNum = getRandomArbitrary(0, NODES);

    while (isActive(nodeNum)) {
        nodeNum = getRandomArbitrary(0, NODES);
    }

    let nodeEl = document.getElementById(nodeNum);
    nodeEl.classList.remove(CLASS_WHITE);
    nodeEl.classList.add(CLASS_BLACK);

    return;
}

function deactivateNode(nodeNum) {
    let nodeEl = document.getElementById(nodeNum);
    nodeEl.classList.remove(CLASS_BLACK);
    nodeEl.classList.add(CLASS_WHITE);

    return;
}

function startStopwatch() {
    if(int !== null){
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
}


function displayTimer() {
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
    }
    let s = seconds<10 ? '0' + seconds : seconds;
    let ms = milliseconds<10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
    timerRef.innerHTML = `${s}:${ms}`;
}

setup();
