document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const emailForm = document.getElementById('email-form');
    const verifyForm = document.getElementById('verify-form');
    const emailInput = document.getElementById('email-input');
    const codeInputs = document.querySelectorAll('.code-input');
    const resendLink = document.getElementById('resend-code');
    const backToEmail = document.getElementById('back-to-email');
    const timerText = document.getElementById('timer-text');
    const sentEmail = document.getElementById('sent-email');

    // Steps
    const stepEmail = document.querySelector('.step-email');
    const stepVerify = document.querySelector('.step-verify');
    const stepSuccess = document.querySelector('.step-success');

    let currentEmail = '';
    let resendTimer = null;

    // Step 1: Email Submission
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!email) return;

        // Save email and show success toast
        currentEmail = email;
        showToast('Doğrulama kodu gönderiliyor...', 'success');

        // Simulate API call
        setTimeout(() => {
            sentEmail.textContent = currentEmail;
            switchStep(stepEmail, stepVerify);
            showToast('Kod başarıyla gönderildi!', 'success');
            startResendTimer();
        }, 1000);
    });

    // Step 2: Code Input Logic
    codeInputs.forEach((input, index) => {
        // Auto-focus next input
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }

            // Add filled class
            if (value) {
                input.classList.add('filled');
                input.classList.remove('error');

                // Move to next input
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            } else {
                input.classList.remove('filled');
            }
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                codeInputs[index - 1].focus();
                codeInputs[index - 1].value = '';
                codeInputs[index - 1].classList.remove('filled');
            }
        });

        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();

            if (/^\d{6}$/.test(pastedData)) {
                pastedData.split('').forEach((char, i) => {
                    if (codeInputs[i]) {
                        codeInputs[i].value = char;
                        codeInputs[i].classList.add('filled');
                    }
                });
                codeInputs[5].focus();
            }
        });
    });

    // Code Verification
    verifyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const code = Array.from(codeInputs).map(input => input.value).join('');

        if (code.length !== 6) {
            showError();
            showToast('Lütfen 6 haneli kodu girin', 'error');
            return;
        }

        // Simulate verification
        const submitBtn = verifyForm.querySelector('.btn-primary');
        submitBtn.classList.add('btn-loading');
        submitBtn.querySelector('span').textContent = 'Doğrulanıyor...';
        submitBtn.querySelector('i').className = 'fas fa-spinner';

        setTimeout(() => {
            // In real app, verify with backend
            const isValid = true; // Simulated success

            if (isValid) {
                switchStep(stepVerify, stepSuccess);
                showToast('Şifreniz e-posta adresinize gönderildi!', 'success');
            } else {
                showError();
                showToast('Geçersiz kod. Lütfen tekrar deneyin.', 'error');
                submitBtn.classList.remove('btn-loading');
                submitBtn.querySelector('span').textContent = 'Doğrula';
                submitBtn.querySelector('i').className = 'fas fa-check';
            }
        }, 1500);
    });

    // Resend Code
    resendLink.addEventListener('click', (e) => {
        e.preventDefault();

        if (resendLink.classList.contains('disabled')) return;

        showToast('Kod tekrar gönderiliyor...', 'success');

        setTimeout(() => {
            clearCodeInputs();
            showToast('Kod başarıyla gönderildi!', 'success');
            startResendTimer();
        }, 1000);
    });

    // Back to Email
    backToEmail.addEventListener('click', (e) => {
        e.preventDefault();
        switchStep(stepVerify, stepEmail);
        clearCodeInputs();
        clearInterval(resendTimer);
    });

    // Helper Functions
    function switchStep(fromStep, toStep) {
        fromStep.classList.remove('active');
        setTimeout(() => {
            toStep.classList.add('active');
        }, 100);
    }

    function showError() {
        codeInputs.forEach(input => {
            input.classList.add('error');
            input.value = '';
            input.classList.remove('filled');
        });
        setTimeout(() => {
            codeInputs.forEach(input => input.classList.remove('error'));
        }, 400);
        codeInputs[0].focus();
    }

    function clearCodeInputs() {
        codeInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'error');
        });
        codeInputs[0].focus();
    }

    function startResendTimer() {
        let seconds = 60;
        resendLink.classList.add('disabled');

        clearInterval(resendTimer);

        resendTimer = setInterval(() => {
            seconds--;
            timerText.textContent = `Tekrar gönderebilirsiniz: ${seconds}s`;

            if (seconds <= 0) {
                clearInterval(resendTimer);
                resendLink.classList.remove('disabled');
                timerText.textContent = '';
            }
        }, 1000);
    }

    function showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span class="toast-message">${message}</span>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
});
