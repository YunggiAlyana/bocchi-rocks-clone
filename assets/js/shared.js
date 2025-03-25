// Fungsi untuk memuat dan menampilkan berita terbaru
async function loadLatestNews() {
    try {
        // Load news data
        const response = await fetch('assets/data/news-data.json');
        const newsData = await response.json();
        
        // Sort by date (newest first)
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Get top 3 news
        const latestNews = sortedNews.slice(0, 3);
        
        // Render in index.html
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
        
        // Render in news.html
        const fullNewsContainer = document.querySelector('.news-container');
        if (fullNewsContainer) {
            fullNewsContainer.innerHTML = sortedNews.map(news => `
                <article class="news-item">
                    <div class="date">${news.date}</div>
                    <div class="content">
                        <p>${news.title}</p>
                        <button class="read-more" aria-label="Read more about ${news.title.substring(0, 20)}...">></button>
                    </div>
                </article>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadLatestNews);