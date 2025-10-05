document.addEventListener("DOMContentLoaded", function() {
    
    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Fungsi untuk menerapkan tema berdasarkan pilihan yang tersimpan
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.textContent = '☀️'; // Ganti ikon ke matahari
        } else {
            body.classList.remove('light-mode');
            themeToggle.textContent = '🌙'; // Ganti ikon ke bulan
        }
    }

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default ke dark
    applyTheme(savedTheme);

    // Event listener untuk tombol toggle
    themeToggle.addEventListener('click', () => {
        let newTheme;
        if (body.classList.contains('light-mode')) {
            newTheme = 'dark';
        } else {
            newTheme = 'light';
        }
        localStorage.setItem('theme', newTheme); // Simpan pilihan baru
        applyTheme(newTheme); // Terapkan tema baru
    });


    // --- SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Muncul saat 10% elemen terlihat
    });

    // Ambil semua section yang punya class 'hidden' dan amati
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

});