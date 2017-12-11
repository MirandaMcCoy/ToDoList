const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

if (process)

app.on('ready', () => {
    let win = new BrowserWindow({width:800, height: 600});
    win.loadURL('file://' + __dirname + '/index.html');

    const mainMenu = Menu.buildFromTemplate(menu);

    Menu.setApplicationMenu(mainMenu);
});

function openAddWin(){
    let win = new BrowserWindow({width:400, height: 200});
    win.loadURL('file://' + __dirname + '/add.html');
}

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    openAddWin();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Developer Tools',
        click(){
            focusedWindow.toggleDevTools();
        }
    }
]