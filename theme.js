(function () {
    const STORAGE_KEY = 'ludzkie_q3_theme';
    const DEFAULT_THEME = 'cyber';
    const ALLOWED_THEMES = ['cyber', 'sunset', 'emerald', 'royal', 'solar', 'berry'];

    function getSavedTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return ALLOWED_THEMES.includes(saved) ? saved : DEFAULT_THEME;
        } catch (e) {
            return DEFAULT_THEME;
        }
    }

    function applyTheme(themeName) {
        const validTheme = ALLOWED_THEMES.includes(themeName) ? themeName : DEFAULT_THEME;
        document.documentElement.setAttribute('data-theme', validTheme);

        try {
            localStorage.setItem(STORAGE_KEY, validTheme);
        } catch (e) {
            // Ignore storage restrictions if any
        }

        document.querySelectorAll('.swatch-option').forEach((btn) => {
            const isSelected = btn.getAttribute('data-theme') === validTheme;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-pressed', String(isSelected));
        });
    }

    // Apply immediately so pages load in the chosen theme
    applyTheme(getSavedTheme());

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getSavedTheme());

        const modal = document.getElementById('themeModal');
        const openBtn = document.getElementById('openThemeModal');
        const closeBtn = document.getElementById('closeThemeModal');

        if (!modal || !openBtn) return;

        let hideTimer = null;

        function openModal() {
            clearTimeout(hideTimer);
            modal.hidden = false;
            modal.offsetHeight; // force reflow so transition runs cleanly
            modal.classList.add('open');
        }

        function closeModal() {
            modal.classList.remove('open');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                if (!modal.classList.contains('open')) {
                    modal.hidden = true;
                }
            }, 180);
        }

        openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) closeModal();
        });

        document.querySelectorAll('.swatch-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                const chosen = btn.getAttribute('data-theme');
                applyTheme(chosen);
                closeModal();
            });
        });
    });
})();
