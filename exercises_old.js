// JavaScript для страницы упражнений

document.addEventListener('DOMContentLoaded', function() {
    initExercisesPage();
});

function initExercisesPage() {
    initExerciseNavigation();
    initQuizSystem();
    initGames();
    initPuzzles();
    initModal();
}

// Навигация по типам упражнений
function initExerciseNavigation() {
    const navButtons = document.querySelectorAll('.exercise-nav-btn');
    const exerciseSections = document.querySelectorAll('.exercise-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetType = this.dataset.type;
            
            // Удаляем активный класс со всех кнопок и секций
            navButtons.forEach(btn => btn.classList.remove('active'));
            exerciseSections.forEach(section => section.classList.remove('active'));
            
            // Добавляем активный класс к выбранной кнопке и секции
            this.classList.add('active');
            document.getElementById(targetType).classList.add('active');
        });
    });
}

// Система викторин
function initQuizSystem() {
    const startButtons = document.querySelectorAll('.start-quiz');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quizType = this.dataset.quiz;
            startQuiz(quizType);
        });
    });
}

// Данные для викторин
const quizData = {
    patriotism: {
        title: "Патриотизм и Родина",
        questions: [
            {
                question: "Какой цвет НЕ входит в государственный флаг Беларуси?",
                answers: ["Красный", "Зеленый", "Белый", "Синий"],
                correct: 3
            },
            {
                question: "Столица Республики Беларусь:",
                answers: ["Гродно", "Минск", "Брест", "Витебск"],
                correct: 1
            },
            {
                question: "Когда отмечается День Независимости Беларуси?",
                answers: ["3 июля", "25 марта", "7 ноября", "1 мая"],
                correct: 0
            },
            {
                question: "Кто является главой государства в Беларуси?",
                answers: ["Премьер-министр", "Президент", "Спикер парламента", "Министр"],
                correct: 1
            },
            {
                question: "Что означает слово 'патриотизм'?",
                answers: ["Любовь к Родине", "Знание истории", "Соблюдение законов", "Все перечисленное"],
                correct: 3
            }
        ]
    },
    rights: {
        title: "Права и обязанности",
        questions: [
            {
                question: "С какого возраста гражданин Беларуси может участвовать в выборах?",
                answers: ["16 лет", "18 лет", "21 год", "25 лет"],
                correct: 1
            },
            {
                question: "Какое право является основным для каждого гражданина?",
                answers: ["Право на образование", "Право на труд", "Право на жизнь", "Все перечисленное"],
                correct: 3
            },
            {
                question: "Обязан ли гражданин платить налоги?",
                answers: ["Да, это обязанность", "Нет, это право", "Только по желанию", "Только для богатых"],
                correct: 0
            },
            {
                question: "Что означает 'гражданская ответственность'?",
                answers: ["Знание законов", "Активное участие в жизни общества", "Выполнение обязанностей", "Все перечисленное"],
                correct: 3
            }
        ]
    },
    constitution: {
        title: "Конституция РБ",
        questions: [
            {
                question: "Когда была принята действующая Конституция Беларуси?",
                answers: ["1991 год", "1994 год", "1996 год", "2000 год"],
                correct: 2
            },
            {
                question: "Сколько разделов в Конституции Беларуси?",
                answers: ["6", "8", "9", "10"],
                correct: 2
            },
            {
                question: "Что является высшей ценностью в Конституции?",
                answers: ["Государство", "Человек", "Право", "Собственность"],
                correct: 1
            }
        ]
    },
    history: {
        title: "История Беларуси",
        questions: [
            {
                question: "В каком году Беларусь стала независимым государством?",
                answers: ["1990", "1991", "1992", "1993"],
                correct: 1
            },
            {
                question: "Кто был первым президентом Беларуси?",
                answers: ["Александр Лукашенко", "Станислав Шушкевич", "Вячеслав Кебич", "Зенон Позняк"],
                correct: 1
            },
            {
                question: "Какое событие произошло в 1941-1944 годах на территории Беларуси?",
                answers: ["Гражданская война", "Великая Отечественная война", "Первая мировая война", "Революция"],
                correct: 1
            }
        ]
    }
};

// Запуск викторины
function startQuiz(quizType) {
    const quiz = quizData[quizType];
    if (!quiz) return;
    
    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-container');
    
    // Создаем экземпляр QuizManager
    const quizManager = new QuizManager(container);
    quizManager.loadQuestions(quiz.questions);
    
    // Показываем модальное окно
    modal.style.display = 'block';
    
    // Обработка закрытия модального окна
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Инициализация игр
function initGames() {
    initFlagGame();
    initMemoryGame();
}

// Игра "Собери флаг"
function initFlagGame() {
    const elements = document.querySelectorAll('.flag-element');
    const targets = document.querySelectorAll('.flag-stripe');
    
    elements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.color);
        });
    });
    
    targets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            const color = e.dataTransfer.getData('text/plain');
            
            if (color === this.dataset.target) {
                this.style.backgroundColor = getColorValue(color);
                this.textContent = getColorName(color);
                showNotification('Правильно!', 'success');
            } else {
                showNotification('Неправильно! Попробуйте еще раз.', 'error');
            }
        });
    });
}

function getColorValue(color) {
    const colors = {
        'red': '#c53030',
        'green': '#007a3e',
        'white': '#ffffff',
        'ornament': '#ffd700'
    };
    return colors[color] || '#000000';
}

function getColorName(color) {
    const names = {
        'red': 'Красный',
        'green': 'Зеленый',
        'white': 'Белый',
        'ornament': 'Орнамент'
    };
    return names[color] || '';
}

// Проверка игры с флагом
function checkFlagGame() {
    const targets = document.querySelectorAll('.flag-stripe');
    let correct = 0;
    
    targets.forEach(target => {
        if (target.style.backgroundColor && target.style.backgroundColor !== '') {
            correct++;
        }
    });
    
    if (correct === 4) {
        showNotification('Отлично! Флаг собран правильно!', 'success');
    } else {
        showNotification(`Собрано ${correct} из 4 элементов. Продолжайте!`, 'info');
    }
}

// Игра "Память"
function initMemoryGame() {
    const memoryCards = [
        { id: 1, name: 'Минск', image: '🏛️' },
        { id: 2, name: 'Минск', image: '🏛️' },
        { id: 3, name: 'Брестская крепость', image: '🏰' },
        { id: 4, name: 'Брестская крепость', image: '🏰' },
        { id: 5, name: 'Несвижский замок', image: '🏯' },
        { id: 6, name: 'Несвижский замок', image: '🏯' },
        { id: 7, name: 'Беловежская пуща', image: '🌲' },
        { id: 8, name: 'Беловежская пуща', image: '🌲' }
    ];
    
    window.memoryCards = memoryCards;
}

function startMemoryGame() {
    const container = document.querySelector('.memory-cards');
    const cards = [...window.memoryCards];
    
    // Перемешиваем карточки
    cards.sort(() => Math.random() - 0.5);
    
    container.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.index = index;
        cardElement.innerHTML = '❓';
        
        cardElement.addEventListener('click', function() {
            flipCard(this, card);
        });
        
        container.appendChild(cardElement);
    });
    
    window.flippedCards = [];
    window.matchedPairs = 0;
}

function flipCard(cardElement, cardData) {
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }
    
    cardElement.classList.add('flipped');
    cardElement.innerHTML = cardData.image;
    
    window.flippedCards.push({ element: cardElement, data: cardData });
    
    if (window.flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = window.flippedCards;
    
    if (card1.data.id === card2.data.id) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        window.matchedPairs++;
        
        if (window.matchedPairs === 4) {
            showNotification('Поздравляем! Все пары найдены!', 'success');
        }
    } else {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.element.innerHTML = '❓';
        card2.element.innerHTML = '❓';
    }
    
    window.flippedCards = [];
}

// Инициализация головоломок
function initPuzzles() {
    initCrossword();
    initAnagram();
}

// Кроссворд
function initCrossword() {
    const crosswordGrid = document.querySelector('.crossword-grid');
    const gridSize = 5;
    
    crosswordGrid.innerHTML = '';
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1;
            cell.className = 'crossword-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            // Определяем, какие ячейки активны
            if ((i === 0 && j >= 0 && j <= 2) || // КОНСТИТУЦИЯ (горизонтально)
                (j === 0 && i >= 0 && i <= 2) || // ПАТРИОТИЗМ (вертикально)
                (i === 2 && j >= 2 && j <= 4) || // ПРЕЗИДЕНТ (горизонтально)
                (j === 2 && i >= 2 && i <= 4)) { // МИНСК (вертикально)
                cell.classList.add('active');
            } else {
                cell.disabled = true;
                cell.classList.add('disabled');
            }
            
            crosswordGrid.appendChild(cell);
        }
    }
}

function checkCrossword() {
    const cells = document.querySelectorAll('.crossword-cell.active');
    let correct = 0;
    let total = 0;
    
    // Проверяем слово "КОНСТИТУЦИЯ" (горизонтально, строка 0)
    const constitution = ['К', 'О', 'Н', 'С', 'Т', 'И', 'Т', 'У', 'Ц', 'И', 'Я'];
    for (let i = 0; i < constitution.length; i++) {
        const cell = document.querySelector(`[data-row="0"][data-col="${i}"]`);
        if (cell && cell.value.toUpperCase() === constitution[i]) {
            correct++;
        }
        total++;
    }
    
    // Проверяем слово "ПАТРИОТИЗМ" (вертикально, столбец 0)
    const patriotism = ['П', 'А', 'Т', 'Р', 'И', 'О', 'Т', 'И', 'З', 'М'];
    for (let i = 0; i < patriotism.length; i++) {
        const cell = document.querySelector(`[data-row="${i}"][data-col="0"]`);
        if (cell && cell.value.toUpperCase() === patriotism[i]) {
            correct++;
        }
        total++;
    }
    
    const percentage = Math.round((correct / total) * 100);
    showNotification(`Правильно заполнено ${percentage}% кроссворда!`, 'info');
}

// Анаграммы
function initAnagram() {
    const letters = document.querySelectorAll('.anagram-word .letter');
    const input = document.getElementById('anagram-input');
    
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            const letterText = this.dataset.letter;
            input.value += letterText;
            this.style.opacity = '0.5';
        });
    });
}

function checkAnagram() {
    const input = document.getElementById('anagram-input');
    const word = input.value.toLowerCase();
    
    const correctWords = ['патриот', 'патриотизм', 'родина', 'беларусь'];
    
    if (correctWords.includes(word)) {
        showNotification('Правильно!', 'success');
        input.style.backgroundColor = 'var(--light-green)';
    } else {
        showNotification('Неправильно! Попробуйте еще раз.', 'error');
        input.style.backgroundColor = 'var(--light-red)';
    }
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('quiz-modal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// Дополнительные стили для игр
const gameStyles = document.createElement('style');
gameStyles.textContent = `
    .quiz-grid, .test-grid, .games-grid, .puzzle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }
    
    .quiz-card, .test-card, .game-card, .puzzle-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .quiz-card:hover, .test-card:hover, .game-card:hover, .puzzle-card:hover {
        transform: translateY(-5px);
    }
    
    .quiz-icon, .game-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary-red), var(--primary-green));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }
    
    .quiz-icon i, .game-icon i {
        font-size: 24px;
        color: white;
    }
    
    .quiz-info {
        display: flex;
        gap: 15px;
        margin: 15px 0;
        font-size: 14px;
        color: #6b7280;
    }
    
    .quiz-info span {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .exercise-nav {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }
    
    .exercise-nav-btn {
        padding: 10px 20px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .exercise-nav-btn.active {
        background: var(--primary-red);
        color: white;
        border-color: var(--primary-green);
    }
    
    .exercise-nav-btn:hover {
        border-color: var(--primary-green);
    }
    
    .exercise-section {
        display: none;
    }
    
    .exercise-section.active {
        display: block;
    }
    
    .flag-game {
        display: flex;
        gap: 20px;
        margin: 20px 0;
    }
    
    .flag-elements {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .flag-element {
        padding: 10px;
        background: #f3f4f6;
        border: 2px dashed #d1d5db;
        border-radius: 8px;
        cursor: move;
        text-align: center;
    }
    
    .flag-element:hover {
        background: #e5e7eb;
    }
    
    .flag-target {
        flex: 1;
    }
    
    .flag-stripes {
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 200px;
    }
    
    .flag-stripe {
        flex: 1;
        border: 2px dashed #d1d5db;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6b7280;
    }
    
    .memory-game {
        margin: 20px 0;
    }
    
    .memory-cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-width: 400px;
        margin: 0 auto;
    }
    
    .memory-card {
        aspect-ratio: 1;
        background: var(--primary-red);
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .memory-card:hover {
        background: var(--primary-red);
    }
    
    .memory-card.flipped {
        background: white;
        color: var(--primary-red);
    }
    
    .memory-card.matched {
        background: var(--primary-green);
        color: white;
    }
    
    .crossword {
        margin: 20px 0;
    }
    
    .crossword-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2px;
        max-width: 300px;
        margin: 0 auto 20px;
    }
    
    .crossword-cell {
        width: 50px;
        height: 50px;
        text-align: center;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 18px;
        font-weight: bold;
    }
    
    .crossword-cell.active {
        background: white;
    }
    
    .crossword-cell.disabled {
        background: #f3f4f6;
        cursor: not-allowed;
    }
    
    .crossword-clues {
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
    }
    
    .clue {
        margin: 10px 0;
        padding: 10px;
        background: white;
        border-radius: 4px;
    }
    
    .anagram-game {
        margin: 20px 0;
    }
    
    .anagram-word {
        display: flex;
        gap: 10px;
        margin: 20px 0;
        justify-content: center;
    }
    
    .letter {
        width: 40px;
        height: 40px;
        background: var(--primary-red);
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .letter:hover {
        background: var(--primary-red);
        transform: scale(1.1);
    }
    
    .anagram-target {
        text-align: center;
    }
    
    .anagram-target input {
        padding: 10px;
        border: 2px solid #d1d5db;
        border-radius: 8px;
        font-size: 16px;
        text-align: center;
        width: 200px;
    }
    
    .quiz-modal-content {
        max-width: 800px;
        width: 90%;
    }
    
    .quiz-question {
        text-align: center;
    }
    
    .question-text {
        font-size: 1.2rem;
        margin: 20px 0;
        color: var(--primary-red);
    }
    
    .answers {
        display: grid;
        gap: 10px;
        margin: 20px 0;
    }
    
    .answer-btn {
        padding: 15px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
    }
    
    .answer-btn:hover {
        border-color: var(--primary-green);
        background: #dbeafe;
    }
    
    .quiz-progress {
        margin: 20px 0;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--primary-red);
        transition: width 0.3s ease;
    }
    
    .quiz-results {
        text-align: center;
    }
    
    .score-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-red), var(--primary-green));
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
    }
    
    .score-number {
        font-size: 2rem;
        font-weight: bold;
        color: white;
    }
    
    .score-message {
        font-size: 1.2rem;
        margin: 20px 0;
        color: var(--primary-red);
    }
    
    .score-details {
        color: #6b7280;
        margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
        .quiz-grid, .test-grid, .games-grid, .puzzle-grid {
            grid-template-columns: 1fr;
        }
        
        .flag-game {
            flex-direction: column;
        }
        
        .memory-cards {
            grid-template-columns: repeat(3, 1fr);
        }
        
        .crossword-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }
`;
document.head.appendChild(gameStyles);
