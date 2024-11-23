// ==UserScript==
// @name         HOF Challenge Cache
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cache start date and add notes for challenges in HOF
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        none
// @run-at document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/challengeCache.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/challengeCache.user.js
// ==/UserScript==

function loadStartDatePicker() {
    const startDatePicker = document.getElementsByClassName('startDatePicker')[0];
    if(!startDatePicker) return;

    const challenge = window.location.pathname.split('/').pop();

    const cachedValue = JSON.parse(localStorage.getItem('startDatePicker') ?? '{}')[challenge];
    if(cachedValue) {
        startDatePicker.value = cachedValue;
        startDatePicker.onchange();
    }

    startDatePicker.addEventListener('change', () => {
        const cachedData = JSON.parse(localStorage.getItem('startDatePicker') ?? '{}');
        cachedData[challenge] = startDatePicker.value;
        localStorage.setItem("startDatePicker", JSON.stringify(cachedData));
    });
}

function injectNotesElement() {
    const toggleExtraData = document.getElementsByClassName('toggleExtraData')[0];
    if(!toggleExtraData) return;

    toggleExtraData.insertAdjacentHTML('afterend', '<p>Notes:</p><textarea id="challengeNotes" rows=4 cols=50 style="color: black;"/>');
}

function loadNotes() {
    injectNotesElement();

    const notes = document.getElementById('challengeNotes');
    if(!notes) return;

    const challenge = window.location.pathname.split('/').pop();

    const cachedValue = JSON.parse(localStorage.getItem('challengeNotes') ?? '{}')[challenge];
    if(cachedValue) {
        notes.value = cachedValue;
    }

    notes.addEventListener('input', () => {
        const cachedData = JSON.parse(localStorage.getItem('challengeNotes') ?? '{}');
        cachedData[challenge] = notes.value;
        localStorage.setItem("challengeNotes", JSON.stringify(cachedData));
    });
}

loadStartDatePicker();
loadNotes();
