// JavaScript для страницы методических кейсов

document.addEventListener('DOMContentLoaded', function() {
    initCasesPage();
});

function initCasesPage() {
    initFilters();
    initCaseModals();
    initCaseDownloads();
}

// Инициализация фильтров
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Удаляем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к выбранной кнопке
            this.classList.add('active');
            
            // Фильтруем карточки
            caseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Инициализация модальных окон для кейсов
function initCaseModals() {
    const modal = document.getElementById('case-modal');
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

// Открытие модального окна с деталями кейса
function openCaseModal(caseId) {
    const modal = document.getElementById('case-modal');
    const detailsContainer = document.getElementById('case-details');
    
    // Данные кейсов
    const caseData = {
        case1: {
            title: "Я - гражданин Беларуси",
            category: "Классный час",
            age: "5-7 классы",
            duration: "45 минут",
            description: "Формирование гражданской идентичности у учащихся среднего звена через изучение государственной символики и истории страны.",
            objectives: [
                "Формирование патриотических чувств",
                "Изучение государственной символики",
                "Развитие гражданской ответственности",
                "Воспитание уважения к истории страны"
            ],
            materials: [
                "Государственный флаг и герб Беларуси",
                "Презентация 'Символы государства'",
                "Видеоролик о Беларуси",
                "Рабочие листы для учащихся",
                "Карта Беларуси",
                "Аудиозаписи гимна"
            ],
            steps: [
                {
                    step: "Организационный момент",
                    duration: "5 минут",
                    description: "Приветствие, проверка готовности к занятию, создание позитивного настроения"
                },
                {
                    step: "Беседа о Родине",
                    duration: "10 минут",
                    description: "Обсуждение понятия 'Родина', что значит быть гражданином Беларуси"
                },
                {
                    step: "Изучение символики",
                    duration: "15 минут",
                    description: "Знакомство с государственным флагом, гербом, гимном Беларуси"
                },
                {
                    step: "Интерактивная игра",
                    duration: "10 минут",
                    description: "Викторина 'Знаешь ли ты свою страну?'"
                },
                {
                    step: "Рефлексия",
                    duration: "5 минут",
                    description: "Подведение итогов, обсуждение впечатлений"
                }
            ],
            tips: [
                "Используйте наглядные материалы для лучшего восприятия",
                "Поощряйте активное участие всех учащихся",
                "Создавайте атмосферу гордости за свою страну",
                "Связывайте материал с личным опытом детей"
            ]
        },
        case2: {
            title: "Память поколений",
            category: "Проект",
            age: "8-11 классы",
            duration: "1 месяц",
            description: "Социальный проект по сохранению памяти о ветеранах Великой Отечественной войны и тружениках тыла.",
            objectives: [
                "Сохранение исторической памяти",
                "Воспитание уважения к ветеранам",
                "Развитие исследовательских навыков",
                "Формирование гражданской ответственности"
            ],
            materials: [
                "Анкеты для интервью",
                "Фотоаппарат/видеокамера",
                "Материалы для оформления",
                "Шаблоны презентаций",
                "Диктофон для записи интервью"
            ],
            steps: [
                {
                    step: "Планирование и подготовка",
                    duration: "1 неделя",
                    description: "Создание плана работы, распределение обязанностей, подготовка материалов"
                },
                {
                    step: "Сбор информации",
                    duration: "2 недели",
                    description: "Интервью с ветеранами, сбор фотографий и документов"
                },
                {
                    step: "Обработка данных",
                    duration: "1 неделя",
                    description: "Систематизация собранной информации, создание презентаций"
                },
                {
                    step: "Презентация результатов",
                    duration: "1 день",
                    description: "Публичная презентация проекта, создание стенда памяти"
                }
            ],
            tips: [
                "Организуйте встречи с ветеранами заранее",
                "Обучите учащихся навыкам интервьюирования",
                "Создайте атмосферу уважения и внимания",
                "Документируйте весь процесс работы"
            ]
        },
        case3: {
            title: "День Конституции Республики Беларусь",
            category: "Торжественное мероприятие",
            age: "8-11 классы",
            duration: "2 часа",
            description: "Торжественное мероприятие, посвященное изучению основного закона страны и формированию правовой культуры.",
            objectives: [
                "Изучение Конституции РБ",
                "Формирование правовой культуры",
                "Воспитание уважения к закону",
                "Развитие гражданской ответственности"
            ],
            materials: [
                "Текст Конституции РБ",
                "Презентация о правах и обязанностях",
                "Викторина по Конституции",
                "Государственная символика",
                "Аудиозаписи гимна РБ",
                "Грамоты и призы для награждения",
                "Раздаточные материалы с выдержками из Конституции",
                "Оборудование для викторины"
            ],
            steps: [
                {
                    step: "Торжественная линейка",
                    duration: "30 минут",
                    description: "Построение, вынос флага, исполнение гимна, вступительное слово о значимости Конституции, исторический экскурс"
                },
                {
                    step: "Просветительский блок",
                    duration: "45 минут",
                    description: "Интерактивная лекция с презентацией о структуре Конституции, правах и обязанностях граждан, дискуссия о важности основного закона"
                },
                {
                    step: "Интерактивная викторина",
                    duration: "30 минут",
                    description: "Командная игра с вопросами о Конституции, решение правовых казусов, проверка знаний основного закона"
                },
                {
                    step: "Заключительная часть",
                    duration: "15 минут",
                    description: "Подведение итогов викторины, награждение победителей, заключительное слово о роли Конституции в жизни государства и общества"
                }
            ],
            tips: [
                "Создайте торжественную атмосферу с использованием государственной символики",
                "Используйте интерактивные форматы для вовлечения аудитории",
                "Пригласите юриста или представителя власти для повышения статуса мероприятия",
                "Чередуйте теоретические блоки с практическими заданиями",
                "Обеспечьте информационное сопровождение на школьных стендах"
            ]
        },
        case4: {
            title: "Права и обязанности школьника",
            category: "Классный час",
            age: "5-7 классы",
            duration: "40 минут",
            description: "Правовое просвещение учащихся через изучение их прав и обязанностей в школе и обществе.",
            objectives: [
                "Изучение основных прав и обязанностей школьника",
                "Формирование ответственного отношения к своим правам и обязанностям",
                "Развитие правовой культуры и гражданского сознания",
                "Воспитание уважения к правам других людей"
            ],
            materials: [
                "Устав школы в доступной для детей форме",
                "Презентация «Права и обязанности школьника»",
                "Ситуационные задачи из школьной жизни",
                "Рабочие тетради или раздаточные материалы",
                "Плакат «Права и обязанности ученика»",
                "Карточки с названиями прав и обязанностей",
                "Маркеры, цветные карандаши",
                "Мультимедийное оборудование"
            ],
            steps: [
                {
                    step: "Вводная беседа «Что такое права?»",
                    duration: "5 минут",
                    description: "Обсуждение понятий «права» и «обязанности» на примерах из жизни школьников. Вопросы: «Что вы можете делать в школе?», «Что должны делать?», «Что вам разрешено?»"
                },
                {
                    step: "Изучение прав школьника",
                    duration: "15 минут",
                    description: "Работа с презентацией и Уставом школы. Изучение основных прав: право на образование, право на уважение человеческого достоинства, право на участие в школьной жизни. Интерактивное упражнение «Мои права» - распределение карточек с правами"
                },
                {
                    step: "Обсуждение обязанностей",
                    duration: "15 минут",
                    description: "Работа в группах: составление списка обязанностей школьника. Обсуждение важности выполнения обязанностей для защиты прав всех участников образовательного процесса. Игра «Закончи предложение»: «Я обязан... чтобы...»"
                },
                {
                    step: "Решение ситуационных задач",
                    duration: "5 минут",
                    description: "Разбор конкретных ситуаций из школьной жизни. Определение, какие права нарушены или какие обязанности не выполнены. Коллективное обсуждение вариантов решения конфликтных ситуаций"
                }
            ],
            tips: [
                "Используйте доступные и понятные примеры из школьной жизни",
                "Создайте доброжелательную атмосферу для открытого обсуждения",
                "Поощряйте активность всех учащихся, используя групповые формы работы",
                "Подчеркивайте взаимосвязь прав и обязанностей",
                "Используйте наглядные материалы для лучшего запоминания",
                "Связывайте теоретические положения с практическими ситуациями",
                "Уделите внимание формированию навыков цивилизованного отстаивания своих прав"
            ]
        },
        case5: {
            title: "Школьный двор - территория добра",
            category: "Проект",
            age: "5-7 классы",
            duration: "2 недели",
            description: "Экологический проект по благоустройству школьной территории и формированию экологической ответственности.",
            objectives: [
                "Благоустройство школьной территории",
                "Формирование экологической культуры учащихся",
                "Развитие трудовых навыков и ответственности",
                "Воспитание бережного отношения к природе",
                "Создание комфортной среды для отдыха и обучения"
            ],
            materials: [
                "Садовый инвентарь (лопаты, грабли, перчатки)",
                "Семена цветов и саженцы кустарников",
                "Краски для оформления клумб и скамеек",
                "Фотоаппарат для фиксации этапов работы",
                "Мешки для мусора",
                "Удобрения и грунт",
                "Кисти и малярные принадлежности",
                "Поливочные шланги и лейки"
            ],
            steps: [
                {
                    step: "Планирование работ",
                    duration: "2 дня",
                    description: "Разработка плана благоустройства территории, распределение зон ответственности между классами, создание проектов клумб и зеленых зон, инструктаж по технике безопасности"
                },
                {
                    step: "Подготовка территории",
                    duration: "3 дня",
                    description: "Уборка мусора на школьном дворе, прополка существующих клумб, подготовка почвы для посадки растений, разметка участков для новых зеленых зон"
                },
                {
                    step: "Посадка растений",
                    duration: "5 дней",
                    description: "Высадка саженцев кустарников и деревьев, посев семян цветов на клумбах, установка табличек с названиями растений, организация регулярного полива и ухода"
                },
                {
                    step: "Оформление и презентация",
                    duration: "4 дня",
                    description: "Покраска и декорирование клумб, скамеек, создание тематических композиций, подготовка фотоотчета о проекте, организация выставки результатов работы для родителей и учителей"
                }
            ],
            tips: [
                "Обеспечьте постоянный контроль за соблюдением техники безопасности",
                "Распределите задания с учетом возрастных особенностей учащихся",
                "Организуйте работу в малых группах с закреплением ответственных",
                "Используйте игровые формы для поддержания интереса к проекту",
                "Документируйте все этапы работы для создания летописи проекта",
                "Привлекайте родителей к помощи в организации работ",
                "Проводите ежедневные летучки для обсуждения прогресса и проблем",
                "Создайте систему поощрения самых активных участников проекта"
            ]
        },
        case6: {
            title: "Встреча с ветеранами",
            category: "Мероприятие",
            age: "8-11 классы",
            duration: "1.5 часа",
            description: "Воспитательное мероприятие, направленное на сохранение памяти о Великой Отечественной войне и воспитание патриотизма.",
            objectives: [
                "Сохранение исторической памяти о Великой Отечественной войне",
                "Воспитание уважения к ветеранам и труженикам тыла",
                "Формирование патриотических чувств и гражданской ответственности",
                "Развитие эмоциональной отзывчивости и сопереживания"
            ],
            materials: [
                "Фото и документы военных лет",
                "Цветы для ветеранов",
                "Презентация о событиях Великой Отечественной войны",
                "Музыкальное сопровождение (военные песни)",
                "Творческие работы учащихся (рисунки, сочинения)",
                "Памятные подарки для ветеранов",
                "Мультимедийное оборудование",
                "Торжественное оформление зала"
            ],
            steps: [
                {
                    step: "Встреча ветеранов",
                    duration: "15 минут",
                    description: "Торжественная встреча ветеранов у входа в школу, вручение цветов, сопровождение в актовый зал. Создание атмосферы уважения и внимания"
                },
                {
                    step: "Выступления учащихся",
                    duration: "30 минут",
                    description: "Творческие номера подготовленные школьниками: чтение стихов о войне, музыкальные композиции, инсценировки, демонстрация презентации о военных событиях"
                },
                {
                    step: "Рассказы ветеранов",
                    duration: "45 минут",
                    description: "Выступления ветеранов с воспоминаниями о военных годах, ответы на вопросы учащихся. Неформальное общение за чаепитием"
                },
                {
                    step: "Вручение подарков",
                    duration: "15 минут",
                    description: "Торжественное вручение ветеранам памятных подарков, сделанных руками учащихся. Коллективное фото на память. Благодарственные слова от администрации школы"
                }
            ],
            tips: [
                "Создайте теплую и доверительную атмосферу для общения",
                "Заранее подготовьте вопросы для диалога с ветеранами",
                "Обеспечьте комфортные условия для пожилых людей",
                "Продумайте музыкальное сопровождение соответствующих теме",
                "Подготовьте учащихся к уважительному и внимательному общению",
                "Организуйте фото- и видеосъемку для школьного архива",
                "Предусмотрите возможность для неформального общения после официальной части"
            ]
        },
    };
    
    const caseInfo = caseData[caseId];
    if (!caseInfo) return;
    
    // Создаем HTML для модального окна
    detailsContainer.innerHTML = `
        <div class="case-detail-header">
            <div class="case-detail-meta">
                <span class="case-detail-category">${caseInfo.category}</span>
                <span class="case-detail-age">${caseInfo.age}</span>
                <span class="case-detail-duration">${caseInfo.duration}</span>
            </div>
            <h2>${caseInfo.title}</h2>
            <p class="case-detail-description">${caseInfo.description}</p>
        </div>
        
        <div class="case-detail-content">
            <div class="case-detail-section">
                <h3><i class="fas fa-bullseye"></i> Цели и задачи</h3>
                <ul class="case-detail-list">
                    ${caseInfo.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="case-detail-section">
                <h3><i class="fas fa-tools"></i> Необходимые материалы</h3>
                <ul class="case-detail-list">
                    ${caseInfo.materials.map(mat => `<li>${mat}</li>`).join('')}
                </ul>
            </div>
            
            <div class="case-detail-section">
                <h3><i class="fas fa-list-ol"></i> Ход работы</h3>
                <div class="case-detail-steps">
                    ${caseInfo.steps.map((step, index) => `
                        <div class="case-detail-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.step}</h4>
                                <p class="step-duration">${step.duration}</p>
                                <p class="step-description">${step.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="case-detail-section">
                <h3><i class="fas fa-lightbulb"></i> Советы и рекомендации</h3>
                <ul class="case-detail-list">
                    ${caseInfo.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="case-detail-actions">
            <button class="btn btn-primary" onclick="downloadCase('${caseId}')">
                <i class="fas fa-download"></i> Скачать полный сценарий
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Скачивание кейса
function downloadCase(caseId) {
    showNotification('Подготовка файла для скачивания...', 'info');

    // Проверяем валидность ID кейса
    if (caseId < 1 || caseId > 6) {
        showNotification('Файл не найден! Доступны кейсы с 1 по 6', 'error');
        return;
    }

    // Формируем путь к файлу
    const fileName = `${caseId}.docx`;
    const filePath = `documents/${fileName}`;

    // Имитация подготовки файла
    setTimeout(() => {
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        link.style.display = 'none';

        // Добавляем ссылку в DOM и эмулируем клик
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification(`Файл "${fileName}" успешно скачан!`, 'success');
    }, 1500);
}

// Альтернативный вариант с обработкой ошибок
async function downloadCaseWithValidation(caseId) {
    showNotification('Подготовка файла для скачивания...', 'info');

    try {
        // Валидация номера кейса
        const caseNumber = parseInt(caseId);
        if (isNaN(caseNumber) || caseNumber < 1 || caseNumber > 6) {
            throw new Error('Доступны кейсы с 1 по 6');
        }

        const fileName = `case${caseNumber}.docx`;
        const filePath = `documents/${fileName}`;

        // Проверяем доступность файла
        const response = await fetch(filePath, { method: 'HEAD' });
        if (!response.ok) {
            throw new Error('Файл не найден на сервере');
        }

        // Скачивание файла
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = filePath;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showNotification(`Файл "${fileName}" успешно скачан!`, 'success');
        }, 1000);

    } catch (error) {
        showNotification(`Ошибка: ${error.message}`, 'error');
    }
}

// Пример использования:
// downloadCase(1); - скачает documents/case1.docx
// downloadCase(3); - скачает documents/case3.docx
// Поделиться кейсом
function shareCase(caseId) {
    const url = window.location.href;
    const title = document.querySelector(`[data-case="${caseId}"] h3`).textContent;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Посмотрите этот методический кейс',
            url: url
        });
    } else {
        // Копируем ссылку в буфер обмена
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Ссылка скопирована в буфер обмена!', 'success');
        });
    }
}

// Инициализация скачивания кейсов
function initCaseDownloads() {
    const downloadButtons = document.querySelectorAll('[onclick*="downloadCase"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const caseId = this.onclick.toString().match(/'([^']+)'/)[1];
            downloadCase(caseId);
        });
    });
}

// Поиск по кейсам
function initCaseSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск по кейсам...';
    searchInput.className = 'case-search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'case-search-container';
    searchContainer.appendChild(searchInput);
    
    // Добавляем поиск перед фильтрами
    const filtersContainer = document.querySelector('.cases-filters');
    filtersContainer.parentNode.insertBefore(searchContainer, filtersContainer);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const caseCards = document.querySelectorAll('.case-card');
        
        caseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Добавление кейса в избранное
function addToFavorites(caseId) {
    const favorites = loadFromStorage('case-favorites') || [];
    
    if (!favorites.includes(caseId)) {
        favorites.push(caseId);
        saveToStorage('case-favorites', favorites);
        showNotification('Кейс добавлен в избранное!', 'success');
    } else {
        showNotification('Кейс уже в избранном!', 'info');
    }
}

// Создание PDF кейса (имитация)
function generateCasePDF(caseId) {
    const caseData = getCaseData(caseId);
    
    // В реальном проекте здесь будет генерация PDF
    const pdfContent = `
        МЕТОДИЧЕСКИЙ КЕЙС
        ${caseData.title}
        
        Категория: ${caseData.category}
        Возрастная группа: ${caseData.age}
        Продолжительность: ${caseData.duration}
        
        Описание:
        ${caseData.description}
        
        Цели:
        ${caseData.objectives.map(obj => `• ${obj}`).join('\n')}
        
        Материалы:
        ${caseData.materials.map(mat => `• ${mat}`).join('\n')}
        
        Ход работы:
        ${caseData.steps.map((step, index) => 
            `${index + 1}. ${step.step} (${step.duration})\n   ${step.description}`
        ).join('\n\n')}
        
        Советы:
        ${caseData.tips.map(tip => `• ${tip}`).join('\n')}
    `;
    
    return pdfContent;
}

// Получение данных кейса
function getCaseData(caseId) {
    // Возвращаем данные кейса (в реальном проекте это может быть AJAX запрос)
    return {
        title: "Название кейса",
        category: "Категория",
        age: "Возрастная группа",
        duration: "Продолжительность",
        description: "Описание кейса",
        objectives: ["Цель 1", "Цель 2"],
        materials: ["Материал 1", "Материал 2"],
        steps: [
            { step: "Шаг 1", duration: "10 мин", description: "Описание шага" }
        ],
        tips: ["Совет 1", "Совет 2"]
    };
}

// Инициализация дополнительных функций
document.addEventListener('DOMContentLoaded', function() {
    initCaseSearch();
});

// Стили для модального окна кейсов
const caseModalStyles = document.createElement('style');
caseModalStyles.textContent = `
    .case-modal-content {
        max-width: 900px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .case-detail-header {
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 20px;
        margin-bottom: 30px;
    }
    
    .case-detail-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        flex-wrap: wrap;
    }
    
    .case-detail-category,
    .case-detail-age,
    .case-detail-duration {
        background: var(--primary-red);
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
    }
    
    .case-detail-description {
        font-size: 1.1rem;
        color: #6b7280;
        line-height: 1.6;
    }
    
    .case-detail-content {
        margin-bottom: 30px;
    }
    
    .case-detail-section {
        margin-bottom: 30px;
    }
    
    .case-detail-section h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .case-detail-section h3 i {
        color: var(--primary-green);
    }
    
    .case-detail-list {
        list-style: none;
        padding: 0;
    }
    
    .case-detail-list li {
        padding: 8px 0;
        border-bottom: 1px solid #f3f4f6;
        position: relative;
        padding-left: 20px;
    }
    
    .case-detail-list li::before {
        content: '•';
        color: var(--primary-green);
        font-weight: bold;
        position: absolute;
        left: 0;
    }
    
    .case-detail-steps {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .case-detail-step {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: #f9fafb;
        border-radius: 8px;
        border-left: 4px solid var(--primary-green);
    }
    
    .step-number {
        width: 40px;
        height: 40px;
        background: var(--primary-red);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }
    
    .step-content h4 {
        color: var(--primary-red);
        margin-bottom: 5px;
    }
    
    .step-duration {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 8px;
    }
    
    .step-description {
        color: #374151;
        line-height: 1.5;
    }
    
    .case-detail-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        padding-top: 20px;
        border-top: 2px solid #e5e7eb;
    }
    
    .case-search-container {
        margin-bottom: 20px;
        text-align: center;
    }
    
    .case-search-input {
        width: 100%;
        max-width: 500px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .case-search-input:focus {
        outline: none;
        border-color: var(--primary-green);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .cases-filters {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .filter-btn {
        padding: 10px 20px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }
    
    .filter-btn.active {
        background: var(--primary-red);
        color: white;
        border-color: var(--primary-green);
    }
    
    .filter-btn:hover {
        border-color: var(--primary-green);
    }
    
    .cases-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
        margin-bottom: 50px;
    }
    
    .case-card {
        background: white;
        border-radius: 12px;
        padding: 25px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .case-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-color: var(--primary-green);
    }
    
    .case-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .case-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-red), var(--primary-green));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .case-icon i {
        font-size: 20px;
        color: white;
    }
    
    .case-meta {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .case-category,
    .case-age,
    .case-duration {
        background: #f3f4f6;
        color: #374151;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .case-card h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .case-card p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
    }
    
    .case-objectives,
    .case-materials,
    .case-steps {
        margin-bottom: 20px;
    }
    
    .case-objectives h4,
    .case-materials h4,
    .case-steps h4 {
        color: var(--primary-red);
        margin-bottom: 10px;
        font-size: 1rem;
    }
    
    .case-objectives ul,
    .case-materials ul,
    .case-steps ol {
        margin: 0;
        padding-left: 20px;
    }
    
    .case-objectives li,
    .case-materials li,
    .case-steps li {
        color: #6b7280;
        margin-bottom: 5px;
        font-size: 14px;
    }
    
    .case-actions {
        display: flex;
        gap: 10px;
        justify-content: space-between;
    }
    
    .tips-section {
        background: #f9fafb;
        padding: 40px;
        border-radius: 12px;
        margin-top: 50px;
    }
    
    .tips-section h2 {
        text-align: center;
        color: var(--primary-red);
        margin-bottom: 30px;
    }
    
    .tips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .tip-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }
    
    .tip-icon {
        width: 40px;
        height: 40px;
        background: var(--primary-red);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }
    
    .tip-icon i {
        color: white;
        font-size: 18px;
    }
    
    .tip-card h3 {
        color: var(--primary-red);
        margin-bottom: 15px;
    }
    
    .tip-card ul {
        list-style: none;
        padding: 0;
    }
    
    .tip-card li {
        padding: 5px 0;
        color: #6b7280;
        font-size: 14px;
        position: relative;
        padding-left: 15px;
    }
    
    .tip-card li::before {
        content: '•';
        color: var(--primary-green);
        position: absolute;
        left: 0;
    }
    
    @media (max-width: 768px) {
        .cases-grid {
            grid-template-columns: 1fr;
        }
        
        .case-detail-actions {
            flex-direction: column;
        }
        
        .case-header {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .case-meta {
            flex-direction: row;
            gap: 10px;
        }
    }
`;
document.head.appendChild(caseModalStyles);
