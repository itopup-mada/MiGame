export default function handler(req, res) {
  const code = `
    
    const games = [
      { id: 1, title: "Grand Theft Auto: San Andreas", image: "Gta_San_Andreas.jpg", category: ["Action", "Aventure", "Open World"], size: "2.4 GB", downloads: "500K+", rating: 4.9, downloadLink: "#", featured: true },
      { id: 2, title: "Grand Theft Auto: Vice City", image: "Gta_Vice_City.png", category: ["Action", "Open World"], size: "1.4 GB", downloads: "450K+", rating: 4.8, downloadLink: "#", featured: true },
      { id: 3, title: "Bully: Anniversary Edition", image: "bully.jpg", category: ["Action", "Aventure"], size: "2.7 GB", downloads: "300K+", rating: 4.7, downloadLink: "#", featured: false },
      { id: 4, title: "NARUTO: Ultimate Ninja Storm", image: "Naruto_Ultimate_Ninja_Storme.webp", category: ["Combat", "Anime"], size: "3.2 GB", downloads: "600K+", rating: 4.9, downloadLink: "#", featured: true },
      { id: 5, title: "NBA 2K20", image: "NBA_2K20.jpg", category: ["Sport", "Basketball"], size: "2.9 GB", downloads: "550K+", rating: 4.8, downloadLink: "#", featured: false },
      { id: 6, title: "Bright Memory: Infinite", image: "Bright_Memory_Infinite.jpg", category: ["FPS", "Action"], size: "2.3 GB", downloads: "280K+", rating: 4.7, downloadLink: "#", featured: true },
      { id: 7, title: "Need For Speed Most Wanted", image: "Need_For_Speed_Most_Wanted-news.jpg", category: ["Course", "Racing"], size: "2.3 GB", downloads: "700K+", rating: 4.9, downloadLink: "#", featured: true },
      { id: 8, title: "FIFA 16 (Patch FC25)", image: "FIFA16_Patch(FC25).jpeg", category: ["Sport", "Football"], size: "1.9 GB", downloads: "800K+", rating: 4.8, downloadLink: "#", featured: false },
      { id: 9, title: "Red Dead Redemption", image: "Red_Dead_Redemption.jpg", category: ["Action", "Western", "Aventure"], size: "3.5 GB", downloads: "400K+", rating: 4.9, downloadLink: "#", featured: true },
      { id: 10, title: "Resident Evil 4 Remake", image: "Resident_Evil_4_Remake.png", category: ["Horreur", "Survival", "Action"], size: "4.5 GB", downloads: "350K+", rating: 4.8, downloadLink: "#", featured: true }
    ];

    let currentFilter = 'all';
    let currentView = 'grid';
    let searchTerm = '';

    // Initialisation compteur
    const totalEl = document.getElementById('totalGames');
    if (totalEl) totalEl.textContent = games.length + '+';

    window.displayGames = function() {
      const gamesGrid = document.getElementById('gamesGrid');
      const loading = document.querySelector('.loading');
      if (loading) loading.style.display = 'block';

      setTimeout(() => {
        let filteredGames = games;
        if (currentFilter !== 'all') {
          filteredGames = filteredGames.filter(game => game.category.includes(currentFilter));
        }
        if (searchTerm) {
          filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }

        if (filteredGames.length === 0) {
          gamesGrid.innerHTML = \`
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
              <i class="fas fa-search" style="font-size: 4rem; color: rgba(255,255,255,0.1); margin-bottom: 1.5rem;"></i>
              <p style="color: rgba(255,255,255,0.5); font-size: 1.3rem;">Aucun jeu trouvé</p>
              <button class="reset-btn" onclick="window.resetFilters()" style="margin-top: 2rem; display: inline-flex;">
                <i class="fas fa-redo-alt"></i> Réinitialiser
              </button>
            </div>\`;
          if (loading) loading.style.display = 'none';
          return;
        }

        gamesGrid.innerHTML = filteredGames.map(game => \`
          <div class="game-card">
            <div class="game-image">
              <img src="\${game.image}" alt="\${game.title}" loading="lazy">
              <div class="game-badge"><i class="fas fa-star"></i> \${game.rating}</div>
              <div class="game-overlay">
                <div class="quick-actions">
                  <div class="quick-action"><i class="far fa-heart"></i></div>
                  <div class="quick-action"><i class="far fa-share-square"></i></div>
                </div>
              </div>
            </div>
            <div class="game-info">
              <h3 class="game-title">\${game.title}</h3>
              <div class="game-meta">
                <span><i class="fas fa-download"></i> \${game.downloads}</span>
                <span><i class="fas fa-hdd"></i> \${game.size}</span>
              </div>
              <div class="game-categories">
                \${game.category.map(cat => \`<span class="game-category">\${cat}</span>\`).join('')}
              </div>
              <div class="game-footer">
                <span class="game-size"><i class="fas fa-mobile-alt"></i> Android 10+</span>
                <button class="download-btn" onclick="window.openDownloadModal('\${game.title.replace(/'/g, "\\\\'")}', '\${game.downloadLink}')">
                  <i class="fas fa-download"></i> Pro DL
                </button>
              </div>
            </div>
          </div>\`).join('');

        if (loading) loading.style.display = 'none';
        applyScrollAnimation();
      }, 800);
    };

    window.openDownloadModal = function(gameTitle, downloadLink) {
      const modal = document.getElementById('downloadModal');
      if (modal) {
        document.getElementById('modalGameTitle').textContent = gameTitle;
        document.getElementById('modalGameDescription').textContent = "Téléchargement Pro de " + gameTitle + " - Vitesse maximale garantie !";
        document.getElementById('downloadLink').href = downloadLink;
        modal.classList.add('active');
      }
    };

    window.closeModal = function() {
      const modal = document.getElementById('downloadModal');
      if (modal) modal.classList.remove('active');
    };

    window.resetFilters = function() {
      currentFilter = 'all';
      searchTerm = '';
      const sInput = document.getElementById('searchInput');
      if (sInput) sInput.value = '';
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      const defTab = document.querySelector('[data-filter="all"]');
      if (defTab) defTab.classList.add('active');
      window.displayGames();
    };

    window.changeView = function(view) {
      currentView = view;
      const grid = document.getElementById('gamesGrid');
      document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
      if (grid) {
        grid.style.gridTemplateColumns = (view === 'list') ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))';
      }
    };

    window.newsletterSubscribe = function() {
      const email = document.querySelector('.newsletter-form input')?.value;
      if (email) {
        const btn = document.querySelector('.newsletter-form button');
        btn.innerHTML = '<i class="fas fa-check"></i> Abonné !';
        setTimeout(() => { btn.innerHTML = "S'abonner Pro"; }, 2000);
      }
    };

    // Events
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        window.displayGames();
      });
    }

    document.querySelectorAll('.filter-tab[data-filter]').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        window.displayGames();
      });
    });

    window.addEventListener('click', (e) => {
      const modal = document.getElementById('downloadModal');
      if (e.target === modal) window.closeModal();
    });

    // Scroll Animation
    function applyScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.game-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
      });
    }

    // Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      window.displayGames();
    });
   `;

  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(code);
}
