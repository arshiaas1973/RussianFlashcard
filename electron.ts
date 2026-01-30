import { app, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import isDev from "electron-is-dev";

let mainWindow: BrowserWindow | null;
let tray: Tray;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let timer = setInterval(() => {
  if (!mainWindow?.isVisible())
    mainWindow?.show();
}, 20 * 1000);

function closeWindow() {
  timer.close();
  mainWindow?.close();
  mainWindow = null;
}

function closeApp(){
  closeWindow();
  app.quit();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, './icon.png'),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startURL = isDev
    ? 'http://127.0.0.1:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow?.loadURL(startURL);

  mainWindow?.on('close', (event: CloseEvent) => {
    event.preventDefault();
    if (mainWindow?.isVisible())
      mainWindow?.hide();
  });
  ipcMain.on("close-window", closeWindow );
  tray = new Tray(path.join(__dirname, './icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: "Quit", type: "normal", click: closeApp },
  ]);
  tray.setContextMenu(contextMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    timer.close();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});