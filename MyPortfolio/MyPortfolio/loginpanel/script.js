document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.glass-card');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    // Switch to Register View
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });

    // Switch to Login View
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });

    // Add simple input focus effects if needed (CSS handles most)
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});
