document.addEventListener('DOMContentLoaded', () => {

    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('d-none', window.scrollY <= 200);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const DATA_SOURCES = {
        'bank': 'banks.json',
        'education': 'education.json',
        'finance': 'finance.json',
    };

    const grid = document.getElementById('itemsGrid');
    const filterContainer = document.getElementById('filterContainer');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loading');
    const categoryBtns = document.querySelectorAll('.btn-glass-tab');

    let dataCache = {};
    let currentData = [];

    loadCategory('bank');

    categoryBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadCategory(btn.dataset.category);
                scrollToGrid();
            });
        }
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const activeFilter = document.querySelector('.btn-circle-filter.active');
        let filtered = currentData;
        if (activeFilter.dataset.filter !== 'all') {
            const letter = activeFilter.textContent;
            filtered = filtered.filter(d => d.name.toUpperCase().startsWith(letter));
        }
        filtered = filtered.filter(item => item.name.toLowerCase().includes(term));
        renderCards(filtered);
    });

    async function loadCategory(category) {
        showLoader(true);
        searchInput.value = '';

        try {
            let finalData = [];

            if (category === 'all') {
                const sources = Object.values(DATA_SOURCES);
                const results = await Promise.all(sources.map(fetchFile));
                finalData = results.flat();
            } else {
                finalData = await fetchFile(DATA_SOURCES[category]);
            }
            currentData = finalData.sort((a, b) => a.name.localeCompare(b.name));
            generateAlphabetFilters(currentData);
            renderCards(currentData);

        } catch (error) {
            console.error(error);
            grid.innerHTML = '<div class="col-12 text-center text-danger">Failed to load data.</div>';
        } finally {
            showLoader(false);
        }
    }

    async function fetchFile(filename) {
        if (dataCache[filename]) return dataCache[filename];
        const res = await fetch(`data/${filename}`);
        if (!res.ok) throw new Error(`Missing ${filename}`);
        const data = await res.json();
        dataCache[filename] = data;
        return data;
    }

    function renderCards(data) {
        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = `<div class="col-12 text-center text-white-50 mt-4"><h5>No results found</h5></div>`;
            return;
        }

        data.forEach((item, index) => {
            const delay = index < 12 ? index * 0.05 : 0;
            const fallbackText = item.name.charAt(0);
            const card = `
                <div class="col-6 col-md-4 col-lg-3 animate__animated animate__fadeInUp" style="animation-delay: ${delay}s">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-decoration-none card-link-wrapper">
                        <div class="glass-card h-100 p-4 d-flex flex-column justify-content-center align-items-center text-center position-relative">
                            <div class="mb-3 d-flex align-items-center justify-content-center" style="height: 65px; width: 100%;">
                                <img src="img/logos/${item.logo}" alt="${item.name}" class="bank-logo"
                                    onerror="this.onerror=null; this.src='https://placehold.co/100x60/transparent/white?text=${fallbackText}'" loading="lazy">
                            </div>
                            
                            <!-- Name: Removed mb-4, added lh-sm for better multi-line reading -->
                            <h6 class="fw-medium text-white mb-0 lh-sm">${item.name}</h6>
                        </div>
                    </a>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', card);
        });
    }

    function generateAlphabetFilters(data) {
        filterContainer.innerHTML = '';
        const allBtn = document.createElement('button');
        allBtn.className = 'btn btn-circle-filter active';
        allBtn.dataset.filter = 'all';
        allBtn.textContent = 'All';
        allBtn.addEventListener('click', () => {
            setActiveFilter(allBtn);
            let filtered = data;
            const term = searchInput.value.toLowerCase();
            if (term) filtered = filtered.filter(item => item.name.toLowerCase().includes(term));
            renderCards(filtered);
            scrollToGrid();
        });
        filterContainer.appendChild(allBtn);

        const letters = new Set(data.map(d => d.name.charAt(0).toUpperCase()));
        Array.from(letters).sort().forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-circle-filter';
            btn.textContent = letter;
            btn.addEventListener('click', () => {
                setActiveFilter(btn);
                let filtered = data.filter(d => d.name.toUpperCase().startsWith(letter));
                const term = searchInput.value.toLowerCase();
                if (term) filtered = filtered.filter(item => item.name.toLowerCase().includes(term));
                renderCards(filtered);
                scrollToGrid();
            });
            filterContainer.appendChild(btn);
        });
    }

    function setActiveFilter(activeBtn) {
        document.querySelectorAll('.btn-circle-filter').forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
        if (show) grid.innerHTML = '';
    }

    function scrollToGrid() {
        setTimeout(() => {
            const itemsGrid = document.querySelector('#itemsGrid');
            if (itemsGrid) {
                const offset = -350;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = itemsGrid.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition + offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

});