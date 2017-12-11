const electron = require('electron');
const {ipcRenderer} = electron;

var list = document.querySelector('ul');

// LISTENERS
list.addEventListener('dblclick', removeItem);

// IPCRENDERERER
ipcRenderer.on('item:add', function(e, item){
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);

    li.appendChild(itemText);
    li.className = 'collection-item';

    list.appendChild(li);
    list.className = 'collection';
});

ipcRenderer.on('item:clear', function(){
    list.innerHTML = '';

    list.className= '';
});

// FUNCTIONS
function removeItem(e){
    e.target.remove();

    if (list.children.length == 0){
        list.className = '';
    }
}
