import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

app.on('ready', () => {
    console.log('Starting Flask backend...');

    backendProcess = spawn('python', ['run.py'], {
        cwd: path.join(__dirname, 'backend'),
        shell: true,
        detached: false,
        stdio: 'inherit',
    });

    console.log('Launching Electron window...');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL('http://localhost:5173');

    mainWindow.on('closed', () => {
        console.log('Electron window closed');
        mainWindow = null;
    });

    mainWindow.on('close', () => {
        console.log('Closing Electron...');
        if (backendProcess) {
            console.log('Sending SIGTERM to backend...');
            backendProcess.kill('SIGTERM');
        }
    });
});

app.on('quit', () => {
    console.log('Electron is quitting...');
    if (backendProcess) {
        console.log('Sending SIGTERM to backend...');
        backendProcess.kill('SIGTERM');
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('All windows closed, quitting Electron...');
        app.quit();
    }
});
