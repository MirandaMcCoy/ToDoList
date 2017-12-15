const electron = require('electron');
const {ipcRenderer} = electron;
var form = document.querySelector('form');

form.addEventListener('submit', submitForm);

// When form is submitted, send the value of the todo textbox to the main form
function submitForm(e){
    e.preventDefault();

    var item = document.querySelector('#todo').value;

    ipcRenderer.send('item:add', item);
}