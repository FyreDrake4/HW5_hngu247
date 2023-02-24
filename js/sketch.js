//https://youtu.be/H2RKt-XEk64

let sounds = new Tone.Players({
    glass: "sounds/glass.wav",
    meow: "sounds/meow.wav",
    bongos: "sounds/bongos.wav",
    wow: "sounds/wow.mp3",
    song: "sounds/song.mp3",
});

const delay = new Tone.FeedbackDelay(0, 0);

const distort = new Tone.Distortion(0);

const shift = new Tone.FrequencyShifter(0);

let soundNames = ["glass", "meow", "bongos", "wow", "song"];
let buttons = [];

let delaySlider;
let frequencySlider;

let distortionSlider;

let shifterSlider;

function setup() {
    createCanvas(800, 600);
    sounds.connect(delay);
    delay.connect(distort);
    distort.connect(shift);
    shift.toDestination();

    soundNames.forEach((word, index) => {
        buttons[index] = createButton(word);
        buttons[index].size(100, 50);
        buttons[index].position(
            200 + (index % 2 ? 200 : 0),
            80 + floor(index / 2) * 100
        );
        buttons[index].mousePressed(() => buttonSound(word));
    });

    delaySlider = createSlider(0, 1, 0, 0.05);
    delaySlider.position(25, 500);
    delaySlider.mouseReleased(() => {
        delay.delayTime.value = delaySlider.value();
    });

    frequencySlider = createSlider(0, 1, 0, 0.05);
    frequencySlider.position(200, 500);
    frequencySlider.mouseReleased(() => {
        delay.feedback.value = frequencySlider.value();
    });

    distortionSlider = createSlider(0, 1, 0, 0.05);
    distortionSlider.position(375, 500);
    distortionSlider.mouseReleased(() => {
        distort.distortion = distortionSlider.value();
    });

    shifterSlider = createSlider(-400, 400, 0, 1);
    shifterSlider.position(550, 500);
    shifterSlider.mouseReleased(() => {
        shift.frequency.value = shifterSlider.value();
    });
}

function draw() {
    background("lime");
    push();
    textSize(20);
    text("Janky Sampler :D", 300, 40);
    text("press the buttons for sound", 250, 400);
    pop();
    push();
    textSize(15);
    text("Feedback Delay [0 - 1]", 15, 550);
    text("Feedback Frequency [0 - 1]", 180, 550);
    text("Distortion [0 - 1]", 400, 550);
    text("Frequency Shift [-400 - 400]", 540, 550);
    pop();
}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}
