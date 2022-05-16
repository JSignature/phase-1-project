window.addEventListener('DOMContentLoaded', e => {
  const selectedColor = document.querySelector('#selectedColor')
  const colorPicker = document.querySelector('#colorPicker')
  const sectColor = document.querySelector('#sectColor')
  sectColor.style.display = 'none'

  colorPicker.addEventListener('change', e => {
    const color = e.target.value
    selectedColor.style.backgroundColor = color
    const colorLessHash = color.slice(1)

    fetch(`http://www.thecolorapi.com/id?hex=${colorLessHash}`)
      .then(resp => resp.json())
      .then(obj => {
        const hex = document.querySelector('#hex')

        const rgb = document.querySelector('#rgb')
        const cmyk = document.querySelector('#cmyk')

        hex.textContent = `HEX  ${obj.hex.value}`
        rgb.textContent = `RGB  ${obj.rgb.value.slice(3)}`

        cmyk.textContent = `CMYK  ${obj.cmyk.value.slice(4)}`
      })
    sectColor.style.display = 'contents'

    const quadColors = document.querySelector('#quadColors')
    buildCards('quad', quadColors)
    const analogicColors = document.querySelector('#analogicColors')
    buildCards('analogic-complement', analogicColors)
    const monochromeColors = document.querySelector('#monochromeColors')
    buildCards('monochrome', monochromeColors)
  })

  //   Build Card
  const buildCards = (mode, div) => {
    const color = colorPicker.value.slice(1)
    div.innerHTML = ' '

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
      .then(resp => resp.json())
      .then(obj => {
        console.log(obj)

        for (element of obj.colors) {
          console.log(element.hex.value)

          const newDiv = document.createElement('div')
          newDiv.setAttribute('id', 'temp')
          newDiv.innerHTML = `
          <div class="card mt-5 text-center" style="width: 15rem; height: auto;">
          <div id="comp1" class="card-body mt-2 p-5 ;" style="background-color: ${
            element.hex.value
          }" >
            </div>
          <ul class="list-group list-group-flush">
          
          <li class="list-group-item" id="compcmyk"><span>CMYK ${element.cmyk.value.slice(
            4
          )} <i class="bi bi-clipboard"></i></span></li>
          
          
            <li class="list-group-item" id="comprgb"><span>RGB ${element.rgb.value.slice(
              3
            )} <i class="bi bi-clipboard"></i></span></li>
              <li class="list-group-item" id="comphex"><span>HEX ${
                element.hex.value
              } <i class="bi bi-clipboard"></i></span></li>



              
              <div class="input-group mb-3">
                 <span class="input-group-text">CMYK</span>
                    <input type="text" class="form-control">
                <span class="input-group-text"><i class="bi bi-clipboard"></i></span>
              </div>
              <div class="input-group mb-3">
                 <span class="input-group-text">RGB</span>
                    <input id="cardBuildText" type="text" value=${element.rgb.value.slice(
                      3
                    )} 
                class="form-control ">
                <span class="input-group-text"><i class="bi bi-clipboard"></i></span>
              </div>
              <div class="input-group mb-3">
                 <span class="input-group-text">HEX</span>
                    <input type="text" value=${
                      element.hex.value
                    } class="form-control">
                <span class="input-group-text"><i class="bi bi-clipboard"></i></span>
              </div>
              
          </ul>
        </div>
          `

          //   this removes div to make bootstrap work
          div.appendChild(newDiv)
          newDiv.replaceWith(...newDiv.childNodes)
        }
      })
  }

  //   closing brackets
})
