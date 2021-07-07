'use strict';

const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');


// Class for creating a new note
class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Math.random();
    }
}


/****** local Storage ******/
/***************************/

// Retrieve notes from local storage
function getNotes() {
    let notes;
    if (!localStorage.getItem('noteApp.notes')) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }
    return notes;
}

// Add a note to local storage
function addNoteToLocalStorage(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

// Remove a note from local storage
function removeNote(id) {
    const notes = getNotes();
    notes.forEach((note, index) => {
        if (note.id === id) notes.splice(index, 1);
    });

    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}




/****** UI Updates ******/
/************************/

// Create new note in UI
function addNoteToList(note) {
    const html =
        `
            <div class="note">
                <span hidden>${note.id}</span>
                <h2 class="note__title">${note.title}</h2>
                <p class="note__body">${note.body}</p>
                <div class="note__btns">
                    <button class="note__btn note__view">View Detail</button>
                    <button class="note__btn note__delete">Delete Note</button>
                </div>
            </div>
        `;

    noteContainer.insertAdjacentHTML('afterbegin', html);
}

// Show notes in UI
function displayNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        addNoteToList(note);
    });
}

// Show alert message
function showAlertMessage(message, alertClass) {

    const alertDiv = document.createElement('div');
    alertDiv.classList = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin', alertDiv);
    titleInput.focus();

    setTimeout(() => alertDiv.remove(), 2000);
}

// View note in modal
function openModal(title, body) {
    const modalTitle = document.querySelector('.modal__title');
    const modalBody = document.querySelector('.modal__body');

    modalTitle.textContent = title;
    modalBody.textContent = body;

    modalContainer.classList.add('active');
}

// Close Modal
const modalBtn = document.querySelector('.modal__btn');
modalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
});

// Note Buttons
noteContainer.addEventListener('click', e => {
    if (e.target.classList.contains('note__view')) {
        const currentNote = e.target.closest('.note');
        const currentTitle = currentNote.querySelector('.note__title').textContent;
        const currentBody = currentNote.querySelector('.note__body').textContent;

        openModal(currentTitle, currentBody);
    }

    if (e.target.classList.contains('note__delete')) {
        const currentNote = e.target.closest('.note');
        showAlertMessage('Your note was permanently deleted', 'remove-message');
        currentNote.remove();

        const id = currentNote.querySelector('span').textContent;
        removeNote(+id);
    }
});

// Display Notes
document.addEventListener('DOMContentLoaded', displayNotes);

// Note Form Submit
form.addEventListener('submit', e => {
    e.preventDefault();

    const noteInput = document.querySelector('#note');

    if (titleInput.value && noteInput.value) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNoteToLocalStorage(newNote);

        form.reset();
        showAlertMessage('Note successfully added!', 'success-message');
        titleInput.focus();
    }

    else {
        showAlertMessage('Please add both a title and a note.', 'alert-message');
    }
});