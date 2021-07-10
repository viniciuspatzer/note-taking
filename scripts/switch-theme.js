'use strict';

const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');


checkbox.addEventListener('change', ({ target }) => {

    const bodyBgColor = target.checked ? '#121614' : '#FFFFFF';
    const bodyColor = target.checked ? '#FFFFFF' : '#121614';

    body.style.backgroundColor = bodyBgColor;
    body.style.color = bodyColor;
});