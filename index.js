window.addEventListener('DOMContentLoaded', e => {
  console.log('connected')

  const selectedColor = document.querySelector('#selectedColor')
  const colorPicker = document.querySelector('#colorPicker')

  const sectColor = document.querySelector('#sectColor')
  sectColor.style.display = 'none'

  colorPicker.addEventListener('change', e => {
    const color = e.target.value
    // console.log(e.target.value)
    selectedColor.style.backgroundColor = color
    const colorLessHash = color.slice(1)
    // console.log(colorLessHash)

    fetch(`http://www.thecolorapi.com/id?hex=${colorLessHash}`)
      .then(resp => resp.json())
      .then(obj => {
        const hex = document.querySelector('#hex')

        const rgb = document.querySelector('#rgb')
        const cmyk = document.querySelector('#cmyk')
        // console.log(obj)
        hex.textContent = `HEX  ${obj.hex.value}`
        rgb.textContent = `RGB  ${obj.rgb.value.slice(3)}`

        cmyk.textContent = `CMYK  ${obj.cmyk.value.slice(4)}`
      })
    sectColor.style.display = 'contents'
  })

  const compColors = document.querySelector('#compColors')
  const quadColors = document.querySelector('#quadColors')
  const analogicColors = document.querySelector('#analogicColors')
  const monochromeColors = document.querySelector('#monochromeColors')
  //   const compBtn = document.querySelector('#compBtn')
  //   compBtn.addEventListener('click', e => {
  //     buildCards('quad', compColors)
  //   })

  const quadBtn = document.querySelector('#quadBtn')
  quadBtn.addEventListener('click', e => {
    buildCards('quad', quadColors)
    console.log(e)
  })

  const analogicBtn = document.querySelector('#analogicBtn')
  analogicBtn.addEventListener('click', () => {
    buildCards('analogic-complement', analogicColors)
  })

  const monochromeBtn = document.querySelector('#monochromeBtn')
  monochromeBtn.addEventListener('click', () => {
    buildCards('monochrome', monochromeColors)
  })

  //   Build Card
  const buildCards = (mode, div) => {
    const color = colorPicker.value.slice(1)
    console.log(color)
    // const clear = document.querySelector('#compColors')
    div.innerHTML = ' '

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
      .then(resp => resp.json())
      .then(obj => {
        console.log(obj)

        for (element of obj.colors) {
          console.log(element.hex.value)

          const newDiv = document.createElement('div')
          newDiv.setAttribute('id', 'temp')

          // newDiv.innerHTML = "<h1>test</h1>"
          newDiv.innerHTML = `
          <div class="card mt-5 text-center" style="width: 18rem; height: 18rem;">
          <div id="comp1" class="card-body" style="background-color: ${
            element.hex.value
          }" >
            </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item" id="compcmyk">CMYK ${element.cmyk.value.slice(
            4
          )} </li>
            <li class="list-group-item" id="comprgb">RGB ${element.rgb.value.slice(
              3
            )}</li>
              <li class="list-group-item" id="comphex">HEX ${
                element.hex.value
              }</li>
          </ul>
        </div>
          `
          div.appendChild(newDiv)
          newDiv.replaceWith(...newDiv.childNodes)
        }
      })
  }

  //   closing brackets
})
