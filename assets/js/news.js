// Register GSAP ScrollTrigger plugin if needed
gsap.registerPlugin(ScrollTrigger);

// Menu functionality
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-button");
    const menuOverlay = document.getElementById("menu-overlay");
    const menuItems = document.querySelectorAll(".menu-item");
    const body = document.body;

    menuButton.addEventListener("click", function () {
        gsap.to(menuOverlay, {
            clipPath: "circle(150% at 100% 0%)",
            duration: 0.5,
            ease: "power3.out"
        });

        body.classList.add("menu-active");
    });

    closeButton.addEventListener("click", function () {
        gsap.to(menuOverlay, {
            clipPath: "circle(0% at 100% 0%)",
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                body.classList.remove("menu-active");
            }
        });
    });

    // Hover effect for menu items
    menuItems.forEach(item => {
        item.addEventListener("mouseover", function () {
            gsap.to(this, {
                scale: 1.1,
                color: "yellow",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener("mouseout", function () {
            gsap.to(this, {
                scale: 1,
                color: "",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Animation for news items when page loads
    gsap.from(".news-item", { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power3.out", 
        stagger: 0.2
    });

    // Tutup menu jika klik di luar menu-content
    document.getElementById("menu-overlay").addEventListener("click", function (event) {
        if (!event.target.closest(".menu-content")) {
            gsap.to(menuOverlay, {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    body.classList.remove("menu-active");
                }
            });
        }
    });
});