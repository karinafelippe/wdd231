document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    menuToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
    });
});