const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
var mainWindow;
var addWindow;

process.env.NODE_ENV = 'production'; // Put this into production

// APP
app.on('ready', () => {
    mainWindow = new BrowserWindow({width:800, height: 600}); // Create window
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    const mainMenu = Menu.buildFromTemplate(menu); // Build menu

    Menu.setApplicationMenu(mainMenu);
});

// IPCMAIN
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

// FUNCTION
function createAddWindow(){
    addWindow = new BrowserWindow({width:400, height: 200});
    addWindow.loadURL('file://' + __dirname + '/add.html');
}

// MENU
const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click(){
                    mainWindow.webContents.send('item:open');
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

// If the project is not in production, show dev tools option
if(process.env.NODE_ENV != 'production'){
    menu.push({
        label: 'Developer Tools',
        submenu:[{
            label: 'Toggle DevTools',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        }]
    })
}