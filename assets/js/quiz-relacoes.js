        const questions = [
            {
                question: "Uma relação é reflexiva quando:",
                options: [
                    "(a, a) pertence à relação para todo a",
                    "(a, b) implica (b, a)",
                    "(a, b) e (b, c) implicam (a, c)",
                    "Nenhum elemento se relaciona consigo mesmo"
                ],
                correct: 0
            },
            {
                question: "Uma relação é simétrica quando:",
                options: [
                    "Todo elemento se relaciona consigo mesmo",
                    "Se (a, b) pertence à relação, então (b, a) também pertence",
                    "Se (a, b) e (b, c) pertencem, então (a, c) pertence",
                    "Apenas pares ordenados diferentes existem"
                ],
                correct: 1
            },
            {
                question: "Uma relação é transitiva quando:",
                options: [
                    "(a, a) está sempre presente",
                    "(a, b) implica (b, a)",
                    "Se (a, b) e (b, c) pertencem, então (a, c) pertence",
                    "Elementos diferentes nunca se relacionam"
                ],
                correct: 2
            },
            {
                question: "Uma relação de equivalência deve ser:",
                options: [
                    "Apenas reflexiva",
                    "Reflexiva e simétrica",
                    "Reflexiva, simétrica e transitiva",
                    "Apenas transitiva"
                ],
                correct: 2
            },
            {
                question: "A relação 'é igual a' entre números é um exemplo de:",
                options: [
                    "Relação apenas simétrica",
                    "Relação de ordem",
                    "Relação de equivalência",
                    "Relação não transitiva"
                ],
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