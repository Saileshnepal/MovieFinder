// MovieFinder JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Year Filter Dropdown
    const yearFilterBtn = document.getElementById('yearFilterBtn');
    const yearDropdown = document.getElementById('yearDropdown');
    
    yearFilterBtn.addEventListener('click', function() {
        yearDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!yearFilterBtn.contains(event.target) && !yearDropdown.contains(event.target)) {
            yearDropdown.classList.add('hidden');
        }
    });
    
    // Handle year selection
    const yearOptions = yearDropdown.querySelectorAll('button');
    yearOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedYear = this.textContent;
            yearFilterBtn.querySelector('span').textContent = 'Year: ' + selectedYear;
            yearDropdown.classList.add('hidden');
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Movie Preview Modal
    const previewModal = document.getElementById('previewModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const previewBtns = document.querySelectorAll('.preview-btn');
    
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalRating = document.getElementById('modalRating');
    const modalYear = document.getElementById('modalYear');
    const modalGenre = document.getElementById('modalGenre');
    const modalOverview = document.getElementById('modalOverview');
    
    // Movie data (simplified for demo)
    const movies = [
        {
            title: "Quantum Horizon",
            rating: "4.8",
            year: "2025",
            genre: "Sci-Fi",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20sci-fi%20film%20with%20futuristic%20cityscape%2C%20neon%20lights%2C%20dramatic%20lighting%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20vibrant%20colors%2C%20dramatic%20composition&width=500&height=750&seq=1&orientation=portrait",
            overview: "In the year 2150, as humanity expands its reach across the stars, a team of scientists discovers a mysterious quantum anomaly that threatens to unravel the fabric of reality. Dr. Elena Reyes, a brilliant physicist with a troubled past, must race against time to understand and contain the phenomenon before it consumes everything in its path."
        },
        {
            title: "Midnight Protocol",
            rating: "4.6",
            year: "2025",
            genre: "Action, Thriller",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20action%20thriller%20with%20dark%20urban%20setting%2C%20rain%2C%20dramatic%20lighting%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20intense%20atmosphere%2C%20gritty%20aesthetic&width=500&height=750&seq=2&orientation=portrait",
            overview: "When elite hacker Marcus Chen discovers a backdoor in a government security system, he becomes the target of both intelligence agencies and a dangerous criminal syndicate. With nowhere to turn and his identity compromised, Marcus must use his skills to expose a conspiracy that reaches the highest levels of power."
        },
        {
            title: "Summer Serendipity",
            rating: "4.5",
            year: "2025",
            genre: "Romance, Comedy",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20romantic%20comedy%20with%20bright%20colors%2C%20summer%20setting%2C%20beach%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20light%20hearted%2C%20warm%20tones%2C%20charming%20composition&width=500&height=750&seq=3&orientation=portrait",
            overview: "After a devastating breakup, Emma decides to spend her summer at her aunt's beach house, determined to focus on herself. But when she literally crashes into charming local surf instructor Jack, her plans for a quiet summer alone quickly wash away. As they spend time together, Emma learns that sometimes the best things in life are the ones you never planned for."
        },
        {
            title: "Whispers in Shadow",
            rating: "4.7",
            year: "2024",
            genre: "Horror, Thriller",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20psychological%20horror%20with%20dark%20mansion%2C%20fog%2C%20moonlight%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20eerie%20atmosphere%2C%20haunting%20imagery%2C%20suspenseful%20composition&width=500&height=750&seq=4&orientation=portrait",
            overview: "When paranormal investigator Sarah Mitchell receives a desperate call about unexplained phenomena at the abandoned Blackwood Manor, she discovers that some secrets are better left buried. As she delves deeper into the mansion's dark history, Sarah realizes that the whispers in the shadows are not just echoes of the past, but warnings of a malevolent presence that feeds on fear itself."
        },
        {
            title: "Crown of Destiny",
            rating: "4.9",
            year: "2025",
            genre: "Drama, History",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20historical%20drama%20with%20period%20costumes%2C%20grand%20palace%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20rich%20colors%2C%20elegant%20composition%2C%20dramatic%20lighting&width=500&height=750&seq=5&orientation=portrait",
            overview: "Set in 16th century England, this epic tale follows young Elizabeth Tudor as she navigates the treacherous waters of court politics to claim her rightful place on the throne. Faced with religious upheaval, foreign threats, and betrayal from within, Elizabeth must prove that a woman can rule with both wisdom and strength in a world dominated by men."
        },
        {
            title: "Dreamweavers",
            rating: "4.7",
            year: "2025",
            genre: "Animation, Family",
            image: "https://readdy.ai/api/search-image?query=movie%20poster%20for%20animated%20family%20adventure%20with%20colorful%20fantasy%20world%2C%20magical%20creatures%2C%20professional%20cinematic%20quality%2C%20high%20resolution%20movie%20poster%2C%20vibrant%20colors%2C%20whimsical%20style%2C%20enchanting%20scene&width=500&height=750&seq=6&orientation=portrait",
            overview: "In a world where dreams come to life, young Maya discovers she has the rare gift of dream weaving - the ability to enter and shape the dreams of others. When nightmares begin invading the dream realm, threatening to spill into the waking world, Maya must team up with a quirky group of dream guardians to restore balance and save both worlds from eternal darkness."
        }
    ];
    
    // Open modal with movie data
    previewBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const movieData = movies[index % movies.length]; // Cycle through available movie data
            
            modalImage.src = movieData.image;
            modalImage.alt = movieData.title;
            modalTitle.textContent = movieData.title;
            modalRating.textContent = movieData.rating;
            modalYear.textContent = movieData.year;
            modalGenre.textContent = movieData.genre;
            modalOverview.textContent = movieData.overview;
            
            previewModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    const closeModal = function() {
        previewModal.classList.remove('show');
        document.body.style.overflow = '';
    };
    
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Prevent closing when clicking inside modal content
    previewModal.querySelector('.relative').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewModal.classList.contains('show')) {
            closeModal();
        }
    });

    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let isLoading = false;
    
    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;
        
        isLoading = true;
        loadMoreBtn.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Loading...';
        
        // Simulate loading delay
        setTimeout(function() {
            isLoading = false;
            loadMoreBtn.innerHTML = '<span class="whitespace-nowrap">Load More Movies</span>';
            
            // Show a notification that we'd load more in a real app
            alert('In a real application, more movies would be loaded here.');
        }, 1500);
    });

    // Genre Filter Functionality
    const genrePills = document.querySelectorAll('.genre-pill');
    
    genrePills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            genrePills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            // In a real application, this would filter the movies
            console.log('Selected genre:', this.textContent);
        });
    });

    // Search functionality (basic implementation)
    const searchInput = document.querySelector('.search-input');
    const clearSearchBtn = searchInput.nextElementSibling.querySelector('i');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            clearSearchBtn.style.display = 'block';
            // In a real application, this would filter movies based on search term
            console.log('Searching for:', searchTerm);
        } else {
            clearSearchBtn.style.display = 'none';
        }
    });
    
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        searchInput.focus();
    });

    // Watchlist functionality (basic implementation)
    const watchlistBtn = document.querySelector('[class*="ri-bookmark-line"]').parentElement;
    let watchlistCount = 0;
    
    // Add click handlers to "See Details" buttons for watchlist functionality
    const detailBtns = document.querySelectorAll('.movie-card button:not(.preview-btn)');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real application, this would navigate to movie details page
            console.log('Navigating to movie details...');
        });
    });
});

// Additional utility functions
function addToWatchlist(movieTitle) {
    // In a real application, this would add the movie to user's watchlist
    console.log('Added to watchlist:', movieTitle);
    
    // Show a simple notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${movieTitle} added to watchlist!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function filterMoviesByGenre(genre) {
    // In a real application, this would filter the displayed movies
    console.log('Filtering movies by genre:', genre);
}

function filterMoviesByYear(year) {
    // In a real application, this would filter the displayed movies
    console.log('Filtering movies by year:', year);
}