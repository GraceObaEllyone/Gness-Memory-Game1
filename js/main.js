var signVideo;
var signLang = [];


var ready = false;
var playing = false;

var slectedRand = true;

var ranVid = 0;

let bubbles = [];
let hearts = [];

var happy = false;
var showHearts = false;

function preload() {


    signLang[0] = {
        "video": createVideo('video/monday.mp4', function() { ready = true }),
        "text": "Monday"
    }
    signLang[1] = {
        "video": createVideo('video/tuesday.mp4', function() { ready = true }),
        "text": "Tuesday"
    }
    signLang[2] = {
        "video": createVideo('video/wensday.mp4', function() { ready = true }),
        "text": "Wednesday"
    }

    signLang[3] = {
        "video": createVideo('video/thursday.mp4', function() { ready = true }),
        "text": "Thursday"
    }

    signLang[4] = {
        "video": createVideo('video/friday.mp4', function() { ready = true }),
        "text": "Friday"
    }

    signLang[5] = {
        "video": createVideo('video/saturday.mp4', function() { ready = true }),
        "text": "Saturday"
    }

    signLang[6] = {
        "video": createVideo('video/sunday.mp4', function() { ready = true }),
        "text": "Sunday"
    }

    signLang[7] = {
        "video": createVideo('video/christmas.mp4', function() { ready = true }),
        "text": "Merry Christmas"
    }

    signLang[8] = {
        "video": createVideo('video/black_friday.mp4', function() { ready = true }),
        "text": "Black Friday"
    }

    signLang[9] = {
        "video": createVideo('video/boring.mp4', function() { ready = true }),
        "text": "Boring"
    }

    signLang[10] = {
        "video": createVideo('video/discussion.mp4', function() { ready = true }),
        "text": "Discussion"
    }

    signLang[11] = {
        "video": createVideo('video/emotion_upset.mp4', function() { ready = true }),
        "text": "Upset"
    }

    signLang[12] = {
        "video": createVideo('video/new_year.mp4', function() { ready = true }),
        "text": "New Year"
    }








    signLang[0].video.hide();
    signLang[1].video.hide();
    signLang[2].video.hide();
    signLang[3].video.hide();
    signLang[4].video.hide();
    signLang[5].video.hide();
    signLang[6].video.hide();
    signLang[7].video.hide();

    signLang[8].video.hide();
    signLang[9].video.hide();
    signLang[10].video.hide();
    signLang[11].video.hide();
    signLang[12].video.hide();

    signLang[0].video.volume(0.0);
    signLang[1].video.volume(0.0);
    signLang[2].video.volume(0.0);
    signLang[3].video.volume(0.0);
    signLang[4].video.volume(0.0);
    signLang[5].video.volume(0.0);
    signLang[6].video.volume(0.0);
    signLang[7].video.volume(0.0);
    signLang[8].video.volume(0.0);
    signLang[9].video.volume(0.0);
    signLang[10].video.volume(0.0);
    signLang[11].video.volume(0.0);
    signLang[12].video.volume(0.0);



}


var x = 0,
    y = 500;

var scoring = false;

var score = 0;

var chances = 3;

//This is the Setup Function of File 
function setup() {

    // Creating Canvas 
    var cnv = createCanvas(windowWidth, windowHeight);
    //Set Id for canvas
    cnv.id("mycanvas");
    //set parent as anvas area
    cnv.parent("canvas-area");


    for (var i = 0; i < 200; i++) {
        let r = random(5, 50);
        let colr = random(50, 200);
        let colg = random(0, 100);
        let colb = random(50, 255);
        let b = new Bubble(round(random(width)), round(random(height)), r, colr, colg, colb);

        bubbles.push(b);
    }

    for (var i = 0; i < 200; i++) {
        let r = random(5, 50);
        let colr = random(50, 200);
        let colg = random(0, 100);
        let colb = random(50, 255);
        let b = new Heart(round(random(width)), round(random(height)), r, colr, colg, colb);

        hearts.push(b);
    }


    var a = select("#happy");
    a.mouseClicked(() => {
        happy = true;
        console.log(a)
    });


    var heartBtn = select("#heart");

    heartBtn.mousePressed(() => {
        showHearts = true;
        console.log(a)
    });



}

var missed = false;

function draw() {
    background(0);

    //Draw Dart Board 
    dartBoard();

    if (!missed) {
        drawArrow(x, y);
        x += 1;
    }


    //Draw Arrow

    if (x > width / 2) {
        x = -100;
        /// y += (round(random(-100, 100)))
    }

    if (dist(width / 2, height / 2, x, y) <= 50) {

        setTimeout(function() { slectedRand = true }, 12000);

        if (slectedRand) {
            ranVid = round(random(12));
            slectedRand = false;
        }


        signLang[ranVid].video.loop();
        textSize(30)
        fill(255);
        text("Good Shot", width / 2 - 600, height / 2);


        playing = true;
        scoring = true;
    }

    if (x >= width / 2 && dist(width / 2, height / 2, x, y) >= 60) {
        textSize(30)
        fill(255);
        text("You missed", width / 2 - 600, height / 2);
        if (chances > 0)
            chances--;

    }


    if (chances == 0) {
        missed = true;
    }


    if (missed) {
        textSize(30)
        fill(255);
        text("Game over", width / 2 + 600, height / 2);
    }

    showScore();

    if (scoring) {


        score += 20;
        scoring = false;
    }

    //Playing Sign Video
    if (playing) {

        textAlign(CENTER, CENTER);
        text(score, width / 2, height / 2);

        signLang[ranVid].video.loop();
        image(signLang[ranVid].video, width / 2 + 300, height / 2 - 200, 400, 400);
        fill(255)
        textSize(25);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(signLang[ranVid].text, width / 2 + 400, height / 2);
        setTimeout(function() { playing = false }, 10000);
    }


    if (happy) {
        for (i = 0; i < bubbles.length; i++) {
            bubbles[i].move();
            bubbles[i].show();
            bubbles[i].col();
        }
        setTimeout(function() {
            happy = false;
        }, 8000);
    }


    if (showHearts) {
        for (i = 0; i < hearts.length; i++) {
            hearts[i].move();
            hearts[i].show();
            hearts[i].col();
        }

        console.log(heart)
        setTimeout(function() {
            showHearts = false;
        }, 8000);
    }



}


function drawArrow(x, y) {
    fill(255, 0, 0);
    triangle(x - 50, y - 50, x - 50, y + 50, x, y)
    rect(x - 250, y - 20, 200, 40)
}



function dartBoard() {
    noStroke();
    fill(0, 255, 0);
    circle(width / 2, height / 2, 400);
    fill(0);
    circle(width / 2, height / 2, 300);
    fill(255, 255, 0);
    circle(width / 2, height / 2, 220);
    fill(148, 0, 211);
    circle(width / 2, height / 2, 150);
    fill(70, 130, 180)
    circle(width / 2, height / 2, 100);
    fill(148, 0, 211);
    circle(width / 2, height / 2, 50);
}

function mousePressed() {
    y = mouseY;
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



// Score showing fuunction

function showScore() {

    fill(255);
    rect(width - 400, 0, 400, 200);
    fill(0);
    textSize(20);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text("Score:  " + score, width - 380, 50);
    text("Chances:  " + chances, width - 380, 80);


}


class Bubble {

    constructor(_x, _y, _r, _colr, _colg, _colb) {
        this.x = _x;
        this.y = _y;
        this.r = _r;
        this.colr = _colr;
        this.colg = _colg;
        this.colb = _colb;
    }

    move() {
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
    }

    show() {
        noStroke();
        ellipse(this.x, this.y, this.r);
    }

    col() {
        fill(this.colr, this.colg, this.colb, 50);
    }

}

function happy() {
    happy = true;
}




class Heart {

    constructor(_x, _y, _r, _colr, _colg, _colb) {
        this.x = _x;
        this.y = _y;
        this.size = _r;
        this.colr = _colr;
        this.colg = _colg;
        this.colb = _colb;
    }

    move() {
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
    }

    show() {

        noStroke();
        beginShape();
        vertex(this.x, this.y);
        bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        endShape(CLOSE);

    }

    col() {
        fill(this.colr, this.colg, this.colb, 50);
    }

}