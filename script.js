const quizData = [
    { 
        question: "1.What is so fragile that saying its name breaks it?",
        answers: [
            {text: "Silence", correct: true},
            {text: "Sleep", correct: false},
            {text: "Water", correct: false},
            {text: "Egg", correct: false},

        ]
    },


{
    question: " 2.I'm tall whem i'm young, and i'm short when i'm old, what am i?",
    answers: [
        {text: "Age", correct: false},
        {text: "Human", correct:false},
        {text: "A candle", correct: true},
        {text: "snake", correct: false},
    ]
},

{
    question: "3.What looses its head in the morning and gets it back at night?",
    answers: [
        {text: "moonlight", correct: false},
        {text: "light", correct:false},
        {text: "A cat", correct: false},
        {text: "A pillow", correct: true},
    ]
}
]

let currentQuestionIndex = 0;
let score = 0;

const questionElement =  document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function startQuiz() {
    showQuestions(quizData[currentQuestionIndex]);
    startTimer();
}

function showQuestions(questionsData) {
    questionElement.innerText = questionsData.question;
    answerButtons.forEach((button, index) => {
        button.innerText = questionsData.answers[index].text;
        button.dataset.correct = questionsData.answers[index].correct;
    });
    resetTimer();
}

function selectAnswer(button) {
    const correct = button.dataset.correct === 'true';
    if (correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
    }
    disableAnswers();
}

function disableAnswers() {
    answerButtons.forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.style.backgroundColor = 'green';
        }
    });
}

function enableAnswers() {
    answerButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '#007BFF';
    });
}

function nextQuestions() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        enableAnswers();
        showQuestions(quizData[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        enableAnswers();
        showQuestions(quizData[currentQuestionIndex]);
    }
}

function showResults() {
    let resultSummary = '';
    quizData.forEach((question, index) => {
        resultSummary += `<p>${index + 1}. ${question.question} - <strong>${question.answers.find(a => a.correct).text}</strong></p>`;
    });

    document.getElementById('quiz').innerHTML = `
        <h2>Quiz completed! Your score is ${score}/${quizData.length}.</h2>
        <h3>Review your answers:</h3>
        ${resultSummary}
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
}
document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('.start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    startQuiz();
}) ;
 
startQuiz();
