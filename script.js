// Dark Mode Toggle with localStorage persistence
(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Get initial theme preference
    function getThemePreference() {
        // Check localStorage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;

        // Fall back to system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    // Apply theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Update aria-label for accessibility
        toggle.setAttribute('aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    // Initialize theme on page load
    setTheme(getThemePreference());

    // Toggle handler
    toggle.addEventListener('click', function() {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
})();

// Scroll-spy for sidebar navigation
(function() {
    'use strict';

    const sections = document.querySelectorAll('section[id], .tldr[id]');
    const navLinks = document.querySelectorAll('.sidebar a');

    if (sections.length === 0 || navLinks.length === 0) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach((link) => link.classList.remove('active'));

                    // Add active class to corresponding link
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.sidebar a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        },
        {
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0
        }
    );

    // Observe all sections
    sections.forEach((section) => observer.observe(section));
})();
