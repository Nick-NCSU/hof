// ==UserScript==
// @name         HoF Cache Start Date
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cache start date in HoF
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        none
// @run-at document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/cacheStartDate.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/cacheStartDate.user.js
// ==/UserScript==

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
