const socket = io();

let size = 20;
let r = 0;
let g = 0;
let b = 0;
let id = 0;

let items = [];
let pointers = [];


function setup() {
    createCanvas(400,400);
    r = int(Math.random()*255)
    g = int(Math.random()*255)
    b = int(Math.random()*255)

    id = int(random()*1000)
    console.log("id", id)
}

function draw() {
    background(150)
    items.forEach((item)=> {
        fill(item.r, item.g, item.b);
        ellipse(item.x, item.y, item.size)
    })

    pointers.forEach((item)=> {
        fill(0, 0, 0);
        ellipse(item.x, item.y, item.size)
    })
    
}

function mousePressed() {
    const item = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size
    }
    
    socket.emit("send-item", item)
}

function mouseDragged() {
    const item = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size,
        id: id
    }
   
    socket.emit("send-pointer", item)
}

socket.on("item-received", (item) => {
    console.log("receiving item", item)
    items.push(item)
});

socket.on("pointer-received", (item) => {
    console.log("receiving pointer", item)

    let indexPointer = pointers.findIndex((element) => element.id == item.id)
    if(indexPointer != -1){
        pointers[indexPointer] = item;
    } else {
        pointers.push(item)
    }
   

});
