// scripts.js

const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');

const splashShown = sessionStorage.getItem('splashShown');

if (splashShown) {
    splashScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
} else {
    splashScreen.classList.remove('hidden-on-load');

    setTimeout(() => {
        splashScreen.classList.add('display-none');
        mainContent.classList.remove('hidden');
        sessionStorage.setItem('splashShown', 'true');
    }, 2000);
}