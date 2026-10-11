/* =========================================================
   SRikANTH SHANMUGAM
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   THEME SYSTEM
========================================================= */

const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const THEME_KEY = "srikanth-theme";


function getSavedTheme() {

    try {

        const saved =
            localStorage.getItem(THEME_KEY);

        if (
            saved === "dark" ||
            saved === "light"
        ) {
            return saved;
        }

        return "light";

    } catch (error) {

        return "light";

    }

}


function saveTheme(theme) {

    try {

        localStorage.setItem(
            THEME_KEY,
            theme
        );

    } catch (error) {

        /* Storage unavailable */

    }

}


function setTheme(theme) {

    html.setAttribute(
        "data-theme",
        theme
    );

    saveTheme(theme);


    if (theme === "dark") {

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

        if (themeText) {
            themeText.textContent = "LIGHT";
        }

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to professional light theme"
            );

        }

    } else {

        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

        if (themeText) {
            themeText.textContent = "DARK";
        }

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to technical dark theme"
            );

        }

    }

}


/* Load saved theme */

setTheme(
    getSavedTheme()
);


/* Theme button */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                html.getAttribute(
                    "data-theme"
                );

            const nextTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            setTheme(nextTheme);

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );

                                link.classList.toggle(
                                    "active",
                                    href ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }
                );

            },

            {
                rootMargin:
                    "-30% 0px -55% 0px",
                threshold: 0
            }

        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   CARD INTERACTION
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".interactive-card"
    );


interactiveCards.forEach(
    card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -3;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    }
);


/* =========================================================
   KEYBOARD THEME SHORTCUT
   Press T to toggle theme
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const tag =
            document.activeElement?.tagName;

        if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        ) {
            return;
        }

        if (
            event.key.toLowerCase() === "t"
        ) {

            const currentTheme =
                html.getAttribute(
                    "data-theme"
                );

            setTheme(
                currentTheme === "dark"
                    ? "light"
                    : "dark"
            );

        }

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll(
    "img"
).forEach(
    image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0";

            }
        );

    }
);
