// Pastikan GSAP ScrollTrigger hanya didaftarkan jika belum terdaftar
if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Menu functionality
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-button");
    const menuOverlay = document.getElementById("menu-overlay");
    const body = document.body;

    // Fungsi buka/tutup menu dengan GSAP
    function openMenu() {
        gsap.to(menuOverlay, {
            clipPath: "circle(150% at 100% 0%)",
            duration: 0.5,
            ease: "power3.out"
        });
        body.classList.add("menu-active");
    }

    function closeMenu() {
        gsap.to(menuOverlay, {
            clipPath: "circle(0% at 100% 0%)",
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                body.classList.remove("menu-active");
            }
        });
    }

    menuButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    // Tutup menu jika klik di luar menu-content
    menuOverlay.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-content")) {
            closeMenu();
        }
    });

    // Tutup menu dengan tombol Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && body.classList.contains("menu-active")) {
            closeMenu();
        }
    });

    // Event delegation untuk hover efek menu-item
    document.querySelector(".menu-content ul").addEventListener("mouseover", function (event) {
        if (event.target.classList.contains("menu-item")) {
            gsap.to(event.target, {
                scale: 1.1,
                color: "yellow",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    document.querySelector(".menu-content ul").addEventListener("mouseout", function (event) {
        if (event.target.classList.contains("menu-item")) {
            gsap.to(event.target, {
                scale: 1,
                color: "",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    // Animasi muncul untuk news items
    gsap.from(".news-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
    });

    // Smooth scrolling jika menu item memiliki anchor link
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    gsap.to(window, { scrollTo: targetElement, duration: 1, ease: "power2.out" });
                    closeMenu();
                }
            }
        });
    });
});
document.querySelectorAll(".news-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    });
});
