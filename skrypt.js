const canvas = document.getElementById("canvas"); // initial vars
const ctx = canvas.getContext("2d");

var t = Date.now();
let m1 = 50;
let m2 = 50;
let v1 = 0.0;
let v2 = 0.0;
let x1 = 150;
let x2 = 775;
let s1 = Math.sqrt(Math.ceil(m1/10)*1000);
let s2 = Math.sqrt(Math.ceil(m2/10)*1000);
let on = false;
let colisions = 0;
ctx.font = "30px Arial";

function turnoff()
{
    on = false;
}


function draw() // drawing each frame
{
    var timepassed = (Date.now() - t)/1000;
    t = Date.now();
    ctx.clearRect(0, 0, 1300, 500);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 450);
    ctx.lineTo(1250, 450);
    ctx.lineTo(1250, 50);
    ctx.font = "30px Arial";
    ctx.fillText("colisions: " + colisions, 1000, 35)
    ctx.font = "20px Arial";
    ctx.fillText("predkosc v1: " + v1/10, 100, 50)
    ctx.fillText("predkosc v2: " + v2/10, 100, 80)
    ctx.stroke();
    drawbox(x1, "#990000", s1);
    drawbox(x2, "#000099", s2);
    x1 = x1 + v1 * timepassed;
    x2 = x2 + v2 * timepassed;
    if(x1<=50) v1 = v1*(-1);
    if(x2>=1250-s2) v2 = v2*(-1);
    if(x1<50) x1 = 51;
    if(x2>1250-s2) x2 = 1249-s2;
    if(x1+s1>=x2) {
        if(s1<s2) {        
            x1 = x2 - s1-1;
            x2 = x1 + s1+1;
        } else {
            x2 = x1 + s1+1;
            x1 = x2 - s1-1;
        }

        var tv1 = ((m1-m2)*v1 + (2*m2*v2))/(m1+m2);
        v2 = ((m2-m1)*v2 + (2*m1*v1))/(m1+m2);
        v1 = tv1;
        colisions++;
    }
    if(on)
        requestAnimationFrame(draw);
}



function drawbox(x, col, s) // draw box function
{   
    ctx.fillStyle = col;
    if(x>50 && x<1250)
        ctx.fillRect(x, 449-s, s, s);
    else
    {
        if(x<51)
            ctx.fillRect(51, 449-s, s, s);
        if(x>951)
            ctx.fillRect(1249, 449-s, s, s);
    }
}

function init() // setting initial values on click start button
{
    colisions = 0;
    ctx.clearRect(0, 0, 1300, 500);
    start()
    m1 = parseFloat(document.getElementById("m1").value);
    m2 = parseFloat(document.getElementById("m2").value);
    v1 = parseFloat(document.getElementById("v1").value)*10;
    v2 = parseFloat(document.getElementById("v2").value)*10;
    s1 = Math.sqrt(Math.ceil(m1/10)*1000);
    s2 = Math.sqrt(Math.ceil(m2/10)*1000);
    drawbox(x1, "#990000", s1);
    drawbox(x2, "#000099", s2);
    x1 = 200;
    x2 = 1050;
    on = true;
    t = Date.now();
    draw();
}

function start() // starting a board on site load
{   
    ctx.strokeStyle = "white";
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 450);
    ctx.lineTo(1250, 450);
    ctx.lineTo(1250, 50);
    ctx.stroke();
    ctx.fillStyle = "#990000";
    ctx.fillRect(200, 449-s1, s1, s1);
    ctx.fillStyle = "#000099";
    ctx.fillRect(1050, 449-s2, s2, s2);
}

window.addEventListener("load", start);
document.getElementById("btn").addEventListener("click", init);
document.getElementById("btn2").addEventListener("click", turnoff);