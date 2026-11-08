// gestion du multilingue (français / anglais)
// - data-i18n="cle"       : remplace le contenu HTML de l'élément
// - data-i18n-href="cle"  : remplace l'attribut href
// - data-i18n-alt="cle"   : remplace l'attribut alt
// - .lang-toggle          : bouton qui bascule entre les deux langues

(function () {
    // âge calculé automatiquement à partir de la date de naissance
    const birthDate = new Date(2004, 4, 1);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    if (now < new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())) age--;

    const translations = {
        fr: {
            "page.title": "Portfolio - Raphaël Le Bouedec",
            "nav.home": "Accueil",
            "nav.about": "À propos",
            "nav.projects": "Projets",
            "nav.contact": "Contact",
            "lang.switch": "FR",
            "lang.switchLabel": "Switch to English",

            "home.hello": "Salut, c'est moi",
            "home.iam": "Et je suis <span class=\"multiple-text\"></span>",
            "home.typed": ["Développeur", "Sportif", "Actif"],
            "home.intro": "Au cours de mes études, j'ai eu l'opportunité de participer à de nombreux projets qui m'ont permis de développer mes compétences. J'espère que vous aurez autant de plaisir à consulter mes projets que j'en ai eu à les réaliser.<br/>Explorez ce site et n'hésitez pas à me contacter si vous souhaitez en savoir plus !",
            "home.cv": "Ouvrir mon CV",
            "home.cvFile": "fichiers/CV_LeBouedec_Raphael_fr.pdf",
            "home.photoAlt": "Photo de Raphaël Le Bouedec",

            "about.title": "À propos de <span>Moi</span>",
            "about.text":
                "Je m'appelle Raphaël Le Bouedec, j'ai " + age + " ans et je suis en cycle d'ingénieur informatique par apprentissage à l'ISEN Ouest de Brest. " +
                "En parallèle, je suis analyste développeur en alternance à l'IFREMER, où je recense les besoins puis conçois et développe des outils pour la DAEI." +
                "<br/><br/>" +
                "Auparavant, j'ai obtenu mon BUT Informatique mention bien à l'IUT de Lannion, pendant lequel j'ai été développeur logiciel en alternance chez Arche MC2 sur le progiciel Solis. " +
                "Avant cela, j'ai obtenu un bac général mention bien avec les spécialités Mathématiques et NSI et l'option Mathématiques expertes." +
                "<br/><br/>" +
                "Je suis actuellement à la recherche d'un stage à l'international afin d'enrichir mon expérience et de travailler dans un environnement anglophone (TOEIC : 870 points)." +
                "<br/><br/>" +
                "Pendant mon temps libre, je joue au football, j'écoute de la musique et je passe du temps avec mes amis, mais aussi sur mon ordinateur, que ce soit pour coder ou pour jouer.",

            "contact.title": "Me <span>Contacter</span>",
            "contact.intro": "Une question, une opportunité de stage ou simplement envie d'échanger ? N'hésitez pas à me contacter !",
            "contact.email": "E-mail",
            "contact.cv": "CV",
            "contact.cvText": "Télécharger mon CV",
            "contact.location": "Localisation",
            "contact.locationText": "Bretagne, France",

            "projects.title": "Mes <span>Projets</span>"
        },
        en: {
            "page.title": "Portfolio - Raphaël Le Bouedec",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.projects": "Projects",
            "nav.contact": "Contact",
            "lang.switch": "EN",
            "lang.switchLabel": "Passer en français",

            "home.hello": "Hi, it's me",
            "home.iam": "And I am <span class=\"multiple-text\"></span>",
            "home.typed": ["a Developer", "an Athlete", "Driven"],
            "home.intro": "Throughout my studies, I have had the opportunity to take part in many projects that helped me develop my skills. I hope you enjoy browsing my projects as much as I enjoyed building them.<br/>Explore this website and feel free to contact me if you would like to know more!",
            "home.cv": "Open my resume",
            "home.cvFile": "fichiers/CV_LeBouedec_Raphael.pdf",
            "home.photoAlt": "Photo of Raphaël Le Bouedec",

            "about.title": "About <span>Me</span>",
            "about.text":
                "My name is Raphaël Le Bouedec, I am " + age + " years old and I am a computer science engineering student in a work-study program at ISEN Ouest in Brest, France. " +
                "Alongside my studies, I work as an apprentice analyst developer at IFREMER (French Research Institute for Exploitation of the Sea), where I gather requirements, then design and develop tools for the DAEI." +
                "<br/><br/>" +
                "Before that, I earned my BUT (Bachelor of Technology) in Computer Science with honors at IUT Lannion, during which I worked as an apprentice software developer at Arche MC2 on the Solis software. " +
                "Previously, I obtained my French general baccalaureate with honors, specializing in Mathematics and Computer Science, with Advanced Mathematics as an option." +
                "<br/><br/>" +
                "I am currently looking for an international internship to broaden my experience and work in an English-speaking environment (TOEIC: 870 points)." +
                "<br/><br/>" +
                "In my free time, I play football, listen to music and spend time with my friends, as well as on my computer, whether coding or gaming.",

            "contact.title": "Contact <span>Me</span>",
            "contact.intro": "A question, an internship opportunity or just want to chat? Feel free to get in touch!",
            "contact.email": "Email",
            "contact.cv": "Resume",
            "contact.cvText": "Download my resume",
            "contact.location": "Location",
            "contact.locationText": "Brittany, France",

            "projects.title": "My <span>Projects</span>"
        }
    };

    const STORAGE_KEY = "portfolio-lang";

    function getInitialLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && translations[saved]) return saved;
        } catch (e) { /* stockage indisponible */ }
        const browserLang = (navigator.language || "fr").toLowerCase();
        return browserLang.startsWith("fr") ? "fr" : "en";
    }

    let currentLang = getInitialLang();

    function t(key) {
        const value = translations[currentLang][key];
        return value !== undefined ? value : translations.fr[key];
    }

    function apply() {
        document.documentElement.lang = currentLang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            el.innerHTML = t(el.dataset.i18n);
        });
        document.querySelectorAll("[data-i18n-href]").forEach(el => {
            el.setAttribute("href", (el.dataset.i18nPrefix || "") + t(el.dataset.i18nHref));
        });
        document.querySelectorAll("[data-i18n-alt]").forEach(el => {
            el.setAttribute("alt", t(el.dataset.i18nAlt));
        });
        document.querySelectorAll(".lang-toggle").forEach(btn => {
            const label = btn.querySelector(".lang-label");
            if (label) label.textContent = t("lang.switch");
            else btn.textContent = t("lang.switch");
            btn.setAttribute("aria-label", t("lang.switchLabel"));
            btn.setAttribute("title", t("lang.switchLabel"));
        });

        document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: currentLang } }));
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
        apply();
    }

    window.I18N = {
        t,
        setLanguage,
        get lang() { return currentLang; }
    };

    document.querySelectorAll(".lang-toggle").forEach(btn => {
        btn.addEventListener("click", () => setLanguage(currentLang === "fr" ? "en" : "fr"));
    });

    apply();
})();
