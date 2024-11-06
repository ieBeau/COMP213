// scripts.js

// Course Year
document.getElementById('course-year').value = new Date().getFullYear();

// Submit Button
document.getElementById('evaluation-form').addEventListener('input', function() {
    const form = this;
    const submitButton = form.querySelector('.submit');
});

// Submit Animation
const fireBtn = document.querySelector(".submit");
fireBtn.addEventListener("click", (event) => {
    const form = document.getElementById('evaluation-form');
    if (form.checkValidity()) {
        event.preventDefault(); 
        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 1, y: 0.9 },
        });

        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 0, y: 0.9 },
        });
    }
});

