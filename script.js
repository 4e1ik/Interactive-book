// Основной JavaScript файл для интерактивности сайта

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initScrollEffects();
    initModals();
});

// Навигация
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Анимации при прокрутке
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    document.querySelectorAll('.section-card, .feature, .method-item, .concept-card').forEach(el => {
        observer.observe(el);
    });
}

// Инициализация анимаций
function initAnimations() {
    // Анимация появления элементов
    const animateElements = document.querySelectorAll('.section-card, .feature, .stat-item');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Добавление класса для анимации
    const animateInClass = 'animate-in';
    const animateElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animateInClass);
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => animateElementsObserver.observe(el));
}

// Модальные окна
function initModals() {
    // Создание модального окна для видео
    const videoModal = createModal('video-modal');
    
    // Обработка кликов на видео
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('click', function() {
            showVideoModal(this.src);
        });
    });
}

// Создание модального окна
function createModal(id) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Обработка закрытия
    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

// Показать видео в модальном окне
function showVideoModal(videoSrc) {
    const modal = document.getElementById('video-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <video controls autoplay style="width: 100%; max-width: 800px;">
            <source src="${videoSrc}" type="video/mp4">
            Ваш браузер не поддерживает видео.
        </video>
    `;
    
    modal.style.display = 'block';
}

// Утилиты для работы с формами
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : type === 'error' ? 'var(--primary-red)' : 'var(--primary-red)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Анимации для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(notificationStyles);

// Функция для загрузки контента
async function loadContent(url, container) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        container.innerHTML = content;
    } catch (error) {
        console.error('Ошибка загрузки контента:', error);
        showNotification('Ошибка загрузки контента', 'error');
    }
}

// Функция для сохранения данных в localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
    }
}

// Функция для загрузки данных из localStorage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return null;
    }
}

// Функция для работы с тестами
class QuizManager {
    constructor(container) {
        this.container = container;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.questions = [];
    }
    
    loadQuestions(questions) {
        this.questions = questions;
        this.showQuestion(0);
    }
    
    showQuestion(index) {
        if (index >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[index];
        this.container.innerHTML = `
            <div class="quiz-question">
                <h3>Вопрос ${index + 1} из ${this.questions.length}</h3>
                <p class="question-text">${question.question}</p>
                <div class="answers">
                    ${question.answers.map((answer, i) => `
                        <button class="answer-btn" data-index="${i}">${answer}</button>
                    `).join('')}
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(index / this.questions.length) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Обработка выбора ответа
        this.container.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answerIndex = parseInt(e.target.dataset.index);
                this.selectAnswer(answerIndex);
            });
        });
    }
    
    selectAnswer(answerIndex) {
        this.answers[this.currentQuestion] = answerIndex;
        
        // Проверка правильности ответа
        const question = this.questions[this.currentQuestion];
        if (answerIndex === question.correct) {
            this.score++;
        }
        
        // Переход к следующему вопросу
        this.currentQuestion++;
        setTimeout(() => {
            this.showQuestion(this.currentQuestion);
        }, 1000);
    }
    
    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = 'Отлично! Вы хорошо знаете материал.';
        } else if (percentage >= 60) {
            message = 'Хорошо! Есть над чем поработать.';
        } else {
            message = 'Нужно повторить материал.';
        }
        
        this.container.innerHTML = `
            <div class="quiz-results">
                <h3>Результаты теста</h3>
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                </div>
                <p class="score-message">${message}</p>
                <p class="score-details">Правильных ответов: ${this.score} из ${this.questions.length}</p>
                <button class="btn btn-primary" onclick="location.reload()">Пройти заново</button>
            </div>
        `;
    }
}

// Экспорт функций для использования в других файлах
window.QuizManager = QuizManager;
window.showNotification = showNotification;
window.validateForm = validateForm;
window.saveToStorage = saveToStorage;
window.loadFromStorage = loadFromStorage;
