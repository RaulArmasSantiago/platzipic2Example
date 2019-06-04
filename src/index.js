'use strict'
// Instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import handleErrors from './handle-erros'
import setMainIpc from './ipcMainEvents'

let win

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// Imprime las propiedades del objeto app
// console.dir(app)

/* Imprime las propiedades del objeto BrowserWindow
console.dir(BrowserWindow) */

// Imprime un mensaje en la consola antes de salir de la aplicacion
app.on('before-quit', () => {
  console.log('Saliendo ...')
})

// Ejecuta ordenes cuando la aplicacion esta lista
app.on('ready', () => {
    
  // Creando una ventana
  win = new BrowserWindow({
    title: 'HolaMundo',
    center: true,
    simpleFullscreen: true,
    maximize: true,
    show: false
  })
  setMainIpc(win)
  handleErrors(win)
  win.once('ready-to-show', () => {
    win.show()
  })

  // detectando el cierre de la ventana para cerrar la aplicacion
  win.on('closed', () => {
    win = null
    app.quit()
  })

  win.loadURL(`file://${__dirname}/renderer/index.html`)
  // win.loadURL('http://devdocs.io/')
})

