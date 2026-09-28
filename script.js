document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER / MENU MOBILE
    ========================= */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveLink = () => {

        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });

            }

        });

    };

    window.addEventListener("scroll", updateActiveLink);


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       COUNTERS
    ========================= */

    const counters = document.querySelectorAll(".counter");

    let countersStarted = false;

    const startCounters = () => {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target)) {
                counter.textContent = "0";
                return;
            }

            let current = 0;

            const duration = 1300;
            const startTime = performance.now();

            const animate = (currentTime) => {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * easedProgress);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target;
                }

            };

            requestAnimationFrame(animate);

        });

    };


    const statsSection = document.querySelector(".stats-section");

    if (statsSection) {

        const counterObserver = new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {
                    startCounters();
                    counterObserver.disconnect();
                }

            },
            {
                threshold: 0.4
            }
        );

        counterObserver.observe(statsSection);
    }


    /* =========================
       TESTIMONIAL SLIDER
    ========================= */

    const testimonials = document.querySelectorAll(".testimonial");
    const nextButton = document.getElementById("nextTestimonial");
    const prevButton = document.getElementById("prevTestimonial");
    const dotsContainer = document.getElementById("sliderDots");

    let currentTestimonial = 0;

    if (testimonials.length && dotsContainer) {

        testimonials.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "slider-dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.setAttribute(
                "aria-label",
                `Afficher l'avis ${index + 1}`
            );

            dot.addEventListener("click", () => {
                showTestimonial(index);
            });

            dotsContainer.appendChild(dot);

        });

    }

    const dots = () => {
        return document.querySelectorAll(".slider-dot");
    };


    function showTestimonial(index) {

        if (!testimonials.length) return;

        if (index < 0) {
            index = testimonials.length - 1;
        }

        if (index >= testimonials.length) {
            index = 0;
        }

        testimonials.forEach(testimonial => {
            testimonial.classList.remove("active");
        });

        testimonials[index].classList.add("active");

        dots().forEach(dot => {
            dot.classList.remove("active");
        });

        const activeDot = dots()[index];

        if (activeDot) {
            activeDot.classList.add("active");
        }

        currentTestimonial = index;
    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {
            showTestimonial(currentTestimonial + 1);
        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {
            showTestimonial(currentTestimonial - 1);
        });

    }


    /* =========================
       FAQ ACCORDION
    ========================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("open");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherAnswer.style.maxHeight = null;

            });

            if (!isOpen) {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const resetForm = document.getElementById("resetForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const firstName =
                document.getElementById("firstName").value.trim();

            const lastName =
                document.getElementById("lastName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const service =
                document.getElementById("service").value;

            if (
                !firstName ||
                !lastName ||
                !phone ||
                !email ||
                !service
            ) {
                return;
            }

            contactForm.style.display = "none";
            formSuccess.classList.add("show");

            formSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    if (resetForm) {

        resetForm.addEventListener("click", () => {

            contactForm.reset();

            formSuccess.classList.remove("show");

            contactForm.style.display = "block";

        });

    }


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerOffset = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});