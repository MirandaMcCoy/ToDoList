const electron = require('electron');
const {ipcRenderer} = electron;
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

var list = document.querySelector('#items');
var saveButton = document.querySelector('#save-button');

// LISTENERS
list.addEventListener('dblclick', removeItem);

saveButton.addEventListener('click', saveItems);

// IPCRENDERERER
ipcRenderer.on('item:add', function(e, item){
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);

    // Add the class names so the items will appear as a collection
    li.appendChild(itemText);
    li.className = 'collection-item';

    list.appendChild(li);
    list.className = 'collection';

    saveButton.className = 'btn waves-effect waves-light';
});

ipcRenderer.on('item:clear', function(){
    // Clear all items in the list and the class name so it will no longer appear as a collection
    list.innerHTML = '';

    list.className= '';

    // Make the save button invisible
    saveButton.className = 'invisible'
});

ipcRenderer.on('item:open', function(){
    dialog.showOpenDialog((filenames) => {
        // If there is no name given, show error
        if(filenames === undefined){
            alert("No file selected");
            return;
        }

        readFile(filenames[0]);
    });
});

// FUNCTIONS
function removeItem(e){
    e.target.remove();

    // If there are no more items in the list, make the collection and the button invisible
    if (list.children.length == 0){
        list.className = '';
        saveButton.className = 'invisible';
    }
}

function saveItems(e){
    dialog.showSaveDialog((filename) => {
        // If the file name is blank, show error
        if (filename === undefined){
            alert("Missing file name");
            return;
        }

        var content = [];

        var items = list.getElementsByTagName('li');

        // For each item in items to the content array, separated by a space for later splitting
        for(var i = 0; i < items.length; i++){
            content.push(items[i].innerHTML + " ")
        };

        fs.writeFile(filename, content, err => {
            if (err) console.log(err)
            
            alert("The file has been saved!");
            }
        )
    });
}

function readFile(filepath){
    fs.readFile(filepath, 'utf-8', (err, data) =>{
        if (err){
            alert("There was an error retrieving your file information");
            return;
        }

        // Clear list of any other items
        list.innerHTML = '';

        // Create array of items read in from the data
        var items = data.split(' ,');

        // For each item in the items array, add them to the collection
        for(var i = 0; i < items.length; i++){
            const li = document.createElement('li');
            const itemText = document.createTextNode(items[i]);
        
            li.appendChild(itemText);
            li.className = 'collection-item';
        
            list.appendChild(li);
            list.className = 'collection';
        
            saveButton.className = 'btn waves-effect waves-light';
        }
    })
}
