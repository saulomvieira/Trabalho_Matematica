        const questions = [
            {
                question: "Qual é o próximo número na sequência: 2, 4, 6, 8, ...?",
                options: ["9", "10", "12", "14"],
                correct: 1
            },
            {
                question: "A sequência 1, 1, 2, 3, 5, 8, 13, ... é conhecida como:",
                options: [
                    "Sequência de Fibonacci",
                    "Progressão Aritmética",
                    "Progressão Geométrica",
                    "Sequência de números primos"
                ],
                correct: 0
            },
            {
                question: "Em uma PA com primeiro termo 5 e razão 3, qual é o quinto termo?",
                options: ["17", "20", "15", "14"],
                correct: 0
            },
            {
                question: "Qual é a soma dos 10 primeiros termos da PA (2, 5, 8, 11, ...)?",
                options: ["155", "165", "145", "175"],
                correct: 0
            },
            {
                question: "Em uma PG com primeiro termo 3 e razão 2, qual é o quarto termo?",
                options: ["12", "18", "24", "48"],
                correct: 2
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