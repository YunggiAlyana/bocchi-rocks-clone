// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initial animations when the page loads
gsap.from(".left", { 
    x: -100, 
    opacity: 0, 
    duration: 1, 
    ease: "power3.out" 
});

gsap.from([".logo", ".title-container", ".news"], { 
    y: 100, 
    opacity: 0, 
    scale: 0.95, 
    duration: 1, 
    ease: "power3.out", 
    stagger: 0.2 
});

// Animation for news items with scroll trigger
gsap.from(".news-item", { 
    y: 50, 
    opacity: 0, 
    duration: 0.8, 
    ease: "power3.out", 
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".news",
        start: "top 80%", 
        toggleActions: "play none none none",
        once: true
    }
});

// Image gallery logic
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("main-image");
    const overlay = document.querySelector(".image-overlay");
    const thumbnailContainer = document.querySelector(".thumbnail-container");
    const thumbnails = document.querySelectorAll(".thumbnail");

    const overlayColors = ["#b76de9", "#ff6b6b", "#f669cb", "#fc2c2c", "#eefc2c", "#2c6efc"];
    let selectedThumbnail = null;

    function resetBorders() {
        thumbnails.forEach(thumb => {
            thumb.style.border = "none";
            thumb.style.pointerEvents = "auto";
        });
    }

    thumbnailContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("thumbnail") && event.target !== selectedThumbnail) {
            let index = [...thumbnailContainer.children].indexOf(event.target);
            let newImageSrc = event.target.src;

            resetBorders();

            gsap.to(event.target, {
                borderColor: overlayColors[index] || "#b76de9",
                borderWidth: 3,
                borderStyle: "solid",
                duration: 0.3,
                ease: "power2.out"
            });

            selectedThumbnail = event.target;
            overlay.style.backgroundColor = overlayColors[index] || "#b76de9";

            gsap.to(overlay, {
                left: "0%",
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    mainImage.src = newImageSrc;

                    gsap.to(overlay, {
                        left: "100%",
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.set(overlay, { left: "-100%" });
                        }
                    });
                }
            });
        }
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("mouseover", function () {
            if (thumb !== selectedThumbnail) {
                this.style.border = `3px solid ${overlayColors[index] || "#b76de9"}`;
            }
        });

        thumb.addEventListener("mouseout", function () {
            if (thumb !== selectedThumbnail) {
                this.style.border = "none";
            }
        });
    });
});

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

    // Event listener untuk klik menu "NEWS"
    const newsMenuItem = [...menuItems].find(item => item.textContent.trim() === "NEWS");
    
    if (newsMenuItem) {
        console.log("NEWS menu ditemukan, menambahkan event listener...");
        
        newsMenuItem.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Menu NEWS diklik, menjalankan animasi...");
            
            gsap.to(menuOverlay, {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    console.log("Animasi selesai, pindah ke news.html");
                    window.location.href = "news.html";
                }
            });
        });
    } else {
        console.warn("Menu NEWS tidak ditemukan!");
    }
});

// Function to change image
function changeImage(src) {
    const mainImage = document.getElementById("main-image");
    if (mainImage) {
        mainImage.src = src;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-button");
    const body = document.body;

    // Buka menu
    menuButton.addEventListener("click", function () {
        body.classList.add("menu-active");
    });

    // Tutup menu
    closeButton.addEventListener("click", function () {
        body.classList.remove("menu-active");
    });

    // Tutup menu jika klik di luar menu-content
    document.getElementById("menu-overlay").addEventListener("click", function (event) {
        if (!event.target.closest(".menu-content")) {
            body.classList.remove("menu-active");
        }
    });
});
