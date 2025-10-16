// JavaScript для страницы методической базы

document.addEventListener('DOMContentLoaded', function() {
    initMethodologyPage();
});

function initMethodologyPage() {
    initContentNavigation();
    initTabs();
    initResourceDownloads();
    initVideoGallery();
}

// Навигация по разделам контента
function initContentNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Удаляем активный класс со всех кнопок и секций
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Добавляем активный класс к выбранной кнопке и секции
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Плавная прокрутка к секции
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Инициализация табов в разделе "Формы работы"
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Удаляем активный класс со всех кнопок и контентов
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к выбранной кнопке и контенту
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Обработка скачивания ресурсов
function initResourceDownloads() {
    const downloadLinks = document.querySelectorAll('.resource-item[download]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Показываем уведомление о скачивании
            showNotification('Начинается скачивание файла...', 'info');
            
            // Имитация скачивания (в реальном проекте здесь будет реальная ссылка)
            setTimeout(() => {
                showNotification('Файл успешно скачан!', 'success');
            }, 2000);
        });
    });
}

// Инициализация видео галереи
function initVideoGallery() {
    const videoItems = document.querySelectorAll('.video-item video');
    
    videoItems.forEach(video => {
        video.addEventListener('click', function() {
            // Открываем видео в полноэкранном режиме
            if (this.requestFullscreen) {
                this.requestFullscreen();
            } else if (this.webkitRequestFullscreen) {
                this.webkitRequestFullscreen();
            } else if (this.msRequestFullscreen) {
                this.msRequestFullscreen();
            }
        });
        
        // Добавляем индикатор воспроизведения
        video.addEventListener('play', function() {
            this.parentElement.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            this.parentElement.classList.remove('playing');
        });
    });
}

// Функция для поиска по контенту
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск по методическим материалам...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    // Добавляем поиск в начало контента
    const methodologyContent = document.querySelector('.methodology-content .container');
    methodologyContent.insertBefore(searchContainer, methodologyContent.firstChild);
    
    // Обработка поиска
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const contentSections = document.querySelectorAll('.content-section');
        
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}


// Стили для дополнительных элементов
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .search-container {
        margin-bottom: 30px;
        text-align: center;
    }
    
    .search-input {
        width: 100%;
        max-width: 500px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--primary-green);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .export-buttons {
        margin-top: 20px;
        text-align: center;
    }
    
    .export-buttons .btn {
        margin: 5px;
    }
    
    .video-item.playing::after {
        content: '▶';
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px;
        border-radius: 3px;
        font-size: 12px;
    }
    
    .video-item {
        position: relative;
        cursor: pointer;
    }
    
    .video-item:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);
