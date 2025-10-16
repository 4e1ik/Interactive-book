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
                question: "Патриотизм – это не только любовь к Родине, но и...",
                answers: [
                    "Убеждение, что твоя страна лучше всех в мире",
                    "Готовность действовать на благо своей страны",
                    "Знание и уважение к её истории, традициям и законам",
                    "Желание изолировать страну от внешнего влияния"
                ],
                correct: [1, 2]
            },
            {
                question: "Какой праздник в Беларуси отмечается 3 июля и является Днём Независимости?",
                answers: [
                    "День Октябрьской революции",
                    "День освобождения города Минска от немецко-фашистских захватчиков",
                    "День Республики",
                    "День подписания Декларации о государственном суверенитете"
                ],
                correct: 1
            },
            {
                question: "Что символизируют цвета на государственном флаге Республики Беларусь?",
                answers: [
                    "Красный – солнце, зелёный – природа, белый – чистота",
                    "Красный – кровь, пролитая за Отечество, зелёный – леса и поля, белый – свобода",
                    "Красный – сила и солнце, зелёный – надежда и плодородие, белый – мир и духовная чистота",
                    "Это цвета панафриканского флага"
                ],
                correct: 2
            },
            {
                question: "Какое из этих произведений является эталоном белорусской литературы и поэтической иллюстрацией любви к Родине?",
                answers: [
                    "«Сымон-музыка» Якуба Коласа",
                    "«Люди на болоте» Ивана Мележа",
                    "«Новая зямля» Якуба Коласа",
                    "«Як убачыў – як упаў» Андрея Федоренко"
                ],
                correct: 2
            },
            {
                question: "Как называется основной закон страны, который каждый гражданин, любящий свою Родину, должен знать и уважать?",
                answers: [
                    "Кодекс чести",
                    "Уголовный кодекс",
                    "Конституция",
                    "Декларация о государственном суверенитете"
                ],
                correct: 2
            },
            {
                question: "Какое историческое событие, произошедшее на территории современной Беларуси, является одним из ключевых символов воинской доблести и патриотизма?",
                answers: [
                    "Бородинское сражение",
                    "Оборона Брестской крепости в 1941 году",
                    "Ледовое побоище",
                    "Куликовская битва"
                ],
                correct: 1
            },
            {
                question: "Что изображено на Государственном гербе Республики Беларусь?",
                answers: [
                    "Сокол (пущаник) и крест Евфросинии Полоцкой",
                    "Контуры Беларуси, колосья, красная звезда и земной шар",
                    "Золотые колосья, переплетённые цветами клевера и льна, контуры Беларуси, восходящее солнце и красная звезда"
                ],
                correct: 2
            },
            {
                question: "Кто является авторами музыки и слов современного Государственного гимна Республики Беларусь?",
                answers: [
                    "Музыка – Нестор Соколовский, слова – Максим Богданович",
                    "Музыка – Михаил Клеофас Огинский, слова – Янка Купала",
                    "Музыка – Владимир Оловников, слова – Михась Климкович",
                    "Музыка – Сергей Михалок, слова – Лявон Вольский"
                ],
                correct: 2
            },
            {
                question: "Какая из перечисленных черт НЕ является характерной для сознательного патриота?",
                answers: [
                    "Активная гражданская позиция",
                    "Национализм и ксенофобия",
                    "Уважение к государственным символам",
                    "Бережное отношение к природному и культурному наследию"
                ],
                correct: 1
            },
            {
                question: "Какой город является культурной и исторической столицей Беларуси, где находится единственный в стране объект Всемирного наследия ЮНЕСКО?",
                answers: [
                    "Гродно",
                    "Минск",
                    "Несвиж",
                    "Полоцк"
                ],
                correct: 3
            },
            {
                question: "Какая организация молодёжного движения в Беларуси наиболее массово занимается патриотическим воспитанием?",
                answers: [
                    "БРСМ (Белорусский республиканский союз молодёжи)",
                    "БПС (Белорусская республиканская пионерская организация)",
                    "ОНТ (Общественное национальное телевидение)",
                    "Все перечисленные"
                ],
                correct: 0
            },
            {
                question: "Как звали первую женщину-белоруску, ставшую космонавтом?",
                answers: [
                    "Светлана Савицкая",
                    "Валентина Терешкова",
                    "Ольга Ковалевская",
                    "Беларусь ещё не имела своих женщин-космонавтов"
                ],
                correct: 2
            },
            {
                question: "Что, согласно Конституции, является высшей ценностью Республики Беларусь?",
                answers: [
                    "Государственная собственность",
                    "Человек, его права, свободы и гарантии их реализации",
                    "Государственная безопасность",
                    "Территориальная целостность"
                ],
                correct: 1
            },
            {
                question: "Какое из этих высказываний о патриотизме принадлежит классику белорусской литературы?",
                answers: [
                    "«Быць славным – гэта любіць Радзіму»",
                    "«Патриотизм – последнее прибежище негодяя»",
                    "«Любіце Радзіму – маці вашую!»",
                    "«Я не мыслю себя без России»"
                ],
                correct: 2
            }
        ]
    },
    rights: {
        title: "Права и обязанности",
        questions: [
            {
                question: "Какой основной закон закрепляет права и обязанности граждан Беларуси?",
                answers: [
                    "Уголовный кодекс",
                    "Трудовой кодекс",
                    "Конституция Республики Беларусь",
                    "Гражданский кодекс"
                ],
                correct: 2
            },
            {
                question: "С какого возраста гражданин Беларуси получает право участвовать в выборах в качестве избирателя?",
                answers: [
                    "С 16 лет",
                    "С 18 лет",
                    "С 21 года",
                    "С 35 лет"
                ],
                correct: 1
            },
            {
                question: "Какое из перечисленных прав относится к социально-экономическим правам гражданина?",
                answers: [
                    "Право на жизнь",
                    "Право на свободу мнений",
                    "Право на труд",
                    "Право на участие в управлении государством"
                ],
                correct: 2
            },
            {
                question: "Что согласно Конституции является обязанностью каждого гражданина Беларуси?",
                answers: [
                    "Соблюдать Конституцию и законы страны",
                    "Регулярно голосовать на выборах",
                    "Состоять в политической партии",
                    "Иметь высшее образование"
                ],
                correct: 0
            },
            {
                question: "До какого возраста в Беларуси гарантируется бесплатное общее среднее образование?",
                answers: [
                    "До 14 лет",
                    "До 16 лет",
                    "До 18 лет",
                    "До 21 года"
                ],
                correct: 2
            },
            {
                question: "Какое право включает в себя свободу собраний, митингов и демонстраций?",
                answers: [
                    "Право на свободу объединений",
                    "Право на обращение в государственные органы",
                    "Право на свободу мнений и убеждений",
                    "Право на участие в культурной жизни"
                ],
                correct: 0
            },
            {
                question: "Обязан ли гражданин Беларуси защищать Республику Беларусь?",
                answers: [
                    "Да, защита Республики Беларусь - обязанность и священный долг гражданина",
                    "Нет, это право, но не обязанность",
                    "Только в военное время",
                    "Только по контракту"
                ],
                correct: 0
            },
            {
                question: "Какое право гарантирует гражданам Беларуси бесплатную медицинскую помощь в государственных учреждениях здравоохранения?",
                answers: [
                    "Право на социальное обеспечение",
                    "Право на охрану здоровья",
                    "Право на благоприятную окружающую среду",
                    "Право на жилище"
                ],
                correct: 1
            },
            {
                question: "Что включает в себя обязанность 'сохранять историко-культурное наследие'?",
                answers: [
                    "Только посещение музеев",
                    "Только изучение истории в школе",
                    "Бережное отношение к памятникам истории и культуры",
                    "Создание новых культурных ценностей"
                ],
                correct: 2
            },
            {
                question: "Какое право позволяет гражданину свободно передвигаться и выбирать место жительства?",
                answers: [
                    "Право на свободу передвижения",
                    "Право на неприкосновенность жилища",
                    "Право на свободу вероисповедания",
                    "Право на национальную принадлежность"
                ],
                correct: 0
            },
            {
                question: "Обязан ли гражданин Беларуси платить налоги?",
                answers: [
                    "Да, все обязаны участвовать в финансировании государственных расходов",
                    "Нет, это добровольное пожертвование",
                    "Только юридические лица",
                    "Только при высоком доходе"
                ],
                correct: 0
            },
            {
                question: "Какое право гарантирует гражданину судебную защиту его прав и свобод?",
                answers: [
                    "Право на юридическую помощь",
                    "Право на обращение в международные организации",
                    "Право на равную защиту прав и законных интересов",
                    "Право на обжалование решений государственных органов"
                ],
                correct: 2
            }
        ]
    },
    constitution: {
        title: "Конституция РБ",
        questions: [
            {
                question: "Когда была принята действующая Конституция Республики Беларусь?",
                answers: [
                    "15 марта 1994 года",
                    "27 июля 1990 года",
                    "24 ноября 1996 года",
                    "10 декабря 1998 года"
                ],
                correct: 0
            },
            {
                question: "Сколько разделов в Конституции Республики Беларусь?",
                answers: [
                    "6 разделов",
                    "8 разделов",
                    "9 разделов",
                    "10 разделов"
                ],
                correct: 2
            },
            {
                question: "Что согласно Конституции является высшей ценностью государства?",
                answers: [
                    "Государственный суверенитет",
                    "Человек, его права и свободы",
                    "Территориальная целостность",
                    "Экономическое развитие"
                ],
                correct: 1
            },
            {
                question: "Какая форма правления установлена в Республике Беларусь?",
                answers: [
                    "Президентская республика",
                    "Парламентская республика",
                    "Смешанная республика",
                    "Унитарное государство"
                ],
                correct: 0
            },
            {
                question: "Какой орган государственной власти является представительным и законодательным?",
                answers: [
                    "Правительство Республики Беларусь",
                    "Конституционный Суд",
                    "Парламент - Национальное собрание",
                    "Администрация Президента"
                ],
                correct: 2
            },
            {
                question: "Из скольких палат состоит Парламент Беларуси?",
                answers: [
                    "Одной палаты",
                    "Двух палат",
                    "Трех палат",
                    "Четырех палат"
                ],
                correct: 1
            },
            {
                question: "Как называются палаты Национального собрания?",
                answers: [
                    "Государственная Дума и Федеральное Собрание",
                    "Совет Республики и Палата представителей",
                    "Верхняя и Нижняя палаты",
                    "Сенат и Конгресс"
                ],
                correct: 1
            },
            {
                question: "На какой срок избирается Президент Республики Беларусь?",
                answers: [
                    "На 4 года",
                    "На 5 лет",
                    "На 6 лет",
                    "На 7 лет"
                ],
                correct: 1
            },
            {
                question: "С какого возраста гражданин может быть избран Президентом?",
                answers: [
                    "С 30 лет",
                    "С 35 лет",
                    "С 40 лет",
                    "С 45 лет"
                ],
                correct: 1
            },
            {
                question: "Какой орган осуществляет исполнительную власть?",
                answers: [
                    "Прокуратура",
                    "Правительство - Совет Министров",
                    "Конституционный Суд",
                    "Национальный банк"
                ],
                correct: 1
            },
            {
                question: "Что является основой политической системы Беларуси?",
                answers: [
                    "Многопартийность",
                    "Народовластие",
                    "Разделение властей",
                    "Идеологическое многообразие"
                ],
                correct: 1
            },
            {
                question: "Какая идеология устанавливается в качестве государственной?",
                answers: [
                    "Коммунистическая идеология",
                    "Либеральная идеология",
                    "Государственная идеология не устанавливается",
                    "Национальная идеология"
                ],
                correct: 2
            },
            {
                question: "Какой язык является государственным?",
                answers: [
                    "Белорусский и русский",
                    "Белорусский",
                    "Русский",
                    "Белорусский, русский и польский"
                ],
                correct: 1
            },
            {
                question: "Что гарантируется каждому гражданину в соответствии с Конституцией?",
                answers: [
                    "Право на труд",
                    "Право на жилище",
                    "Право на образование",
                    "Все перечисленные права"
                ],
                correct: 3
            },
            {
                question: "В каком разделе Конституции закреплены права и свободы человека?",
                answers: [
                    "Раздел I 'Основы конституционного строя'",
                    "Раздел II 'Личность, общество, государство'",
                    "Раздел III 'Избирательная система'",
                    "Раздел IV 'Президент, Парламент, Правительство'"
                ],
                correct: 1
            },
            {
                question: "Какой орган осуществляет конституционный контроль?",
                answers: [
                    "Верховный Суд",
                    "Конституционный Суд",
                    "Генеральная прокуратура",
                    "Администрация Президента"
                ],
                correct: 1
            },
            {
                question: "Что может быть использовано для изменения Конституции?",
                answers: [
                    "Только всенародный референдум",
                    "Только решение Парламента",
                    "Референдум или решение Парламента",
                    "Указ Президента"
                ],
                correct: 2
            },
            {
                question: "Какие формы собственности признаются и защищаются в Беларуси?",
                answers: [
                    "Только государственная собственность",
                    "Государственная и частная собственность",
                    "Государственная, частная и коллективная собственность",
                    "Все формы собственности"
                ],
                correct: 1
            },
            {
                question: "Какой принцип является основным для избирательной системы?",
                answers: [
                    "Прямые выборы",
                    "Свободные выборы",
                    "Тайное голосование",
                    "Все перечисленные принципы"
                ],
                correct: 3
            },
            {
                question: "Кто является Главнокомандующим Вооруженными Силами?",
                answers: [
                    "Министр обороны",
                    "Премьер-министр",
                    "Президент",
                    "Начальник Генерального штаба"
                ],
                correct: 2
            }
        ]
    },
    history: {
        title: "История Беларуси",
        questions: [
            {
                question: "В каком году было первое письменное упоминание о Полоцке?",
                answers: [
                    "859 год",
                    "862 год",
                    "865 год",
                    "869 год"
                ],
                correct: 1
            },
            {
                question: "Кто была первой женщиной-правительницей на белорусских землях и прославилась как просветительница?",
                answers: [
                    "Анна Ярославна",
                    "Евфросиния Полоцкая",
                    "София Слуцкая",
                    "Барбара Радзивилл"
                ],
                correct: 1
            },
            {
                question: "Какое государство было предшественником Великого княжества Литовского на белорусских землях?",
                answers: [
                    "Киевская Русь",
                    "Полоцкое княжество",
                    "Новгородская республика",
                    "Галицко-Волынское княжество"
                ],
                correct: 1
            },
            {
                question: "В каком году была заключена Кревская уния?",
                answers: [
                    "1385 год",
                    "1410 год",
                    "1569 год",
                    "1596 год"
                ],
                correct: 0
            },
            {
                question: "Какая битва произошла в 1410 году, в которой участвовали войска ВКЛ?",
                answers: [
                    "Битва на Калке",
                    "Битва при Молодях",
                    "Грюнвальдская битва",
                    "Битва на Ворскле"
                ],
                correct: 2
            },
            {
                question: "В каком году была подписана Люблинская уния?",
                answers: [
                    "1569 год",
                    "1596 год",
                    "1654 год",
                    "1697 год"
                ],
                correct: 0
            },
            {
                question: "Какое издание Франциска Скорины стало первой печатной книгой на старобелорусском языке?",
                answers: [
                    "Апостол",
                    "Библия",
                    "Псалтырь",
                    "Евангелие"
                ],
                correct: 2
            },
            {
                question: "В каком году произошел первый раздел Речи Посполитой?",
                answers: [
                    "1772 год",
                    "1793 год",
                    "1795 год",
                    "1812 год"
                ],
                correct: 0
            },
            {
                question: "Какое восстание произошло в 1794 году под руководством Тадеуша Костюшко?",
                answers: [
                    "Восстание декабристов",
                    "Национально-освободительное восстание",
                    "Крестьянская война",
                    "Восстание 1830-1831 годов"
                ],
                correct: 1
            },
            {
                question: "В каком году была основана Белорусская Советская Социалистическая Республика?",
                answers: [
                    "1917 год",
                    "1919 год",
                    "1921 год",
                    "1922 год"
                ],
                correct: 1
            },
            {
                question: "Какой договор определил западную границу БССР в 1921 году?",
                answers: [
                    "Брестский мир",
                    "Рижский мирный договор",
                    "Версальский договор",
                    "Пакт Молотова-Риббентропа"
                ],
                correct: 1
            },
            {
                question: "Когда БССР стала членом-учредителем ООН?",
                answers: [
                    "1945 год",
                    "1950 год",
                    "1955 год",
                    "1960 год"
                ],
                correct: 0
            },
            {
                question: "Какое событие произошло 26 апреля 1986 года?",
                answers: [
                    "Распад СССР",
                    "Чернобыльская катастрофа",
                    "Провозглашение независимости",
                    "Августовский путч"
                ],
                correct: 1
            },
            {
                question: "Когда была принята Декларация о государственном суверенитете БССР?",
                answers: [
                    "27 июля 1990 года",
                    "25 августа 1991 года",
                    "19 сентября 1991 года",
                    "15 марта 1994 года"
                ],
                correct: 0
            },
            {
                question: "В каком году Беларусь стала независимым государством?",
                answers: [
                    "1990 год",
                    "1991 год",
                    "1992 год",
                    "1993 год"
                ],
                correct: 1
            },
            {
                question: "Кто был первым председателем Верховного Совета независимой Беларуси?",
                answers: [
                    "Александр Лукашенко",
                    "Станислав Шушкевич",
                    "Вячеслав Кебич",
                    "Зенон Позняк"
                ],
                correct: 1
            },
            {
                question: "Когда была принята действующая Конституция Республики Беларусь?",
                answers: [
                    "1994 год",
                    "1996 год",
                    "2000 год",
                    "2004 год"
                ],
                correct: 0
            },
            {
                question: "Кто стал первым Президентом Республики Беларусь?",
                answers: [
                    "Станислав Шушкевич",
                    "Вячеслав Кебич",
                    "Александр Лукашенко",
                    "Мечислав Гриб"
                ],
                correct: 2
            },
            {
                question: "Какое событие произошло в 1941-1944 годах на территории Беларуси?",
                answers: [
                    "Гражданская война",
                    "Великая Отечественная война",
                    "Первая мировая война",
                    "Отечественная война 1812 года"
                ],
                correct: 1
            },
            {
                question: "Как называлась операция партизанского движения в Беларуси в 1943 году?",
                answers: [
                    "Рельсовая война",
                    "Концерт",
                    "Багратион",
                    "Уран"
                ],
                correct: 0
            },
            {
                question: "Кто был одним из руководителей обороны Брестской крепости в 1941 году?",
                answers: [
                    "Иван Черняховский",
                    "Петр Машеров",
                    "Андрей Кижеватов",
                    "Константин Рокоссовский"
                ],
                correct: 2
            },
            {
                question: "Какой город был освобожден первым в ходе операции 'Багратион'?",
                answers: [
                    "Минск",
                    "Витебск",
                    "Могилев",
                    "Брест"
                ],
                correct: 1
            },
            {
                question: "Какое звание получила Беларусь после Великой Отечественной войны?",
                answers: [
                    "Герой Советского Союза",
                    "Партизанская республика",
                    "Республика-партизанка",
                    "Героическая республика"
                ],
                correct: 1
            },
            {
                question: "Когда был подписан договор о создании Союзного государства Беларуси и России?",
                answers: [
                    "1996 год",
                    "1997 год",
                    "1999 год",
                    "2000 год"
                ],
                correct: 1
            },
            {
                question: "Какой год был объявлен Годом исторической памяти в Беларуси?",
                answers: [
                    "2020 год",
                    "2021 год",
                    "2022 год",
                    "2023 год"
                ],
                correct: 1
            },
            {
                question: "Какой город является древнейшим на территории Беларуси?",
                answers: [
                    "Минск",
                    "Гродно",
                    "Полоцк",
                    "Туров"
                ],
                correct: 2
            },
            {
                question: "Кто является автором 'Слова о полку Игореве'?",
                answers: [
                    "Кирилл Туровский",
                    "Франциск Скорина",
                    "Неизвестный автор",
                    "Симеон Полоцкий"
                ],
                correct: 2
            },
            {
                question: "Какое образование существовало на белорусских землях в XIII-XVI веках?",
                answers: [
                    "Королевство Польское",
                    "Великое княжество Литовское",
                    "Московское царство",
                    "Речь Посполитая"
                ],
                correct: 1
            },
            {
                question: "Какой город был столицей ВКЛ?",
                answers: [
                    "Вильня (Вильнюс)",
                    "Новогрудок",
                    "Гродно",
                    "Минск"
                ],
                correct: 0
            },
            {
                question: "Кто был последним великим князем литовским и королем польским?",
                answers: [
                    "Сигизмунд I Старый",
                    "Сигизмунд II Август",
                    "Стефан Баторий",
                    "Станислав Август Понятовский"
                ],
                correct: 3
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
