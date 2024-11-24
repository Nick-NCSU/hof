// ==UserScript==
// @name         HoF Challenge Missing Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enhances challenge export to find unused challenges
// @author       Nick-NCSU
// @match        https://anime.jhiday.net/hof/challenge/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jhiday.net
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL  https://github.com/Nick-NCSU/hof/raw/main/src/challengeMissingHelper.user.js
// @updateURL    https://github.com/Nick-NCSU/hof/raw/main/src/challengeMissingHelper.user.js
// ==/UserScript==

GM_addStyle('.modal-group-userscript { flex: 1; margin-right: 1rem; }');
GM_addStyle('.modal-group-userscript > textarea { width: 100%; }');
GM_addStyle('.modal-label-userscript { display: block; margin-right: 0.5rem; }');
GM_addStyle('.modal-body { display: flex; margin: 0 auto; justify-content: space-between; }');
GM_addStyle('#exportModal > .modal-dialog { width: 90%; }');

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

const inputContentsDiv = document.createElement('div');
inputContentsDiv.className = 'modal-group-userscript';
inputContentsDiv.insertAdjacentHTML('afterbegin', '<label for="inputContents" class="modal-label-userscript">Input:</label>');
inputContentsDiv.insertAdjacentElement('beforeend', inputContents);
exportContents.parentNode.insertBefore(inputContentsDiv, exportContents);

const missingContentsDiv = document.createElement('div');
missingContentsDiv.className = 'modal-group-userscript';
missingContentsDiv.insertAdjacentHTML('afterbegin', '<label for="missingContents" class="modal-label-userscript">Missing:</label>');
missingContentsDiv.insertAdjacentElement('beforeend', missingContents);
exportContents.parentNode.insertBefore(missingContentsDiv, exportContents);

const exportContentsDiv = document.createElement('div');
exportContentsDiv.className = 'modal-group-userscript';
exportContentsDiv.insertAdjacentHTML('afterbegin', '<label for="exportContents" class="modal-label-userscript">Export:</label>');
exportContents.parentNode.insertBefore(exportContentsDiv, exportContents);
exportContentsDiv.appendChild(exportContents);

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
