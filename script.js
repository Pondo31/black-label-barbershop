
console.log("BLACK LABEL — сайт загружен!");

// Находим элементы для анимации
const animatedElements = document.querySelectorAll(
    ".hero-content, .about-image, .about-content, " +
    ".services .section-subtitle, .services h2, " +
    ".service-card, .gallery .section-subtitle, " +
    ".gallery h2, .gallery-description, .gallery-item, " +
".team .section-subtitle, .team h2, .team-description, .team-card"
);

// Проверяем, разрешены ли анимации
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// Запускаем анимации, если они разрешены
if (!reduceMotion && "IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px 40px 0px"
        }
    );

    animatedElements.forEach(function(element) {
        element.classList.add("reveal");
        observer.observe(element);
        ".contact .section-subtitle, .contact h2, " +
".booking-intro, .booking-form"
    });

}

// =========================
// BOOKING FORM
// =========================

const bookingForm = document.querySelector("#bookingForm");
const bookingResult = document.querySelector("#bookingResult");

// Запрещаем выбирать прошедшие даты
const bookingDate = document.querySelector("#bookingDate");

function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

bookingDate.min = getLocalDate();

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const service = document.querySelector("#bookingService").value;
    const barber = document.querySelector("#bookingBarber").value;
    const date = bookingDate.value;
    const time = document.querySelector("#bookingTime").value;
    const name = document.querySelector("#bookingName").value.trim();
    const phone = document.querySelector("#bookingPhone").value.trim();

    if (!service || !barber || !date || !time || !name || !phone) {
        bookingResult.textContent = "Заполните все поля.";
        return;
    }

    if (date < getLocalDate()) {
        bookingResult.textContent = "Выберите сегодняшнюю или будущую дату.";
        return;
    }

    bookingResult.textContent =
        `Спасибо, ${name}! Вы выбрали: ${service}, ` +
        `мастер ${barber}, ${date} в ${time}. ` +
        `Это демонстрация — запись не создана.`;
});

// Убираем старое подтверждение при изменении данных
bookingForm.addEventListener("input", function() {
    bookingResult.textContent = "";
});

bookingForm.addEventListener("change", function() {
    bookingResult.textContent = "";
});

// Мобильное меню BLACK LABEL

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
    function setMenuOpen(isOpen) {
        menuToggle.classList.toggle("active", isOpen);
        mobileNav.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Закрыть меню" : "Открыть меню"
        );
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.contains("active");
        setMenuOpen(!isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });
}

