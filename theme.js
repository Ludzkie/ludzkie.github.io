(function () {
    const STORAGE_KEY = 'ludzkie_q3_theme';
    const DEFAULT_THEME = 'cyber';
    const ALLOWED_THEMES = [
        'cyber', 'sunset', 'emerald', 'royal', 'solar',
        'berry', 'ocean', 'crimson', 'lime', 'lavender',
        'coral', 'ice', 'magma', 'mint', 'grape',
        'amber', 'teal', 'sakura', 'cobalt', 'aurora'
    ];

    function getSavedTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return ALLOWED_THEMES.includes(saved) ? saved : DEFAULT_THEME;
        } catch (e) {
            return DEFAULT_THEME;
        }
    }

    function syncSwatches(activeTheme) {
        document.querySelectorAll('.swatch-option').forEach((btn) => {
            const isSelected = btn.getAttribute('data-theme') === activeTheme;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-pressed', String(isSelected));
        });
    }

    function applyTheme(themeName) {
        const validTheme = ALLOWED_THEMES.includes(themeName) ? themeName : DEFAULT_THEME;
        document.documentElement.setAttribute('data-theme', validTheme);

        try {
            localStorage.setItem(STORAGE_KEY, validTheme);
        } catch (e) {
            // Ignore storage errors
        }

        syncSwatches(validTheme);
    }

    applyTheme(getSavedTheme());

    document.addEventListener('DOMContentLoaded', () => {
        const current = getSavedTheme();
        applyTheme(current);

        document.querySelectorAll('.swatch-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                const chosen = btn.getAttribute('data-theme');
                applyTheme(chosen);
            });
        });
    });
})();
