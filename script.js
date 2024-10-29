// Level questions
const level1Questions = [
    { word: "baca", syllables: ["ba", "ca"], image: "images/baca.svg" },
    { word: "baju", syllables: ["ba", "ju"], image: "images/baju.svg" },
    { word: "kuda", syllables: ["ku", "da"], image: "images/kuda.svg" },
    { word: "buku", syllables: ["bu", "ku"], image: "images/buku.svg" },
    { word: "biru", syllables: ["bi", "ru"], image: "images/biru.svg" },
    { word: "bola", syllables: ["bo", "la"], image: "images/bola.svg" },
    { word: "celana", syllables: ["ce", "la","na"], image: "images/celana.svg" },
    { word: "ibu", syllables: ["i", "bu"], image: "images/ibu.svg" },
    { word: "kamera", syllables: ["ka", "me","ra"], image: "images/kamera.svg" },
    { word: "keju", syllables: ["ke", "ju"], image: "images/keju.svg" },
    { word: "kelapa", syllables: ["ke", "la","pa"], image: "images/kelapa.svg" },
    { word: "kemeja", syllables: ["ke", "me","ja"], image: "images/kemeja.svg" },
    { word: "komodo", syllables: ["ko", "mo","do"], image: "images/komodo.svg" },
    { word: "menara", syllables: ["me", "na","ra"], image: "images/menara.svg" },
    { word: "pepaya", syllables: ["pe", "pa","ya"], image: "images/pepaya.svg" },
    { word: "perahu", syllables: ["pe", "ra","hu"], image: "images/perahu.svg" },
    { word: "petani", syllables: ["pe", "ta","ni"], image: "images/petani.svg" },
    { word: "roda", syllables: ["ro", "da"], image: "images/roda.svg" },
    { word: "sepatu", syllables: ["se", "pa","tu"], image: "images/sepatu.svg" },
    { word: "sepeda", syllables: ["se", "pe","da"], image: "images/sepeda.svg" },
    { word: "televisi", syllables: ["te", "le","vi","si"], image: "images/televisi.svg" },
    { word: "ubi", syllables: ["u", "bi"], image: "images/ubi.svg" },
    { word: "yoyo", syllables: ["yo", "yo"], image: "images/yoyo.svg" },
    
];

const level2Questions = [
    { word: "Eskavator", syllables: ["Es", "ka", "va", "tor"], image: "images/eskavator.svg" },
    { word: "Eskalator", syllables: ["Es", "ka", "la", "tor"], image: "images/eskelator.svg" },
    { word: "Bebek", syllables: ["Be", "bek"], image: "images/bebe.svg" },
    { word: "Elang", syllables: ["E", "lang"], image: "images/elang.svg" },
    { word: "Gambang", syllables: ["Gam", "bang"], image: "images/gambang.svg" },
    { word: "Harimau", syllables: ["Ha", "ri", "mau"], image: "images/harimau.svg" },
    { word: "Igloo", syllables: ["I", "gloo"], image: "images/igloo.svg" },
    { word: "Gajah", syllables: ["Ga", "jah"], image: "images/gajah.svg" },
    { word: "Iguana", syllables: ["I", "gua", "na"], image: "images/iguana.svg" },
    { word: "Itik", syllables: ["I", "tik"], image: "images/itik.svg" },
    { word: "Jaring", syllables: ["Ja", "ring"], image: "images/jaringan.svg" },
    { word: "Kambing", syllables: ["Kam", "bing"], image: "images/kambing.svg" },
    { word: "Kelinci", syllables: ["Ke", "lin","ci"], image: "images/kelinci.svg" },
    { word: "Kerbau", syllables: ["Ker", "bau"], image: "images/kerbau.svg" },
    { word: "kodok", syllables: ["Ko", "dok"], image: "images/kodok.svg" },
    { word: "Merpati", syllables: ["Mer", "pa","ti"], image: "images/merpati.svg" },
    { word: "Monyet", syllables: ["Mon", "yet"], image: "images/monyet.svg" },
    { word: "Nyamuk", syllables: ["Nya", "muk"], image: "images/nyamuk.svg" },
    { word: "Paus", syllables: ["Pa", "us"], image: "images/paus.svg" },
    { word: "Payung", syllables: ["Pa", "yung"], image: "images/payung.svg" },
    { word: "Penguin", syllables: ["Pen", "guin"], image: "images/penguin.svg" },
    { word: "Semut", syllables: ["Se", "mut"], image: "images/semut.svg" },
    { word: "Tikus", syllables: ["Ti", "kus"], image: "images/tikus.svg" },
    { word: "Ular", syllables: ["U", "lar"], image: "images/ular.svg" },
    { word: "Zebra", syllables: ["Ze", "bra"], image: "images/zebra.svg" },
    
];
let balloons = [];
let currentLevel = 1;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let syllableBank = [];
let dropBoxes = [];
let placedSyllables = [];

// Sound elements
const errorSound = new Audio("sounds/Ooh.mp3");
const successSound = new Audio("sounds/yay.mp3");
const correctSound = new Audio("sounds/yay-success.mp3");
const popSound = document.getElementById("pop-sound");

// DOM elements
const progressTracker = document.getElementById("progress-tracker");
const balloonContainer = document.getElementById("balloon-container");
const popupModal = document.getElementById("popup-modal");
const popupContent = document.getElementById("popup-content");


// Start the game based on selected level
function selectLevel(level) {
    currentLevel = level;
    selectedQuestions = selectRandomQuestions(level === 1 ? level1Questions : level2Questions, 10);
    currentQuestionIndex = 0;
    document.getElementById("level-selection").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    loadQuestion();
}
function selectLevelHome(){
    balloonContainer.classList.add("balloon-hidden");
    balloonContainer.innerHTML = "";
    popupModal.classList.remove("show");
    document.getElementById("level-selection").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    
}

// Randomly select questions for the level
function selectRandomQuestions(questions, count) {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Load the question, setup syllable bank and drop boxes
function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    syllableBank = shuffleArray(question.syllables.slice());
    dropBoxes = new Array(syllableBank.length).fill("");
    placedSyllables = new Array(syllableBank.length).fill(false);

    document.getElementById("syllable-bank").innerHTML = "";
    document.getElementById("drop-area").innerHTML = "";
    document.getElementById("hint-image").innerHTML = "";
    

    // Update progress tracker
    progressTracker.textContent = `${currentQuestionIndex + 1}/${selectedQuestions.length}`;

    // Show hint image
    const hintImage = document.createElement("img");
    hintImage.src = question.image;
    hintImage.alt = `${question.word} image`;
    hintImage.className = "hint-image";
    document.getElementById("hint-image").appendChild(hintImage);

    // Populate syllable bank
        syllableBank.forEach((syllable, index) => {
        const syllableEl = document.createElement("div");
        syllableEl.className = "syllable";
        syllableEl.draggable = true;
        syllableEl.textContent = syllable;
        syllableEl.ondragstart = (e) => drag(e, index);
        document.getElementById("syllable-bank").appendChild(syllableEl);
    });

    // Populate drop boxes with "+" and "=" signs
        dropBoxes.forEach((_, index) => {
        const dropBox = document.createElement("div");
        dropBox.className = "drop-box";
        dropBox.ondrop = (e) => drop(e, index);
        dropBox.ondragover = allowDrop;
        document.getElementById("drop-area").appendChild(dropBox);

        if (index < dropBoxes.length - 1) {
            const plusSign = document.createElement("span");
            plusSign.className = "plus-sign";
            plusSign.textContent = "+";
            document.getElementById("drop-area").appendChild(plusSign);
        } else {
            const equalsSign = document.createElement("span");
            equalsSign.className = "equals-sign";
            equalsSign.textContent = "=";
            document.getElementById("drop-area").appendChild(equalsSign);
        }
    });
    // Answer container to display the completed word
    const answerContainer = document.createElement("div");
    answerContainer.id = "answer-container";
    answerContainer.className = "answer-container";
    document.getElementById("drop-area").appendChild(answerContainer);
  
}

// Drag event functions
function drag(event, syllableIndex) {
    event.dataTransfer.setData("text", syllableIndex);
}

function allowDrop(event) {
    event.preventDefault();
}

// Drop function with validation
function drop(event, dropBoxIndex) {
    event.preventDefault();
    const syllableIndex = event.dataTransfer.getData("text");
    const question = selectedQuestions[currentQuestionIndex];

    if (syllableBank[syllableIndex] === question.syllables[dropBoxIndex] && !placedSyllables[dropBoxIndex]) {
        dropBoxes[dropBoxIndex] = syllableBank[syllableIndex];
        event.target.textContent = dropBoxes[dropBoxIndex];
        placedSyllables[dropBoxIndex] = true;

       // Hide the syllable from the choice bank
      const syllableElement = document.querySelectorAll(".syllable")[syllableIndex];
      if (syllableElement) syllableElement.classList.add("hidden");
  
      // Display the current answer in the answer container
      document.getElementById("answer-container").textContent = dropBoxes.join("");
  
        if (dropBoxes.every((syllable) => syllable !== "")) {
            correctSound.play();
                        setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < selectedQuestions.length) {
                    loadQuestion();
                } else {
                    endGame();
                }
            }, 500);
        }
    } else {
        showPopup("Try Again!", "error");
        errorSound.play();
    }
}

// Show popup for feedback
function showPopup(message, type) {
    popupContent.className = `popup-message ${type}`;
    popupContent.textContent = message;
    popupModal.classList.add("show");
    setTimeout(() => {
        popupModal.classList.remove("show");
    }, 2000);
}

// End game function
function endGame() {
    showPopup("Pintar!", "success");
    successSound.play();
    displayBalloons();
    document.getElementById("game-container").style.opacity = "1"; 
    
}

// Display balloons with floating animations
function displayBalloons() {
    const balloonContainer = document.getElementById("balloon-container");
    balloonContainer.style.display = "block";
    balloonContainer.innerHTML = "";

    for (let i = 0; i < 10; i++) { // Adjust number of balloons as needed
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");

        // Randomize horizontal position for natural effect
        balloon.style.left = `${Math.random() * 10 + 40}%`; // Range between 10%-90% width

        // Randomly assign animation type and duration for variety
        const animations = ["floatUp", "floatUpLeft", "floatUpRight", "floatUpSlow", "floatUpFast"];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        const duration = `${Math.random() * 5 + 7}s`; // Random duration between 7s and 12s

        balloon.style.animationName = randomAnimation;
        balloon.style.animationDuration = duration;
        balloon.style.animationDelay = `${Math.random() * 2}s`; // Random delay for staggered start

        balloonContainer.appendChild(balloon);

        // Add pop effect on click
        balloon.onclick = () => {
            balloon.classList.add("pop");
            document.getElementById("pop-sound").play();
            setTimeout(() => balloon.remove(), 300); // Remove balloon after pop effect
        };
        
    }
    setTimeout(() => {
        document.getElementById("popup-button").classList.add("show");
    }, 4000); // Adjust this delay to match balloon display duration

}

// Reset the game for replay
function restartGame() {
    balloonContainer.classList.add("balloon-hidden");
    balloonContainer.innerHTML = "";
    popupModal.classList.remove("show");
    selectLevelHome();
    const popupButton = document.getElementById("popup-button");
    popupButton.classList.remove("show"); 
}

// Shuffle array for syllable bank
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialization for "Back to Levels" button
document.getElementById("back-to-levels-btn").onclick = () => {
    document.getElementById("level-selection").style.display = "block";
    document.getElementById("game-container").style.display = "none";
};