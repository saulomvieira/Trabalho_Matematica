const questions = [
    {
        question: "Qual é a união dos conjuntos A = {1, 2, 3} e B = {3, 4, 5}?",
        options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2, 4, 5}", "{1, 2, 3, 3, 4, 5}"],
        correct: 0
    },
    {
        question: "Qual é a interseção dos conjuntos A = {2, 4, 6, 8} e B = {4, 8, 12}?",
        options: ["{2, 6}", "{4, 8}", "{2, 4, 6, 8, 12}", "{12}"],
        correct: 1
    },
    {
        question: "Se A = {1, 2, 3, 4} e B = {2, 3}, então A - B (diferença) é:",
        options: ["{1, 4}", "{2, 3}", "{1, 2, 3, 4}", "{}"],
        correct: 0
    },
    {
        question: "Qual das opções representa o conjunto vazio?",
        options: ["{0}", "{}", "{∅}", "{ }"],
        correct: 1
    },
    {
        question: "Se o conjunto universo U = {1, 2, 3, 4, 5} e A = {1, 2}, qual é o complemento de A?",
        options: ["{3, 4, 5}", "{1, 2}", "{1, 2, 3, 4, 5}", "{}"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function renderQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    document.getElementById('questionCounter').textContent = `Questão ${currentQuestion + 1} de ${questions.length}`;
    document.getElementById('progressFill').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    document.getElementById('currentScore').textContent = `Pontuação atual: ${score}`;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const buttons = document.querySelectorAll('.option-button');
    const isCorrect = index === questions[currentQuestion].correct;

    buttons[index].classList.add(isCorrect ? 'correct' : 'incorrect');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        score += 10;
        showToast('Correto! 🎉', '+10 pontos', 'success');
    } else {
        showToast('Incorreto', 'Tente a próxima!', 'error');
    }

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            selectedAnswer = null;
            renderQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showToast(title, message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toast.className = `toast ${type}`;
    toastMessage.innerHTML = `<strong>${title}</strong><br>${message}`;

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}

function showResult() {
    const currentTotal = parseInt(localStorage.getItem('mathScore') || '0');
    localStorage.setItem('mathScore', (currentTotal + score).toString());

    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('resultCard').classList.remove('hidden');
    document.getElementById('finalScore').textContent = `${score} pontos`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    document.getElementById('resultCard').classList.add('hidden');
    document.getElementById('quizCard').classList.remove('hidden');
    renderQuestion();
}

renderQuestion();