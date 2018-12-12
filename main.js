const electron = require('electron');
const url = require('url');
const path = require('path');


const {app,BrowserWindow,ipcMain} = electron;

let mainWindow;
let user;
app.on('ready',function(){
    mainWindow = new BrowserWindow({width:500,height:350});
    //mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
		pathname:path.join(__dirname,'login.html'),
		protocol:'file:',
		slashes:true
	}));

    mainWindow.on('closed',function(){
        app.quit();
    });
});

ipcMain.on('logged:user',function(event,u){

    user = u;
    console.log(user.userid +' has logged in at '+ new Date());
    
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'homepage.html'),
        protocol:'file:',
        slashes:true
    }));
    mainWindow.maximize();
    
});

ipcMain.on('get:user',function(event){
    mainWindow.webContents.send('get:user',user);
});


ipcMain.on('logout:user',function(event){
    user = null;
    mainWindow.unmaximize();
    mainWindow.setSize(500,350);
});

