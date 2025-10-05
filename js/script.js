document.addEventListener("DOMContentLoaded", function() {
    
    let particlesInstance = null;
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    
    // --- KONFIGURASI DAN INISIALISASI TSPARTICLES ---
    const particleConfig = {
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            collisions: { enable: true },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1.5, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    };

    tsParticles.load("particles-js", particleConfig).then(container => {
        particlesInstance = container;
        // Terapkan tema yang benar pada partikel saat pertama kali dimuat
        const savedTheme = localStorage.getItem('theme') || 'dark';
        updateParticleColors(savedTheme);
    });

    // --- BOOTSTRAP 5 THEME SWITCHER ---
    const updateParticleColors = (theme) => {
        if (particlesInstance) {
            const color = theme === 'dark' ? '#ffffff' : '#333333';
            particlesInstance.options.particles.color.value = color;
            particlesInstance.options.particles.links.color = color;
            particlesInstance.refresh();
        }
    };

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        const iconClass = theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill';
        themeToggle.innerHTML = `<i class="bi ${iconClass}"></i>`;
        updateParticleColors(theme);
    };

    // Cek tema dari localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Event listener untuk tombol toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- SCROLL ANIMATION (tetap sama) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
});