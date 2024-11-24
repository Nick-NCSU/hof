// ==UserScript==
// @name         HoF Challenge Missing Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enhances challenge export to find unused challenges
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        none
// @run-at document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/challengeMissingHelper.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/challengeMissingHelper.user.js
// ==/UserScript==

const exportContents = document.querySelector('#exportModal #exportContents');

const inputContents = document.createElement('textarea');
Object.assign(inputContents, {
    id: 'inputContents',
    className: 'form-control',
    rows: '25'
});
const missingContents = document.createElement('textarea');
Object.assign(missingContents, {
    id: 'missingContents',
    className: 'form-control',
    rows: '25',
    readOnly: 'true'
});

exportContents.insertAdjacentHTML('beforebegin', '<p>Input:</p>');
exportContents.insertAdjacentElement('beforebegin', inputContents);
exportContents.insertAdjacentHTML('beforebegin', '<p>Missing:</p>');
exportContents.insertAdjacentElement('beforebegin', missingContents);
exportContents.insertAdjacentHTML('beforebegin', '<p>Export:</p>');

// Observer is needed due to no events being sent
// by jquery when the export is filled
const observer = new MutationObserver(refreshMissing).observe(exportContents, { childList: true, characterData: true, subtree: true, attributes: true });
exportContents.addEventListener('input', refreshMissing);
inputContents.addEventListener('input', refreshMissing);

function inputContainsLine(line) {
    const match = line.match(/\[url=https:\/\/myanimelist.net\/anime\/\d+\]/);
    if(!match) return true;

    return !inputContents.value.includes(match[0]);
}

function refreshMissing() {
    // innerText is set when opening up the export modal
    // because the jquery calls $().html() to set value.
    const contents = exportContents.innerText || exportContents.value;

    missingContents.value = contents.split('\n').filter(inputContainsLine).join('\n');
}
