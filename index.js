// Event Listener 1 - DOM content loaded
// Event Listener 2 - On change for color picker
// Event Listener 3 - Click event on copy buttons next to colors

// Use an public API - Fetch Request from Colors API

window.addEventListener('DOMContentLoaded', e => {
  const selectedColor = document.querySelector('#selectedColor')
  const colorPicker = document.querySelector('#colorPicker')
  const selectedColorSection = document.querySelector('#selectedColorSection')
  //Hide the selected color card until a color is selected
  selectedColorSection.style.display = 'none'
  //Hide the accordian section until a color is selected
  accordianSection.style.display = 'none'

  colorPicker.addEventListener('change', e => {
    const color = e.target.value
    selectedColor.style.backgroundColor = color
    const colorLessHash = color.slice(1)
    //Fetch the color from API based on the picker
    fetch(`http://www.thecolorapi.com/id?hex=${colorLessHash}`)
      .then(resp => resp.json())
      .then(obj => {
        //Grab the HTML elements to add the color values by ID
        const hex = document.querySelector('#hex')
        const rgb = document.querySelector('#rgb')
        const cmyk = document.querySelector('#cmyk')
        //Add the color values to the selected HTML by ID
        hex.textContent = `HEX  ${obj.hex.value}`
        rgb.textContent = `RGB  ${obj.rgb.value.slice(3)}`
        cmyk.textContent = `CMYK  ${obj.cmyk.value.slice(4)}`
      })

    //Show the selected color card once the fetch is back and card is built
    selectedColorSection.style.display = 'contents'

    //Grab the HTML elements to add color to accordian using ID
    const quadColors = document.querySelector('#quadColors')
    const analogicColors = document.querySelector('#analogicColors')
    const monochromeColors = document.querySelector('#monochromeColors')

    //Run the buildcard function to display each group of cards in the accordian
    async function buildAccordian() {
      await buildCards('quad', quadColors)
      await buildCards('analogic-complement', analogicColors)
      await buildCards('monochrome', monochromeColors)
      copyBtnEventListener()
    }

    buildAccordian()
    //Show accordian section once the cards are built
    accordianSection.style.display = 'contents'
  })

  //   Build card function for the accordian
  const buildCards = async (mode, div) => {
    const color = colorPicker.value.slice(1)
    div.innerHTML = ' '

    await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
      .then(resp => resp.json())
      .then(obj => {
        for (element of obj.colors) {
          const newDiv = document.createElement('div')

          // This needs to be redone to not use innerHTML if possible
          newDiv.innerHTML = `
          <div class="card mt-5 text-center" style="width: 16rem; height: auto;">

          <! –– Makes the color swatch at the top of the card ––>
          <div id="comp1" class="card-body mt-2 p-5 ;" style="background-color: ${
            element.hex.value
          }" >
            </div>

            <! –– Make the UL for the list of colors ––>
          <ul class="list-group list-group-flush">

          <! –– Make the three lines with color details and copy button ––>
         
          <li class="list-group-item " ><span style="font-size:.75rem"><label class="p-2" for="cmyk">CMYK </label><input style="width: 120px" type="text" name="cmyk" value="${element.cmyk.value.slice(
            4
          )}"> <i class="bi bi-clipboard copyBtn" style="font-size: 1rem"></i></span></li>
          
          
          <li class="list-group-item " ><span style="font-size:.75rem"><label class="p-2" for="rgb">RGB </label><input style="width: 120px" type="text" name="rgb" value="${element.rgb.value.slice(
            3
          )}"> <i class="bi bi-clipboard copyBtn" style="font-size: 1rem"></i></span></li>
              <li class="list-group-item" ><span style="font-size:.75rem"><label class="p-2" for="hex">HEX </label><input style="width: 120px" type="text" name="hex" value="${
                element.hex.value
              }"> <i class="bi bi-clipboard copyBtn" style="font-size: 1rem"></i></span></li>
          </ul>
        </div>
          `

          //   this removes the outer div to make bootstrap work,
          //   needed the div to place the inner HTML in the right spot
          div.appendChild(newDiv)
          newDiv.replaceWith(...newDiv.childNodes)
        }
        //console.log(`Accordian ${mode} has been built`)
      })
  }

  //Copy buttons event listener function
  const copyBtnEventListener = () => {
    //Grab the copy buttons by class in HTML
    const copyBtns = document.querySelectorAll('.copyBtn')
    for (copyBtn of copyBtns) {
      copyBtn.addEventListener('click', e => {
        const textToCopy = e.target.previousElementSibling.value
        navigator.clipboard.writeText(textToCopy)
      })
    }
  }

  //   DOM Loaded Closing Brackets
})
