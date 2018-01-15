import { app, BrowserWindow } from 'electron'
import log from 'electron-log'

require('electron-debug')({ showDevTools: true, enabled: true })
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path')
		.join(__dirname, '/static')
		.replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
	process.env.NODE_ENV === 'development'
		? `http://localhost:9080`
		: `file://${__dirname}/index.html`

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

app.on('ready', () => {
	if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

autoUpdater.on('checking-for-update', () => {
	log.info('Checking for updates...')
})
autoUpdater.on('update-available', info => {
	log.info('Update is available')
})
autoUpdater.on('update-not-available', info => {
	log.info('Update is unavailable')
})
autoUpdater.on('error', err => {
	log.info('Error')
})
autoUpdater.on('download-progress', progressObj => {
	log.info('Downloading')
})
autoUpdater.on('update-downloaded', info => {
	autoUpdater.quitAndInstall()
})
