import url from 'url'
import path from 'path'
import {applyFilter} from './filters'

function addImagesEvent () {
    const thumbs = document.querySelectorAll('li.list-group-item')

  for (let i = 0, length1 = thumbs.length; i < length1; i++) {
    thumbs[i].addEventListener('click', function () {
      changeImage(this)
    })
  }
}


function changeImage (node) {
    if (node) {
      const selected = document.querySelector('li.selected')
      if(selected) {
        selected.classList.remove('selected')
      }
      
      node.classList.add('selected')
      const image = document.getElementById('image-displayed')
      image.src = node.querySelector('img').src
      image.dataset.original = image.src
      document.getElementById('filters').selectedIndex = 0
    } else {
      document.getElementById('image-displayed').src = ''
    }
  }

  function selectFirstImage () {
    const image = document.querySelector('li.list-group-item:not(.hidden)')
    changeImage(image)
  }

  function selectEvent () {
    const select = document.getElementById('filters')
  
    select.addEventListener('change', function () {
      applyFilter(this.value, document.getElementById('image-displayed'))
    })
  }

  function searchImagesEvent () {
    const searchBox = document.getElementById('search-box')
  
    searchBox.addEventListener('keyup', function () {
      const regex = new RegExp(this.value.toLowerCase(), 'gi')
      console.log(this.value.length)
      if (this.value.length > 0) {
        const thumbs = document.querySelectorAll('li.list-group-item img')
        for (let i = 0, length1 = thumbs.length; i < length1; i++) {
          const fileUrl = url.parse(thumbs[i].src)
          const fileName = path.basename(fileUrl.pathname)
          console.log(fileName)
          if (fileName.match(regex)) {
            console.log('coincide')
            thumbs[i].parentNode.classList.remove('hidden')
          } else {
            console.log('no coincide')
            thumbs[i].parentNode.classList.add('hidden')
          }
        }
        selectFirstImage()
      } else {
        const thumbs = document.querySelectorAll('li.list-group-item img')
        for (let i = 0, length1 = thumbs.length; i < length1; i++) {
          thumbs[i].parentNode.classList.remove('hidden')
        }
        selectFirstImage()
      }
    })
  }

  function clearImages () {
    const oldImages = document.querySelectorAll('li.list-group-item')
    
    for(let i =0, length1 = oldImages.length; i < length1; i++) {
        oldImages[i].parentNode.removeChild(oldImages[i])
    }
}

function loadImages (images) {
    const imagesList = document.querySelector('ul.list-group')
    images.map((image,index) => {
        const node = `<li class="list-group-item">
        <img class="media-object pull-left" src="${image.src}"  height="32">
        <div class="media-body">
        <strong>${image.filename}</strong>
        <p>${image.size}</p>
        </div>
    </li>`
    imagesList.insertAdjacentHTML('beforeend',node)

    })
}
  
  module.exports = {
    addImagesEvents: addImagesEvent,
    changeImage: changeImage,
    selectFirstImage: selectFirstImage,
    selectEvent: selectEvent,
    searchImagesEvent: searchImagesEvent,
    clearImages: clearImages,
    loadImages: loadImages
  }