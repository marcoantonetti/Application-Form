// Variables
// Get the form element on a variable
const multiCardForm = document.querySelector('[data-multi-step]')

// Create an array of cards
const formCards = [...multiCardForm.querySelectorAll('[data-step]')]

// Get the progress bar list
const progressBarList = document.querySelector('.progress-bar-list')

// Creat an array of progress bar items
const progressBarItems = [...progressBarList.querySelectorAll('.progress-bar-item')]

// All cards have a display:none except the one with the class='active'
// CurrentStep is the one that is active
let currentStep =  formCards.findIndex((step) =>{
    return step.classList.contains('active')
}) 



// Event
// Clicking butttons will change the currentstep and show the new active.
multiCardForm.addEventListener('click', e => {

    let incrementor ;
    

    // If its previous, it goes to the previous card. If it next, function continues.
    if(e.target.matches('.next')){

        incrementor = 1

    } else if (e.target.matches('.previous')) {

        incrementor = -1
        currentStep += incrementor; 

        return showCurrentStep()

    }

    if(incrementor == null){ return }

    // All inputs must be valid for next card to show up.
    const inputs = [...formCards[currentStep].querySelectorAll('input')]
    const allValid = inputs.every( input => input.reportValidity() )  


    if(allValid){
        currentStep += incrementor;  // If all inputs are valid, update de current step
        showCurrentStep()
    }
})



// Function
// This function add 'active' class only if index === currentStep. If not, it removes the active class.
// This uses the updated current Step, after clicking the buttons.
const showCurrentStep = () => {

    formCards.forEach( (step, index) => {
        step.classList.toggle('active', index === currentStep)
    } )

    progressBarItems.forEach((item, index) => {
        item.classList.toggle('current-item', index === currentStep)
    })
}








// Code for the dinamic job inputs and plus / cross button in card section experience


//Variables
// This will count the number of job inputs on the card
let buttonCount = 1; 

// Get the plus and remove button
let plusButton = document.querySelector('#plus-button')
let removeButton = document.querySelector('#cross-button')

// Get the div container
let bigContainer = document.querySelector('.big-container')



// Event
multiCardForm.addEventListener('click', (e) => {

// The initial value position set on CSS custom variable is of 120px. Each addition on the buttoncount will add 45px to this variable.
let valuePosition = 125 + buttonCount * 50;
console.log(buttonCount)

   if (e.target.matches('.fa-plus') || e.target.matches('#plus-button')){
        if(buttonCount <=3){ // Max 4 jobs inputs

            addJobInput()

            // dinamically moves the buttons
            plusButton.style.setProperty('--position-relative-to-button-count', `${valuePosition}px`)
            removeButton.style.setProperty('--position-relative-to-button-count', `${valuePosition}px`)

            
        } 
           
   } else if (e.target.matches('.fa-trash-o')  || e.target.matches('#cross-button') && buttonCount > 1) {
    console.log
    // Button count >1 So that it cant remove the initial job input

        removeJobInput()

        valuePosition -= 100


        // dinamically moves the buttons
        removeButton.style.setProperty('--position-relative-to-button-count', `${valuePosition }px`)
        plusButton.style.setProperty('--position-relative-to-button-count', `${valuePosition }px`)

    } 

    
})

// Function


// This generates another job input text with its two number inputs
const addJobInput = () => {

    // Containter creation

    let container = document.createElement('div')
    container.className = 'job-container'
    bigContainer.appendChild(container)

    // job input text creation
    let div = document.createElement('div')
    div.className = 'form-group jobs-input'
    container.appendChild(div)

    let label = document.createElement('label');
    label.setAttribute('for', `jobs${buttonCount}`);
    div.appendChild(label)
    
    let inputJob = document.createElement('input')
    inputJob.type = 'text'
    inputJob.setAttribute('name', `jobs${buttonCount}`)
    inputJob.setAttribute('id', `jobs${buttonCount}`)
    inputJob.setAttribute('placeholder', 'jobs')
    div.appendChild(inputJob)

    // End year input number
    let divYear = document.createElement('div')
    divYear.className = 'form-group years-employed-input'
    container.appendChild(divYear)

    let labelYear = document.createElement('label')
    labelYear.setAttribute('for', `end${buttonCount}`)
    divYear.appendChild(labelYear)

    let inputYear = document.createElement('input');
    inputYear.type = 'text'
    inputYear.setAttribute('pattern', '\\d*')
    inputYear.className = 'end'
    inputYear.maxLength = '4'
    inputYear.placeholder = 'Year'
    inputYear.setAttribute('id', `end${buttonCount}`)
    inputYear.setAttribute('name', `end${buttonCount}`)
    divYear.appendChild(inputYear)

    // start year input number
    let divYear2 = document.createElement('div')
    divYear2.className = 'form-group years-employed-input'
    container.appendChild(divYear2)

    let labelYear2 = document.createElement('label')
    labelYear2.setAttribute('for', `start${buttonCount}`)
    divYear2.appendChild(labelYear2)

    let inputYear2 = document.createElement('input');
    inputYear2.placeholder = 'Year'
    inputYear2.maxLength = '4'
    inputYear2.type = 'text'
    inputYear2.setAttribute('pattern', '\\d*')
    inputYear2.className = 'start'
    inputYear2.setAttribute('name', `start${buttonCount}`)
    inputYear2.setAttribute('id', `start${buttonCount}`)
    divYear2.appendChild(inputYear2)

    buttonCount += 1;


}

// This removes a job input
const removeJobInput = () => {

bigContainer.removeChild(bigContainer.lastChild)
buttonCount -= 1;


}



// Code for the checkbox inputs

// Variables
let checkboxContainer = document.querySelector('.checkbox-container')


let variables = [ 'css', 'javascript', 'scss', 'react.js', 'typescript', 'php', 'jquery','sql', 'vue.js', 'angular'
                ,'git', 'bootstrap']


// Dinamically inserts checkbox buttons
variables.forEach((variable)=>{
    
    
    let input = document.createElement('input')
    let label = document.createElement('label')

    input.type = 'checkbox'
    input.setAttribute('id',`${variable}` )
    input.setAttribute('name',`${variable}` )
        
    label.className = 'checkbox-skill'
    label.setAttribute('for',`${variable}` )
    label.innerHTML = `${variable.toUpperCase()}`

    
    checkboxContainer.appendChild(input)
    checkboxContainer.appendChild(label)

})




// Code for the languaje options 

// Variables

let select = document.querySelector('#languajes-select')

let langArray = ['Argentinian','English', 'Spanish', 'German', 'Italian', 'French','Dutch', 'Polish', 'Chinese', 'Arabic', 'Japanese', 'korean']

let langInput = document.querySelector('#Languajes')

let langTags = []

let langSelect = document.querySelector('#languajes-select')

let removeLang = document.querySelector('#lang-remove')

let globalVariable= ''



// Function to dinamically add options to the languaje-select element
 langArray.forEach((option)=>{

    let optionElement = document.createElement('option')
    optionElement.label =  `${option}`
    optionElement.value = `${option}`
    optionElement.id = `${option}`
    select.appendChild(optionElement)
})

// Click Event: 
multiCardForm.addEventListener('click', (e) => {


// If value is in langArray, meaning that is an language <option>, then add it to the input of languajes
// Do this if its not already included in the input. Or if it is the last removed languaje 
  if ( langArray.includes(e.target.value) && !langInput.value.includes((e.target.value)) && !spliceLangChecker(globalVariable, e.target.value)){
    
    globalVariable = '';

    langInput.value += e.target.value +', ';
    
            // Once selected, the languaje is spliced from the array, becoming unclickeable. Because first if conditions turns false
            index = langArray.indexOf(e.target.value)
            langArray.splice(index, 1)
        }      
        
        // If remove button is clicked, then it eliminates the last languaje input
        else if (e.target.matches('#trash-button') || e.target.matches('#lang-remove')) {
            
            // Makes an array of the input values
            let array = langInput.value.split(',')
            
            // Eliminates the last input / languaje.  
           let spliceLang =  array.splice(-2,1)
            .toString()
            .replace(/\s/g, '')
            
            // We add the option back to the array, so that its clickeable
            langArray.push(spliceLang)

            console.log(langArray)
        
            langInput.value = array.toString()
            
            const exportVariable = (splicedlang) => {
                
                return globalVariable = splicedlang
            }
            exportVariable(spliceLang)
        }
            
            
            // If the length varies, then change the font size when clicking on select or the input
            if (e.target.matches('#Languajes') || e.target.matches('#languajes-select')){
                
                changeFontSize()
                
            }
            
        }) 
        
        
 function changeFontSize () {
            if (langInput.value.length > 30){
                     langInput.style.setProperty('font-size', '.75rem')
                     langSelect.style.setProperty('font-size', '.75rem')
        
    }       else {
                    langInput.style.setProperty('font-size', '.9rem')
                    langSelect.style.setProperty('font-size', '.9rem')
    }
}



const spliceLangChecker = (splicedLang, target) => {
    return target ==  splicedLang;

};