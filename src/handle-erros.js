import { dialog } from 'electron'

function relaunchApp (win) {
    dialog.showMessageBox(win, {
        type:'error',
        title: 'Platzipics',
        message: 'Ocurrió un error inesperado, se reiniciara el aplicativo'
    }, () => {
        app.relaunchApp()
        app.exit(0)
    })
}
function setupErrors (win) {
    win.webContents.on('crashed', () => {
        relaunchApp(win)
    })

    win.on('unresponsive', () => {
        dialog.showMessageBox(win, {
            type:'warning',
            title: 'Platzipics',
            message: 'Un proceso esta tardando demaciado, puede esperar o reiniciar la aplicacion manualmente.'
        })
    })

    process.on('uncaughtException', () => {
        relaunchApp(win)
    })
}

module.exports = setupErrors;