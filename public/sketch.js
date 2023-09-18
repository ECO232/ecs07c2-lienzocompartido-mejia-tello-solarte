const socket = io();

let size
let slider
let color = 0
let identifier = 0;

let elements = []
let cursors = []

function setup() {
    createCanvas(400, 400);
    colorPicker = createColorPicker("red");
    slider = createSlider(0, 100, 50);
    identifier = int(Math.random() * 1000);
    console.log("ID: ", identifier);
}

function draw() {
    background(220)
    noStroke()

    elements.forEach((element) => {
        fill(element.color);
        ellipse(element.x, element.y, element.size, element.size) //pq se pone 2 veces????
    })

    cursors.forEach((cursor) => {
        fill(cursor.color);
        ellipse(cursor.x, cursor.y, cursor.size, cursor.size) //pq se pone 2 veces????
    })
}

function mousePressed() {
    const element = {
        x: mouseX,
        y: mouseY,
        color: colorPicker.value(),
        size: slider.value()
    };
    socket.emit('send-element', element)
}

function mouseDragged() {
    const cursor = {
        x: mouseX,
        y: mouseY,
        color: colorPicker.value(),
        size: slider.value(),
        id: identifier
    };
    socket.emit('send-cursor', cursor)
}

socket.on('received-element', (element) => {
    console.log("element received: ", element)
    elements.push(element)
})

socket.on('received-cursor', (cursor) => {
    console.log("cursor received: ", cursor)
    let cursorIndex = cursors.findIndex((item) => cursor.id == item.id)
    if (cursorIndex != 1) {
        cursors[cursorIndex] = cursor;
    } else {
        cursors.push(cursor)
    }
})