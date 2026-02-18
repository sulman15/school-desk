import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import db, { initDb } from './db';

// Initialize DB
initDb();

ipcMain.handle('login', async (event, { username, password }) => {
    console.log('Login attempt:', username);
    try {
        const stmt = db.prepare('SELECT id, username, role FROM users WHERE username = ? AND password_hash = ?');
        const user = stmt.get(username, password);

        if (user) {
            console.log('Login success:', user);
            return { success: true, user };
        } else {
            console.log('Login failed');
            return { success: false, error: 'Invalid credentials' };
        }
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, error: 'Database error' };
    }
});


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Use app.isPackaged to distinguish dev (localhost) vs prod (file)
    if (!app.isPackaged) {
        win.loadURL('http://localhost:5173');
        // Open DevTools in dev mode for easier debugging
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
