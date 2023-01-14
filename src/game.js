const NODES = 16;
const CLASS_WHITE = 'bg-white';
const CLASS_BLACK = 'bg-black';
let playing = false;
let points = 0;

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
    let node = event.target
    let nodeNum = node.id

    if (isActive(nodeNum)) {
        deactivateNode(nodeNum);
        activateNode();
        points++;
        document.getElementById("points-div").innerHTML = points;
    } else {
        document.getElementById("points-div").innerHTML = 0;
        document.getElementById("lost-div").innerHTML = 'You lost!';
        reset()
    }
}

function reset() {
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

setup();
