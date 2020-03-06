const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionNumText = document.getElementById('questionNum');
const scoreCount = document.getElementById('score');

let currentQuestion = {};
let userSelect = false;
let score = 0;
let questionNum = 0;
let remainingQuestions = [];


let questions = [
    {
        question: "Mobile devices store fingerprint scans as…",
        choice1: "An image of the fingerprint",
        choice2: "A collection of unique points and their positioning on the fingerprint",
        choice3: "Numbers that describe the distances between ridges and valleys of the print",
        choice4: "An infrared scan of the fingerprint",
        answer: 2
    },
    {
        question: "Apple’s FaceID and 6-digit pin code have the same likeliness that someone will be able to falsely unlock them, which is… ",
        choice1: "1 in 250,000",
        choice2: "1 in 100,000,000",
        choice3: "1 in 500,000",
        choice4: "1 in 1,000,000",
        answer: 4
    },
    {
        question: "What are the chances that someone will falsely unlock an iPhone’s fingerprint lock?",
        choice1: "1 in 50,000",
        choice2: "1 in 10,000",
        choice3: "1 in 15,000",
        choice4: "1 in 100,000",
        answer: 1
    },
    {
        question: "Which of these have NOT been successfully hacked?",
        choice1: "Apple’s FaceID",
        choice2: "Android’s Facial Recognition",
        choice3: "Apple’s Secure Enclave",
        choice4: "An Android phone camera",
        answer: 3
    },
    {
        question: "Which devices are the most secure when it comes to biometric authentication?",
        choice1: "Apple",
        choice2: "Android",
        choice3: "Neither are secure",
        choice4: "Both are equally secure",
        answer: 1
    },
    {
        question: "Biometric data on mobile devices is stored…",
        choice1: "In an encrypted folder in the device storage",
        choice2: "In an isolated processor on the device",
        choice3: "On the cloud (an external server)",
        choice4: "Biometric data is not stored",
        answer: 2
    },
    {
        question: "Mobile device facial recognition has been fooled by…",
        choice1: "A 2D Photograph",
        choice2: "Twins",
        choice3: "A 3D printed head",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Which of these areas has hand vein biometric technology NOT yet been implemented?",
        choice1: "Hospitals",
        choice2: "Football Stadiums",
        choice3: "Schools",
        choice4: "Laptops",
        answer: 3
    },
    {
        question: "Which form of biometric authentication was implemented on a Samsung device but was hacked quickly after release?",
        choice1: "Iris",
        choice2: "Voice",
        choice3: "Retina",
        choice4: "Typing",
        answer: 1
    },
    {
        question: "Which of these areas uses voice recognition?",
        choice1: "Hospitals",
        choice2: "Banks",
        choice3: "Fast-Food drive-throughs",
        choice4: "All of the above",
        answer: 2
    },
    {
        question: "What was the first mobile device to feature fingerprint recognition?",
        choice1: "iPhone 5S",
        choice2: "Motorola Atrix",
        choice3: "Samsung Galaxy S2",
        choice4: "Sony Ericsson Xperia Play",
        answer: 2
    },
    {
        question: "What is the estimated number of current biometric authentication users on mobile devices?",
        choice1: "1.2 billion",
        choice2: "344 million",
        choice3: "429 million",
        choice4: "872 million",
        answer: 3
    },
    {
        question: "Which of these is NOT a trait considered when identifying a biometric signature?",
        choice1: "Speed",
        choice2: "Timing",
        choice3: "Colour of pen",
        choice4: "Pressure",
        answer: 3
    },
    {
        question: "Which of these statements is NOT correct about iris scanning?",
        choice1: "Iris scanning identifies patterns of blood vessels",
        choice2: "There are around 240 aspects of the Iris that are scanned",
        choice3: "Iris scanning is used in US law enforcement",
        choice4: "Infrared light is used to scan the Iris",
        answer: 1
    },
    {
        question: "Which of these statements is true?",
        choice1: "There are multiple layers of security protecting biometric data on mobile devices",
        choice2: "Biometric data is inaccessible to anyone that doesn’t have physical access to the device",
        choice3: "No hacker or researcher has stolen a user’s biometric data off a mobile device",
        choice4: "They are all true",
        answer: 4
    }
];


const score_add = 1;
const num_questions = 15;

startGame = () => {
    questionNum = 0;
    score = 0;
    remainingQuestions = [...questions]
    
    nextQuestion();
};


nextQuestion = () => {

    if(remainingQuestions.length == 0 || questionNum >= num_questions){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }

    questionNum++;
    questionNumText.innerText = `${questionNum}/${num_questions}`;


    const questionIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    remainingQuestions.splice(questionIndex, 1);

    userSelect = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!userSelect) return;
        userSelect = false;
        const userChoice = e.target;
        const userAnswer = userChoice.dataset["number"];
        
      

        const classToApply = userAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply == "correct") {
            incrementScore(score_add);
        }
        
        
        userChoice.parentElement.classList.add(classToApply);


        setTimeout( () => {
            userChoice.parentElement.classList.remove(classToApply);
            nextQuestion();

        }, 1000);

        
    });
});

incrementScore = num => {
    score += num;
    scoreCount.innerText = score;
};




startGame();
