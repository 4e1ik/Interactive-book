// JavaScript для страницы обратной связи

document.addEventListener('DOMContentLoaded', function() {
    initFeedbackPage();
});

function initFeedbackPage() {
    initFeedbackForm();
    initFAQ();
    initRating();
    initFormValidation();
}

// Инициализация формы обратной связи
function initFeedbackForm() {
    const form = document.getElementById('feedback-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // Автосохранение формы
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveFormData();
        });
    });
    
    // Восстановление данных формы
    loadFormData();
}

// Обработка отправки формы
function handleFormSubmit() {
    const form = document.getElementById('feedback-form');
    const formData = new FormData(form);
    
    // Валидация формы
    if (!validateForm(form)) {
        return;
    }
    
    // Показываем индикатор загрузки
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Имитация отправки данных
    setTimeout(() => {
        // Собираем данные формы
        const feedbackData = {
            type: formData.get('type'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            rating: formData.get('rating'),
            newsletter: formData.get('newsletter') === 'on',
            privacy: formData.get('privacy') === 'on',
            timestamp: new Date().toISOString()
        };
        
        // Сохраняем в localStorage (в реальном проекте здесь будет отправка на сервер)
        const feedbacks = loadFromStorage('feedback-messages') || [];
        feedbacks.push(feedbackData);
        saveToStorage('feedback-messages', feedbacks);
        
        // Показываем сообщение об успехе
        showSuccessMessage();
        
        // Сбрасываем форму
        form.reset();
        clearFormData();
        
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Валидация формы
function validateForm(form) {
    let isValid = true;
    
    // Очищаем предыдущие ошибки
    clearFormErrors();
    
    // Проверяем обязательные поля
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Это поле обязательно для заполнения');
            isValid = false;
        }
    });
    
    // Проверяем email
    const emailField = form.querySelector('#feedback-email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Введите корректный email адрес');
        isValid = false;
    }
    
    // Проверяем телефон
    const phoneField = form.querySelector('#feedback-phone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        showFieldError(phoneField, 'Введите корректный номер телефона');
        isValid = false;
    }
    
    // Проверяем длину сообщения
    const messageField = form.querySelector('#feedback-message');
    if (messageField.value.length < 10) {
        showFieldError(messageField, 'Сообщение должно содержать минимум 10 символов');
        isValid = false;
    }
    
    return isValid;
}

// Показать ошибку поля
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// Очистить ошибки формы
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(element => element.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Проверка телефона
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Показать сообщение об успехе
function showSuccessMessage() {
    const successModal = createSuccessModal();
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        successModal.remove();
    }, 5000);
}

// Создать модальное окно успеха
function createSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Сообщение отправлено!</h3>
            <p>Спасибо за ваше обращение. Мы рассмотрим его в ближайшее время и обязательно ответим.</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Закрыть</button>
        </div>
    `;
    
    return modal;
}

// Инициализация FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Закрываем все другие FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Переключаем текущий FAQ
            if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Инициализация рейтинга
function initRating() {
    const ratingInputs = document.querySelectorAll('.rating-input input[type="radio"]');
    
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const rating = this.value;
            updateRatingDisplay(rating);
        });
    });
}

// Обновить отображение рейтинга
function updateRatingDisplay(rating) {
    const stars = document.querySelectorAll('.rating-input label i');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Инициализация валидации формы
function initFormValidation() {
    const form = document.getElementById('feedback-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Валидация в реальном времени
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Очистка ошибок при вводе
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
    });
}

// Валидация отдельного поля
function validateField(field) {
    const value = field.value.trim();
    
    // Очищаем предыдущую ошибку
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Проверяем обязательные поля
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Это поле обязательно для заполнения');
        return false;
    }
    
    // Специфичные проверки
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Введите корректный email адрес');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Введите корректный номер телефона');
        return false;
    }
    
    if (field.id === 'feedback-message' && value && value.length < 10) {
        showFieldError(field, 'Сообщение должно содержать минимум 10 символов');
        return false;
    }
    
    return true;
}

// Автосохранение данных формы
function saveFormData() {
    const form = document.getElementById('feedback-form');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    saveToStorage('feedback-form-draft', data);
}

// Загрузка сохраненных данных формы
function loadFormData() {
    const savedData = loadFromStorage('feedback-form-draft');
    if (!savedData) return;
    
    const form = document.getElementById('feedback-form');
    
    Object.keys(savedData).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = savedData[key] === 'on';
            } else {
                field.value = savedData[key];
            }
        }
    });
    
    // Обновляем рейтинг если он был выбран
    if (savedData.rating) {
        updateRatingDisplay(savedData.rating);
    }
}

// Очистка сохраненных данных формы
function clearFormData() {
    localStorage.removeItem('feedback-form-draft');
}

// Аналитика обращений
function getFeedbackStats() {
    const feedbacks = loadFromStorage('feedback-messages') || [];
    
    const stats = {
        total: feedbacks.length,
        byType: {},
        byRating: {},
        recent: feedbacks.filter(f => {
            const feedbackDate = new Date(f.timestamp);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return feedbackDate > weekAgo;
        }).length
    };
    
    feedbacks.forEach(feedback => {
        // Статистика по типам
        stats.byType[feedback.type] = (stats.byType[feedback.type] || 0) + 1;
        
        // Статистика по рейтингам
        if (feedback.rating) {
            stats.byRating[feedback.rating] = (stats.byRating[feedback.rating] || 0) + 1;
        }
    });
    
    return stats;
}

// Экспорт обращений
function exportFeedback() {
    const feedbacks = loadFromStorage('feedback-messages') || [];
    
    if (feedbacks.length === 0) {
        showNotification('Нет данных для экспорта', 'info');
        return;
    }
    
    const csvContent = generateCSV(feedbacks);
    downloadCSV(csvContent, 'feedback-export.csv');
    
    showNotification('Данные экспортированы успешно', 'success');
}

// Генерация CSV
function generateCSV(feedbacks) {
    const headers = ['Дата', 'Тип', 'Имя', 'Email', 'Роль', 'Тема', 'Сообщение', 'Рейтинг'];
    const rows = feedbacks.map(feedback => [
        new Date(feedback.timestamp).toLocaleDateString('ru-RU'),
        feedback.type,
        feedback.name,
        feedback.email,
        feedback.role,
        feedback.subject,
        feedback.message.replace(/\n/g, ' '),
        feedback.rating || ''
    ]);
    
    return [headers, ...rows].map(row => 
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
}

// Скачивание CSV
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Стили для страницы обратной связи
const feedbackStyles = document.createElement('style');
feedbackStyles.textContent = `
    .feedback-content {
        padding: 40px 0;
    }
    
    .feedback-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 40px;
        margin-bottom: 50px;
    }
    
    .feedback-form-section {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .feedback-form-section h2 {
        color: var(--primary-red);
        margin-bottom: 25px;
        text-align: center;
    }
    
    .feedback-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
   
    
    .form-group label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #374151;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-green);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
        color: #ef4444;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .rating-input {
        display: flex;
        flex-direction: row-reverse;
        gap: 5px;
    }
    
    .rating-input input[type="radio"] {
        display: none;
    }
    
    .rating-input label {
        cursor: pointer;
        font-size: 24px;
        color: #d1d5db;
        transition: color 0.3s ease;
    }
    
    .rating-input label:hover,
    .rating-input label:hover ~ label,
    .rating-input input:checked ~ label {
        color: #fbbf24;
    }
    
    .rating-input label i.active {
        color: #fbbf24;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .checkbox-label input[type="checkbox"] {
        display: none;
    }
    
    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #d1d5db;
        border-radius: 4px;
        position: relative;
        transition: all 0.3s ease;
    }
    
    label.checkbox-label {
    display: flex;
    }
    
    .checkbox-label input[type="checkbox"]:checked + .checkmark {
        background: var(--primary-red);
        border-color: var(--primary-green);
    }
    
    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
    }
    
    .submit-btn {
        padding: 15px 30px;
        background: var(--primary-red);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .submit-btn:hover {
        background: var(--primary-red);
        transform: translateY(-2px);
    }
    
    .submit-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
    }
    
    .contact-info-section {
        background: #f9fafb;
        padding: 30px;
        border-radius: 12px;
        height: fit-content;
    }
    
    .contact-info-section h2 {
        color: var(--primary-red);
        margin-bottom: 25px;
        text-align: center;
    }
    
    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .contact-method {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }
    
    .contact-icon {
        width: 40px;
        height: 40px;
        background: var(--primary-red);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .contact-icon i {
        color: white;
        font-size: 16px;
    }
    
    .contact-details h3 {
        color: var(--primary-red);
        margin-bottom: 5px;
        font-size: 16px;
    }
    
    .contact-details p {
        color: #6b7280;
        font-size: 14px;
        margin: 2px 0;
    }
    
    .social-section {
        margin-bottom: 30px;
    }
    
    .social-section h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
        text-align: center;
    }
    
    .social-links {
        display: flex;
        gap: 10px;
    }
    
    .social-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        transition: all 0.3s ease;
    }
    
    .social-link.facebook {
        background: #1877f2;
    }
    
    .social-link.vk {
        background: #0077ff;
    }
    
    .social-link.telegram {
        background: #0088cc;
    }
    
    .social-link.instagram {
        background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    }
    
    .social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.2);
    }
    
    .faq-section h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
        text-align: center;
    }
    
    .faq-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .faq-item {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }
    
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .faq-question:hover {
        background: #f3f4f6;
    }
    
    .faq-question h4 {
        color: var(--primary-red);
        margin: 0;
        font-size: 14px;
    }
    
    .faq-question i {
        color: #6b7280;
        transition: transform 0.3s ease;
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .faq-answer p {
        padding: 0 15px 15px;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
    }
    
    .testimonials-section {
        margin: 50px 0;
    }
    
    .testimonials-section h2 {
        text-align: center;
        color: var(--primary-red);
        margin-bottom: 30px;
    }
    
    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }
    
    .testimonial-card {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .testimonial-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .testimonial-avatar {
        width: 50px;
        height: 50px;
        background: var(--primary-red);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .testimonial-avatar i {
        color: white;
        font-size: 20px;
    }
    
    .testimonial-info h4 {
        color: var(--primary-red);
        margin: 0 0 5px 0;
        font-size: 16px;
    }
    
    .testimonial-info p {
        color: #6b7280;
        margin: 0 0 5px 0;
        font-size: 14px;
    }
    
    .testimonial-rating {
        display: flex;
        gap: 2px;
    }
    
    .testimonial-rating i {
        color: #fbbf24;
        font-size: 12px;
    }
    
    .testimonial-text {
        color: #374151;
        line-height: 1.6;
        font-style: italic;
    }
    
    .stats-section {
        margin: 50px 0;
    }
    
    .stats-section h2 {
        text-align: center;
        color: var(--primary-red);
        margin-bottom: 30px;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .stat-card {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 15px;
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .stat-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-red), var(--primary-green));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .stat-icon i {
        color: white;
        font-size: 20px;
    }
    
    .stat-info h3 {
        color: var(--primary-red);
        margin: 0 0 5px 0;
        font-size: 24px;
    }
    
    .stat-info p {
        color: #6b7280;
        margin: 0;
        font-size: 14px;
    }
    
    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }
    
    .success-content {
        background: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: slideIn 0.3s ease-out;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background: var(--primary-green);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
    }
    
    .success-icon i {
        color: white;
        font-size: 40px;
    }
    
    .success-content h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
    }
    
    .success-content p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 25px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .feedback-grid {
            grid-template-columns: 1fr;
            gap: 30px;
        }
        
        .testimonials-grid,
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .contact-method {
            flex-direction: column;
            text-align: center;
        }
        
        .stat-card {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(feedbackStyles);
