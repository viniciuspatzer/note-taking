'use strict';

const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');


const changeColors = colors => {

    if (colors === 'darkMode') {
        body.style.backgroundColor = '#121614';
        body.style.color = '#FFFFFF';
    }

    else if (colors === 'defaultMode') {
        body.style.backgroundColor = '#FFFFFF';
        body.style.color = '#121614';
    }

};

checkbox.addEventListener('change', ({ target }) => {
    target.checked ? changeColors('darkMode') : changeColors('defaultMode');
});