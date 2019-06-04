import fs from 'fs';
import isImage from 'is-image'
import filesize from 'filesize'
import path from 'path';
import { ipcMain, dialog } from 'electron'

function setMainIpc (win) {
    ipcMain.on('open-directory',(event) => {
        dialog.showOpenDialog(win, {
            title: 'Seleccione la nueva ubicacion',
            buttonLabel: 'Abrir ubicacion',
            properties:['openDirectory']
        },
        (dir) => {
            const images = []
            if(dir){
                fs.readdir(dir[0], (err, files) => {
                    if(err) throw err
                    
                    files.map((file) => {
                        if(isImage(file)){
                            let imageFile = path.join(dir[0], file)
                            let stats = fs.statSync(imageFile)
                            let size = filesize(stats.size, {round:0})
                            images.push({filename: file, src: `file://${imageFile}`, size: size })
                        }
                    })
                    event.sender.send('load-images', images)
                })
            }
        })
    }) 

    ipcMain.on('open-save-dialog', (event, ext) => {
        console.log(ext)
        dialog.showSaveDialog(win, {
            title: 'Guardar imagen modificada',
            buttonLabel: 'Guardar imagen',
            filters: [{name: 'Images', extensions: [ext.substr(1)]}]
        }, (file => {
            if (file) {
                event.sender.send('save-image', file)
            }
        }))
    })

    ipcMain.on('show-dialog', (event, info) => {
        dialog.showMessageBox(win, {
            type:info.type,
            title:info.title,
            message:info.message
        })
    })
}

module.exports = setMainIpc;