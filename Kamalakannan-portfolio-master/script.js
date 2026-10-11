/* =========================================================
   Kamalakannan A — Portfolio interactions
   ========================================================= */
(function () {
    "use strict";

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- Typewriter ---------- */
    var messages = ["Android Developer", "Web Developer", "Front-End Developer", "Java Enthusiast"];
    var typewriterEl = document.getElementById("typewriter");

    if (typewriterEl) {
        var messageIndex = 0;
        var charIndex = 0;
        var typingSpeed = 90;
        var erasingSpeed = 45;
        var delayBetweenMessages = 1300;

        function typeMessage() {
            if (charIndex < messages[messageIndex].length) {
                typewriterEl.textContent += messages[messageIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, typingSpeed);
            } else {
                setTimeout(eraseMessage, delayBetweenMessages);
            }
        }

        function eraseMessage() {
            if (charIndex > 0) {
                typewriterEl.textContent = messages[messageIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseMessage, erasingSpeed);
            } else {
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(typeMessage, typingSpeed);
            }
        }

        setTimeout(typeMessage, 500);
    }

    /* ---------- Header state + scroll progress ---------- */
    var header = document.getElementById("siteHeader");
    var scrollBar = document.getElementById("scrollBar");

    function onScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (header) {
            header.classList.toggle("scrolled", scrollTop > 30);
        }
        if (scrollBar) {
            scrollBar.style.width = progress + "%";
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Reveal on scroll ---------- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach(function (el) { revealObserver.observe(el); });

        /* ---------- Skill bars ---------- */
        var barFills = Array.prototype.slice.call(document.querySelectorAll(".bar-fill"));
        if (barFills.length) {
            var barObserver = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var fill = entry.target;
                        fill.style.width = (fill.getAttribute("data-width") || 0) + "%";
                        obs.unobserve(fill);
                    }
                });
            }, { threshold: 0.4 });
            barFills.forEach(function (el) { barObserver.observe(el); });
        }

        /* ---------- Active nav link ---------- */
        var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
        var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));

        if (sections.length && navLinks.length) {
            var sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute("id");
                        navLinks.forEach(function (link) {
                            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
                        });
                    }
                });
            }, { threshold: 0.4, rootMargin: "-20% 0px -55% 0px" });
            sections.forEach(function (section) { sectionObserver.observe(section); });
        }
    } else {
        revealEls.forEach(function (el) { el.classList.add("in"); });
        Array.prototype.forEach.call(document.querySelectorAll(".bar-fill"), function (el) {
            el.style.width = (el.getAttribute("data-width") || 0) + "%";
        });
    }

    /* ---------- Close mobile nav after clicking a link ---------- */
    var navMenu = document.getElementById("navMenu");
    if (navMenu && window.bootstrap && bootstrap.Collapse) {
        navMenu.addEventListener("click", function (e) {
            var target = e.target;
            if (target.tagName === "A" && window.innerWidth < 992) {
                var instance = bootstrap.Collapse.getInstance(navMenu);
                if (instance) {
                    instance.hide();
                }
            }
        });
    }

    /* ---------- Contact form -> mailto ---------- */
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = (document.getElementById("name") || {}).value || "";
            var email = (document.getElementById("email") || {}).value || "";
            var subject = (document.getElementById("subject") || {}).value || "Portfolio Enquiry";
            var message = (document.getElementById("message") || {}).value || "";
            var note = document.getElementById("formNote");

            if (!name.trim() || !email.trim() || !message.trim()) {
                if (note) {
                    note.textContent = "Please fill in your name, email and message.";
                    note.style.color = "#dc2626";
                }
                return;
            }

            var bodyLines = [
                "Name: " + name,
                "Email: " + email,
                "",
                message
            ];
            var mailto = "mailto:kamalakannanarivazhagan@gmail.com" +
                "?subject=" + encodeURIComponent(subject || "Portfolio Enquiry") +
                "&body=" + encodeURIComponent(bodyLines.join("\n"));

            window.location.href = mailto;

            if (note) {
                note.textContent = "Your email app should now open with the message ready to send.";
                note.style.color = "#059669";
            }
        });
    }
})();
