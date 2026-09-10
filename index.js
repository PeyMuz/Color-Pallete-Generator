const generateBtn = document.getElementById("generate-btn");
const palleteContainer = document.querySelector(".palette-container");
const copyBtn = document.querySelector(".copy-btn");


generateBtn.addEventListener("click", generatePallete);

//to copy the hexValue
palleteContainer.addEventListener("click", function(e)  {
    if(e.target.classList.contains("copy-btn")){
        const hexValue = e.target.previousElementSibling.textContent;
        
        //to the text if its copied succesfully
        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target)) 
        .catch((error) => console.log(error));
    }else if(e.target.classList.contains("color")){
       const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
       navigator.clipboard
        .writeText(hexValue)
        .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"))) // kapag ccinlick mo yung box color, cococpy mo parin yung hex value.
        .catch((error) => console.log(error));        
    }
});

//this function will display the success copied
function showCopySuccess(copyBtn){
   copyBtn.classList.remove("far","fa-copy"); //to remove
   copyBtn.classList.add("fas","fa-check"); // to add

   copyBtn.style.color = "#48bb78";

   // after clicking, it will go back to the previous state
   setTimeout(() => {
    copyBtn.classList.remove("fas", "fa-check");
    copyBtn.classList.add("far", "fa-copy");
    copyBtn.style.color="";
   }, 1500);

}

function generatePallete() {

    const colors = []

    for (let i = 0; i < 5; i++) {
      colors.push(generateRandomColor())
    }
   
    updatePaletteDisplay(colors);
}

function generateRandomColor () {
    const letters = "0123456789ABCDEFG"; //Tdito kinukuha yung mga values
    let color = "#" // lalagyan ng hashtag symbol sa unahan


    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]; // dito mag gegenrate ng random
    }

    return color;
}

//to update Colors

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

generatePallete();