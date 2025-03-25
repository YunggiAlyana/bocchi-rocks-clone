// Fungsi untuk memuat dan menampilkan berita terbaru
async function loadLatestNews() {
    try {
        const response = await fetch('assets/data/news-data.json');
        const newsData = await response.json();
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Render di index.html
        const newsContainer = document.getElementById('latest-news-container');
        if (newsContainer) {
            newsContainer.innerHTML = latestNews.map(news => `
                <div class="news-item">
                    <a href="news.html" class="news-link">
                        <span class="date">${news.date}</span>
                        <p>${news.title}</p>
                        <span class="arrow">></span>
                    </a>
                </div>
            `).join('');
        }

        // Render di news.html
        const fullNewsContainer = document.querySelector('.news-container');
        if (fullNewsContainer) {
            fullNewsContainer.innerHTML = sortedNews.map(news => `
                <article class="news-item">
                    <div class="date">${news.date}</div>
                    <div class="content">
                        <p>${news.title}</p>
                        <button class="read-more" aria-label="Read more">></button>
                    </div>
                </article>
            `).join('');

            // Tambahkan event listener setelah render
            setupNewsHoverEffects();
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Fungsi untuk setup efek hover
function setupNewsHoverEffects() {
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { 
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
            gsap.to(item.querySelector('.content p'), {
                color: 'yellow',
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, { 
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
            gsap.to(item.querySelector('.content p'), {
                color: '#fff',
                duration: 0.3
            });
        });
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadLatestNews();
    
    // Juga setup untuk news items yang mungkin sudah ada (fallback)
    if (document.querySelector('.news-item')) {
        setupNewsHoverEffects();
    }
});