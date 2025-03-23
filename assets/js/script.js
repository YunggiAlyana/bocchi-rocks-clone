// Register GSAP ScrollTrigger plugin
// Mengaktifkan plugin ScrollTrigger agar bisa digunakan untuk animasi saat scroll
gsap.registerPlugin(ScrollTrigger);

// Animasi awal saat halaman dimuat
// Elemen-elemen masuk dengan efek fade dan slide
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

// Animasi untuk news items saat di-scroll ke viewport
gsap.from(".news-item", { 
    y: 50, 
    opacity: 0, 
    duration: 1, 
    ease: "power3.out", 
    stagger: 0.15,
    scrollTrigger: {
        trigger: ".news",
        start: "top 80%", 
        toggleActions: "play none none none",
        once: true
    }
});

// Image gallery logic - perubahan gambar utama berdasarkan thumbnail yang diklik
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("main-image");
    const overlay = document.querySelector(".image-overlay");
    const thumbnailContainer = document.querySelector(".thumbnail-container");
    const thumbnails = document.querySelectorAll(".thumbnail");

    const overlayColors = ["#b76de9", "#ff6b6b", "#f669cb", "#fc2c2c", "#eefc2c", "#2c6efc"];
    let selectedThumbnail = null;

    function resetBorders() {
        thumbnails.forEach(thumb => {
            gsap.to(thumb, {
                borderColor: "transparent",
                borderWidth: 2,
                duration: 0.3
            });
        });
    }

    thumbnailContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("thumbnail") && event.target !== selectedThumbnail) {
            let index = [...thumbnailContainer.children].indexOf(event.target);
            let newImageSrc = event.target.src;
            resetBorders(); // Menghapus border sebelumnya

            gsap.to(event.target, {
                borderColor: overlayColors[index] || "#b76de9",
                borderWidth: 3,
                borderStyle: "solid",
                duration: 0.3
            });

            selectedThumbnail = event.target;
            overlay.style.backgroundColor = overlayColors[index] || "#b76de9";

            gsap.to(overlay, {
                left: "0%",
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    // Efek fade-in saat mengganti gambar utama
                    gsap.to(mainImage, { 
                        opacity: 0, 
                        duration: 0.3, 
                        onComplete: () => {
                            mainImage.src = newImageSrc;
                            gsap.to(mainImage, { opacity: 1, duration: 0.3 });
                        }
                    });
                    
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
});

// Menu functionality - animasi buka/tutup menu dengan GSAP
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-button");
    const menuOverlay = document.getElementById("menu-overlay");
    const menuItems = document.querySelectorAll(".menu-item");
    const body = document.body;

    function toggleMenu(open) {
        gsap.to(menuOverlay, {
            clipPath: open ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
                if (!open) body.classList.remove("menu-active");
            }
        });
        if (open) body.classList.add("menu-active");
    }

    menuButton.addEventListener("click", () => toggleMenu(true));
    closeButton.addEventListener("click", () => toggleMenu(false));

    // Tutup menu jika klik di luar menu-content
    menuOverlay.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-content")) {
            toggleMenu(false);
        }
    });

  // Hover effect hanya pada teks yang ditunjuk
menuItems.forEach(item => {
    item.addEventListener("mouseover", function () {
        // Pastikan hanya teks dalam elemen yang berubah warna
        const textElement = this.querySelector("span, a");
        if (textElement) {
            gsap.to(textElement, {
                color: "yellow",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    item.addEventListener("mouseout", function () {
        const textElement = this.querySelector("span, a");
        if (textElement) {
            gsap.to(textElement, {
                color: "",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
});


    // Event listener untuk klik menu "NEWS"
    const newsMenuItem = [...menuItems].find(item => item.textContent.trim() === "NEWS");
    if (newsMenuItem) {
        newsMenuItem.addEventListener("click", function (event) {
            event.preventDefault();
            gsap.to(menuOverlay, {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    window.location.href = "news.html";
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const topLink = document.querySelector(".menu-item a[href='index.html']");
    
    if (topLink) {
        topLink.addEventListener("click", function (event) {
            event.preventDefault(); // Mencegah pindah halaman langsung
            
            gsap.to("#menu-overlay", {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    window.location.href = "index.html"; // Pindah setelah animasi selesai
                }
            });
        });
    }
});
