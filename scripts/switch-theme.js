'use strict';

const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');


checkbox.addEventListener('change', ({ target }) => {

    if (target.checked) {
        body.style.backgroundColor = '#121614';
        body.style.color = '#FFFFFF';
    }

    else {
        body.style.backgroundColor = '#FFFFFF';
        body.style.color = '#121614';
    }
});