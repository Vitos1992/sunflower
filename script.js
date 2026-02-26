document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    toggle.addEventListener('click', () => nav.classList.toggle('show'));

    // simple form handler (placeholder) for both inline and modal forms
    function hookupForm(formEl) {
        if (!formEl) return;
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(formEl);
            const name = data.get('name');
            const contact = data.get('contact');
            // TODO: send to server — placeholder
            const messages = {
                uk: `Дякуємо, ${name}! Ми зв'яжемося за ${contact} найближчим часом.`,
                en: `Thank you, ${name}! We'll reach out via ${contact} soon.`
            };
            alert(messages[currentLang]);
            formEl.reset();
            // close modal if visible
            closeModal();
        });
    }
    // only keep simple handler for modal form; contactForm uses custom validation below
    hookupForm(document.getElementById('modalForm'));

    // modal popup logic
    const modal = document.getElementById('modal');
    const openButtons = document.querySelectorAll('.open-modal');
    const closeBtn = document.getElementById('closeModal');
    function openModal() { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); }
    function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); }
    openButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // reveal on scroll
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('show');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.card, .feature, .teacher, .hero-text').forEach(el => {
        el.classList.add('fade-up');
        obs.observe(el);
    });

    // -- language switch support --
    const translations = {
        uk: {
            title: 'Дитячий садок «Сонечко» — Головна',
            metaDescription: 'Сучасний дружній дитячий садок — розвиваючі програми, турбота та безпека.',
            brand: 'Сонечко',
            'nav.about': 'Про нас',
            'nav.programs': 'Програми',
            'nav.team': 'Вихователі',
            'nav.gallery': 'Галерея',
            'nav.contact': 'Записатися',
            'hero.heading': 'Тепла турбота і розвиток для кожної дитини',
            'hero.paragraph': 'Індивідуальні програми, безпечне середовище та активний режим дня – все для щасливого зростання дитини.',
            'hero.button': 'Записатися на екскурсію',
            'about.heading': 'Про нас',
            'about.lead': 'Ми створюємо теплу та безпечну атмосферу, де кожна дитина отримує увагу та стимули для розвитку.',
            'about.start.text': '<strong>Я так радий вас бачити, дорогі батьки, шановні мамусі та татусі, дбайливі бабусі та дідусі!</strong><br />Дуже приємно, що ви завітали до мене в гості!<strong>Я – юний лицар, і звуть мене Промінчик.</strong>Я відкрию, осяю шлях до знань, для того, щоб усі мої друзі, цікаві хлопчаки та чарівні дівчата, могли з радістю та легкістю<strong>відкривати для себе новий барвистий світ знань та умінь</strong>у моєму затишному дітсадочку<strong>«Сонечко»</strong>',
            'feature.development.title': 'Розвиток',
            'feature.development.text': 'Ігрові та освітні заняття для різного віку. «У закладі створено світлі, просторі групи, облаштовані сучасними меблями, системами вентиляції та енергоощадного освітлення. Це не просто ремонт – це новий етап у розвитку дошкільної освіти громади».',
            'feature.safety.title': 'Безпека',
            'feature.safety.text': '«Ми прагнемо, щоб кожна дитина на Миколаївщині мала доступ до якісної освіти, безпечного середовища та можливостей для розвитку. Навіть у складний час ми продовжуємо відновлювати й створювати простори, де зростає майбутнє нашої області», – наголосив Віталій Кім.',
            'feature.food.title': 'Харчування',
            'feature.food.text': 'Збалансоване меню, погоджене з дієтологом.',
            'programs.heading': 'Наші програми',
            'program.early.title': 'Ранній розвиток',
            'program.early.text': 'Ігри, сенсорика і перші навички спілкування.',
            'program.creativity.title': 'Творчість',
            'program.creativity.text': 'Малювання, ліпка, музика та театральні заняття.',
            'program.preparation.title': 'Підготовка до школи',
            'program.preparation.text': 'Логіка, мова та навички самостійності.',
            'team.heading': 'Вихователі',
            'team.lead': 'Педагоги з профільною освітою та досвідом роботи.',
            'teacher1.title': 'Старший вихователь',
            'teacher2.title': 'Педагог з розвитку',
            'teacher3.title': 'Музичний керівник',
            'gallery.heading': 'Галерея',
            'contact.heading': 'Контакти',
            "contact.label.name": "Ім'я",
            "contact.label.contact": 'Телефон або email',
            "contact.label.message": 'Повідомлення',
            'contact.button': 'Відправити',
            'contact.address': 'Адреса:',
            'contact.phone': 'Телефон:',
            'contact.hours': 'Години роботи:',
            'footer.text': '© 2026 Дитячий садок «Сонечко». Усі права захищено.',
            'alt.hero': 'Діти граються',
            'alt.teacher': 'Вихователь',
            'alt.gallery1': 'ігри',
            'alt.gallery2': 'заняття',
            'alt.gallery3': 'харчування'
        },
        en: {
            title: 'Sunflower Kindergarten — Home',
            metaDescription: 'A modern and friendly kindergarten – development programs, care and safety.',
            brand: 'Sunflower',
            'nav.about': 'About',
            'nav.programs': 'Programs',
            'nav.team': 'Teachers',
            'nav.gallery': 'Gallery',
            'nav.contact': 'Sign up',
            'hero.heading': 'Warm care and growth for every child',
            'hero.paragraph': 'Individual programs, a safe environment, and an active daily routine – everything for a happy child.',
            'hero.button': 'Book a tour',
            'about.heading': 'About us',
            'about.lead': 'We create a warm and safe atmosphere where every child receives attention and stimulation for development.',
            'about.start.text': '<strong>I am so happy to see you, dear parents, esteemed moms and dads, caring grandmas and grandpas!</strong><br />It is very pleasant that you visited me as a guest!<strong>I am a young knight, and my name is Prominchhyk.</strong>I will open and illuminate the path to knowledge, so that all my friends, interesting boys and charming girls, could with joy and ease<strong>discover for themselves a new colorful world of knowledge and skills</strong>in my cozy kindergarten<strong>"Sunflower"</strong>',
            'feature.development.title': 'Development',
            'feature.development.text': 'Play and educational activities for different ages. «The facility features bright, spacious classrooms equipped with modern furniture, ventilation systems and energy-efficient lighting. This is not just renovation – its a new stage in the development of preschool education in the community».',
            'feature.safety.title': 'Safety',
            'feature.safety.text': '«We strive for every child in the Mykolaiv region to have access to quality education, a safe environment, and opportunities for development. Even in difficult times, we continue to restore and create spaces where the future of our region grows,» – emphasized Vitalii Kim.',
            'feature.food.title': 'Meals',
            'feature.food.text': 'Balanced menu coordinated with a dietitian.',
            'programs.heading': 'Our programs',
            'program.early.title': 'Early development',
            'program.early.text': 'Games, sensory exercises, and first communication skills.',
            'program.creativity.title': 'Creativity',
            'program.creativity.text': 'Drawing, clay modeling, music and theatre activities.',
            'program.preparation.title': 'School preparation',
            'program.preparation.text': 'Logic, speech, and independence skills.',
            'team.heading': 'Teachers',
            'team.lead': 'Educators with specialized training and experience.',
            'teacher1.title': 'Lead teacher',
            'teacher2.title': 'Development teacher',
            'teacher3.title': 'Music director',
            'gallery.heading': 'Gallery',
            'contact.heading': 'Contact',
            "contact.label.name": 'Name',
            "contact.label.contact": 'Phone or email',
            "contact.label.message": 'Message',
            'contact.button': 'Send',
            'contact.address': 'Address:',
            'contact.phone': 'Phone:',
            'contact.hours': 'Hours:',
            'footer.text': '© 2026 Sunflower Kindergarten. All rights reserved.',
            'alt.hero': 'Children playing',
            'alt.teacher': 'Teacher',
            'alt.gallery1': 'play',
            'alt.gallery2': 'activities',
            'alt.gallery3': 'meals'
        }
    };

    let currentLang = 'uk';
    const langToggle = document.getElementById('langToggle');

    function changeLang(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        // update button label
        langToggle.textContent = lang === 'uk' ? 'English' : 'Українська';
        // html lang attribute
        document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';
        // title and meta
        document.title = translations[lang].title;
        document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].metaDescription);
        // replace text for all elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const target = el.getAttribute('data-i18n-target') || 'text';
            const text = translations[lang][key] || '';
            if (target === 'alt') el.setAttribute('alt', text);
            else if (target === 'html') el.innerHTML = text;
            else el.textContent = text;
        });
    }

    langToggle.addEventListener('click', () => {
        changeLang(currentLang === 'uk' ? 'en' : 'uk');
    });

    // initialize language
    changeLang(currentLang);

    // validation and submission for contact form
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let isValid = true;

            const nameInput = form.querySelector('input[name="name"]');
            const contactInput = form.querySelector('input[name="contact"]');

            // Basic validation
            if (!nameInput || nameInput.value.trim().length < 2) {
                isValid = false;
                alert("Будь ласка, введіть ім'я (мінімум 2 символи)");
            }

            if (!contactInput || contactInput.value.trim().length === 0) {
                isValid = false;
                alert("Будь ласка, введіть контактні дані");
            }

            if (!isValid) return;

            // Success message
            alert("✅ Дякуємо! Ми скоро зв'яжемось.");
            form.reset();

            // TODO: send to server (Telegram/PHP)
            // await fetch(...)
        });
    }

    // -- gallery lightbox logic --
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const slideCounter = document.getElementById('slideCounter');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentImageIndex = 0;
    const galleryArray = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        const image = galleryArray[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        slideCounter.textContent = `${currentImageIndex + 1} / ${galleryArray.length}`;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryArray.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryArray.length) % galleryArray.length;
        updateLightboxImage();
    }

    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Event listeners for lightbox controls
    closeLightboxBtn.addEventListener('click', closeLightbox);
    prevSlideBtn.addEventListener('click', prevImage);
    nextSlideBtn.addEventListener('click', nextImage);

    // Close lightbox when clicking on background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });
});
