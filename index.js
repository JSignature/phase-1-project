window.addEventListener("DOMContentLoaded", (e) => {

console.log("connected")

    const selectedColor = document.querySelector("#selectedColor")
    const colorPicker = document.querySelector("#colorPicker")
    

    colorPicker.addEventListener("change", (e) =>{
        const color = e.target.value
        // console.log(e.target.value)
        selectedColor.style.backgroundColor = color
        const colorLessHash = color.slice(1)
        // console.log(colorLessHash)
        

        fetch(`http://www.thecolorapi.com/id?hex=${colorLessHash}`)
        .then(resp => resp.json())
        .then(obj => {
    
        const hex = document.querySelector("#hex")
        const rgb = document.querySelector("#rgb")
        const cmyk = document.querySelector("#cmyk")
            // console.log(obj)
        hex.textContent = `HEX  ${obj.hex.value}`
        rgb.textContent = `RGB  ${(obj.rgb.value).slice(3)}`
        cmyk.textContent = `CMYK  ${(obj.cmyk.value).slice(4)}`
    })

    })

    const compColors = document.querySelector("#compColors")
    const compBtn = document.querySelector("#compBtn")
    compBtn.addEventListener("click", (e) =>{
        console.log(e)
        const color = (colorPicker.value).slice(1)
        console.log(color)
        const clear = document.querySelector("#compColors")
        clear.innerHTML = " "

        fetch(`https://www.thecolorapi.com/scheme?hex=${color}`)
        .then(resp => resp.json())
        .then(obj => {
            // console.log(obj)


            for (element of obj.colors){
                console.log(element.hex.value)

                const newDiv = document.createElement("div")
                newDiv.setAttribute("id", "temp")

               // newDiv.innerHTML = "<h1>test</h1>"
                newDiv.innerHTML = `
                <div class="card mt-5 text-center" style="width: 18rem; height: 18rem;">
                <div id="comp1" class="card-body" style="background-color: ${element.hex.value}" >
                  </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" id="acmyk">test</li>
                  <li class="list-group-item" id="argb"></li>
                  <li class="list-group-item" id="ahex"></li>
                </ul>
              </div>
                
                
                `


            // const newDiv = innerHTML = `
            //     <div class="card mt-5 text-center" style="width: 18rem; height: 18rem;" >
            //     <div id="comp1" class="card-body" >
            //       </div>
            //     <ul class="list-group list-group-flush">
            //       <li class="list-group-item" id="cmyk">test</li>
            //       <li class="list-group-item" id="rgb"></li>
            //       <li class="list-group-item" id="hex"></li>
            //     </ul>
            //   </div>
                
                
            //     `
            
                compColors.appendChild(newDiv)
                newDiv.replaceWith(...newDiv.childNodes)
                
                
               


           
            
                


            }
        })

    })











})