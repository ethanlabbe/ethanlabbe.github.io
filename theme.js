(() => {
    const root = document.documentElement;
    const key = 'portfolio-theme';
    let theme = 'dark';
    try {
        const saved = localStorage.getItem(key);
        if (saved === 'light' || saved === 'dark') theme = saved;
    } catch { /* Theme switching still works if storage is unavailable. */ }

    function apply(next) {
        theme = next;
        root.dataset.theme = next;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = next === 'light' ? '#fafafa' : '#141416';
        const button = document.querySelector('.theme-toggle');
        if (button) {
            button.hidden = false;
            button.textContent = next === 'light' ? 'Dark mode' : 'Light mode';
            button.setAttribute('aria-label', `Switch to ${next === 'light' ? 'dark' : 'light'} mode`);
            button.setAttribute('aria-pressed', String(next === 'light'));
        }
    }
    apply(theme);
    document.addEventListener('DOMContentLoaded', () => {
        apply(theme);
        document.querySelector('.theme-toggle')?.addEventListener('click', () => {
            apply(theme === 'light' ? 'dark' : 'light');
            try { localStorage.setItem(key, theme); } catch { /* Optional persistence. */ }
        });
    });
    window.addEventListener('storage', (event) => {
        if (event.key === key) apply(event.newValue === 'light' ? 'light' : 'dark');
    });
})();
