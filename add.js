const electron = require('electron');
const {ipcRenderer} = electron;
var form = document.querySelector('form');

form.addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    var item = document.querySelector('#todo').value;

    ipcRenderer.send('item:add', item);
}