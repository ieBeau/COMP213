// scripts.js

document.querySelector(".submit").addEventListener("click", (event) => {
    
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

        setTimeout(() => {
            form.submit();
        }, 1500);
    }
});