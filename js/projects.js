// liste des projets affichés dans la section "Projets"
// pour ajouter un projet : copier un bloc { ... } et adapter les champs
// - context : "iut" ou "perso"
// - team    : true (en équipe) ou false (individuel)
// - link    : lien du bouton ; linkType : "github" ou "page" (change le texte du bouton)

const PROJECTS = [
    {
        image: "images/ameli.png",
        title: { fr: "Plateforme de jeux (AMÉLI)", en: "Games platform (AMELI)" },
        description: {
            fr: "Serious game de 5 mini-jeux pour sensibiliser les 18-25 ans aux services de la CPAM.",
            en: "Serious game with 5 mini-games raising awareness of French health insurance (CPAM) services among 18-25 year olds."
        },
        tags: ["Symfony", "PHP", "JavaScript", "SCSS", "Docker"],
        context: "iut", team: true, year: 2025,
        link: "https://github.com/Raphaelo2004/LesGlobulesBlancs", linkType: "github"
    },
    {
        image: "images/breizh-ile.png",
        title: { fr: "Site de locations saisonnières", en: "Vacation rental website" },
        description: {
            fr: "Plateforme de réservation de logements de vacances en Bretagne, de l'analyse à la réalisation.",
            en: "Booking platform for holiday rentals in Brittany, from analysis to development."
        },
        tags: ["PHP", "SQL", "SCSS", "JavaScript", "Docker"],
        context: "iut", team: true, year: 2024,
        link: "https://github.com/Alex041718/Breizh-ile", linkType: "github"
    },
    {
        image: "images/ia.avif",
        title: { fr: "IA Puissance 4", en: "Connect Four AI" },
        description: {
            fr: "Bot codé en binôme pour affronter un joueur au Puissance 4 : il choisit son coup selon des règles que nous avons définies pour chaque situation de jeu.",
            en: "Bot coded in a pair to play Connect Four against a human: it picks its move based on rules we defined for each game situation."
        },
        tags: ["C", "Algorithmique"],
        context: "iut", team: true, year: 2023,
        link: "https://github.com/Raphaelo2004/IA-Puissance-4", linkType: "github"
    },
    {
        image: "images/pikachu.webp",
        title: { fr: "Pokédex Pokémon", en: "Pokémon Pokédex" },
        description: {
            fr: "Application web de type Pokédex pour consulter les Pokémon et leurs caractéristiques.",
            en: "Pokédex-style web application to browse Pokémon and their characteristics."
        },
        tags: ["JavaScript", "HTML", "CSS"],
        context: "iut", team: true, year: 2024,
        link: "https://github.com/Raphaelo2004/Pokemon", linkType: "github"
    },
    {
        image: "images/regions.png",
        title: { fr: "Carte des régions françaises (API)", en: "French regions map (API)" },
        description: {
            fr: "À partir d'un département saisi, affichage sur une carte de sa région et des autres départements, via une API.",
            en: "Enter a French department and see its region and the region's other departments on a map, using an API."
        },
        tags: ["Python", "API", "HTML"],
        context: "perso", team: false, year: 2025,
        link: "https://github.com/Raphaelo2004/API-region", linkType: "github"
    },
    {
        image: "images/conso_energie.jpg",
        title: { fr: "Analyse de la consommation", en: "Energy consumption analysis" },
        description: {
            fr: "Analyse de la consommation d'énergie par jour, mois ou année, avec graphiques heures creuses / heures pleines.",
            en: "Energy consumption analysis by day, month or year, with off-peak / peak hours charts."
        },
        tags: ["Python", "Data"],
        context: "perso", team: false, year: 2025,
        link: "https://github.com/Raphaelo2004/Analyse-Consommation", linkType: "github"
    },
    {
        image: "images/puissance4.webp",
        title: { fr: "Jeu de Puissance 4", en: "Connect Four game" },
        description: {
            fr: "Jeu de Puissance 4 pour deux joueurs en ligne de commande, avec gestion des erreurs de saisie.",
            en: "Two-player command-line Connect Four game, with input error handling."
        },
        tags: ["C"],
        context: "iut", team: false, year: 2022,
        link: "https://github.com/Raphaelo2004/Puissance-4", linkType: "github"
    },
    {
        image: "images/tdc3.jpg",
        title: { fr: "Le tour du cavalier", en: "The Knight's Tour" },
        description: {
            fr: "Algorithme faisant parcourir toutes les cases d'un échiquier à un cavalier, sans jamais repasser sur la même case.",
            en: "Algorithm moving a chess knight across every square of the board without visiting any square twice."
        },
        tags: ["Python", "Algorithmique"],
        context: "iut", team: false, year: 2023,
        link: "https://github.com/Raphaelo2004/Tour-du-cavalier", linkType: "github"
    },
    {
        image: "images/pendu.png",
        title: { fr: "Jeu du pendu", en: "Hangman game" },
        description: {
            fr: "Le classique jeu du pendu : deviner un mot en proposant des lettres.",
            en: "The classic hangman game: guess a word by suggesting letters."
        },
        tags: ["Python"],
        context: "perso", team: false, year: 2025,
        link: "https://github.com/Raphaelo2004/Pendu", linkType: "github"
    }
];

const PROJECT_LABELS = {
    fr: {
        iut: "IUT", perso: "Personnel",
        team: "En équipe", solo: "Individuel",
        github: "Voir sur GitHub", page: "Voir le projet",
        "Algorithmique": "Algorithmique", "Data": "Data"
    },
    en: {
        iut: "University", perso: "Personal",
        team: "Team", solo: "Individual",
        github: "View on GitHub", page: "View project",
        "Algorithmique": "Algorithms", "Data": "Data"
    }
};

function renderProjects() {
    const container = document.querySelector(".projects-grid");
    if (!container) return;

    const lang = (window.I18N && I18N.lang) || "fr";
    const labels = PROJECT_LABELS[lang];
    const escape = str => String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    container.innerHTML = PROJECTS.map(p => {
        const external = p.linkType !== "page";
        const icon = p.linkType === "github" ? "bxl-github" : "bx-right-arrow-alt";
        const tags = p.tags.map(tag => `<li>${escape(labels[tag] || tag)}</li>`).join("");
        return `
        <article class="project-card">
            <div class="project-img">
                <img src="${escape(p.image)}" alt="${escape(p.title[lang])}" loading="lazy">
            </div>
            <div class="project-body">
                <p class="project-meta">${labels[p.context]} · ${p.team ? labels.team : labels.solo} · ${p.year}</p>
                <h3>${escape(p.title[lang])}</h3>
                <p class="project-desc">${escape(p.description[lang])}</p>
                <ul class="project-tags">${tags}</ul>
                <a class="project-link" href="${escape(p.link)}"${external ? ' target="_blank" rel="noopener"' : ""}>
                    <i class='bx ${icon}'></i>${labels[p.linkType]}
                </a>
            </div>
        </article>`;
    }).join("");
}

renderProjects();
document.addEventListener("langchange", renderProjects);
