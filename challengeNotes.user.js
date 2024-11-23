// ==UserScript==
// @name         HoF Challenge Notes
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add notes section to challenges in HoF
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        none
// @run-at document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/challengeNotes.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/challengeNotes.user.js
// ==/UserScript==

const toggleExtraData = document.getElementsByClassName('toggleExtraData')[0];
if(!toggleExtraData) return;

toggleExtraData.insertAdjacentHTML('afterend', '<p>Notes:</p><textarea id="challengeNotes" rows=4 cols=50 style="color: black;"/>');

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
