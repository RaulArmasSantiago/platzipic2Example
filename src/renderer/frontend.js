import { setIpc, openDirectory, saveFile } from './ipcRendererEvent'
import {
    addImagesEvents,
    selectEvent,
    searchImagesEvent
  } from './images-ui'
window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
  buttonEvent('save-button', saveFile)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}




