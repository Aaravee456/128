music = " ";
var leftwristX = 0;
var leftwristY = 0;
var rightwristX = 0;
var rightwristY = 0;
score_leftwrist = 0;
score_rightwrist = 0;

function preload() {
    music = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Posenet has been initialized");
}

function play() {
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function stop() {
    music.stop();
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke(12);

    if (score_rightwrist > 0.2) {

        circle(rightwristX, rightwristY, 20);

        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        } else if (rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2x";
            song.rate(2);
        } else if (rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }
}

if (score_leftwrist > 0.02) {
    circle(leftwristX, leftwristY, 20);

    numberleftwristY = Number(leftwristY);
    remove_decimal = floor(numberleftwristY);
    volume = remove_decimal / 500;
    console.log(remove_decimal);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
    }
} 