window.addEventListener("DOMContentLoaded", (e) => {

console.log("connected")

    const selectedColor = document.querySelector("#selectedColor")
    const colorPicker = document.querySelector("#colorPicker")
    colorPicker.addEventListener("change", (e) =>{
        const color = e.target.value
        console.log(e.target.value)
        selectedColor.style.backgroundColor = color
        const colorLessHash = color.slice(1)
        console.log(colorLessHash)

        fetch(`http://www.thecolorapi.com/id?hex=${colorLessHash}`)
        .then(resp => resp.json())
        .then(obj => {

    
        const hex = document.querySelector("#hex")
        const rgb = document.querySelector("#rgb")
        const cmyk = document.querySelector("#cmyk")
            console.log(obj)
        hex.textContent = `HEX  ${obj.hex.value}`
        rgb.textContent = `RGB  ${(obj.rgb.value).slice(3)}`
        cmyk.textContent = `CMYK  ${(obj.cmyk.value).slice(4)}`



    })


    })











})