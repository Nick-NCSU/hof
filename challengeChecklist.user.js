// ==UserScript==
// @name         HoF Challenge Checklist
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a checklist next to challenge items
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        none
// @run-at document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/challengeChecklist.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/challengeChecklist.user.js
// ==/UserScript==

const listItems = document.querySelectorAll('#challengeItems ol li.listItem')
if(!listItems?.length) return;

const challenge = window.location.pathname.split('/').pop();

listItems.forEach((item) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    item.insertAdjacentElement('afterbegin', checkbox);

    const seriesLink = item.getElementsByClassName("seriesLink")[0];

    if(!seriesLink) return;

    const seriesId = seriesLink.getAttribute("seriesid");

    if(!seriesId) return;

    const cachedValue = JSON.parse(localStorage.getItem('challengeChecklist') ?? '{}')[challenge];
    if(cachedValue) {
        checkbox.checked = !!cachedValue[seriesId];
    }

    checkbox.addEventListener('input', () => {
        const cachedData = JSON.parse(localStorage.getItem('challengeChecklist') ?? '{}')
        cachedData[challenge] ??= {};
        cachedData[challenge][seriesId] = checkbox.checked;
        localStorage.setItem("challengeChecklist", JSON.stringify(cachedData));
    });
});

