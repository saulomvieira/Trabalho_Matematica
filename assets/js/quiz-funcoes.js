        const questions = [
            {
                question: "Se f(x) = 2x + 3, qual é o valor de f(5)?",
                options: ["10", "13", "8", "15"],
                correct: 1
            },
            {
                question: "Qual é o domínio da função f(x) = 1/(x-2)?",
                options: [
                    "Todos os números reais",
                    "Todos os números reais exceto 2",
                    "Apenas números positivos",
                    "Apenas números negativos"
                ],
                correct: 1
            },
            {
                question: "Uma função f é injetora quando:",
                options: [
                    "Todo elemento do domínio tem imagem",
                    "Elementos diferentes têm imagens diferentes",
                    "Todo elemento do contradomínio é imagem",
                    "f(x) = x para todo x"
                ],
                correct: 1
            },
            {
                question: "Se f(x) = x² - 4, quais são os zeros da função?",
                options: ["x = 4", "x = 2", "x = -2 e x = 2", "x = 0"],
                correct: 2
            },
            {
                question: "Uma função f é crescente quando:",
                options: [
                    "f(x₁) < f(x₂) para x₁ < x₂",
                    "f(x₁) > f(x₂) para x₁ < x₂",
                    "f(x) é sempre positiva",
                    "f(x) é sempre negativa"
                ],
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