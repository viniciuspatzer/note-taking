'use strict';

const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');


function switchTheme() {
    body.style.backgroundColor = checkbox.checked ? '#121614' : '#FFFFFF';
    body.style.color = checkbox.checked ? '#FFFFFF' : '#121614';
}

checkbox.addEventListener('change', switchTheme);

window.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('theme'));
    if (!data) return;

    checkbox.checked = true;
    switchTheme();
});

window.addEventListener('beforeunload', () =>
    localStorage.setItem('theme', checkbox.checked ? true : false));